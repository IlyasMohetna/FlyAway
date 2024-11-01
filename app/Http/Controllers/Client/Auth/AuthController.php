<?php

namespace App\Http\Controllers\Client\Auth;
use Exception;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Client\Client;
use App\Models\CONFIG\Country;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\Client\StoreClientRequest;


class AuthController extends Controller
{
    public function show_login()
    {
        return Inertia::render("Client/Auth/Login");
    }

    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('dashboard');
        }

        return back()->withErrors([
            'general' => 'Les informations fournies ne correspondent pas à nos enregistrements.',
        ])->onlyInput('email');
    }

    public function show_register()
    {
        $countries = Country::all();
        return Inertia::render("Client/Auth/Register", ["countries" => $countries]);
    }

    public function register(StoreClientRequest $request)
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Auth::login($user);

            Client::create([
                'user_id' => $user->id,
                'phone' => $request->phone,
                'address_1' => $request->address_1,
                'address_2' => $request->address_2 ?? null,
                'city_id' => $request->city_id,
            ]);

            DB::commit();

            return Redirect::route('client.dashboard.show')->with([
                'success' => "Votre compte a été créer avec succès"
            ]);

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Registration failed: ' . $e->getMessage());
            return Redirect::back()->with('error', 'An error occurred. Please try again.');
        }
    }
}
