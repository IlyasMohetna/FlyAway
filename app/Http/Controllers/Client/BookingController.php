<?php

namespace App\Http\Controllers\Client;

use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Client\Client;
use App\Models\PACKAGE\Booking;
use App\Models\PACKAGE\Package;
use App\Models\PAYMENT\Invoice;
use App\Models\PAYMENT\Payment;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\PAYMENT\CreditCard;
use Illuminate\Support\Facades\DB;
use App\Models\PAYMENT\BankAccount;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Models\PACKAGE\TransportationMode;

class BookingController extends Controller
{
    public function index_show(Request $request)
    {
        $package = Package::with('city', 'transportations.transport', 'lodgings.lodging.type')->find($request->package_id);
        $transportation_modes = TransportationMode::all();
        return Inertia::render('Landing/Booking/BookingMake', [
            'apackage' => $package,
            'transportation_modes' => $transportation_modes
        ]);
    }

    public function store(Request $request)
    {
        DB::beginTransaction();
        try{
            $package = Package::find($request->package_id);
            //-------- Store user payment method
            $expiration_date_exploded = explode('/', $request->card_expiration);

            if($request->payment_method == 'credit_card'){
                $paymentable = CreditCard::create([
                    'cardholder_name' => $request->full_name,
                    'card_number' => $request->card_number,
                    'expiration_month' => $expiration_date_exploded[0],
                    'expiration_year' => $expiration_date_exploded[1],
                    'cvv' => $request->cvv,
                    'client_id' => auth()->user()->client->id
                ]);
            }else if($request->payment_method == 'bank_account'){
                $paymentable = BankAccount::create([
                    'bic' => $request->bic,
                    'iban' => $request->iban,
                    'client_id' => auth()->user()->client->id
                ]);
            }else{
                dd('There was an error');
            }

            //-------- Store Booking

            $start_date = Carbon::parse($request->start_date);
            $end_date = Carbon::parse($request->end_date);

            $booking = Booking::create([
                'start_date' => $start_date,
                'end_date' => $end_date,
                'quantity' => $request->nbPersons,
                'package_id' => $request->package_id,
                'transportation_mode_id' => $request->transportation_mode,
                'lodging_mode_id' => $request->lodging_option,
                'client_id' => auth()->user()->client->id
            ]);

            //--------- Store Payment

            $payment = Payment::create([
                'amount' => ($package->amount_ttc * $request->nbPersons),
                'booking_id' => $booking->id,
                'status_id' => 1,
                'paymentable_type' => get_class($paymentable),
                'paymentable_id' => $paymentable->id,
            ]);

            //--------- Generate Invoice
            DB::commit();

            $success = [
                'date' => Carbon::now()->format('d/m/Y'),
                'payment_method' => get_class($paymentable),
                'name' => auth()->user()->firstname.' '.auth()->user()->lastname,
                'address' => auth()->user()->client->address_1,
                'phone' => auth()->user()->client->phone,
            ];

            return Inertia::render('Landing/Booking/BookingSuccess', [
                'success' => $success
            ]);

            //---------- Store Payment
        }catch(\Exception $e){
            DB::rollBack();
            dd($e->getMessage());
        }
    }

    public function generateInvoice($id)
    {
        $payment = Payment::with('paymentable', 'booking.client.city.region.country', 'booking.client.user', 'booking.package.city.region.country')->findOrFail($id)->toArray();
        $pdf = Pdf::loadView('invoice', ['payment' => $payment]);

        $pdfContent = $pdf->output();
        $fileName = 'invoice_' . uniqid() . '.pdf';

        Storage::disk('invoice')->put($fileName, $pdfContent);

        Invoice::create([
            'file_name' => $fileName,
            'mime_type' => 'application/pdf',
            'size' => strlen($pdfContent),
            'storage_driver' => 'invoice',
            'payment_id' => $id
        ]);
    }
}
