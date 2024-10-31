<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingLodging
 * 
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $star_rating
 * @property string $address_1
 * @property string|null $address_2
 * @property int $linked_city_id
 * @property int $real_city_id
 * @property string $email
 * @property string $phone
 * @property Carbon $check_in
 * @property Carbon $check_out
 * @property int $lodging_type_id
 * 
 * @property ConfigCity $config_city
 * @property LodgingType $lodging_type
 * @property Collection|LodgingAttribut[] $lodging_attributs
 * @property Collection|LodgingRoom[] $lodging_rooms
 * @property Collection|PackagePackageLodging[] $package_package_lodgings
 *
 * @package App\Models
 */
class LodgingLodging extends Model
{
	protected $table = 'lodging__lodging';
	public $timestamps = false;

	protected $casts = [
		'linked_city_id' => 'int',
		'real_city_id' => 'int',
		'check_in' => 'datetime',
		'check_out' => 'datetime',
		'lodging_type_id' => 'int'
	];

	protected $fillable = [
		'name',
		'description',
		'star_rating',
		'address_1',
		'address_2',
		'linked_city_id',
		'real_city_id',
		'email',
		'phone',
		'check_in',
		'check_out',
		'lodging_type_id'
	];

	public function config_city()
	{
		return $this->belongsTo(ConfigCity::class, 'real_city_id');
	}

	public function lodging_type()
	{
		return $this->belongsTo(LodgingType::class, 'lodging_type_id');
	}

	public function lodging_attributs()
	{
		return $this->hasMany(LodgingAttribut::class, 'lodging_id');
	}

	public function lodging_rooms()
	{
		return $this->hasMany(LodgingRoom::class, 'lodging_id');
	}

	public function package_package_lodgings()
	{
		return $this->hasMany(PackagePackageLodging::class, 'lodging_mode_id');
	}
}
