<?php
require_once('conn.php');

$db = new Db();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>message_board</title>
  <link rel="stylesheet" href="normalize.css">
  <link rel="stylesheet" href="./css/style.css">
</head>

<body>
  <h1 class="danger">「本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼」</h1>

  <div class="wrapper">
    <header class="header">
      <nav class="nav">
        <?php 
          if (isset($_COOKIE["member_id"])) {
            $sql = "SELECT * FROM julypenguin_users WHERE username = '$_COOKIE[member_id]'";
            $result = $db->query($sql);
            $row = $result->fetch_assoc();
            echo "<a href='logout.php'><div class='sign'>登出</div></a>
                  <div class='user'>$row[nickname]</div>";
          } else {
            echo "<a href='register.php'><div class='sign'>加入會員</div></a>
                  <a href='login.php'><div class='sign'>登入</div></a>";
          }
        ?>
        <div class="clearfix"></div>
      </nav>
    </header>
    <article class="article">
      <section>
        <h2>歡迎留言</h2>
        <form class="enterTextBox" action="handle_add_comment.php" method="post">
          </label>
          <textarea
            class="comment"
            name="content"
            placeholder="想說些什麼嗎？"
          ></textarea>
          <?php 
            echo (isset($_COOKIE["member_id"]))?
              "<input class='submit' type='submit' value='送出!' />" :
              "<div class='submit'>請先登入會員</div>";
          ?>
        </form>
        <div class="clearfix"></div>
      </section>
      <?php
      $sql = "SELECT C.content, C.created_at, U.nickname FROM julypenguin_comments C LEFT JOIN julypenguin_users U ON C.username = U.username ORDER BY created_at DESC";
      $result = $db->query($sql);
      $number = $result->num_rows;
      if ($number > 0) {
        $number = ($number>50) ? 50 : $number;
        for ($i=0; $i < $number; $i++) { 
          $row = $result->fetch_assoc();
          echo "<section class='messageBox'>
                  <div class='nameId'>$row[nickname]</div>
                  <div class='content'>$row[content]</div>
                  <div class='time'>$row[created_at]</div>
                </section>";
        }
      }
      ?>
    </article>
  </div>
</body>

</html>