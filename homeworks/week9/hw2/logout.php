<?php
setcookie("member_id", "", time()-3600);
header("Location: ./index.php");
?>