<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TrainCompany
 * 
 * @property int $id
 * @property string $nom
 * @property string $logo
 * 
 * @property Collection|TrainTrain[] $train_trains
 *
 * @package App\Models
 */
class TrainCompany extends Model
{
	protected $table = 'train__companies';
	public $timestamps = false;

	protected $fillable = [
		'nom',
		'logo'
	];

	public function train_trains()
	{
		return $this->hasMany(TrainTrain::class, 'train_company_id');
	}
}
