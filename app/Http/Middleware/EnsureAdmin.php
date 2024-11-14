<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if ($user && $user->client === null && $user->employe !== null) {
            return $next($request);
        }

        return redirect()->route('admin.login.show');
    }
}
