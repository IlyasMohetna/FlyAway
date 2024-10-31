<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BusCompany
 * 
 * @property int $id
 * @property string $nom
 * @property string $logo
 * 
 * @property Collection|BusBu[] $bus_bus
 *
 * @package App\Models
 */
class BusCompany extends Model
{
	protected $table = 'bus__companies';
	public $timestamps = false;

	protected $fillable = [
		'nom',
		'logo'
	];

	public function bus_bus()
	{
		return $this->hasMany(BusBu::class, 'bus_company_id');
	}
}
