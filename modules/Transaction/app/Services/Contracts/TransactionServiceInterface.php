<?php

namespace Modules\Transaction\Services\Contracts;

use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Transaction\Models\Contracts\TransactionInterface;

interface TransactionServiceInterface
{

    /**
     *
     */
    public function index(): LengthAwarePaginator;

    /**
     *
     */
    public function create(array $input): TransactionInterface;

    /**
     *
     */
    public function getUserCurrentBalance(): float;
}
