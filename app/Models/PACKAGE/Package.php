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

    public function thumbnail()
    {
        return $this->hasOne(PackageGallery::class, 'package_id', 'id');
    }

    public function gallery()
    {
        return $this->hasMany(PackageGallery::class, 'package_id', 'id');
    }

    public function steps()
    {
        return $this->hasMany(ItineraryStep::class, 'package_id', 'id');
    }

    public function transportations()
    {
        return $this->hasMany(PackageTransport::class, 'package_id', 'id');
    }

    public function lodgings()
    {
        return $this->hasMany(PackageLodging::class, 'package_id', 'id');
    }

    public function linked()
    {
        return $this->hasMany(ClientPackage::class, 'package_id', 'id');
    }

    public function clientPackages()
    {
        return $this->hasMany(ClientPackage::class,'package_id', 'id');
    }
}
