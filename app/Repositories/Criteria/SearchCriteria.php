<?php

namespace App\Repositories\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class SearchCriteria
 * @package namespace App\Repositories\Criteria;
 */
class SearchCriteria implements CriteriaInterface
{
    protected $search;
    protected $field;
    public function __construct($fields, $search)
    {
        $this->search = $search;
        $this->fields = $fields;
    }
    /**
     * Apply criteria in query repository
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        if (is_array($this->fields)) {
            foreach ($this->fields as $k => $v) {
                if ($k == 0) {
                    $model = $model->where($v, 'like', "%{$this->search}%");
                }else{
                    $model = $model->orWhere($v, 'like', "%{$this->search}%");
                }
            }
            return $model;
        }else{
            return $model->where($this->field, 'like', "%{$this->search}%");
        }
    }
}
