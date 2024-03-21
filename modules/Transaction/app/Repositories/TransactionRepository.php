<?php

namespace Modules\Transaction\Repositories;

use Illuminate\Support\Facades\Auth;
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
    public function getUserLatestRecord(): TransactionInterface | null
    {
        return Transaction::where('user_id', Auth::id())->orderBy('id', 'desc')->first();
    }
}
