<?php
require_once("query.php");
require_once("utils.php");

$query = new Query();
$id = $_GET['id'];

$query->checkUser();

$query->username === $query->checkContentUsername($id) || $query->checkAdmin() ?
  $query->deleteComment($id) && alertMessage("刪除成功", "./admin.php") : alertMessage("權限不足", "./index.php");



