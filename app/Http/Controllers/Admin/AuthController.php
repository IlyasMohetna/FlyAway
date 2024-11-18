<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;


class AuthController extends Controller
{
    public function show_login()
    {
        return Inertia::render("Admin/Auth/Login");
    }

    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        $followUrl = session()->get('followUrl', route('admin.dashboard.show'));

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        Auth::logout();

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            if($user->employe){
                $request->session()->regenerate();
                return redirect()->intended($followUrl);
            }

            Auth::logout();

            return back()->withErrors([
                'general' => 'Seuls les admin peuvent se connecter ici.',
            ])->onlyInput('email');
        }

        return back()->withErrors([
            'general' => 'Les informations fournies ne correspondent pas à nos enregistrements.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('admin.login.show');
    }
}
