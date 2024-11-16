<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index_show()
    {
        return Inertia::render("Client/Dashboard/Dashboard");
    }
}
