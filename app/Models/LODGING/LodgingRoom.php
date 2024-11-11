<?php

namespace App\Models\LODGING;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class LodgingRoom extends Model
{
	protected $table = 'lodging__room';
	protected $guarded = [];

    public function gallery()
    {
        return $this->hasMany(RoomGallery::class, 'room_id', 'id');
    }
}
