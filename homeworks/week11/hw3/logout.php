<?php
require_once("query.php");

$query = new Query();
$query->checkUser();

setcookie("member_id", "", time()-3600, "/", "mentor-program.co");
$query->deleteCertificate($query->username);
header("Location: ./index.php");
?>