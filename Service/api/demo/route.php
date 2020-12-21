<?php

use think\facade\Route;

Route::resource('demo/articles', 'demo/Articles');

//Route::resource('demo/index', 'demo/Index');
Route::post('demo/index/one', 'demo/Index/one');
