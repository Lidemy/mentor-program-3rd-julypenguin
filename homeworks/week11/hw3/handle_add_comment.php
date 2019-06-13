<?php
require_once("query.php");
require_once("utils.php");

$db = new Db();
$query = new Query();
$content = $_POST['content'];
$query->checkUser();

if (!empty($content)) {
  $query->insertComments($query->username, $content) ?
    header("Location: ./index.php") : 
    alertMessage("$db->conn->error", "index.php");
} else {
  alertMessage("請輸入文字", "index.php");
}


