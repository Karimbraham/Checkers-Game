 <?php
ob_start();
require_once('competition.class.php');
$competition = new competition($_POST['nb_competition'],$_POST['date_competition'],$_POST['gagnat'],$_POST['perdant']);
$competition->supprimer();
header("location:competition.php?resultat=oui");
//exit();
?>