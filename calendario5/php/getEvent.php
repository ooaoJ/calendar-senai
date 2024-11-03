<?php
include 'conection.php';

$data = isset($_GET['data']) ? $_GET['data'] : null;

if ($data) {
    $sql = "SELECT * FROM eventos WHERE data_evento = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $data);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $events = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $events[] = $row;
        }
    }
    $stmt->close();
} else {
    $sql = "SELECT * FROM eventos";
    $result = $conn->query($sql);
    
    $events = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $events[] = $row;
        }
    }
}

echo json_encode($events);
?>
