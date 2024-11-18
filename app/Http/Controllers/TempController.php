<?php 

namespace App\Http\Controllers;

use App\Models\CONFIG\City;
use \JsonMachine\Items;
use Illuminate\Http\Request;
use App\Models\CONFIG\Country;
use App\Models\CONFIG\Region;
use Illuminate\Support\Facades\DB;
use Cerbero\JsonParser\JsonParser;
use function Cerbero\JsonParser\parseJson;

class TempController extends Controller
{
    public function show_upload()
    {
        return view('upload');
    }

    public function handle_upload_countries()
    {
        $filePath = request()->file('json_file')->getPathname();

        $countries = Items::fromFile($filePath);
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('config__country')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        foreach ($countries as $country) {
            try{
                Country::create([
                    'id' => $country->id,
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

    public function handle_upload_states()
    {
        $filePath = request()->file('json_file')->getPathname();

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('config__region')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $data = new JsonParser($filePath);

        foreach ($data as $state) {
            try {
                Region::create([
                    'id' => $state['id'],
                    'name' => $state['name'],
                    'country_id' => $state['country_id']
                ]);
            } catch (\Exception $e) {
                dd($e->getMessage(), $state);
            }
        }

        dd('Import completed successfully.');
    }


    public function handle_upload_cities(){
        $storedFilePath = storage_path('app/private/uploads/cities.json');

        // Ensure the uploads directory exists
        if (!file_exists(storage_path('app/uploads'))) {
            mkdir(storage_path('app/uploads'), 0755, true);
        }
            
        if (!file_exists($storedFilePath)) {
            dd('why');
            $uploadedFile = request()->file('json_file');
            
            if (!$uploadedFile) {
                return response()->json(['error' => 'No file uploaded. Please provide a JSON file.'], 400);
            }

            // Save the file
            $storedPath = $uploadedFile->storeAs('uploads', 'cities.json');
            $storedFilePath = storage_path('app/' . $storedPath);
        }
            
        // Process the file
        $cities = Items::fromFile($storedFilePath);
        
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('config__city')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        
        foreach ($cities as $city) {
            try {
                City::create([
                    'name' => $city->name,
                    'postal_code' => $city->country_id,
                    'latitude' => $city->latitude,
                    'longitude' => $city->longitude,
                    'region_id' => $city->state_id,
                    'wikiData' => $city->wikiDataId,
                ]);
                // Debugging: stop after first record
            } catch (\Exception $e) {
                dd($e->getMessage(), $city);
            }
        }

        dd('Done Done London !');
    }

}
