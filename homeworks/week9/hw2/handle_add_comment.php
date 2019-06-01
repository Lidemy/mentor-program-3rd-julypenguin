<?php
require_once("conn.php");

$db = new Db();
$content = $_POST['content'];
$username = $_COOKIE["member_id"];

if (empty($content)) {
  die('empty data');
}

$sql = "INSERT INTO julypenguin_comments(username, content) VALUE('$username', '$content')";
$result = $db->conn->query($sql);
if ($result) {
  header("Location: ./index.php");
} else {
  die("failed. " . $db->conn->error);
}