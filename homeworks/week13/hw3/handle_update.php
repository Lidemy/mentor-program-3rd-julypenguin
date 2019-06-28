<?php
require_once("query.php");

$db = new Db();
$query = new Query();


$json = file_get_contents('php://input');
$data = json_decode($json);
$content = $data->content;
$id = $data->id;

$query->checkUser();

if (empty($content)) {
  alertMessage("請輸入至少一個字", "./update.php?id=$id");
} else if ($query->username === $query->checkContentUsername($id) || $query->checkAdmin()){
  if ($query->updateContent($content, $id)->affected_rows > 0) {
    echo "修改成功";
  } else {
    echo "修改失敗";
  }
} else {
  echo "無法修改";
}
