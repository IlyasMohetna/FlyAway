<?php
namespace App\Models\PACKAGE;

use App\Models\Client\Client;
use App\Models\LODGING\Lodging;
use App\Models\PAYMENT\Payment;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
	protected $table = 'package__booking';
	protected $guarded = [];

    public function package()
    {
        return $this->belongsTo(Package::class, 'package_id', 'id');
    }

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id', 'id');
    }

    public function lodging()
    {
        return $this->hasOne(Lodging::class, 'id', 'lodging_mode_id');
    }

    public function transportation()
    {
        return $this->hasOne(TransportationMode::class, 'id', 'transportation_mode_id');
    }

    public function primaryPayment()
    {
        return $this->hasOne(Payment::class,'booking_id', 'id');
    }
}
