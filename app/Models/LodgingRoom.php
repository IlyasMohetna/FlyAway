<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingRoom
 * 
 * @property int $id
 * @property string $room_reference
 * @property int $numero_chambre
 * @property int $lodging_id
 * @property int $max_adult
 * @property int $max_enfant
 * @property string $description
 * @property float $surface
 * @property int $status_id
 * @property float $prix
 * @property int $nombre_lit
 * 
 * @property LodgingLodging $lodging_lodging
 * @property LodgingRoomStatus $lodging_room_status
 * @property Collection|LodgingRoomEquipement[] $lodging_room_equipements
 * @property Collection|LodgingRoomGallery[] $lodging_room_galleries
 *
 * @package App\Models
 */
class LodgingRoom extends Model
{
	protected $table = 'lodging__room';
	public $timestamps = false;

	protected $casts = [
		'numero_chambre' => 'int',
		'lodging_id' => 'int',
		'max_adult' => 'int',
		'max_enfant' => 'int',
		'surface' => 'float',
		'status_id' => 'int',
		'prix' => 'float',
		'nombre_lit' => 'int'
	];

	protected $fillable = [
		'room_reference',
		'numero_chambre',
		'lodging_id',
		'max_adult',
		'max_enfant',
		'description',
		'surface',
		'status_id',
		'prix',
		'nombre_lit'
	];

	public function lodging_lodging()
	{
		return $this->belongsTo(LodgingLodging::class, 'lodging_id');
	}

	public function lodging_room_status()
	{
		return $this->belongsTo(LodgingRoomStatus::class, 'status_id');
	}

	public function lodging_room_equipements()
	{
		return $this->hasMany(LodgingRoomEquipement::class, 'room_id');
	}

	public function lodging_room_galleries()
	{
		return $this->hasMany(LodgingRoomGallery::class, 'room_id');
	}
}
