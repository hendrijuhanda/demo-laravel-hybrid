<?php

namespace Modules\User\Models\Contracts;

use DateTimeInterface;

interface UserInterface
{
    const TABLE = 'users';

    // public function createToken(string $name, array $abilities = ['*'], DateTimeInterface $expiresAt = null);
}
