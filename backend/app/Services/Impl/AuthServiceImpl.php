<?php

namespace App\Services\Impl;

use App\Models\User;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthServiceImpl implements AuthService

{
    public function login($user)
    {
        $userLogin = User::where('email', $user['email'])->first();

        if (Auth::attempt($user)) {
            $user = $userLogin->createToken('User Token')->plainTextToken;
            return $user;
        } elseif (!$userLogin) {
            return null;
        } else {
            return false;
        }
    }

    public function register($user)
    {
        $newUser = User::create([
            'name' => $user['name'],
            'email' => $user['email'],
            'password' => Hash::make($user['password']),
        ]);

        if ($newUser) {
            return $newUser->name;
        } else {
            return false;
        }
    }
}
