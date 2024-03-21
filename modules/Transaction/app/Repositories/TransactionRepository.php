<?php

namespace Modules\Transaction\Repositories;

use Modules\Transaction\Models\Contracts\TransactionInterface;
use Modules\Transaction\Models\Transaction;
use Modules\Transaction\Repositories\Contracts\TransactionRepositoryInterface;

class TransactionRepository implements TransactionRepositoryInterface
{

    /**
     *
     */
    public function create(array $input): TransactionInterface
    {
        return Transaction::create($input);
    }

    /**
     *
     */
    public function getLatestRecord(): TransactionInterface | null
    {
        return Transaction::orderBy('id', 'desc')->first();
    }
}
