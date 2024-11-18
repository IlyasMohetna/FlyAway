<?php

namespace App\Models\PAYMENT;

use App\Models\Client\Client;
use App\Models\PACKAGE\Booking;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = 'payment__payment';
    protected $guarded = [];

    public function paymentable()
    {
        return $this->morphTo();
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id', 'id');
    }

    public function primaryInvoice()
    {
        return $this->hasOne(Invoice::class,'payment_id','id');
    }
}
