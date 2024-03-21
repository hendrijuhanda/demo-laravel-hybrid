<?php

namespace Modules\Transaction\Services;

use Illuminate\Support\Facades\Auth;
use Modules\Transaction\Models\Contracts\TransactionInterface;
use Modules\Transaction\Repositories\Contracts\TransactionRepositoryInterface;
use Modules\Transaction\Services\Contracts\TransactionServiceInterface;

class TransactionService extends TransactionServiceAbstract implements TransactionServiceInterface
{
    private TransactionRepositoryInterface $transactionRepository;

    public function __construct(TransactionRepositoryInterface $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    /**
     *
     */
    public function create(array $input): TransactionInterface
    {
        $trxId = $this->generateTransactionId();
        $balance = $this->getLastBalance($this->transactionRepository);

        $input['user_id'] = Auth::id();
        $input['transaction_id'] = $trxId;
        $input['balance'] = $balance - $input['amount'];

        if ($input['type'] === 'topup') {
            $input['balance'] = $balance + $input['amount'];
            $input['topup_receipt'] = $this->saveTopupReceipt($trxId);
        }

        return $this->transactionRepository->create($input);
    }

    /**
     *
     */
    public function getUserCurrentBalance(): float
    {
        return $this->getLastBalance($this->transactionRepository);
    }
}
