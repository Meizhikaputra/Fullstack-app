<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // connect service provider
    protected $authService;
    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }


    // proses login
    public function login(LoginRequest $request)
    {
        $validated = $request->validated();
        $user = $this->authService->login($validated);
        if ($user) {
            return response()->json([
                'msg' => 'Login berhasil',
                'token' => $user
            ]);
        } elseif ($user === null) {
            return response()->json([
                'msg' => 'Anda belum terdaftar',
            ]);
        }
        return response()->json([
            'msg' => 'Username/password salah',
        ]);
    }

    // proses register akun baru
    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        $checkEmail = User::where('email', $request->email)->first();

        if ($checkEmail) {
            return response()->json([
                'msg' => 'Email Anda sudah terdaftar!'
            ]);
        } elseif ($user = $this->authService->register($validated)) {
            return response()->json([
                'msg' => "Selamat $user, anda sudah terdaftar"
            ]);
        } else {
            return response()->json([
                'status' => 500,
                'msg' => 'Something went wrong!'
            ], 500);
        }
    }


    // proses logout
    public function logout(Request $request)
    {
        $user = $request->user()->currentAccessToken()->delete();
        if ($user) {
            return response()->json([
                'msg' => 'Anda sudah berhasil logout!'
            ]);
        } else {
            return response()->json(['msg' => 'Logout gagal']);
        }
    }
}
