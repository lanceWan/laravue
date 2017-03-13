<?php
namespace App\Http\Middleware;
use Closure;
use Route;
class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $permission = Route::currentRouteName();
        if (!$request->user()->hasPermission($permission)) {
            return response()->json(['message' => '你没有权限访问'], 500);
        }
        return $next($request);
    }
}
