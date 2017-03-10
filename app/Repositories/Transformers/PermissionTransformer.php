<?php

namespace App\Repositories\Transformers;

use League\Fractal\TransformerAbstract;
use App\Models\Permission;

/**
 * Class PermissionTransformer
 * @package namespace App\Repositories\Transformers;
 */
class PermissionTransformer extends TransformerAbstract
{

    /**
     * Transform the \Permission entity
     * @param \Permission $model
     *
     * @return array
     */
    public function transform(Permission $model)
    {
        return [
            'id'            => (int) $model->id,
            'name'          => $model->name,
            'slug'          => $model->slug,
            'description'   => $model->description,
            'created_at'    => $model->created_at->format('Y-m-d H:i:s'),
            'updated_at'    => $model->updated_at->format('Y-m-d H:i:s')
        ];
    }
}
