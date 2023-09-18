<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'logindb.php';

class selectUser {
        private $db;
      
        public function __construct() {
          $config = new logindb();
          $this->db = $config->getDb();
        }

        public function schedule($task_detail, $date_id, $user_id) {
            // 必須フィールドのチェック
        if (empty($task_detail)) {
            // 必須フィールドが入力されていない場合、エラーメッセージを返す
            $response = array('success' => 1, 'error' => '入力されていません。');
            echo json_encode($response);
            exit();
        }
        
        try {
            // データベースに新しいユーザーレコードを挿入
            $sql = "INSERT INTO task ( task_detail, date_id, user_id) VALUES ( :task_detail, :date_id, :user_id)";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':task_detail', $task_detail);
            $stmt->bindParam(':date_id', $date_id);
            $stmt->bindParam(':user_id', $user_id);
            $stmt->execute();
            
                // 登録成功メッセージを返す
                $response = array('success' => 0);
                echo json_encode($response);
                exit();
            } catch (PDOException $e) {
                // エラーメッセージを返す
                $response = array('success' => 1, 'error' => $e->getMessage());
                echo json_encode($response);
                exit();
                }
        }
    }

    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    $task_detail = $input['input_field']; // フォームから送信されたタスクの詳細
    $date_id = $input['dayNumber']; // フォームから送信された日付のID
    $user_id = $input['user_id']; // フォームから送信されたユーザーID
    
    $dataInsert = new selectUser();
    $dataInsert->schedule($task_detail, $date_id, $user_id);

?>