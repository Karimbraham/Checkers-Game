<?php
ob_start();
require_once('admin.class.php');
$admin = new Admin($_POST['nom'],$_POST['prenom'],$_POST['image'],$_POST['telephone'],$_POST['email'],$_POST['password']);
$admin->supprimer();

header("location:administrateur.php?resultat=oui");
//exit();
?>