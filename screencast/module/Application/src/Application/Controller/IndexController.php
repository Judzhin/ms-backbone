<?php

/**
 * 
 */

namespace Application\Controller;

/**
 * 
 */
use Zend\Mvc\Controller\AbstractActionController;

/**
 * 
 */
class IndexController extends AbstractActionController {

    /**
     * 
     */
    public function indexAction() {
        $this->redirect()->toUrl('/index.html');
    }

}
