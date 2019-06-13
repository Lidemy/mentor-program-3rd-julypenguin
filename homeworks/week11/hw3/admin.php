<?php
require_once("query.php");
$query = new Query();
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>admin</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"/>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="wrapper">
    <header class="header">
      <nav class="nav">
        <?php 
          include_once("template/navbar.php"); 
          if (!($query->checkAdmin())) {
            header("Location: ./index.php");
          }
        ?>
        <div class="clearfix"></div>
      </nav>
      <h1 class="manage">後台管理</h1>
    </header>
    <article class="article">
      <section class="pageBox">
        <?php include_once('template/page.php')?>
      </section>
      <section class="contentBox">
        <?php include_once('template/content.php')?>
      </section>
    </article>
  </div>
</body>
</html>