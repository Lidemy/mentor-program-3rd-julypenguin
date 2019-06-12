<?php
$result = $query->checkContent();
while($row = $result->fetch_assoc()) {
  echo  "<section class='message-box'>
           <div class='nameId'>$row[nickname]</div>",
    ($query->username === $row['username'] || $_SERVER['PHP_SELF'] === '/group3/julypenguin/week11/admin.php') ?
          "<a href='update.php?page=$query->pageIndex&id=$row[id]'><i class='far fa-edit'></i></a>
           <a href='handle_delete.php?id=$row[id]'><i class='fas fa-times'></i></a>" : "",
          "<div class='content'>$row[content]</div>
           <div class='time'>$row[created_at]</div>
         </section>";
}
?>