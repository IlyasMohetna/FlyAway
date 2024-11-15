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

        if ($user && $user->client !== null) {
            return $next($request);
        }

        $comebackUrl = $request->fullUrl();
        $request->session()->put('comebackUrl', $comebackUrl);

        return redirect()->route('client.login.show');
    }
}
