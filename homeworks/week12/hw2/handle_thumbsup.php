<?php
require_once("query.php");
require_once("utils.php");

$db = new Db();
$query = new Query();
$id = $_GET['id'];

$query->checkUser();
$result = $query->checkAddThumbUp($id)->get_result();


if ($result->num_rows > 0) {
  if ($query->deleteThumbsUp($id)) {
    header("Location: ./index.php");
  } else {
    $db->conn->error;
  }
} else {
  if ($query->insertThumbsUp($id)) {
    header("Location: ./index.php");
  } else {
    $db->conn->error;
  }
}





