<?php
namespace App\Models\Client;

use App\Models\User;
use App\Models\CONFIG\City;
use App\Models\PACKAGE\ClientPackage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Client extends Model
{
    use HasFactory;
	protected $table = 'client__client';
	protected $guarded = [];

	/**
	 * Get the city linked to the client
	 */

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

	public function city(){
		return $this->belongsTo(City::class, 'city_id');
	}

    public function packages()
    {
        return $this->hasMany(ClientPackage::class, 'client_id', 'id');
    }
}
