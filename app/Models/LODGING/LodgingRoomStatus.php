<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingRoomStatus
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|LodgingRoom[] $lodging_rooms
 *
 * @package App\Models
 */
class LodgingRoomStatus extends Model
{
	protected $table = 'lodging__room_status';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function lodging_rooms()
	{
		return $this->hasMany(LodgingRoom::class, 'status_id');
	}
}
