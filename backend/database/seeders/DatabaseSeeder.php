<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create(); 
        Product::factory(50)->create();

        User::factory()->create([
            'name' => 'Meizhika',
            'email' => 'mei@gmail.com',
            'password' => 'password'
        ]);
        User::factory()->create([
            'name' => 'udin',
            'email' => 'udin @gmail.com',
            'password' => 'password'
        ]);
    }
}
