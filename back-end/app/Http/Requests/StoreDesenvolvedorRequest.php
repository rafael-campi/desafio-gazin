<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreDesenvolvedorRequest extends FormRequest
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
        "nome"=> "required",
        "sexo"=> "required",
        "data_nascimento"=> "required|date",
        "hobby"=> "string",
        "nivel_id"=> 'required|integer|exists:nivels,id'
        ];
    }

    public function messages()
    {
        return [
            'nivel_id.integer'=>'O campo nivel_id precisa ser um inteiro.',
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
