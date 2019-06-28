<?php
require_once("query.php");

$db = new Db();
$query = new Query();

$json = file_get_contents('php://input');
$data = json_decode($json);
$content = $data->content;
$layer = $data->layer;
$parentId = $data->id;
$query->checkUser();

if (!empty($content)) {
  if ($query->insertComments($query->username, $layer, $parentId, $content)->insert_id > 0) {
    echo '留言成功';
  } else {
    echo '錯誤';
  }
} else {
  echo '請輸入文字';
}


