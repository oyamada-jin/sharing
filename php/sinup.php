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

        public function sinup($email,$password,$user_name) {
            // 必須フィールドのチェック
        if (empty($email) || empty($password) || empty($user_name)) {
            // 必須フィールドが入力されていない場合、エラーメッセージを返す
            $response = array('success' => 1, 'error' => '必須フィールドが入力されていません。');
            echo json_encode($response);
            exit();
        }
        
        try {
            // データベースに新しいユーザーレコードを挿入
            $sql = "INSERT INTO user ( mail, password, user_name) VALUES ( :mail, :password, :user_name)";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':mail', $email);
            $stmt->bindParam(':password', $password);
            $stmt->bindParam(':user_name', $user_name);
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
    
    $email = $input['email'];
    $password = $input['password'];
    $username = $input['username'];
    
    $dataInsert = new selectUser();
    $dataInsert->sinup($email,$password,$username);

?>