<?php
require_once('joueur.class.php');
$joueur = new joueur($_POST['username'],$_POST['nb_competition'],$_POST['email'],$_POST['password']);
$joueur->modifier();

header("location:joueur.php?resultat=oui");
//exit();
?>