<?php

namespace Modules\Transaction\Services\Contracts;

use Modules\Transaction\Models\Contracts\TransactionInterface;

interface TransactionServiceInterface
{

    /**
     *
     */
    public function create(array $input): TransactionInterface;
}
