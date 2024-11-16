<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\PACKAGE\Booking;
use App\Models\PACKAGE\Package;
use App\Models\PACKAGE\TransportationMode;
use Carbon\Carbon;
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

    public function store(Request $request)
    {
        try{
            $start_date = Carbon::parse($request->start_date);
            $end_date = Carbon::parse($request->end_date);
            $booking = Booking::create([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'package_id' => $request->package_id,
                'transportation_mode_id' => $request->transportation_mode_id,
                'lodging_mode_id' => $request->lodging_mode_id,
            ]);
        }catch(\Exception $e){
            dd($e->getMessage());
        }
    }
}
