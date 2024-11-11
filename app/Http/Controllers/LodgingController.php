<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\LODGING\Lodging;
use App\Models\LODGING\Equipement;
use Illuminate\Support\Facades\DB;
use App\Models\LODGING\LodgingRoom;
use App\Models\LODGING\LodgingType;
use App\Models\LODGING\AttributTerm;
use App\Models\LODGING\LodgingAttribut;
use Illuminate\Support\Facades\Storage;
use App\Models\LODGING\AttributCategory;
use App\Models\LODGING\EquipementCategory;
use App\Models\LODGING\RoomGallery;

class LodgingController extends Controller
{
    //---------- Lodging
    public function create_show()
    {
        $categories = AttributCategory::with(['attribut' => function ($query) {
            $query->select('id', 'name', 'attribut_categorie_id');
        }])
        ->select('id', 'name')
        ->get();

        return Inertia::render('Admin/Dashboard/Lodging/CreateLodging', [
            'categories'=> $categories
        ]);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $lodging = Lodging::create([
                'name' => $request->name,
                'description' => $request->description,
                'star_rating' => $request->star_rating,
                'address_1' => $request->address1,
                'address_2' => $request->address2,
                'linked_city_id' => $request->link_city_id,
                'real_city_id' => $request->real_city_id,
                'email' => $request->email,
                'phone' => $request->phone,
                'check_in' => $request->check_in,
                'check_out' => $request->check_out,
                'lodging_type_id' => $request->type_lodging_id
            ]);

            foreach($request->attributs as $attribut) {
                LodgingAttribut::create([
                    'lodging_id' => $lodging->id,
                    'attribut_term_id' => $attribut
                ]);
            }

            DB::commit();

            return redirect()->route('lodging.index')->with(['success' => 'Votre demande a été traiter avec succès']);
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->route('lodging.index')->with(['error' => 'Une erreur est survenue !']);
        }
    }

    //----------- REooms
    public function lodging_rooms_index($lodging_id)
    {
        $lodging = Lodging::where('id', $lodging_id)->with(['rooms' => function($query){
            $query->select('id','lodging_id', 'reference', 'number');
        }])->first();

        return Inertia::render('Admin/Dashboard/Lodging/RoomList', [
            'lodging' => $lodging
        ]);
    }

    public function room($room_id)
    {
        $room = LodgingRoom::with('gallery')->findOrFail($room_id);

        $room->gallery = $room->gallery->map(function ($image) {
            $filename = $image->file_name;
            $disk = $image->storage_driver;
            $image->full_url = Storage::disk($disk)->url($filename);
            return $image;
        });

        return response()->json($room);
    }

    public function room_store($lodging_id, Request $request)
    {
        DB::beginTransaction();
        try {
            $room = LodgingRoom::create([
                'reference' => $request->reference,
                'number' => $request->number,
                'lodging_id' => $lodging_id,
                'max_adult' => $request->max_adult,
                'max_child' => $request->max_child,
                'description' => $request->description,
                'surface' => $request->surface,
                'status_id' => 1,
                'price' => $request->price,
                'bed_number' => $request->bed_number
            ]);

            foreach ($request->file('images') as $image) {
                $path = $image->store('', 'room_gallery');
                RoomGallery::create([
                    'file_name' => $path,
                    'mime_type' => $image->getClientMimeType(),
                    'size' => $image->getSize(),
                    'storage_driver' => 'room_gallery',
                    'room_id' => $room->id
                ]);
            }

            DB::commit();

            return redirect()->route('lodging.rooms.index', ['lodging_id' => $lodging_id])->with(['success' => 'Votre demande a été traitée avec succès']);
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->route('lodging.rooms.index', ['lodging_id' => $lodging_id])->with(['error' => 'Une erreur est survenue !']);
        }
    }

    public function room_delete($room_id)
    {
        DB::beginTransaction();
        try {
            $room = LodgingRoom::findOrFail($room_id);
            RoomGallery::where('room_id', $room_id)->delete();
            $room->delete();
            DB::commit();
            return redirect()->route('lodging.rooms.index', ['lodging_id' => $room->lodging_id])->with(['success'=> 'Votre demande a été traiter avec succès']);

        }
        catch (\Exception $e) {
            dd($e);
            DB::rollBack();
            return redirect()->route('lodging.type')->with(['error'=> 'Une erreur est survenue !']);
        }
    }

    //---------- Lodging types
    public function index()
    {
        $query = Lodging::query();
        $query->with('type', 'city.region.country');
        if(request()->has("sort")){
            $sortField = request()->input('sort.field', 'id');
            $sortOrder = request()->input('sort.order', 'asc');
            $query->orderBy($sortField, $sortOrder);
        }

        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);

        return Inertia::render('Admin/Dashboard/Lodging/LodgingList', [
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

    public function type()
    {
        $query = LodgingType::query();

        $sortField = request()->input('sort.created_at', 'id');
        $sortOrder = request()->input('sort.order', 'desc');

        $query->orderBy($sortField, $sortOrder);

        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);

        return Inertia::render('Admin/Dashboard/Lodging/TypeList', [
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

    public function type_select(Request $request)
    {
        $searchTerm = $request->query('search', '');

        $cities = LodgingType::where('name', 'like', '%' . $searchTerm . '%')
        ->select('id', 'name')
        ->orderBy('name')
        ->get();

        return response()->json($cities);
    }

    public function type_store(Request $request)
    {
        try {
            LodgingType::create([
                'name' => $request->input('name'),
            ]);

            return redirect()->route('lodging.type')->with(['success' => 'Votre demande a été traiter avec succès']);
        } catch (\Exception $e) {
            return redirect()->route('lodging.type')->with(['error' => 'Une erreur est survenue !']);
        }
    }

    public function type_delete($id)
    {
        try {
            LodgingType::where('id', $id)->delete();
            return redirect()->route('lodging.type')->with(['success'=> 'Votre demande a été traiter avec succès']);
        }
        catch (\Exception $e) {
            return redirect()->route('lodging.type')->with(['error'=> 'Une erreur est survenue !']);
        }
    }


    //----------- Attribut
    public function attribut_categories()
    {
        $categories  = AttributCategory::all();
        return Inertia::render('Admin/Dashboard/Lodging/AttributList', ['categories'=> $categories]);
    }

    public function attribut_by_categorie($id)
    {
        $query = AttributTerm::query();
        $query->where('attribut_categorie_id', $id);

        $sortField = request()->input('sort.created_at', 'id');
        $sortOrder = request()->input('sort.order', 'desc');

        $query->orderBy($sortField, $sortOrder);

        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);

        return response()->json([
            'props' => [
                'data' => $data->items(),
                'total' => $data->total(),
                'currentPage' => $data->currentPage(),
                'lastPage' => $data->lastPage(),
                'sort' => [
                    'field' => request()->input('sort.field', 'id'),
                    'order' => request()->input('sort.order', 'asc'),
                ],
                'search' => request()->input('search', '')
            ]
        ]);
    }

    public function attribut_store(Request $request)
    {
        try {
            AttributTerm::create([
                'name' => $request->input('name'),
                'attribut_categorie_id' => $request->input('category_id')
            ]);

            return redirect()
            ->route('lodging.attribut')
            ->with(['success' => 'Votre demande a été traitée avec succès']);

        } catch (\Exception $e) {
            return redirect()->route('lodging.attribut')->with(['error' => 'Une erreur est survenue !']);
        }
    }

    public function attribut_delete($id)
    {
        try {
            AttributTerm::where('id', $id)->delete();
            return redirect()->route('lodging.attribut')->with(['success'=> 'Votre demande a été traiter avec succès']);
        }
        catch (\Exception $e) {
            return redirect()->route('lodging.attribut')->with(['error'=> 'Une erreur est survenue !']);
        }
    }

    public function attribut_categorie_store(Request $request)
    {
        try {
            AttributCategory::create([
                'name' => $request->input('name'),
            ]);

            return redirect()->route('lodging.attribut')->with(['success' => 'Votre demande a été traiter avec succès']);
        } catch (\Exception $e) {
            return redirect()->route('lodging.attribut')->with(['error' => 'Une erreur est survenue !']);
        }
    }

    public function attribut_categorie_delete($id)
    {
        try {
            AttributCategory::where('id', $id)->delete();
            return redirect()->route('lodging.attribut')->with(['success'=> 'Votre demande a été traiter avec succès']);
        }
        catch (\Exception $e) {
            return redirect()->route('lodging.attribut')->with(['error'=> 'Une erreur est survenue !']);
        }
    }

    //---------- Equipement
    public function equipement_categories()
    {
        $categories  = EquipementCategory::all();
        return Inertia::render('Admin/Dashboard/Lodging/EquipementList', ['categories'=> $categories]);
    }

    public function equipement_by_categorie($id)
    {
        $query = Equipement::query();
        $query->where('equipement_categorie_id', $id);

        $sortField = request()->input('sort.created_at', 'id');
        $sortOrder = request()->input('sort.order', 'desc');

        $query->orderBy($sortField, $sortOrder);

        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);

        return response()->json([
            'props' => [
                'data' => $data->items(),
                'total' => $data->total(),
                'currentPage' => $data->currentPage(),
                'lastPage' => $data->lastPage(),
                'sort' => [
                    'field' => request()->input('sort.field', 'id'),
                    'order' => request()->input('sort.order', 'asc'),
                ],
                'search' => request()->input('search', '')
            ]
        ]);
    }

    public function equipement_store(Request $request)
    {
        try {
            Equipement::create([
                'name' => $request->input('name'),
                'equipement_categorie_id' => $request->input('category_id')
            ]);

            return redirect()
            ->route('lodging.equipement')
            ->with(['success' => 'Votre demande a été traitée avec succès']);

        } catch (\Exception $e) {
            dd($e);
            return redirect()->route('lodging.equipement')->with(['error' => 'Une erreur est survenue !']);
        }
    }

    public function equipement_delete($id)
    {
        try {
            Equipement::where('id', $id)->delete();
            return redirect()->route('lodging.equipement')->with(['success'=> 'Votre demande a été traiter avec succès']);
        }
        catch (\Exception $e) {
            return redirect()->route('lodging.equipement')->with(['error'=> 'Une erreur est survenue !']);
        }
    }

    public function equipement_categorie_store(Request $request)
    {
        try {
            EquipementCategory::create([
                'name' => $request->input('name'),
            ]);

            return redirect()->route('lodging.equipement')->with(['success' => 'Votre demande a été traiter avec succès']);
        } catch (\Exception $e) {
            return redirect()->route('lodging.equipement')->with(['error' => 'Une erreur est survenue !']);
        }
    }

    public function equipement_categorie_delete($id)
    {
        try {
            EquipementCategory::where('id', $id)->delete();
            return redirect()->route('lodging.equipement')->with(['success'=> 'Votre demande a été traiter avec succès']);
        }
        catch (\Exception $e) {
            return redirect()->route('lodging.equipement')->with(['error'=> 'Une erreur est survenue !']);
        }
    }
}
