<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'logindb.php';

class UpdateTask {
    private $db;

    public function __construct() {
        $config = new logindb();
        $this->db = $config->getDb();
    }

    public function update($taskDetail, $task_id) {
        try {
            $sql = "UPDATE task SET task_detail = :task_detail WHERE task_id = :task_id";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':task_detail', $taskDetail);
            $stmt->bindParam(':task_id', $task_id);
            $stmt->execute();

            $response = array('success' => 0);
            echo json_encode($response);
            exit();
        } catch (PDOException $e) {
            $response = array('success' => 1, 'error' => $e->getMessage());
            echo json_encode($response);
            exit();
        }
    }
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$taskDetail = $input['task_detail'];
$task_id = $input['task_id'];

$updateTask = new UpdateTask();
$updateTask->update($taskDetail, $task_id);

?>
