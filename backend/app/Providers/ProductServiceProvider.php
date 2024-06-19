<?php

namespace App\Providers;

use App\Services\Impl\ProductServiceImpl;
use App\Services\ProductService;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class ProductServiceProvider extends ServiceProvider implements DeferrableProvider
{
    public array $singletons = [
        ProductService::class => ProductServiceImpl::class
    ];

    public function provides(): array
    {
        return [
            ProductService::class
        ];
    }
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
