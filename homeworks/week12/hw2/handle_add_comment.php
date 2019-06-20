<?php
require_once("query.php");
require_once("utils.php");

$db = new Db();
$query = new Query();
$content = $_POST['content'];
$layer = $_POST['layer'];
$parentId = $_POST['parent_id'];
$query->checkUser();

if (!empty($content)) {
  if ($query->insertComments($query->username, $layer, $parentId, $content)->insert_id > 0) {
    header("Location: ./index.php");
  } else {
    alertMessage("$db->conn->error", "index.php");
  }
} else {
  alertMessage("請輸入文字", "index.php");
}


