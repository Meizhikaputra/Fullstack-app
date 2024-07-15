<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\User;
use App\Services\ProductService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    use AuthorizesRequests;
    protected $productSevice;

    public function __construct(ProductService $productService)
    {
        $this->productSevice = $productService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $this->authorize('viewAny', Product::class);
        $products = Product::orderBy('id', 'DESC')->get();
        return new ProductCollection($products);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {

        $validated = $request->validated();

        if ($request->file('image')) {
            $validated['image'] = $request->file('image')->store('images-product');
        }


        $data = Product::create($validated);
        if ($data) {
            return response()->json([
                'msg' => 'Berhasil menambahkan product baru',
                'data' => $data
            ], 200);
        }

        return response()->json([
            'msg' => 'Gagal menambahkan product baru',

        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product =  Product::find($id);
        return new ProductResource($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $product = Product::find($id);

        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $id)
    {
        $this->authorize('update', Product::class);
        $validated = $request->validated();

        $product = Product::find($id);
        if ($this->isProductChanged($request, $product)) {

            if ($request->file('image')) {
                if ($product->image) {
                    Storage::delete($product->image);
                }

                $validated['image'] = $request->file('image')->store('images-product');
            }

            $product->update($validated);

            return response()->json('berhasil mengubah product');
        }
        return response()->json('Anda tidak mengubah data apapun', 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $this->authorize('delete', Product::class);
        $product = Product::find($id);
        if ($product->image) {
            Storage::delete($product->image);
        }
        if (!$product) {
            return response()->json(['err' => 'Product tidak ada']);
        }
        $product->delete();
        return response()->json([
            'msg' => 'Berhasil menghapus data ' . $product->name
        ]);
    }


    private function isProductChanged($request, $product)
    {
        return (
            $request->name !== $product->name ||
            $request->description !== $product->description ||
            (floatval($request->price) !== floatval($product->price)) ||
            $request->hasFile('image')
        );
    }


    function addProduct(Request $request)
    {
        // 
    }
}
