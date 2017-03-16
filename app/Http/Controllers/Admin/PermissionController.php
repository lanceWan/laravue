<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Requests\PermissionCreateRequest;
use App\Http\Requests\PermissionUpdateRequest;
use App\Services\Admin\PermissionService;
use App\Http\Controllers\Controller;
class PermissionController extends Controller
{
    protected $service;

    public function __construct(PermissionService $service)
    {
        $this->service = $service;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $responseData = $this->service->index();
        return response()->json($responseData,$responseData['status']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  PermissionCreateRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(PermissionCreateRequest $request)
    {
        $responseData = $this->service->store($request->all());
        return response()->json($responseData,$responseData['status']);
    }


    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $responseData = $this->service->edit($id);
        return response()->json($responseData,$responseData['status']);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  PermissionUpdateRequest $request
     * @param  string            $id
     *
     * @return Response
     */
    public function update(PermissionUpdateRequest $request, $id)
    {
        $responseData = $this->service->update($request->all(),$id);
        return response()->json($responseData,$responseData['status']);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $responseData = $this->service->destroy($id);
        return response()->json($responseData,$responseData['status']);
    }

    /**
     * 获取当前用户的所有权限
     * @author 晚黎
     * @date   2017-03-14T09:29:03+0800
     * @return [type]                   [description]
     */
    public function getUserPermissions()
    {
        $responseData = $this->service->userPermissions();
        return response()->json($responseData,$responseData['status']);
    }
}
