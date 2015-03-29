<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
$json = file_get_contents("http://data.nantes.fr/api/publication/24440040400129_NM_NM_00010/LISTE_HORAIRES_PKGS_PUB_NM_STBL/content/?format=jsonn");
echo $json;
?>