<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FlightFlight
 * 
 * @property int $id
 * @property string $description
 * @property Carbon $departure_time
 * @property Carbon $arrival_time
 * @property int $departure_airport
 * @property int $arrival_airport
 * @property int $airline_id
 * 
 * @property FlightAirline $flight_airline
 * @property FlightAirport $flight_airport
 * @property Collection|FlightFlightExperience[] $flight_flight_experiences
 * @property Collection|FlightTicket[] $flight_tickets
 *
 * @package App\Models
 */
class FlightFlight extends Model
{
	protected $table = 'flight__flight';
	public $timestamps = false;

	protected $casts = [
		'departure_time' => 'datetime',
		'arrival_time' => 'datetime',
		'departure_airport' => 'int',
		'arrival_airport' => 'int',
		'airline_id' => 'int'
	];

	protected $fillable = [
		'description',
		'departure_time',
		'arrival_time',
		'departure_airport',
		'arrival_airport',
		'airline_id'
	];

	public function flight_airline()
	{
		return $this->belongsTo(FlightAirline::class, 'airline_id');
	}

	public function flight_airport()
	{
		return $this->belongsTo(FlightAirport::class, 'departure_airport');
	}

	public function flight_flight_experiences()
	{
		return $this->hasMany(FlightFlightExperience::class, 'flight_id');
	}

	public function flight_tickets()
	{
		return $this->hasMany(FlightTicket::class, 'flight_id');
	}
}
