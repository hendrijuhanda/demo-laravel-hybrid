<?php

use Illuminate\Support\Facades\Route;
use Modules\Transaction\Http\Controllers\BalanceController;
use Modules\Transaction\Http\Controllers\TransactionController;

/*
 *--------------------------------------------------------------------------
 * API Routes
 *--------------------------------------------------------------------------
 *
 * Here is where you can register API routes for your application. These
 * routes are loaded by the RouteServiceProvider within a group which
 * is assigned the "api" middleware group. Enjoy building your API!
 *
*/

Route::middleware(['auth:sanctum'])->prefix('v1')->group(function () {
    Route::post('/transaction', [TransactionController::class, 'create'])->name('transaction.create');

    Route::get('/balance', [BalanceController::class, 'balance'])->name('balance');
});
