<?php

namespace Modules\Transaction\Repositories;

use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Modules\Transaction\Models\Contracts\TransactionInterface;
use Modules\Transaction\Models\Transaction;
use Modules\Transaction\Repositories\Contracts\TransactionRepositoryInterface;

class TransactionRepository implements TransactionRepositoryInterface
{

    /**
     *
     */
    public function listWithPagination(): LengthAwarePaginator
    {
        return Transaction
            ::where('user_id', Auth::id())

            ->when(request()->get('transaction_id'), function ($q) {
                return $q->where('transaction_id', 'like', '%' . request()->get('transaction_id') . '%');
            })

            ->when(request()->get('description'), function ($q) {
                return $q->where('description', 'like', '%' . request()->get('description') . '%');
            })

            ->when(request()->get('type'), function ($q) {
                return $q->where('type', request()->get('type'));
            })

            ->orderBy('created_at', 'desc')

            ->paginate(request()->get('per_page'), ['*'], null, request()->get('page'));
    }

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
