<?php
require_once('joueur.class.php');
$joueur = new joueur($_POST['username'],$_POST['email'],$_POST['password']);
$joueur->ajouter();

header("location:login.php?resultat=oui");
//exit();
?>