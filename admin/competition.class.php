<?php
class competition{
private $nb_competition;	
private $date_competition;
private $gagnant;
private $looser;  



function __construct($nb_competition,$date_competition,$gagnant,$looser){
$this->nb_competition = $nb_competition;
$this->date_competition = $date_competition;
$this->gagnant = $gagnant;
$this->looser = $looser;

}



public function ajouter(){ 

include('connexion.php');

       $req = $bdd->exec ("INSERT INTO competition (`nb_competition`,`date_competition`, `gagnant`, `looser`) VALUES ('$this->nb_competition','$this->date_competition','$this->gagnant','$this->looser')");

        
        //echo'oui';
                //return TRUE
       
}

public function modifier(){ 
    include('connexion.php');
        $id_competition = $_GET['id_competition'];
        $r=$bdd->exec(" UPDATE `competition` SET 
            `nb_competition`='$this->nb_competition',
            `date_competition`='$this->date_competition',
            `gagnant`='$this->gagnant',
            `looser`='$this->looser'
             WHERE id_competition = $id_competition");
        //echo'oui';
        //return TRUE;
            }
public function supprimer(){ 
    
    include('connexion.php');

    $req = $bdd->exec('DELETE FROM competition WHERE id_competition=\''.$_GET['id_competition'].'\''); 
 
        echo'oui';  
 
 
}



}

 

?>