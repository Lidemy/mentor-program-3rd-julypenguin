<?php
require_once("query.php");
require_once('utils.php');
$query = new Query();
$query->checkUser();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>權限管理</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"/>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
  <script src="js/script.js"></script>
</head>
<body>
  <div class="wrapper admin">
    <header class="nav justify-content-end">
      <nav class="nav-item">
        <div class="clearfix"></div>
      </nav>
    </header>
    <div class="manage-div"><h1 class="manage">權限管理</h1></div>
    <article class="authorization-wrapper">
    </article>
  </div>