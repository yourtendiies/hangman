<?php 
session_start()
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,600,0,0" />

    <title>Document</title>
</head>
<body>
    <div class="page">
        <div class="container">
            <div class="logo">
                <img src="logo.png">
            </div>
            <div class="header">
                <h1>Login</h1>
            </div>
            <form class="info" action="" method="POST">
                <div class="item">
                    <span class="form-item-icon material-symbols-rounded">mail</span>
                    <input type="text" placeholder="Enter Username" id="username" name="username">
                </div><br>
                <div class="item">
                    <span class="form-item-icon material-symbols-rounded">lock</span>
                    <input type="password" placeholder="Enter Password" id="password" name="pw">
                </div><br>
                <div class="btn">
                    <button type="submit">Login</button>
                </div>
                <div class="login-card-footer">
                    Don't have an account? <a href="signup.php">Create an account.</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>

<?php
    require 'connexion.php';
    if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['pw']) && !empty($_POST['pw'])) {
        $username = $_POST["username"];
        $password = $_POST["pw"];
        $stm=$PDO->prepare("select * from infos where username= '$username' and password= '$password'");
        $stm -> execute([$username,$password]);
        $c = $stm-> rowCount();
        if ($c>0) {
            $userId = $stm->fetch(PDO::FETCH_ASSOC);
            $_SESSION['id'] = $userId["userId"]; 
            // var_dump($_SESSION['id']);
            header('location:../hangman.html');
            // header('location:hangman.php');
        } else {
            echo '<script>alert("Username or Password invalide")</script>';
        }
    }
?>