<?php
require_once("query.php");
require_once("utils.php");

$db = new Db();
$query = new Query();
$id = $_GET['id'];

$query->checkUser();
$result = $query->checkAddThumbUp($id)->get_result();


if ($result->num_rows > 0) {
  if ($query->deleteThumbsUp($id)->affected_rows > 0) {
    header("Location: ./index.php");
  } else {
    print_r($db->conn->error);
  }
} else {
  if ($query->insertThumbsUp($id)->insert_id > 0) {
    header("Location: ./index.php");
  } else {
    print_r($db->conn->error);
  }
}





