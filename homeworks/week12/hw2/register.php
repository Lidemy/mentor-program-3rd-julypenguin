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
    <h2 class="title">會員註冊</h2>
    <form class="userBox" action="handle_register.php" method="post">
      <label for="nickname">暱稱：<input type="text" name="nickname" id="nickname"></label>
      <label for="username">帳號：<input type="text" name="username" id="username" placeholder="請勿填真實帳號"></label>
      <label for="password">密碼：<input type="password" name="password" id="password" placeholder="請勿填真實密碼"></label>
      <input class="submit" type="submit" value="註冊">
      <div class="clearfix"></div>
    </form>
    <a class="" href="login.php">已是會員？</a>
    </article>
  </div>
</body>
</html>