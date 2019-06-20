<?php
require_once("query.php");
require_once("utils.php");

$db = new Db();
$query = new Query();
$authority = $_POST['authority'];
$username = $_POST['username'];
$query->checkUser();


if ($query->checkSuperAdmin()) {
  if ($query->updateAuthorization($authority, $username)->affected_rows > 0) {
    alertMessage("修改成功", "./authorization.php");
  } else {
    alertMessage("$db->conn->error", "./authorization.php");
  }
} else {
  header("Location: ./index.php");
}