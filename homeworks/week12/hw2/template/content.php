<?php
require_once("render.php");

$render = new Render($query->username, $query->pageIndex);

$result = $query->checkContent()->get_result();
while($row = $result->fetch_assoc()) {
  if ($row['layer'] === 1) {
    echo  "<section class='message-box'>";
    $render->nicknameAndEdit($row['nickname'], $row['username'], $row['id']);
    $render->socialIconAndContent($row['content'], $row['id'], $row['countNum'], $row['created_at']);
    $render->subContent($row, 2, 5, $row['username']);
    echo "</section>";
  }       
}
?>