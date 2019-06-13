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
  $query->updateContent($content, $id) ? 
    alertMessage("修改成功", "./admin.php") : alertMessage("發生錯誤 $db->conn->error", "./admin.php");
} else {
  alertMessage("無法修改", "./index.php");
}
