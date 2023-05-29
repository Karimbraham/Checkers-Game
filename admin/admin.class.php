<?php
class admin{
private $nom;
private $prenom;
private $image;
private $telephone;
private $email;
private $password;
                

function __construct($nom,$prenom,$image,$telephone,$email,$password){
$this->nom = $nom;
$this->prenom = $prenom;
$this->image = $image;
$this->telephone = $telephone;
$this->email = $email;
$this->password = $password;
}
public function ajouter(){ 

include('connexion.php');
    
  
    
    $req = $bdd->query("SELECT * FROM admin WHERE email LIKE '$this->email'");
    $count = $req->rowCount();
    
    if ($count == 0) {
    //$type= intval($this->type);
    $req = $bdd->exec ("INSERT INTO `admin`(`nom`, `prenom`, `image`,`telephone`, `email`, `password`) VALUES ('$this->nom','$this->prenom','$this->image','$this->telephone','$this->email','$this->password')");

    
    echo'oui';
                //return TRUE;
    } else {
                echo'non';
                //return FALSE;
  }
}
public function verifier(){ 

    include('connexion.php');
    $req = $bdd->query(" SELECT * FROM admin WHERE email = '$this->email' AND password = '$this->password'");
    $resultat = $req->fetch();

  if (!$resultat)
{
  header('location:login.php?mess=error');
  
}
   else
{
       session_start();

       $_SESSION['id_admin'] = $resultat['id_admin'];
       $_SESSION['nom'] = $resultat['nom'];
       $_SESSION['prenom'] = $resultat['prenom'];
       $_SESSION['image'] = $resultat['image'];
       $_SESSION['email'] = $resultat['email'];
       $_SESSION['password'] = $resultat['password'];
       
       
    header('location:dashboard.php');


} 

}
public function modifier(){ 
    include('connexion.php');
        $id_admin = $_GET['id_admin'];
        $r=$bdd->exec(" UPDATE admin SET 
            `nom`='$this->nom',
            `prenom`='$this->prenom',
            `image`='$this->image',
            `telephone`='$this->telephone',
            `email`='$this->email',
            `password`='$this->password'

             WHERE id_admin = $id_admin");
        //echo'oui';
        //return TRUE;
            }

			
public function supprimer(){ 
    
	include('connexion.php');

    $req = $bdd->exec('DELETE FROM admin WHERE id_admin=\''.$_GET['id_admin'].'\''); 
 
		echo'oui';	
 
 
}


}


?>