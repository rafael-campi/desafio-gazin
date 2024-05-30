<?php

namespace App\Exceptions;

use Exception;

class DesenvolvedoresAssociadosException extends Exception
{
    public function __construct($message = 'Não é possível excluir o nível, pois existem desenvolvedores associados.', $code = 0, Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
