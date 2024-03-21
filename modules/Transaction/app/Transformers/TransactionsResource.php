<?php

namespace Modules\Transaction\Transformers;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TransactionsResource extends ResourceCollection
{
    public function toArray($request)
    {
        return [
            'items' => TransactionResource::collection($this->collection),
            'pagination' => [
                'total' => $this->total(),
                'per_page' => $this->perPage(),
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
            ],
        ];
    }
}
