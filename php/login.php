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

        public function login($email,$password) {
            $sql = "SELECT * FROM user WHERE mail = :mail";
            $stmt = $this->db->prepare($sql);
            $stmt->bindParam(':mail', $email);
            $stmt->execute();
            
            $user = $stmt->fetch();

            if ($user) {
                // データベースのパスワードと入力されたパスワードを照合
                if ($password == $user['password']) {
                    // ログイン成功
                    $response = array('success' => 0);
                    echo json_encode($response);
                    exit();
                } else {
                    // パスワードが一致しない
                    $response = array('success' => 1);
                    echo json_encode($response);
                    exit();
                }
            } else {
                // メールアドレスが存在しない
                $response = array('success' => 2);
                echo json_encode($response);
                exit();
            }
        }
}

$inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE);
    
    $email = $input['email'];
    $password = $input['password'];
    
    $dataInsert = new selectUser();
    $dataInsert->login($email,$password);
?>