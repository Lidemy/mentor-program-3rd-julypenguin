<?php
require_once("query.php");

function escape($str) {
  return  htmlspecialchars($str, ENT_QUOTES, 'utf-8');
}

function fetchAndRename($result) {
  $newKeyName = ['id', 'content', 'state', 'createTime'];
  $rows = [];

  while($row = $result->fetch_assoc()) {
    $newRow = array_combine($newKeyName,$row);
    array_push($rows, array_map('escape', $newRow));
  }
  echo json_encode($rows, JSON_UNESCAPED_UNICODE);
}

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'));
$content = '';
$state = '';
$id = '';

if ($data && array_key_exists('content', $data)) {
  $reg = "/([\S])/";
  $content = $data->content;
  !preg_match($reg, $content) && exit();

}

if ($data && array_key_exists('state', $data)) {
  $state = $data->state;
}

if (isset($_SERVER['PATH_INFO'])) {
  $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
  $id = array_shift($request);
}

$query = new Query($id);

if ($id) {
  switch ($method) {
    case 'GET':
      $result = $query->checkTodo()->get_result();
      fetchAndRename($result);
      break;
    case 'POST':
      $query->postTodo($content);
      break;
    case 'PATCH':
      if ($content) {
        $query->updateTodo($content);
      }
      if ($state) {
        $query->updateState($state);   
      }
      break;
    case 'DELETE':
      $query->delTodo();
      break;
    default:
      break;
  }
} else {
  switch ($method) {
    case 'GET':
      $result = $query->checkTodo();
      fetchAndRename($result);
      break;
    case 'POST':
      $query->postTodo($content);
      break;
    default:
      break;
  }
}
