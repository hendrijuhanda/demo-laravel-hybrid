<?php

namespace Modules\Transaction\Transformers;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'transaction_time' => $this->created_at,
            'transaction_id' => $this->transaction_id,
            'type' => $this->type,
            'amount' => $this->amount,
            'description' => $this->description,
            'balance' => $this->balance
        ];
    }
}
