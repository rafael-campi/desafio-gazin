<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateDesenvolvedorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nome" => "string",
            "sexo" => "string",
            "data_nascimento" => "date",
            "hobby" => "string",
            "nivel_id" => 'integer|exists:nivels,id'
        ];
    }
    public function messages()
    {
        return [
            'nivel_id.integer' => 'O campo nivel precisa ser preenchido.',
            'nivel_id.exists' => 'Para criar um desenvolvedor é preciso registrar um nível.',
            //'name.required' => '',
        ];
    }
    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success'   => false,
            'message'   => 'Validation errors',
            'data'      => $validator->errors()
        ], 404));
    }
}
