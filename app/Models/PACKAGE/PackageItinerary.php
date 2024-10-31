<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PackageItinerary
 * 
 * @property int $id
 * @property string $titre
 * @property int $jour
 * @property int $package_id
 * 
 * @property PackagePackage $package_package
 * @property Collection|PackageItineraryStep[] $package_itinerary_steps
 *
 * @package App\Models
 */
class PackageItinerary extends Model
{
	protected $table = 'package__itinerary';
	public $timestamps = false;

	protected $casts = [
		'jour' => 'int',
		'package_id' => 'int'
	];

	protected $fillable = [
		'titre',
		'jour',
		'package_id'
	];

	public function package_package()
	{
		return $this->belongsTo(PackagePackage::class, 'package_id');
	}

	public function package_itinerary_steps()
	{
		return $this->hasMany(PackageItineraryStep::class, 'id_itinerary');
	}
}
