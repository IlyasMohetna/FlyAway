<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FlightAirport
 * 
 * @property int $id
 * @property string $iata_code
 * @property string $name
 * @property float $latitude
 * @property float $longitude
 * @property int $city_id
 * @property int $type_id
 * 
 * @property ConfigCity $config_city
 * @property FlightAirportType $flight_airport_type
 * @property Collection|FlightFlight[] $flight_flights
 *
 * @package App\Models
 */
class FlightAirport extends Model
{
	protected $table = 'flight__airport';
	public $timestamps = false;

	protected $casts = [
		'latitude' => 'float',
		'longitude' => 'float',
		'city_id' => 'int',
		'type_id' => 'int'
	];

	protected $fillable = [
		'iata_code',
		'name',
		'latitude',
		'longitude',
		'city_id',
		'type_id'
	];

	public function config_city()
	{
		return $this->belongsTo(ConfigCity::class, 'city_id');
	}

	public function flight_airport_type()
	{
		return $this->belongsTo(FlightAirportType::class, 'type_id');
	}

	public function flight_flights()
	{
		return $this->hasMany(FlightFlight::class, 'departure_airport');
	}
}
