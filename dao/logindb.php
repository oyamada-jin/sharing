<?php
class logindb {
  private $db;

  public function __construct() {
    $host = 'mysql215.phy.lolipop.lan'; // データベースホスト名またはIPアドレス
    $dbname = 'LAA1417821-private'; // データベース名
    $username = 'LAA1417821'; // ユーザ名
    $password = 'Pass0127'; // パスワード

    try {
      $this->db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    } catch(PDOException $e) {
      echo 'Connection failed: ' . $e->getMessage();
    }
  }

  public function getDb() {
    return $this->db;
  }
}
?>