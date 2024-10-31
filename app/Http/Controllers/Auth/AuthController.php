<?php

namespace App\Http\Controllers\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function show_login()
    {
        return Inertia::render("Client/Auth/Login");
    }

    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return redirect()->intended('dashboard');
        }

        return back()->withErrors([
            'general' => 'Les informations fournies ne correspondent pas à nos enregistrements.',
        ])->onlyInput('email');        
    }

    public function show_register()
    {
        return Inertia::render("Client/Auth/Register");
    }
}
