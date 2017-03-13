<?php
namespace App\Services\Admin;
use App\Repositories\Eloquent\PermissionRepositoryEloquent;
use App\Repositories\Criteria\SearchCriteria;
use App\Repositories\Criteria\OrderByCriteria;
use App\Repositories\Criteria\PaginationCriteria;
use Exception;
class PermissionService
{
	protected $permissionRepo;

	public function __construct(PermissionRepositoryEloquent $permissionRepo)
	{
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
				$this->permissionRepo->pushCriteria(new SearchCriteria(['name','slug'],$search));
			}
			$total = $this->permissionRepo->skipPresenter()->all(['id'])->count();

			$this->permissionRepo->pushCriteria(new PaginationCriteria($pageSize,$start));
			$permissions = $this->permissionRepo->orderBy($column,$order)->skipPresenter(false)->all();

			$responseData['total'] = $total;
			$responseData['permissions'] = $permissions['data'];

		} catch (Exception $e) {
			dd($e);
			$responseData['code'] = 1001;
			$responseData['status'] = 500;
			$responseData['message'] = 'error:index-获取权限列表数据失败';
		}
		return $responseData;
	}
}