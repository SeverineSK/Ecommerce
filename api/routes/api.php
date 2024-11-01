<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\SubCategoryController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\OrderController;
use App\Models\Article;
use Illuminate\Support\Facades\Route;
use Stripe\Stripe;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Routes liées à l'authentification
Route::controller(UserController::class)->group(function () {

    Route::post('/register', 'register');
    Route::post('/login', 'login');

    Route::middleware("auth:sanctum")->group(function () {
        Route::get('/user', 'getUser');
        Route::post('/logout', 'logout');

        // Route::patch('/update', 'update')->name('update');
        // Route::delete('/delete', 'destroy')->name('destroy');
    });
});

// Routes liées aux articles
Route::controller(ArticleController::class)->group(function () {
    Route::get('/article', 'index');
    Route::get('/article/search', 'SearchArticle');
    Route::get('/article/{identifier}', 'show');

Route::middleware('auth:sanctum')->middleware('admin')->group(function () {
    Route::post('/article', 'store');
    Route::patch('/article/{id}', 'update');
    Route::delete('/article/{id}', 'destroy');
    });
});



// Routes liées aux catégories
Route::controller(CategoryController::class)->group(function () {
    Route::get('/category', 'index');
    Route::get('/category/{identifier}', 'show');

    Route::middleware('auth:sanctum')->middleware('admin')->group(function () {
        Route::post('/category', 'store');
        Route::patch('/category/{category}', 'update');
        Route::delete('/category/{category}', 'destroy');
    });
});

// Routes liées aux sous-catégories
Route::controller(SubCategoryController::class)->group(function () {
    Route::get('/subcategory', 'index');
    Route::get('/subcategory/{identifier}', 'show');

    Route::middleware('auth:sanctum')->middleware('admin')->group(function () {
        Route::post('/subcategory', 'store');
        Route::patch('/subcategory/{subcategory}', 'update');
        Route::delete('/subcategory/{subcategory}', 'destroy');
    });
});

//Routes liées aux commandes
Route::controller(OrderController::class)->group(function () {
    Route::get('/order', 'index');
    Route::get('/order/{order}', 'show');
    Route::post('/order', 'store');

//    Route::middleware('auth:sanctum')->middleware('admin')->group(function () {
//        Route::patch('/order/{order}', 'update');
//        Route::delete('/order/{order}', 'destroy');
//    });
});

//Routes liées aux carts
Route::controller(CartController::class)->middleware('auth:sanctum')->group(function () {
    Route::get('/cart', 'index');
    Route::post('/cart', 'store');

    Route::patch('/cart/{cart}', 'update');
    Route::delete('/cart/{cart}', 'destroy');
});

// Routes liées au paiement
    Route::post('/create-payment-session', [PaymentController::class, 'createPaymentSession']);
    
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/comment/{article}', [CommentController::class, 'store']);
    //Route::delete('/cart/{cart}', [CommentController::class, 'destroy']);
});
