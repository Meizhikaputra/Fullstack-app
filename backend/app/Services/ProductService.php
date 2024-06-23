<?php

namespace App\Services;

use Illuminate\Http\Request;

interface ProductService
{
    function store(Request $product);
}
