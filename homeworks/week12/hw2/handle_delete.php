<?php
require_once("query.php");
require_once("utils.php");

$query = new Query();
$id = $_GET['id'];

$query->checkUser();

if ($query->username === $query->checkContentUsername($id) || $query->checkAdmin() ) {
  if($query->deleteComment($id)) {
    alertMessage("刪除成功", "$_SERVER[HTTP_REFERER]");
  }
} else {
  alertMessage("權限不足", "$_SERVER[HTTP_REFERER]");
}



