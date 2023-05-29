<?php
require_once('../Model/competition.class.php');
$competition = new competition($_POST['nb_competition'],$_POST['date_competition'],$_POST['gagnat'],$_POST['perdant'],$_POST['profit']);
$competition->ajouter(); 
header("location:../Liste_competition.php?resultat=oui");
//exit();
?>