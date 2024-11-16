<?php
namespace App\Models\PACKAGE;

use App\Models\Client\Client;
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
}
