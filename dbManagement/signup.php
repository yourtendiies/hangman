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
                    <input type="password" placeholder="Enter Password"id="password" name="pw">
                </div><br>
                <div class="item">
                    <span class="form-item-icon material-symbols-rounded">lock</span>
                    <input type="password" placeholder="Confirm Password"id="password">
                </div><br>
                <div class="btn">
                    <button type="submit">sign in</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>

<?php
    require 'connexion.php';
    if (isset($_POST['username']) && !empty($_POST['username']) && isset($_POST['pw']) && !empty($_POST['pw'])){            
        $stm=$PDO->prepare("select * from infos where username= ?");
        $stm -> execute([$_POST["username"]]);
        $c = $stm-> rowCount();
        if ($c>0)
        {
            echo '<script>alert("This account already exists")</script>';
        }
        else
        {
            $username=$_POST['username'];
            $password=$_POST['pw'];
            $statement=$PDO->prepare("insert into infos (username,password) VALUES(?,?)");
            
            $statement->bindParam(1,$username);
            $statement->bindParam(2,$password);
            $statement->execute();
            header('location:../hangman.html');
        }
    }
?>