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
}
