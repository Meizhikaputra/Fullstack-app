<?php

namespace App\Services;

interface AuthService
{
    function login($data);

    function register($data);
}
