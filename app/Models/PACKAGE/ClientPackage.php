<?php
namespace App\Models\PACKAGE;

use App\Models\Client\Client;
use Illuminate\Database\Eloquent\Model;

class ClientPackage extends Model
{
	protected $table = 'package__client_package';
	public $timestamps = false;

	protected $guarded = [];

    public function client()
    {
        return $this->hasOne(Client::class,'id','client_id');
    }
}
