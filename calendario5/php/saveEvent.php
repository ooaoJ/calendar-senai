<?php
include 'conection.php';

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $data = $_POST['data_evento'];
    $titulo = $_POST['tituloModal'];
    $descricao = $_POST['descricaoModal'];

    $checarSql = "SELECT * FROM eventos WHERE data_evento = '$data'";
    $result = $conn->query($checarSql);

    if($result->num_rows > 0) {
        echo "Já existe um evento cadastrado para esta data.";
    } else {
        $sql = "INSERT INTO eventos (data_evento, titulo, descricao) VALUES ('$data', '$titulo', '$descricao')";
        if($conn->query($sql) === TRUE) {
            echo "Evento salvo com sucesso.";
        } else {
            echo "Erro: " . $conn->error;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loading</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            font-size: 56px;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        body{
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #555;
            color: #fff;
        }
    </style>
</head>
<body>
    <script>
        setTimeout(function() {
            window.location.href = '../index.html';
        }, 3000);
    </script>
</body>
</html>