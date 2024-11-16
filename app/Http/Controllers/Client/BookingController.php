<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\PACKAGE\Package;
use App\Models\PACKAGE\TransportationMode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index_show(Request $request)
    {
        $package = Package::with('city', 'transportations.transport', 'lodgings.lodging.type')->find($request->package_id);
        $transportation_modes = TransportationMode::all();
        return Inertia::render('Landing/Booking/BookingMake', [
            'apackage' => $package,
            'transportation_modes' => $transportation_modes
        ]);
    }
}
