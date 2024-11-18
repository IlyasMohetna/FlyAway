<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Models\Client\Client;
use App\Models\CONFIG\Country;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class ClientController extends Controller
{
    public function client_index()
    {
        $query = Client::query();
        $countries = Country::all();
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
            'countries' => $countries,
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

    public function store()
    {
        DB::beginTransaction();

        try {
            $generatedPassword = Str::random(10);

            $user = User::create([
                'firstname' => request()->firstname,
                'lastname' => request()->lastname,
                'email' => request()->email,
                'password' => Hash::make($generatedPassword),
            ]);

            Client::create([
                'user_id' => $user->id,
                'phone' => request()->phone,
                'address_1' => request()->address_1,
                'address_2' => request()->address_2,
                'city_id' => request()->city_id,
            ]);

            DB::commit();

            return Redirect::back()->with([
                'success' => "Votre compte a été créé avec succès. Un mot de passe temporaire vous a été envoyé par email.",
            ]);

        } catch (\Exception $e) {
            dd($e);
            return Redirect::back()->with('error', 'Une erreur est survenue. Veuillez réessayer.');
        }
    }
}
