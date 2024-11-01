<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(RegisterUserRequest $request): JsonResponse
    {
        $user = new User();
        $user->fill($request->validated());
        $user->save();

        $token = $user->createToken(
            name: "auth_token",
            expiresAt: now()->addDays(7),
        )->plainTextToken;

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ], 201);
    }

    public function login(LoginUserRequest $request): JsonResponse
    {
        if(auth()->attempt($request->validated())) {

            $user = auth()->user();
            $token = $user->createToken(
                name: "auth_token",
                expiresAt: now()->addDays(7),
            )->plainTextToken;

            return response()->json([
                'message' => 'User logged in successfully',
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'Bearer',
            ], 200);
        }
        else {
            return response()->json([
                'message' => 'Password does not match',
            ], 401);
        }
    }

    public function logout(): JsonResponse
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'User logged out successfully',
        ], 200);
    }

    public function log(): JsonResponse
    {
        return response()->json([
            'message' => 'You need to be logged.',
        ], 401);
    }
    public function getUser(Request $request): JsonResponse
    {
        return response()->json([
            'message' => 'User retrieved successfully',
            'user' => $request->user(),
        ], 200);
    }
}
