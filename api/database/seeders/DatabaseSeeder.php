<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Feature;
use App\Models\Variant;
use App\Models\Subcategory;
use App\Models\Cart;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Item;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->count(10)->create();

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password is password
            'roles' => 'admin',
        ]);


        // Create 5 categorie instances
         //with 5 souscategorie instances each
        // and 5 article instances each
        // total : 5*5*5 = 125 instances
        Category::factory()
            ->count(5)
            ->has(Subcategory::factory()
                    ->count(5)
                    ->hasArticles(5)
            )
            ->create();

        // // Create 100 Shopping Cart instances
        // Cart::factory()
        //     ->count(100)
        //     ->create();

        Feature::factory()
            ->count(10)
            ->has(Variant::factory()
                    ->count(3)
            )
            ->create();

        // // Create 100 Item instances
        // Item::factory()
        //     ->count(100)
        //     ->create();

        // populate pivot table
        $items = Item::all("id");
        $variants = Variant::all("id");
        $items->each(function ($item) use ($variants) {
            $item->variants()->attach(
                $variants->random(rand(1, 3))->pluck('id')->toArray()
            );
        });

        //create a cart for user with the id eleven
        $user = User::find(11);
        $cart = Cart::create([
            'user_id' => $user->id,
        ]);

        //create 3 items for the cart
        $cart->items()->create([
            'article_id' => 1,
            'quantity' => 1,
        ]);

        $cart->items()->create([
            'article_id' => 2,
            'quantity' => 2,
        ]);

        $cart->items()->create([
            'article_id' => 3,
            'quantity' => 3,
        ]);

        //create 3 variants for the cart for the first item
        $cart->items()->find(3, "id")->variants()->attach([1,4,7]);


        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}



