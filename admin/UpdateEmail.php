<?php
ob_start();
include('admin.class.php');

$email = new email($_POST['nom'],$_POST['prenom'],$_POST['Objet'],$_POST['Message'],$_POST['Date']);
$email->modifier();

header("location:email.php?result=ouiModif");
//exit();
?>