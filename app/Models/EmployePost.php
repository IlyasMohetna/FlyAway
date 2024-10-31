<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EmployePost
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|EmployeEmploye[] $employe_employes
 *
 * @package App\Models
 */
class EmployePost extends Model
{
	protected $table = 'employe__post';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function employe_employes()
	{
		return $this->hasMany(EmployeEmploye::class, 'post_id');
	}
}
