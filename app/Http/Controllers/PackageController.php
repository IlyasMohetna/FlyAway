<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Client\Client;
use App\Models\PACKAGE\Package;
use Illuminate\Support\Facades\DB;
use App\Models\LODGING\LodgingType;
use App\Models\PACKAGE\PackageType;
use App\Models\PACKAGE\ClientPackage;
use App\Models\PACKAGE\ItineraryStep;
use App\Models\PACKAGE\PackageGallery;
use App\Models\PACKAGE\PackageLodging;
use App\Models\PACKAGE\PackageTransport;
use App\Models\PACKAGE\TransportationMode;

class PackageController extends Controller
{
    // Package list
    public function index()
    {
        $query = Package::query();
        $query->with('type', 'city');
        if(request()->has("sort")){
            $sortField = request()->input('sort.field', 'id');
            $sortOrder = request()->input('sort.order', 'asc');
            $query->orderBy($sortField, $sortOrder);
        }

        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);
        return Inertia::render('Admin/Dashboard/Package/PackageList', [
            'data' => $data->items(),
            'total' => $data->total(),
            'currentPage' => $data->currentPage(),
            'lastPage' => $data->lastPage(),
            'sort' => [
                'field' => request()->input('sort.field', 'id'),
                'order' => request()->input('sort.order', 'asc'),
            ],
            'search' => request()->input('search', ''),
        ]);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $package = Package::create([
                'title' => $request->title,
                'amount_ht' => $request->amount_ht,
                'amount_ttc' => $request->amount_ttc,
                'duration' => $request->duration,
                'description' => $request->description,
                'public' => $request->public,
                'package_type_id' => $request->package_type_id,
                'destination_id' => $request->destination_id
            ]);

            // Stocker les fichiers
            foreach ($request->file('images') as $image) {
                $path = $image->store('', 'package_gallery');
                PackageGallery::create([
                    'file_name' => $path,
                    'mime_type' => $image->getClientMimeType(),
                    'size' => $image->getSize(),
                    'storage_driver' => 'package_gallery',
                    'package_id' => $package->id
                ]);
            }

            // Rattacher le forfait aux options de logements
            foreach($request->lodging_options as $lodging_option) {
                PackageLodging::create([
                    'lodging_mode_id' => $lodging_option,
                    'package_id' => $package->id
                ]);
            }

            // Rattacher le forfait aux options de trannsports
            foreach($request->transportation_options as $transportation_option) {
                    PackageTransport::create([
                        'transportation_mode_id' => $transportation_option,
                        'package_id' => $package->id
                    ]);
            }

            foreach($request->itinerary_days as $day) {
                foreach($day['steps'] as $rank => $step){
                    ItineraryStep::create([
                        'title' => $step['title'],
                        'description' => $step['description'],
                        'day' => $day['day'],
                        'rank' => $rank+1,
                        'package_id' => $package->id
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('package.index')->with(['success' => 'Votre demande a été traitée avec succès']);
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->route('package.index')->with(['error' => 'Une erreur est survenue !']);
        }
    }

    //---------- Package types
    public function type()
    {
        $query = PackageType::query();

        $sortField = request()->input('sort.created_at', 'id');
        $sortOrder = request()->input('sort.order', 'desc');

        $query->orderBy($sortField, $sortOrder);

        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);

        return Inertia::render('Admin/Dashboard/Package/TypeList', [
            'data' => $data->items(),
            'total' => $data->total(),
            'currentPage' => $data->currentPage(),
            'lastPage' => $data->lastPage(),
            'sort' => [
                'field' => request()->input('sort.field', 'id'),
                'order' => request()->input('sort.order', 'asc'),
            ],
            'search' => request()->input('search', ''),
        ]);
    }

    public function type_store(Request $request)
    {
        try {
            PackageType::create([
                'name' => $request->input('name'),
            ]);

            return redirect()->route('package.type')->with(['success' => 'Votre demande a été traiter avec succès']);
        } catch (\Exception $e) {
            return redirect()->route('package.type')->with(['error' => 'Une erreur est survenue !']);
        }
    }

    public function type_delete($id)
    {
        try {
            PackageType::where('id', $id)->delete();
            return redirect()->route('package.type')->with(['success'=> 'Votre demande a été traiter avec succès']);
        }
        catch (\Exception $e) {
            return redirect()->route('package.type')->with(['error'=> 'Une erreur est survenue !']);
        }
    }

    //---------- Package transport options
    public function transportation_index()
    {
        $query = TransportationMode::query();

        $sortField = request()->input('sort.created_at', 'id');
        $sortOrder = request()->input('sort.order', 'desc');

        $query->orderBy($sortField, $sortOrder);

        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);

        return Inertia::render('Admin/Dashboard/Package/TransportationList', [
            'data' => $data->items(),
            'total' => $data->total(),
            'currentPage' => $data->currentPage(),
            'lastPage' => $data->lastPage(),
            'sort' => [
                'field' => request()->input('sort.field', 'id'),
                'order' => request()->input('sort.order', 'asc'),
            ],
            'search' => request()->input('search', ''),
        ]);
    }

    public function transportation_store(Request $request)
    {
        try {
            TransportationMode::create([
                'name' => $request->input('name'),
            ]);

            return redirect()->route('package.transport')->with(['success' => 'Votre demande a été traiter avec succès']);
        } catch (\Exception $e) {
            return redirect()->route('package.transport')->with(['error' => 'Une erreur est survenue !']);
        }
    }

    public function transportation_delete($id)
    {
        try {
            TransportationMode::where('id', $id)->delete();
            return redirect()->route('package.transport')->with(['success'=> 'Votre demande a été traiter avec succès']);
        }
        catch (\Exception $e) {
            return redirect()->route('package.transport')->with(['error'=> 'Une erreur est survenue !']);
        }
    }

    //--------- Package User Management
    public function linked_users($id)
    {
        $package = Package::with('linked.client')->find($id);

        if (!$package) {
            return response()->json(['message' => 'Package not found'], 404);
        }

        $linkedUsers = $package->linked->map(function ($linked) {
            return [
                'id' => $linked->client->id,
                'firstname' => $linked->client->user->firstname,
                'lastname' => $linked->client->user->lastname,
            ];
        });

        return response()->json($linkedUsers);
    }

    public function link_user($id)
    {
        DB::beginTransaction();
        try {
            ClientPackage::create([
                'client_id' => request()->user_id,
                'package_id' => $id
            ]);
            DB::commit();
            return response()->json(['message' => 'User successfully linked to package'], 200);
        }
        catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to link user to package'], 500);
        }
    }

    public function unlink_user($id)
    {
        DB::beginTransaction();
        try {
            ClientPackage::where('client_id', request()->user_id)
                ->where('package_id', $id)
                ->delete();

            DB::commit();
            return response()->json(['message' => 'User successfully unlinked from package'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to unlink user from package'], 500);
        }
    }

    public function search_client(Request $request)
    {
        $searchTerm = $request->input('search');

        if (!empty($searchTerm)) {
            $clients = Client::with('user')
                ->whereHas('user', function($query) use ($searchTerm) {
                    $query->where('firstname', 'like', "%{$searchTerm}%")
                        ->orWhere('lastname', 'like', "%{$searchTerm}%");
                })
                ->select('id', 'user_id')
                ->limit(10)
                ->get();
        } else {
            $clients = Client::with('user')
                ->select('id', 'user_id')
                ->limit(10)
                ->get();
        }

        $filteredClients = $clients->map(function($client) {
            return [
                'id' => $client->id,
                'firstname' => $client->user->firstname,
                'lastname' => $client->user->lastname,
            ];
        });

        return response()->json($filteredClients);
    }

}
