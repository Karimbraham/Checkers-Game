<?PHP
include ("connexion.php");
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];


$req = $bdd->prepare("INSERT INTO joueur (username, email, password)
                      VALUES ('".$username."','".$email."','".$password."')");
        $req->execute(array(
			"username" => $username,
			"email" => $email,
			"password" => $password,
            ));
			
if($req)
	{ 
    header("Location:logJoueur.php");
		}  
		else {echo ('Donnée incorrecte');
		 header("Location:registre.php");
		}
	
?>