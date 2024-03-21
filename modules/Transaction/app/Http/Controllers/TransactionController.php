<?php

namespace Modules\Transaction\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Modules\Transaction\Http\Requests\CreateRequest;
use Modules\Transaction\Http\Requests\IndexRequest;
use Modules\Transaction\Services\Contracts\TransactionServiceInterface;
use Modules\Transaction\Transformers\TransactionsResource;

class TransactionController extends Controller
{
    private TransactionServiceInterface $transactionService;

    public function __construct(TransactionServiceInterface $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    /**
     *
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $transactions = $this->transactionService->index();

        return response()->json(self::responseFormat(new TransactionsResource($transactions)), Response::HTTP_OK);
    }

    /**
     *
     */
    public function create(CreateRequest $request): JsonResponse
    {
        $transaction = $this->transactionService->create($request->validated());

        return response()->json(self::responseFormat($transaction), Response::HTTP_CREATED);
    }
}
