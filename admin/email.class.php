<?php
class email{
private $nom;
private $prenom;
private $Objet;
private $Message;                
private $Date; 

function __construct($nom,$prenom,$Objet,$Message,$Date){
$this->nom = $nom;
$this->prenom = $prenom;
$this->Objet = $Objet;
$this->Message = $Message;
$this->Date = $Date;
}




public function ajouter(){ 

include('connexion.php');
    
   
        $req = $bdd->exec ("INSERT INTO `email`(`nom`, `prenom`, `Objet`, `Message`, `Date`) VALUES ('$this->nom','$this->prenom','$this->Objet','$this->Message','$this->Date')");

        
        echo'ouiEnvoi';
                //return TRUE;

    }

            
public function supprimer(){ 
    
    include('connexion.php');

    $req = $bdd->exec('DELETE FROM email WHERE id_msg=\''.$_GET['id_msg'].'\''); 
 
        echo'oui';  
 
 
}


}


?>