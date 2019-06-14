<?php 
require_once("utils.php");

if (isset($_COOKIE["member_id"])) {
  $query->checkUser();
  echo  "<a href='logout.php'><div class='sign'>登出</div></a>
         <div class='user'>" . escape($query->nickname) . "</div>";
  echo $_SERVER['PHP_SELF'] !== '/group3/julypenguin/week12/index.php' ?
        "<a href='index.php' class='sign'>回到首頁</a>" : "";
  echo $_SERVER['PHP_SELF'] !== '/group3/julypenguin/week12/admin.php' && $query->checkAdmin() ?
        "<a href='admin.php' class='sign'>後台管理</a>" : "";
  echo $_SERVER['PHP_SELF'] !== '/group3/julypenguin/week12/authorization.php' && $query->checkSuperAdmin() ?
        "<a href='authorization.php' class='sign'>權限管理</a>" : "";
} else {
  echo  "<a href='register.php'><div class='sign'>加入會員</div></a>
         <a href='login.php'><div class='sign'>登入</div></a>";
}
?>