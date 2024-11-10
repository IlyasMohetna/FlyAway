<?php

namespace App\Http\Controllers;

use App\Models\LODGING\Lodging;
use App\Models\LODGING\LodgingType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LodgingController extends Controller
{
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
}
