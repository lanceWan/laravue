<?php
namespace App\Services\Admin;
use App\Repositories\Eloquent\RoleRepositoryEloquent;
use App\Repositories\Criteria\SearchCriteria;
use App\Repositories\Criteria\OrderByCriteria;
use App\Repositories\Criteria\PaginationCriteria;
use Exception;
class RoleService
{
	protected $RoleRepo;

	public function __construct(RoleRepositoryEloquent $RoleRepo)
	{
		$this->RoleRepo = $RoleRepo;
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
				$this->RoleRepo->pushCriteria(new SearchCriteria(['name','slug'],$search));
			}
			$total = $this->RoleRepo->skipPresenter()->all(['id'])->count();

			$this->RoleRepo->pushCriteria(new PaginationCriteria($pageSize,$start));
			$roles = $this->RoleRepo->orderBy($column,$order)->skipPresenter(false)->all();

			$responseData['total'] = $total;
			$responseData['roles'] = $roles['data'];

		} catch (Exception $e) {
			$responseData['code'] = 2001;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:index-获取权限列表数据失败';
		}
		return $responseData;
	}

	/**
	 * 获取当前用户的所有权限
	 * @author 晚黎
	 * @date   2017-03-14T09:33:58+0800
	 * @return [type]                   [description]
	 */
	public function userPermissions()
	{
		$responseData = [
			'code' => 0,
			'status' => 200,
			'message' => 'ok',
		];
		try {
			$permissions = auth()->user()->getPermissions();
			$responseData['permissions'] = [];
			if (!$permissions->isEmpty()) {
				$responseData['permissions'] = $permissions->pluck('slug');
			}
		} catch (Exception $e) {
			$responseData['code'] = 1002;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:userPermissions-获取用户权限信息失败';
		}
		return $responseData;
	}

	/**
	 * 添加权限
	 * @author 晚黎
	 * @date   2017-03-14T15:42:05+0800
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
			$permission = $this->permissionRepo->create($attributes);
			if ($permission) {
				$responseData['message'] = '创建权限成功';
			}
		} catch (Exception $e) {
			$responseData['code'] = 1003;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:store-添加权限失败';
		}
		return $responseData;
	}

	/**
	 * 权限数据
	 * @author 晚黎
	 * @date   2017-03-15T13:19:32+0800
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
			$responseData['permission'] = $this->permissionRepo->skipPresenter()->find($id,['id','name','slug','description']);
		} catch (Exception $e) {
			$responseData['code'] = 1004;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:edit-获取权限数据失败';
		}
		return $responseData;
	}

	/**
	 * 修改权限数据
	 * @author 晚黎
	 * @date   2017-03-16T10:36:52+0800
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
			$isUpdate = $this->permissionRepo->update($attributes,$id);
			if ($isUpdate) {
				$responseData['message'] = '修改权限成功';
			}
		} catch (Exception $e) {
			$responseData['code'] = 1005;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:update-修改权限数据失败';
		}
		return $responseData;
	}
	/**
	 * 删除数据
	 * @author 晚黎
	 * @date   2017-03-16T10:59:17+0800
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
				$isDestroy = $this->permissionRepo->multipleDestroy(explode(',', $id));
			}else{
				$isDestroy = $this->permissionRepo->delete($id);
			}
			if ($isDestroy) {
				$responseData['message'] = '删除权限成功';
			}
		} catch (Exception $e) {
			dd($e);
			$responseData['code'] = 1006;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:destroy-删除权限数据失败';
		}
		return $responseData;
	}
}