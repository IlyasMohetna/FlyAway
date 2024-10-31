<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingEquipementCategory
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|LodgingEquipement[] $lodging_equipements
 *
 * @package App\Models
 */
class LodgingEquipementCategory extends Model
{
	protected $table = 'lodging__equipement_categories';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function lodging_equipements()
	{
		return $this->hasMany(LodgingEquipement::class, 'equipement_categorie_id');
	}
}
