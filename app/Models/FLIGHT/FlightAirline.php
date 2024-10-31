<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FlightAirline
 * 
 * @property int $id
 * @property string $name
 * @property string $logo
 * 
 * @property Collection|FlightFlight[] $flight_flights
 *
 * @package App\Models
 */
class FlightAirline extends Model
{
	protected $table = 'flight__airline';
	public $timestamps = false;

	protected $fillable = [
		'name',
		'logo'
	];

	public function flight_flights()
	{
		return $this->hasMany(FlightFlight::class, 'airline_id');
	}
}
