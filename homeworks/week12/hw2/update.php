<?php
require_once("query.php");
$query = new Query();
$id = $_GET['id'];
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>message_board</title>
  <link rel="stylesheet" href="./css/normalize.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"/>
  <link rel="stylesheet" href="./css/style.css">
</head>

<body>
    <header class="header">
      <h1 class='manage update__title'>編輯留言</h1>
    </header>
    <article class="article">
      <?php
      $result = $query->checkSubContent();
      while($row = $result->fetch_assoc()) {
        if ($id === $row['id']) {
        echo   "<section class='message-box'>
                  <div class='nameId'>$row[nickname]</div>
                  <form class='update-content' action='handle_update.php' method='post'>
                    <textarea name='content' cols='91' rows='10'>$row[content]</textarea>
                    <input type='hidden' name='id' value='$id'>
                    <div class='edit-box'>
                      <input class='edit-btn' type='submit' value='確認'>
                      <a href='index.php'><span class='edit-btn'>取消</span></a>
                    </div>
                  </form>
                  <div class='time'>$row[created_at]</div>
                </section>";
          }
      }
      ?>
    </article>
  </div>
</body>

</html>