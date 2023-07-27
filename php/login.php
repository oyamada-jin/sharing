<?php

header("Access-Control-Allow-Origin: http://127.0.0.1:5500");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

session_start();

// データベース接続ファイルを読み込む
require_once 'logindb.php';

// ログイン処理
function login($email, $password) {
    $pdo = dbConnect();
    $msg = "";

    // データベースでメールアドレスに対応するユーザー情報を検索
    $stmt = $pdo->prepare("SELECT * FROM user WHERE mail = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user) {
        // データベースのパスワードと入力されたパスワードを照合
        if (password_verify($password, $user['password'])) {
            // ログイン成功
            $_SESSION['user_id'] = $user['user_id'];
            $response = array('success' => true);
            echo json_encode($response);
            exit();
        } else {
            // パスワードが一致しない
            $response = array('success' => false);
            echo json_encode($response);
            exit();
        }
    } else {
        // メールアドレスが存在しない
        $response = array('success' => false);
        echo json_encode($response);
        exit();
    }
}

// フォームから送信されたメールアドレスとパスワードを取得
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    login($email, $password);
}
?>