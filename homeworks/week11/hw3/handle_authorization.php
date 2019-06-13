<?php
require_once("query.php");
require_once("utils.php");

$db = new Db();
$query = new Query();
$authority = $_POST['authority'];
$username = $_POST['username'];
$query->checkUser();

if ($query->checkSuperAdmin()) {
  $query->updateAuthorization($authority, $username) ?
  alertMessage("修改成功", "./authorization.php") :
  alertMessage("$db->conn->error", "./authorization.php");
} else {
  header("Location: ./index.php");
}

?>