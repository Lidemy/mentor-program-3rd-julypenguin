<?php
require_once('query.php');
$db = new Db();
$query = new Query();
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
  <h1 class="danger">「本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼」</h1>

  <div class="wrapper">
    <header class="header">
      <nav class="nav">
        <?php include_once("template/navbar.php"); ?>
        <div class="clearfix"></div>
      </nav>
    </header>
    <article class="article">
      <section>
        <h2>歡迎留言</h2>
        <form class="enterTextBox" action="handle_add_comment.php" method="post">
          <textarea class="comment" name="content" placeholder="想說些什麼嗎？"></textarea>
          <input type='hidden' name='layer' value='<?php echo 1; ?>'>
          <input type='hidden' name='parent_id' value='<?php echo 0; ?>' >
          <?php 
            echo (isset($_COOKIE["member_id"]))?
              "<input class='submit' type='submit' value='送出!' />" :
              "<div class='submit'>請先登入會員</div>";
          ?>
        </form>
        <div class="clearfix"></div>
      </section>
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