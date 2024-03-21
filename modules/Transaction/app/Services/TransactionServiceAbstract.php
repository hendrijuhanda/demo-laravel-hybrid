<?php

namespace Modules\Transaction\Services;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Modules\Transaction\Repositories\Contracts\TransactionRepositoryInterface;

abstract class TransactionServiceAbstract
{
    /**
     *
     */
    protected function generateTransactionId()
    {
        return Str::random();
    }

    /**
     *
     */
    protected function getLastBalance(TransactionRepositoryInterface $transactionRepository): float
    {
        $latest = $transactionRepository->getUserLatestRecord();

        return $latest ? $latest->balance : 0;
    }

    /**
     *
     */
    protected function saveTopupReceipt(string $trxId): string
    {
        $file = request()->file('upload');
        $filename = $file->getClientOriginalName();

        $path = 'topup_receipt/' . $trxId . '-' . $filename;

        Storage::disk('local')->put($path, file_get_contents($file));

        return $path;
    }
}
