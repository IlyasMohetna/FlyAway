<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingType
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|LodgingLodging[] $lodging_lodgings
 *
 * @package App\Models
 */
class LodgingType extends Model
{
	protected $table = 'lodging__type';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function lodging_lodgings()
	{
		return $this->hasMany(LodgingLodging::class, 'lodging_type_id');
	}
}
