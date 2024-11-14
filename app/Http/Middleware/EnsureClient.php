<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnsureClient
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        if ($user && $user->employe !== null) {
            return $next($request);
        }

        return redirect('/')->with('error', 'Unauthorized access');
    }
}
