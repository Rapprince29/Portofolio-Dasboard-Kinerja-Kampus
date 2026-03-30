<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IndicatorInputRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Only users with role unit_kerja can submit
        return $this->user()->role === 'unit_kerja';
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'indicators' => ['required', 'array'],
            'indicators.*.indicator_id' => ['required', 'exists:indicators,id'],
            'indicators.*.year' => ['required', 'integer', 'min:2000', 'max:2100'],
            'indicators.*.value' => ['required', 'numeric'],
            'indicators.*.status' => ['sometimes', 'in:draft,submitted'],
            'indicators.*.proof' => ['sometimes', 'nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:5120'],
            'indicators.*.description' => ['sometimes', 'nullable', 'string', 'max:1000'],
        ];
    }
}
