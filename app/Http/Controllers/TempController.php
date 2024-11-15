<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \JsonMachine\Items;
use App\Models\CONFIG\Country;

class TempController extends Controller
{
    public function show_upload()
    {
        return view('upload');
    }

    public function handle_upload()
    {
        $filePath = request()->file('json_file')->getPathname();

        $countries = Items::fromFile($filePath);

        foreach ($countries as $country) {
            try{
                Country::create([
                    'name' => $country->name,
                    'iso2' => $country->iso2,
                    'iso3' => $country->iso3,
                    'logo' => 'j',
                    'latitude' => $country->latitude,
                    'longitude' => $country->longitude,
                    'phone_code' => $country->phone_code,
                    'numeric_code' => $country->numeric_code,
                    'currency_code' => $country->currency,
                    'currency_name' => $country->currency_name,
                    'currency_symbol' => $country->currency_symbol
                ]);
            }catch(\Exception $e){
                dd($e->getMessage(), $country);
            }
           
        }

        dd('Done Done London !');
    }
}
