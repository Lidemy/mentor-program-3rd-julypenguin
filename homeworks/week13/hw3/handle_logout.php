<?php
require_once("query.php");

$query = new Query();
$query->checkUser();

unset($_SESSION["member_id"]);
header("Location: ./index.php");
?>