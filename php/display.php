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

        public function display($date_id) {
        
        try {
            // データベースに新しいユーザーレコードを挿入
            $sql = "SELECT * FROM task WHERE date_id = :date_id";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':date_id', $date_id);
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC); // データベースから取得したデータを連想配列として取得
            
                // 登録成功メッセージを返す
                $response = array('success' => 0, 'data' => $data);
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
    
    $date_id = $input['date_id']; // スケジュールを追加した日付のID
    
    $dataInsert = new selectUser();
    $dataInsert->display($date_id);


?>