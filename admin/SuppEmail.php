<?php
ob_start();

require_once('email.class.php');
$message = new email($_POST['nom'],$_POST['prenom'],$_POST['Objet'],$_POST['Message'],$_POST['Date']);
$message->supprimer();

header("location:email.php?Supp=oui");
//exit();
?>