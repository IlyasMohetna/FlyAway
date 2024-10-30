<?php

namespace App\Http\Controllers\Auth;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class AuthController extends Controller
{
    public function show_login()
    {
        return Inertia::render("Client/Auth/Login");
    }

    public function login(Request $request){
        dd($request);
        return Inertia::render("Client/Auth/Login");
    }
}
