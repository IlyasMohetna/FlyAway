<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class FlightTicket
 * 
 * @property int $id
 * @property float $price
 * @property string $ticket_number
 * @property string $seat_number
 * @property int $baggage_checkin
 * @property int $baggage_cabin
 * @property int $flight_id
 * @property int $passenger_type_id
 * @property int $seat_type_id
 * 
 * @property FlightFlight $flight_flight
 * @property FlightPassengerType $flight_passenger_type
 * @property FlightSeatType $flight_seat_type
 *
 * @package App\Models
 */
class FlightTicket extends Model
{
	protected $table = 'flight__ticket';
	public $timestamps = false;

	protected $casts = [
		'price' => 'float',
		'baggage_checkin' => 'int',
		'baggage_cabin' => 'int',
		'flight_id' => 'int',
		'passenger_type_id' => 'int',
		'seat_type_id' => 'int'
	];

	protected $fillable = [
		'price',
		'ticket_number',
		'seat_number',
		'baggage_checkin',
		'baggage_cabin',
		'flight_id',
		'passenger_type_id',
		'seat_type_id'
	];

	public function flight_flight()
	{
		return $this->belongsTo(FlightFlight::class, 'flight_id');
	}

	public function flight_passenger_type()
	{
		return $this->belongsTo(FlightPassengerType::class, 'passenger_type_id');
	}

	public function flight_seat_type()
	{
		return $this->belongsTo(FlightSeatType::class, 'seat_type_id');
	}
}
