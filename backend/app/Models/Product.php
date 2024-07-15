<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];



    public function users()
    {
        return $this->belongsToMany(User::class, 'carts', 'product_id', 'user_id')
            ->withPivot('quantity')
            ->withTimestamps();
    }
}
