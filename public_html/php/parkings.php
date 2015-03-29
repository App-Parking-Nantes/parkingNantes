<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    $json = file_get_contents("http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/JMGIH06TYVI1DUT/?output=json");
    echo $json;
?>