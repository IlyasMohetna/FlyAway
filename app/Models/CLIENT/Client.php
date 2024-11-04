<?php
namespace App\Models\Client;

use App\Models\CONFIG\City;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

class Client extends Model
{
	protected $table = 'client__client';
	protected $guarded = [];

	/**
	 * Get the city linked to the client
	 */
	public function city(){
		return $this->belongsTo(City::class, 'city_id');
	}
}
