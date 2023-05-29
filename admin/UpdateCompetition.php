<?php
ob_start();
include('competition.class.php');
$competition = new competition($_POST['nb_competition'],$_POST['date_competition'],$_POST['gagnant'],$_POST['looser']);
$competition->modifier();

header("location:competition.php?result=ouiModif");
//exit();
?>