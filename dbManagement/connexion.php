<?php
// session_start();
$DB_DSN = 'mysql:host=localhost;dbname=hangman';
$DB_USER = 'root';
$DB_PASS = '';
$PDO = new PDO($DB_DSN, $DB_USER, $DB_PASS);
?>