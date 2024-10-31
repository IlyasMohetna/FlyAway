<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class EmployeEmploye
 * 
 * @property int $id
 * @property int $user_id
 * @property string $firstname
 * @property string $lastname
 * @property int $post_id
 * 
 * @property EmployePost $employe_post
 * @property User $user
 *
 * @package App\Models
 */
class EmployeEmploye extends Model
{
	protected $table = 'employe__employe';
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int',
		'post_id' => 'int'
	];

	protected $fillable = [
		'user_id',
		'firstname',
		'lastname',
		'post_id'
	];

	public function employe_post()
	{
		return $this->belongsTo(EmployePost::class, 'post_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
