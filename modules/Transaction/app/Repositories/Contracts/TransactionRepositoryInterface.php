<?php

namespace Modules\Transaction\Repositories\Contracts;

use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Transaction\Models\Contracts\TransactionInterface;

interface TransactionRepositoryInterface
{

    /**
     *
     */
    public function listWithPagination(): LengthAwarePaginator;

    /**
     *
     */
    public function create(array $input): TransactionInterface;

    /**
     *
     */
    public function getUserLatestRecord(): TransactionInterface | null;
}
