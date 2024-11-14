<?php

namespace App\Http\Controllers\Landing;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PackageController extends Controller
{
    public function search_index()
    {
        return Inertia::render('Landing/Package/PackageList');
    }
}
