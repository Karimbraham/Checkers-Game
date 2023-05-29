<?php
require_once('admin.class.php');
$admin = new admin($_POST['nom'],$_POST['prenom'],$_POST['image'],$_POST['telephone'],$_POST['email'],$_POST['password']);
$admin->ajouter();

header("location:administrateur.php?resultat=oui");
//exit();
?>