<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/{vue_capture?}', function () {
    return view('app');
})->where('vue_capture', '^(?!api).*$');
