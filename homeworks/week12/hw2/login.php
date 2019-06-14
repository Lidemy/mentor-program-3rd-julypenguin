<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>登入</title>
  <link rel="stylesheet" href="./css/normalize.css">
  <link rel="stylesheet" href="./css/register.css">
</head>
<body>
  <div class="wrapper">
    <article class="article">
    <h2 class="title">會員登入</h2>
    <form class="userBox" action="handle_login.php" method="post">
      <label for="username">帳號：<input type="text" name="username" id="username"></label>
      <label for="password">密碼：<input type="password" name="password" id="password"></label>
      <input class="submit" type="submit" value="登入">
      <div class="clearfix"></div>
    </form>
    <a class="" href="register.php">還不是會員？</a>
    </article>
  </div>
</body>
</html>