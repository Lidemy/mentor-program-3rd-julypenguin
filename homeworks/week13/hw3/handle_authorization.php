<?php
require_once("query.php");

$db = new Db();
$query = new Query();

$json = file_get_contents('php://input');
$data = json_decode($json);
$authority = $data->authority;
$username = $data->username;
$query->checkUser();


if ($query->checkSuperAdmin()) {
  if ($query->updateAuthorization($authority, $username)->affected_rows > 0) {
    echo "修改成功";
  } else {
    echo "錯誤 $db->conn->error";
  }
} else {
  header("Location: ./index.php");
}