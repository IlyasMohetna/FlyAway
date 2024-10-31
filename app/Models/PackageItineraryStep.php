<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class PackageItineraryStep
 * 
 * @property int $id
 * @property string $title
 * @property string $description
 * @property int $day
 * @property int $rank
 * @property int $id_itinerary
 * 
 * @property PackageItinerary $package_itinerary
 *
 * @package App\Models
 */
class PackageItineraryStep extends Model
{
	protected $table = 'package__itinerary_step';
	public $timestamps = false;

	protected $casts = [
		'day' => 'int',
		'rank' => 'int',
		'id_itinerary' => 'int'
	];

	protected $fillable = [
		'title',
		'description',
		'day',
		'rank',
		'id_itinerary'
	];

	public function package_itinerary()
	{
		return $this->belongsTo(PackageItinerary::class, 'id_itinerary');
	}
}
