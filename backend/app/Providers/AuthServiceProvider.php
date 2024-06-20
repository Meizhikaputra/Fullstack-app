<?php

namespace App\Providers;

use App\Models\Product;
use App\Policies\ProductPolicy;
use App\Services\AuthService;
use App\Services\Impl\AuthServiceImpl;
use Illuminate\Contracts\Support\DeferrableProvider;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider implements DeferrableProvider
{
    public array $singletons = [
        AuthService::class => AuthServiceImpl::class
    ];

    public function provides(): array
    {
        return [
            AuthService::class
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
