<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\PACKAGE\Package;
use App\Models\PACKAGE\PackageType;
use App\Http\Controllers\Controller;


class HomeController extends Controller
{
    public function index()
    {
        $min_amount = Package::min("amount_ttc");
        $max_amount = Package::max("amount_ttc");
        $min_duration = Package::min("duration");
        $max_duration = Package::max("duration");
        $package_types = PackageType::all();

        return Inertia::render('Home', [
            'min_amount' => $min_amount,
            'max_amount' => $max_amount,
            'min_duration' => $min_duration,
            'max_duration' => $max_duration,
            'package_types' => $package_types,
        ]);
    }
}
