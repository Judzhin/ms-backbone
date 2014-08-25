<?php

/**
 * 
 */

namespace Api\Controller;

/**
 * 
 */
use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

/**
 * 
 */
class IndexController extends AbstractRestfulController {

    /**
     * 
     * @return \Zend\View\Model\JsonModel
     */
    public function getList() {
        return new JsonModel(array(
            'data' => "Welcome to the Zend Framework API"
        ));
    }

}
