<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingRoomGallery
 * 
 * @property int $id
 * @property string $file_name
 * @property string $mime_type
 * @property int $size
 * @property string $storage_driver
 * @property int $room_id
 * 
 * @property LodgingRoom $lodging_room
 *
 * @package App\Models
 */
class LodgingRoomGallery extends Model
{
	protected $table = 'lodging__room_gallery';
	public $timestamps = false;

	protected $casts = [
		'size' => 'int',
		'room_id' => 'int'
	];

	protected $fillable = [
		'file_name',
		'mime_type',
		'size',
		'storage_driver',
		'room_id'
	];

	public function lodging_room()
	{
		return $this->belongsTo(LodgingRoom::class, 'room_id');
	}
}
