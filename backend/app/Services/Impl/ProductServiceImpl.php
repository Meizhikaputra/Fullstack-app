<?php

namespace App\Services\Impl;

use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductServiceImpl implements ProductService
{
    public function store(Request $request)
    {
        if ($request) {
            if ($request->file('image')) {
                $request['image'] = $request->file('image')->store('product-images');
            }
            $data = Product::create($request);
            return $data;
        }

        return false;
    }
}
