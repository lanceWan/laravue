<?php
namespace App\Services\Admin;
use App\Repositories\Eloquent\UserRepositoryEloquent;
use App\Repositories\Eloquent\RoleRepositoryEloquent;
use App\Repositories\Eloquent\PermissionRepositoryEloquent;
use App\Repositories\Criteria\SearchCriteria;
use App\Repositories\Criteria\OrderByCriteria;
use App\Repositories\Criteria\PaginationCriteria;
use Exception;
use DB;
class UserService
{
	protected $userRepo;
	protected $roleRepo;
	protected $permissionRepo;

	public function __construct(UserRepositoryEloquent $userRepo, RoleRepositoryEloquent $roleRepo, PermissionRepositoryEloquent $permissionRepo)
	{
		$this->userRepo = $userRepo;
		$this->roleRepo = $roleRepo;
		$this->permissionRepo = $permissionRepo;
	}

	public function index()
	{
		$responseData = [
			'code' => 0,
			'status' => 200,
			'message' => 'ok',
		];
		try {
			// 当前请求页数
			$page = request('currentPage', config('admin.global.pagination.page'));
			// 每页显示条数
			$pageSize = request('pageSize', config('admin.global.pagination.pageSize'));
			// 需要排序的列名
			$column = request('column', config('admin.global.pagination.column'));
			// 排序规则
			$order = request('order', config('admin.global.pagination.order'));

			$order = $order == 'ascending' ? 'asc' : 'desc';

			// search
			$search = request('search','');

			$start = ($page - 1) * $pageSize;

			if ($search) {
				$this->userRepo->pushCriteria(new SearchCriteria(['username','name'],$search));
			}
			$total = $this->userRepo->skipPresenter()->all(['id'])->count();

			$this->userRepo->pushCriteria(new PaginationCriteria($pageSize,$start));
			$users = $this->userRepo->orderBy($column,$order)->skipPresenter(false)->all();

			$responseData['total'] = $total;
			$responseData['results'] = $users;

		} catch (Exception $e) {
			$responseData['code'] = 2001;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:index-获取权限列表数据失败';
		}
		return $responseData;
	}

	/**
	 * 创建角色视图所需数据
	 * @author 晚黎
	 * @date   2017-03-20T17:31:31+0800
	 * @return [type]                   [description]
	 */
	public function create()
	{
		$responseData = [
			'code' => 0,
			'status' => 200,
			'message' => 'ok',
			'results' => [],
		];
		try {
			$permissions = $this->permissionRepo->all(['id','name', 'slug']);
			$permission = [];
			if (!$permissions->isEmpty()) {
				foreach ($permissions as $v) {
					$arr = explode('.', $v['slug']);
					$permission[$arr[0]][] = $v;
				}
				$responseData['results'] = $permission;
			}
		} catch (Exception $e) {
			$responseData['code'] = 2002;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:create-获取所有权限失败';
		}
		return $responseData;
	}

	/**
	 * 添加角色
	 * @author 晚黎
	 * @date   2017-03-22T09:55:12+0800
	 * @param  [type]                   $attributes [description]
	 * @return [type]                               [description]
	 */
	public function store($attributes)
	{
		$responseData = [
			'code' => 0,
			'status' => 200,
			'message' => 'ok',
		];
		try {
			DB::transaction(function () use ($attributes) {
				$role = $this->roleRepo->create($attributes);
				if ($attributes['permissionIds']) {
					$role->syncPermissions($attributes['permissionIds']);
				}
			});
			$responseData['message'] = '创建权限成功';
		} catch (Exception $e) {
			$responseData['code'] = 2003;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:store-添加角色失败';
		}
		return $responseData;
	}

	/**
	 * 修改角色页面数据
	 * @author 晚黎
	 * @date   2017-03-22T16:48:00+0800
	 * @param  [type]                   $id [description]
	 * @return [type]                       [description]
	 */
	public function edit($id)
	{
		$responseData = [
			'code' => 0,
			'status' => 200,
			'message' => 'ok',
		];
		try {
			$role = $this->roleRepo->with('permissions')->find($id,['id','name','slug','description'])->toArray();
			$role['permissionIds'] = [];

			if ($role['permissions']) {
				$role['permissionIds'] = array_column($role['permissions'], 'id');

				$permissions = $this->permissionRepo->all(['id','name', 'slug']);
				$permission = [];
				if (!$permissions->isEmpty()) {
					foreach ($permissions as $v) {
						$arr = explode('.', $v->slug);
						$permission[$arr[0]][] = $v;
					}
				}
				$role['permissions'] = $permission;
			}
			$responseData['results'] = $role;
		} catch (Exception $e) {
			$responseData['code'] = 2004;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:edit-获取角色数据失败';
		}
		return $responseData;
	}

	/**
	 * 修改角色数据
	 * @author 晚黎
	 * @date   2017-03-22T17:23:53+0800
	 * @param  [type]                   $attributes [description]
	 * @param  [type]                   $id         [description]
	 * @return [type]                               [description]
	 */
	public function update($attributes,$id)
	{
		$responseData = [
			'code' => 0,
			'status' => 200,
			'message' => 'ok',
		];
		try {
			DB::transaction(function () use ($attributes, $id){
				$role = $this->roleRepo->update($attributes,$id);
				$role->syncPermissions($attributes['permissionIds']);
			});
			$responseData['message'] = '修改权限成功';
		} catch (Exception $e) {
			$responseData['code'] = 2005;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:update-修改角色数据失败';
		}
		return $responseData;
	}
	
	/**
	 * 删除数据
	 * @author 晚黎
	 * @date   2017-03-22T17:36:05+0800
	 * @param  [type]                   $id [description]
	 * @return [type]                       [description]
	 */
	public function destroy($id)
	{
		$responseData = [
			'code' => 0,
			'status' => 200,
			'message' => 'ok',
		];
		try {
			$multiple = request('multiple', false);
			// 批量删除
			if ($multiple) {
				$isDestroy = $this->roleRepo->multipleDestroy(explode(',', $id));
			}else{
				$isDestroy = $this->roleRepo->delete($id);
			}
			if ($isDestroy) {
				$responseData['message'] = '删除角色成功';
			}
		} catch (Exception $e) {
			$responseData['code'] = 2006;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:destroy-删除角色数据失败';
		}
		return $responseData;
	}

	/**
	 * 查看角色信息
	 * @author 晚黎
	 * @date   2017-03-23T11:56:02+0800
	 * @param  [type]                   $id [description]
	 * @return [type]                       [description]
	 */
	public function show($id)
	{
		$responseData = [
			'code' => 0,
			'status' => 200,
			'message' => 'ok',
		];
		try {
			$role = $this->roleRepo->with('permissions')->find($id,['id','name','slug','description'])->toArray();
			if ($role['permissions']) {
				$permission = [];
				foreach ($role['permissions'] as $v) {
					$arr = explode('.', $v['slug']);
					$permission[$arr[0]][] = $v;
				}
				$role['permissions'] = $permission;
			}
			$responseData['results'] = $role;
		} catch (Exception $e) {
			$responseData['code'] = 2007;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:show-查询角色数据失败';
		}
		return $responseData;
	}
}