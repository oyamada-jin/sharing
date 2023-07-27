<?php
// データベース接続を行う関数を定義
function logindb(){
    // データベースに接続
    $pdo = new PDO('mysql:host=localhost; dbname=LAA1417821-private; charset=utf8', 'LAA1417821', 'Pass0127');
    return $pdo;
}
?>
