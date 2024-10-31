<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingRoomEquipement
 * 
 * @property int $id
 * @property int $equipement_id
 * @property int $room_id
 * @property bool $active
 * 
 * @property LodgingEquipement $lodging_equipement
 * @property LodgingRoom $lodging_room
 *
 * @package App\Models
 */
class LodgingRoomEquipement extends Model
{
	protected $table = 'lodging__room_equipement';
	public $timestamps = false;

	protected $casts = [
		'equipement_id' => 'int',
		'room_id' => 'int',
		'active' => 'bool'
	];

	protected $fillable = [
		'equipement_id',
		'room_id',
		'active'
	];

	public function lodging_equipement()
	{
		return $this->belongsTo(LodgingEquipement::class, 'equipement_id');
	}

	public function lodging_room()
	{
		return $this->belongsTo(LodgingRoom::class, 'room_id');
	}
}
