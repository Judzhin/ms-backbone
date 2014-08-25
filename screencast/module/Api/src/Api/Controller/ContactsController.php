<?php

namespace Api\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

class ContactsController extends AbstractRestfulController {
    //protected $collectionOptions = array('GET', 'POST');
    //protected $resourceOptions = array('DELETE', 'GET', 'PATCH', 'PUT');
    //
    //public function options() {
    //    if ($this->params->fromRoute('id', false)) {
    //        $options = $this->resourceOptions;
    //    } else {
    //        $options = $this->collectionOptions;
    //    }
    //    $response = $this->getResponse();
    //    $response->getHeaders()->addHeaderLine('Allow', implode(',', $options));
    //    return $response;
    //}
    //
    //public function setEventManager(\Zend\EventManager\EventManagerInterface $events) {
    //    $this->events = $events;
    //    $events->attach('dispatch', array($this, 'checkOptions'), 10);
    //}
    //
    //public function checkOptions(\Zend\Mvc\MvcEvent $e) {
    //    if ($this->params()->fromRoute('id', false)) {
    //        $options = $this->resourceOptions;
    //    } else {
    //        $options = $this->collectionOptions;
    //    }
    //
    //    //\Zend\Debug\Debug::dump(array(
    //    //    $this->params()->fromRoute('id', false),
    //    //    $e->getRequest()->getMethod(),
    //    //    $options));
    //    //die();
    //
    //    if (in_array($e->getRequest()->getMethod(), $options)) {
    //        // HTTP method is allowed!  
    //        $response = $this->getResponse();
    //        $response->setStatusCode(200);
    //        return;
    //    } 
    //    //else {
    //    //// Method Not Allowed
    //    //$response = $this->getResponse();
    //    //$response->setStatusCode(405);
    //    //}
    //
    //    $response = $this->getResponse();
    //    $response->setStatusCode(405);
    //    return $response;
    //}

    /**
     * 
     * Action used for GET requests without resource Id
     * @return \Zend\View\Model\JsonModel
     */
    public function getList() {
        return new JsonModel(array(
            array(
                'contact_id' => 1,
                'name' => 'Judzhin Miles',
                'number' => '067 123 45 67',
                'email' => 'info@example.com'
            ),
            array(
                'contact_id' => 2,
                'name' => 'Judzhin Miles',
                'number' => '067 123 45 67',
                'email' => 'info@example.com'
            ),
            array(
                'contact_id' => 3,
                'name' => 'Judzhin Miles',
                'number' => '067 123 45 67',
                'email' => 'info@example.com'
            )
        ));
    }

    /**
     * 
     * Action used for GET requests with resource Id
     * @param type $id
     * @return \Zend\View\Model\JsonModel
     */
    public function get($id) {
        return new JsonModel(array(
            'contact_id' => 2,
            'name' => 'Прочитать почту',
            'priority' => 4
        ));
    }

    /**
     * 
     * Action used for POST requests
     * @param type $data
     * @return \Zend\View\Model\JsonModel
     */
    public function create($data) {
        return new JsonModel(array_merge(array(
                    'contact_id' => 4), $data
        ));
    }

    /**
     * 
     * Action used for PUT requests
     * @param type $id
     * @param type $data
     * @return \Zend\View\Model\JsonModel
     */
    public function update($id, $data) {
        return new JsonModel($data);
    }

    /**
     * 
     * Action used for DELETE requests
     * @param type $id
     * @return \Zend\View\Model\JsonModel
     */
    public function delete($id) {
        return new JsonModel(array(
            'data' => $id
        ));
    }

}
