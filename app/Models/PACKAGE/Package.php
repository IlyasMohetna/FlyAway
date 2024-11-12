<?php

namespace App\Models\PACKAGE;

use App\Models\CONFIG\City;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
	protected $table = 'package__package';
	protected $guarded = [];

    public function type()
    {
        return $this->hasOne(PackageType::class, 'id', 'package_type_id');
    }

    public function city()
    {
        return $this->hasOne(City::class, 'id', 'destination_id');
    }
}
