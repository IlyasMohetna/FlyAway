<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ClientResource;
use App\Http\Resources\EmployeResource;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     */
    public function share(Request $request): array
    {
        $user = null;

        if (Auth::check()) {
            $authenticatedUser = Auth::user();
            if ($authenticatedUser->client) {
                $user = new ClientResource($authenticatedUser);
            } elseif ($authenticatedUser->employe) {
                $user = new EmployeResource($authenticatedUser);
            }
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ]);
    }
}
