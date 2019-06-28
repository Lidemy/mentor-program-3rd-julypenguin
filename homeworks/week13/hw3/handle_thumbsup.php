<?php
require_once("query.php");

$db = new Db();
$query = new Query();
$json = file_get_contents('php://input');
$data = json_decode($json);
$id = $data->id;

$query->checkUser();
$result = $query->checkAddThumbUp($id)->get_result();


if ($result->num_rows > 0) {
  if ($query->deleteThumbsUp($id)->affected_rows > 0) {
    echo "取消讚";
  } else {
    echo $db->conn->error;
  }
} else {
  if ($query->insertThumbsUp($id)->insert_id > 0) {
    echo "按讚";
  } else {
    echo $db->conn->error;
  }
}





