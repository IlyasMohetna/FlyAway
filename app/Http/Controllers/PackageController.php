<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\PACKAGE\Package;
use App\Models\PACKAGE\PackageGallery;
use Illuminate\Support\Facades\DB;

class PackageController extends Controller
{
    // Package list
    public function index()
    {
        $query = Package::query();
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
                'package_type_id' => $request->package_type_id,
                'destination_id' => $request->destination_id
            ]);

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

            DB::commit();

            return redirect()->route('package.index')->with(['success' => 'Votre demande a été traitée avec succès']);
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('package.index')->with(['error' => 'Une erreur est survenue !']);
        }
    }
}
