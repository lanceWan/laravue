<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class RoleUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'slug' => ['required',Rule::unique('roles')->ignore($this->id)]
        ];
    }

    public function messages()
    {
        return [
            'required'  => ':attribute 不能为空。',
            'unique'  => ':attribute 已经存在。',
        ];
    }

    public function attributes()
    {
        return [
            'name'  => '名称',
            'slug'  => '角色',
        ];
    }
}
