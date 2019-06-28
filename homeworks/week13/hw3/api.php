<?php
require_once("query.php");
require_once("utils.php");

function subContentApi($row, $layerStart, $layerEnd) {
  $subRow = $row;
  $query2 = new query();
  $result2 = $query2->checkSubContent();
  $index = 1;
  while ($row2 = $result2->fetch_assoc()) {
    if ($row2['layer'] === (string)$layerStart && (string)$row['id'] === $row2['parent_id']) {
      $subRow['subContent' . $index] = array_map('escape', $row2);
      if ($layerStart + 1 <= $layerEnd) {
        $subRow['subContent' . $index] = subContentApi($subRow['subContent' . $index], $layerStart + 1, $layerEnd);
      }
      $index++;
    }
  }
  return $subRow;
}

$query = new query();
$query->checkUser();

if (isset($_GET['checkUser'])) {
  if (isset($_SESSION["member_id"])) {
    $checkUser = [ 
      'username' => $query->username, 
      'nickname' => $query->nickname, 
      'admin' => $query->checkAdmin(), 
      'superAdmin' => $query->checkSuperAdmin() 
    ];
    echo json_encode(array_map('escape',$checkUser), JSON_UNESCAPED_UNICODE);
  } else {
    return;
  }
} else if (isset($_GET['userInfo'])) {
  if ($query->checkSuperAdmin()) {
    $resultUserInfo = $query->checkUserInfo();
    $rowUserInfos = [];
    while ($rowUserInfo = $resultUserInfo->fetch_assoc()) {
      array_push($rowUserInfos, array_map('escape', $rowUserInfo));
    }
    echo json_encode($rowUserInfos, JSON_UNESCAPED_UNICODE);
  }
} else {
  $query->checkPage();
  $result = $query->checkContent()->get_result();
  $rows = [];
  while ($row = $result->fetch_assoc()) {
    array_push($rows, subContentApi(array_map('escape', $row), 2, 5));
  }
  echo json_encode($rows, JSON_UNESCAPED_UNICODE);
}




