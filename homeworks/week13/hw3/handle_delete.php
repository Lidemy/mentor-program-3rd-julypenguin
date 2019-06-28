<?php
require_once("query.php");

$query = new Query();
$json = file_get_contents('php://input');
$data = json_decode($json);
$id = $data->id;

$query->checkUser();

if ($query->username === $query->checkContentUsername($id) || $query->checkAdmin() ) {
  if($query->deleteComment($id)) {
    echo "刪除成功";
  }
} else {
  echo "權限不足";
}



