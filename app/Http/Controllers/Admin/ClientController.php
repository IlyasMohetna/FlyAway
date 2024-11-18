<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Client\Client;
use App\Http\Controllers\Controller;

class ClientController extends Controller
{
    public function client_index()
    {
        $query = Client::query();
        $query->with('user', 'city');
        if(request()->has("sort")){
            $sortField = request()->input('sort.field', 'id');
            $sortOrder = request()->input('sort.order', 'asc');
            $query->orderBy($sortField, $sortOrder);
        }

        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);

        return Inertia::render('Admin/Dashboard/Client/ClientList', [
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

    public function toggle_active($id)
    {
        try{
            User::where('id', $id)->update(['active' => request()->active]);
            return response()->json(['message' => 'User active status updated successfully.']);
        }catch(\Exception $e){
            return response()->json(['message' => 'User not found for the given client.'], 404);

        }
    }
}
