<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FlightAirportType
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|FlightAirport[] $flight_airports
 *
 * @package App\Models
 */
class FlightAirportType extends Model
{
	protected $table = 'flight__airport_type';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function flight_airports()
	{
		return $this->hasMany(FlightAirport::class, 'type_id');
	}
}
