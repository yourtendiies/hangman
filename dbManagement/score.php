<?php
session_start();
// session_destroy();
require 'connexion.php';

$userId = $_SESSION['id'];
$score = $_POST['score'];
echo "your score is $score";
$statement=$PDO->prepare("UPDATE infos set score=$score WHERE userId=$userId");
$statement->execute();
