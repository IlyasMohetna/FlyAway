<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FlightSeatType
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|FlightTicket[] $flight_tickets
 *
 * @package App\Models
 */
class FlightSeatType extends Model
{
	protected $table = 'flight__seat_types';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function flight_tickets()
	{
		return $this->hasMany(FlightTicket::class, 'seat_type_id');
	}
}
