<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TrainSeatType
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|TrainTicket[] $train_tickets
 *
 * @package App\Models
 */
class TrainSeatType extends Model
{
	protected $table = 'train__seat_types';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function train_tickets()
	{
		return $this->hasMany(TrainTicket::class, 'seat_type_id');
	}
}
