<?php

namespace Modules\Transaction\Models;

use Illuminate\Database\Eloquent\Model;
use Modules\Transaction\Models\Contracts\TransactionInterface;

class Transaction extends Model implements TransactionInterface
{
    protected $table = self::TABLE;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'transaction_id',
        'type',
        'amount',
        'description',
        'balance',
        'topup_receipt'
    ];
}
