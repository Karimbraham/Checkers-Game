<?php
class joueur{
private $username;
private $nb_competition; 
private $email;
private $password;           


function __construct($username,$nb_competition,$email,$password){
$this->username = $username;
$this->nb_competition = $nb_competition;
$this->email = $email;
$this->password = $password;
}




public function ajouter(){ 

include('connexion.php');

    
       $req = $bdd->prepare("INSERT INTO joueur (username,nb_competition, email, password)
                      VALUES ('".$username."','".$nb_competition."','".$email."','".$password."')");
        $req->execute(array(
      "username" => $username,
      "nb_competition" => $nb_competition,
      "email" => $email,
      "password" => $password,
            ));
      
if($req)
  { 
    header("Location:login.php");
    }  
    else {echo ('Donnée incorrecte');
     header("Location:registre.php");
    }
        
}

 public function verifier(){ 

    include('connexion.php');
    $req = $bdd->query(" SELECT * FROM joueur WHERE email = '$this->email' AND password = '$this->password'");
    $resultat= $req->fetch();
    
  if (!$resultat)
{
  ?>
  <script language="JavaScript">
    alert("Votre Mot de passe ou votre email est incorrectes");
    window.location.replace("logJoueur.php");
    </script>
  <?php
}
   else
{
       session_start();
       $_SESSION['id_joueur'] = $resultat['id_joueur'];    
       header('location:index.php');


} }
public function modifier(){ 
    include('connexion.php');
        $id_joueur = $_GET['id_joueur'];
        $r=$bdd->exec(" UPDATE `joueur` SET 
            `username`='$this->username',
            `nb_competition`='$this->nb_competition',
            `email`='$this->email',
            `password`='$this->password'
             WHERE id_joueur = $id_joueur");
        //echo'oui';
        //return TRUE;
            }



            
public function supprimer(){ 
    
    include('connexion.php');

    $req = $bdd->exec('DELETE FROM joueur WHERE id_joueur=\''.$_GET['id_joueur'].'\''); 
 
        echo'oui';  
 
 
}


}


?>