<?php
require_once('../Model/email.class.php');
$message = new email($_POST['nom'],$_POST['prenom'],$_POST['Objet'],$_POST['Message'],$_POST['Date']);
$message->ajouter();

header("location:../Envoi_Msg.php");
//exit();
?>

