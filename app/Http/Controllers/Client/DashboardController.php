<?php

namespace App\Http\Controllers\Client;

use App\Models\Client\ClientFidelity;
use Inertia\Inertia;
use App\Models\PACKAGE\Booking;
use App\Models\PAYMENT\Payment;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function bookings_list()
    {
        $query = Booking::query()->where('client_id', auth()->user()->client->id);
        $query->with('lodging', 'transportation','package.steps');
        $query->orderBy('created_at', 'desc');

        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);

        $bookings = $data->map(function ($booking) {
            if ($booking->package && $booking->package->steps) {
                $booking->package->grouped_steps = $booking->package->steps->groupBy('day');
            } else {
                $booking->package->grouped_steps = collect([]);
            }
            return $booking;
        });

        return Inertia::render('Client/Dashboard/Booking/BookingList', [
            'data' => $bookings,
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

    public function fidelity_list()
    {
        $query = ClientFidelity::query()->where('client_id', auth()->user()->client->id);
        $query->orderBy('created_at', 'desc');

        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);

        return Inertia::render('Client/Dashboard/Fidelity/FidelityList', [
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


    public function payments_list()
    {
        $query = Payment::query();
        $query->whereHas('booking', function($query){
            $query->where('client_id', auth()->user()->client->id);
        });
        $query->with('paymentable', 'primaryInvoice');
        $query->orderBy('created_at', 'desc');


        if (request()->filled('search')) {
            $query->where('column_name', 'like', '%' . request()->input('search') . '%');
        }

        $data = $query->paginate(10);

        return Inertia::render('Client/Dashboard/Payment/PaymentList', [
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
}
