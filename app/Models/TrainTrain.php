<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TrainTrain
 * 
 * @property int $id
 * @property int $departure_station
 * @property int $arrival_station
 * @property Carbon $departure_time
 * @property Carbon $arrival_time
 * @property int $train_company_id
 * 
 * @property TrainStation $train_station
 * @property TrainCompany $train_company
 * @property Collection|TrainTicket[] $train_tickets
 *
 * @package App\Models
 */
class TrainTrain extends Model
{
	protected $table = 'train__train';
	public $timestamps = false;

	protected $casts = [
		'departure_station' => 'int',
		'arrival_station' => 'int',
		'departure_time' => 'datetime',
		'arrival_time' => 'datetime',
		'train_company_id' => 'int'
	];

	protected $fillable = [
		'departure_station',
		'arrival_station',
		'departure_time',
		'arrival_time',
		'train_company_id'
	];

	public function train_station()
	{
		return $this->belongsTo(TrainStation::class, 'departure_station');
	}

	public function train_company()
	{
		return $this->belongsTo(TrainCompany::class, 'train_company_id');
	}

	public function train_tickets()
	{
		return $this->hasMany(TrainTicket::class, 'train_id');
	}
}
