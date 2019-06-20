<?php
require_once("query.php");
require_once('utils.php');

$db = new Db();
$query = new Query();
$content = $_POST['content'];
$id = $_POST['id'];

$query->checkUser();

if (empty($content)) {
  alertMessage("請輸入至少一個字", "./update.php?id=$id");
} else if ($query->username === $query->checkContentUsername($id) || $query->checkAdmin()){
  if ($query->updateContent($content, $id)->affected_rows > 0) {
    alertMessage("修改成功", "./admin.php");
  } else {
    print_r($db->conn->error);
  }
} else {
  alertMessage("無法修改", "./index.php");
}
