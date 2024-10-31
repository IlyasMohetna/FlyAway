<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class FlightFlightExperience
 * 
 * @property int $id
 * @property int $flight_id
 * @property int $experience_type_id
 * 
 * @property FlightExperienceType $flight_experience_type
 * @property FlightFlight $flight_flight
 *
 * @package App\Models
 */
class FlightFlightExperience extends Model
{
	protected $table = 'flight__flight_experience';
	public $timestamps = false;

	protected $casts = [
		'flight_id' => 'int',
		'experience_type_id' => 'int'
	];

	protected $fillable = [
		'flight_id',
		'experience_type_id'
	];

	public function flight_experience_type()
	{
		return $this->belongsTo(FlightExperienceType::class, 'experience_type_id');
	}

	public function flight_flight()
	{
		return $this->belongsTo(FlightFlight::class, 'flight_id');
	}
}
