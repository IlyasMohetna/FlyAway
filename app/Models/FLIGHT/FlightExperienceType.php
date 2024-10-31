<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class FlightExperienceType
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|FlightFlightExperience[] $flight_flight_experiences
 *
 * @package App\Models
 */
class FlightExperienceType extends Model
{
	protected $table = 'flight__experience_types';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function flight_flight_experiences()
	{
		return $this->hasMany(FlightFlightExperience::class, 'experience_type_id');
	}
}
