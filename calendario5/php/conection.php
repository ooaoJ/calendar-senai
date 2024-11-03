<?php

// conexao no banco de dados

$localhost = 'localhost';
$user = 'root';
$password = '';
$database = 'calendario';

$conn = new mysqli($localhost, $user, $password, $database);

if($conn->connect_error){
    die('Falha na conexão: ' . $conn->connect_error);
}
?>

