<?php
require_once("query.php");
require_once("utils.php");

$query = new Query();
$username = $_POST['username'];
$password = $_POST['password'];
$query->checkPassword($username);
$certificateId = randomString();

if (empty($_POST['username']) || empty($_POST['password'])) {
  alertMessage("請輸入帳號密碼", "./login.php");
} else {
  if (password_verify($password ,$query->password)) {
    $_SESSION["member_id"] = $username;
    alertMessage("登入成功", "./index.php");
  } else {
    alertMessage("帳號或密碼錯誤", "./login.php");
  }
}

