<?php

namespace Modules\Transaction\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Modules\Transaction\Services\Contracts\TransactionServiceInterface;

class BalanceController extends Controller
{
    private TransactionServiceInterface $transactionService;

    public function __construct(TransactionServiceInterface $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    /**
     *
     */
    public function balance(): JsonResponse
    {
        $balance = $this->transactionService->getUserCurrentBalance();

        return response()->json(self::responseFormat(['balance' => $balance]), Response::HTTP_OK);
    }
}
