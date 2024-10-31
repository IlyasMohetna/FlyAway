<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingEquipement
 * 
 * @property int $id
 * @property string $nom
 * @property int $equipement_categorie_id
 * 
 * @property LodgingEquipementCategory $lodging_equipement_category
 * @property Collection|LodgingRoomEquipement[] $lodging_room_equipements
 *
 * @package App\Models
 */
class LodgingEquipement extends Model
{
	protected $table = 'lodging__equipement';
	public $timestamps = false;

	protected $casts = [
		'equipement_categorie_id' => 'int'
	];

	protected $fillable = [
		'nom',
		'equipement_categorie_id'
	];

	public function lodging_equipement_category()
	{
		return $this->belongsTo(LodgingEquipementCategory::class, 'equipement_categorie_id');
	}

	public function lodging_room_equipements()
	{
		return $this->hasMany(LodgingRoomEquipement::class, 'equipement_id');
	}
}
