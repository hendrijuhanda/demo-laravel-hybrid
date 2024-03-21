<?php

namespace Modules\Transaction\Repositories\Contracts;

use Modules\Transaction\Models\Contracts\TransactionInterface;

interface TransactionRepositoryInterface
{

    /**
     *
     */
    public function create(array $input): TransactionInterface;

    /**
     *
     */
    public function getUserLatestRecord(): TransactionInterface | null;
}
