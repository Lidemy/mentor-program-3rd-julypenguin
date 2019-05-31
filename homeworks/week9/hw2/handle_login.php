<?php
require_once("conn.php");
require_once("utils.php");

$db = new Db();
$username = $_POST['username'];
$password = $_POST['password'];

if (!empty($_POST['username']) || !empty($_POST['password'])) {
  $sql = "SELECT * FROM julypenguin_users WHERE username='$username' AND password='$password'";
  $result = $db->conn->query($sql);
  if ($result->num_rows > 0) {
    setcookie("member_id", $username, time() + 3600 * 24);
    alertMessage("登入成功", "./index.php");
  } else {
    alertMessage("帳號或密碼錯誤", "./login.php");
  }
} else {
  alertMessage("請輸入帳號密碼", "./login.php");
}

