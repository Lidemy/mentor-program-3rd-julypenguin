<?php
require_once("conn.php");
require_once("utils.php");

$db = new Db();
$username = $_POST['username'];
$password = $_POST['password'];
$nickname = $_POST['nickname'];

if (empty($username) || empty($password) || empty($nickname)) {  
  alertMessage('請輸入帳號密碼', './register.php');
}

$sql = "INSERT INTO julypenguin_users(username, password, nickname) VALUE('$username', '$password', '$nickname')";
if ($db->conn->query($sql)) {
  setcookie("member_id", $username, time() + 3600 * 24);
  alertMessage('註冊成功', './index.php');
} else {
  alertMessage('已有相同帳號', './register.php');  
}


