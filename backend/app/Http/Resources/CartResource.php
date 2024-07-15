<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'quantity' => $this->pivot->quantity,
            'price' => $this->price,
            'image' => $this->image ? url('storage/' . $this->image) : url('storage/images-product/default.jpeg'),
        ];
    }
}
