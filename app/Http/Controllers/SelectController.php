<?php

namespace App\Http\Controllers;

use App\Models\CONFIG\City;
use Illuminate\Http\Request;

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
}
