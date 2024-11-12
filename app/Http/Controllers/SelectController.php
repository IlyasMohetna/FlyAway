<?php

namespace App\Http\Controllers;

use App\Models\CONFIG\City;
use Illuminate\Http\Request;
use App\Models\LODGING\Lodging;
use App\Models\PACKAGE\PackageType;

class SelectController extends Controller
{
    public function city_select(Request $request)
    {
        $query = $request->query('search', '');

        $cities = City::with('region.country')->where('name', 'LIKE', '%'.$query.'%')
        ->orWhere('name', 'LIKE', '%'.$query.'%')
        ->orderByRaw("CASE WHEN `name` = ? THEN 1 WHEN `name` LIKE ? THEN 2 ELSE 3 END", [$query, $query.'%'])
        ->limit(10)
        ->get();

        $return = [];

        foreach($cities as $city){
            $return[] = [
                'id'=> $city->id,
                'name'=> $city->name.' - '.$city->region->country->name
            ];
        }

        return response()->json($return);
    }

    public function package_type_select(Request $request)
    {
        $query = $request->query('search', '');

        $types = PackageType::where('name', 'LIKE', '%'.$query.'%')
        ->orWhere('name', 'LIKE', '%'.$query.'%')
        ->orderByRaw("CASE WHEN `name` = ? THEN 1 WHEN `name` LIKE ? THEN 2 ELSE 3 END", [$query, $query.'%'])
        ->limit(10)
        ->get();

        return response()->json($types);
    }

    public function lodging_select(Request $request)
    {
        $query = $request->query('search', '');

        $lodgings = Lodging::with('real_city')->where('name', 'LIKE', '%'.$query.'%')
        ->orWhere('name', 'LIKE', '%'.$query.'%')
        ->orderByRaw("CASE WHEN `name` = ? THEN 1 WHEN `name` LIKE ? THEN 2 ELSE 3 END", [$query, $query.'%'])
        ->limit(10)
        ->get();

        $return = [];

        foreach($lodgings as $lodging){
            $return[] = [
                'id'=> $lodging->id,
                'name'=> $lodging->name.' - '.$lodging->real_city->name
            ];
        }

        return response()->json($return);
    }
}
