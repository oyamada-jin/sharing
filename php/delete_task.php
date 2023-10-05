<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'logindb.php';

class DeleteTask {
    private $db;

    public function __construct() {
        $config = new logindb();
        $this->db = $config->getDb();
    }

    public function delete($task_id) {
        try {
            // データベースから指定された task_id のタスクを削除
            $sql = "DELETE FROM task WHERE task_id = :task_id";
            $stmt = $this->db->prepare($sql);
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

$task_id = $input['task_id'];

$deleteTask = new DeleteTask();
$deleteTask->delete($task_id);

?>
