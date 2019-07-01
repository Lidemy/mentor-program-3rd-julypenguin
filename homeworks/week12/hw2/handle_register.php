<?php
require_once("query.php");
require_once("utils.php");

$query = new Query();
$username = $_POST['username'];
$password = $_POST['password'];
$nickname = $_POST['nickname'];
$certificateId = randomString();

if (empty($username) || empty($password) || empty($nickname)) {  
  alertMessage('請輸入帳號密碼', './register.php');
} else {
  $passwordHash = password_hash($password, PASSWORD_DEFAULT);
  if ($query->insertUsersInfo($username, $passwordHash, $nickname)->insert_id > 0 && 
      $query->insertUsersCertificate($username, $certificateId)->insert_id > 0) {
        setcookie("member_id", $certificateId, time() + 3600 * 24, "/group3/julypenguin/", "mentor-program.co", false, true);
        alertMessage('註冊成功', './index.php');
  } else {
    alertMessage('已有相同帳號', './register.php');  
  }
}  



