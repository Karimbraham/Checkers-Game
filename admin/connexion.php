<?php
try
{	
	$bdd = new PDO('mysql:host=localhost;dbname=chess', 'root', '');

}
catch(Exception $e)
{
    echo('Erreur : '.$e->getMessage());
}$bdd->query("SET NAMES UTF8")	
?>
