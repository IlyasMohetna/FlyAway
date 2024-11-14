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

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return Redirect::route('admin.dashboard.show');
        }

        return back()->withErrors([
            'general' => 'Les informations fournies ne correspondent pas à nos enregistrements.',
        ])->onlyInput('email');
    }
}
