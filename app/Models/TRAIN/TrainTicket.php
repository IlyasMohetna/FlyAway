<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class TrainTicket
 * 
 * @property int $id
 * @property float $price
 * @property string $ticket_number
 * @property string $seat_number
 * @property int $train_id
 * @property int $seat_type_id
 * 
 * @property TrainSeatType $train_seat_type
 * @property TrainTrain $train_train
 *
 * @package App\Models
 */
class TrainTicket extends Model
{
	protected $table = 'train__ticket';
	public $timestamps = false;

	protected $casts = [
		'price' => 'float',
		'train_id' => 'int',
		'seat_type_id' => 'int'
	];

	protected $fillable = [
		'price',
		'ticket_number',
		'seat_number',
		'train_id',
		'seat_type_id'
	];

	public function train_seat_type()
	{
		return $this->belongsTo(TrainSeatType::class, 'seat_type_id');
	}

	public function train_train()
	{
		return $this->belongsTo(TrainTrain::class, 'train_id');
	}
}
