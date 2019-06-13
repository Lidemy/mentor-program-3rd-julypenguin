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
  <title>權限管理</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"/>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="wrapper">
    <header class="header">
      <nav class="nav">
        <?php 
          include_once("template/navbar.php"); 
          if(!($query->checkSuperAdmin())) {
            header("Location: ./index.php");
          }
        ?>
        <div class="clearfix"></div>
      </nav>
      <h1 class="manage">權限管理</h1>
    </header>
    <article class="countainer">
      <?php
        $result = $query->checkUserInfo();
        while ($row = $result->fetch_assoc()) {
          if ($row['classification'] !== 'super_admin') {
            echo "<section class='userinfo-box'>
                    <div class='avatar-box'>
                      <i class='fas fa-user-circle'></i>
                    </div>
                    <div class='user-box'>
                      <div class='nickname-box'>暱稱：<div class='nickname'>$row[nickname]</div>
                      <div class='username-box'> 帳號：<div class='username'>$row[username]</div>
                      <div class='count-box'>留言數：<div class='count'>$row[content]</div>
                      <form action='handle_authorization.php' method='post'>
                        <div class='authority__title'>權限：</div>
                        <select class='authority-box' name='authority'>",
              $row['classification'] === 'normal' ?
                         "<option value='normal' selected>normal</option>
                          <option value='admin'>admin</option>" :
                         "<option value='normal'>normal</option>
                          <option value='admin' selected>admin</option>",
                       "</select>
                        <input type='hidden' name='username' value='$row[username]'> 
                        <input type='submit' value='確定'>
                      </form>
                    </div>
                  </section>";
          }
        }      
      ?>
    </article>
  </div>