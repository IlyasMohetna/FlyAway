<?php

namespace App\Http\Controllers;

use App\Models\CONFIG\Country;
use App\Models\CONFIG\Region;
use App\Models\CONFIG\City;
use Inertia\Inertia;

class LocationController extends Controller
{
    public function getCountries()
    {
        $countries = Country::all();
        return Inertia::render('YourComponent', ['countries' => $countries]);
    }

    public function getRegions($countryId)
    {
        $regions = Region::where('country_id', $countryId)->get();
        return response()->json(['regions' => $regions]);
    }

    public function getCities($regionId)
    {
        $cities = City::where('region_id', $regionId)->get();
        return response()->json(['cities' => $cities]);
    }
}
