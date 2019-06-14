<?php
require_once("render.php");
$render = new Render($query->username, $query->pageIndex);

$result = $query->checkContent()->get_result();
while($row = $result->fetch_assoc()) {
  if ($row['layer'] === 1) {
    echo  "<section class='message-box'>
            <div class='nameId'>" . escape($row['nickname']) . "</div>";
    if ($query->username === $row['username'] || $_SERVER['PHP_SELF'] === '/group3/julypenguin/week12/admin.php') {
      echo  "<a href='update.php?page=$query->pageIndex&id=$row[id]' class='edit-icon'><i class='far fa-edit'></i></a>
             <a href='handle_delete.php?id=$row[id]' class='delete-icon'><i class='fas fa-times'></i></a>";
    }
    echo    "<div class='content'>" . escape($row['content']);
    if (isset($_COOKIE["member_id"])) {      
      echo    "<a href='handle_thumbsup.php?id=$row[id]'><i class='far fa-thumbs-up'></i></a>";
    } else {
      echo    "<i class='far fa-thumbs-up'></i>";
    }       
      echo    "<span class='thumbsup-number'>$row[countNum]</span>
             </div>
             <div class='time'>" . escape($row['created_at']) . "</div>";

    if (isset($_COOKIE['member_id'])) {
      $render->innerTextBox($row['nickname'], 2, $row['id']);
    }

    $query2 = new Query();
    $result2 = $query2->checkSubContent();           
    while ($row2 = $result2->fetch_assoc()) {
      echo $row['id'] === $row2['parent_id'];
      if ($row2['layer'] === '2' && (string)$row['id'] === $row2['parent_id']) {
        $render->subContentStart();
        $render->checkOriginalStart($row['username'], $row2['username']);
        $render->nicknameAndEdit($row2['nickname'], $row2['username'], $row2['id']);
        $render->socialIconAndContent($row2['content'], $row2['id'], $row2['countNum'], $row2['created_at']);
        $render->checkOriginalEnd();

        if (isset($_COOKIE['member_id'])) {
          $render->innerTextBox($row2['nickname'], 3, $row2['id'] );
        }

        $query3 = new Query();
        $result3 = $query3->checkSubContent();  
        while ($row3 = $result3->fetch_assoc()) {
          if ($row3['layer'] === '3' && (string)$row2['id'] === $row3['parent_id']) {
            $render->subContentStart();
            $render->checkOriginalStart($row['username'], $row3['username']);
            $render->nicknameAndEdit($row3['nickname'], $row3['username'], $row3['id']);
            $render->socialIconAndContent($row3['content'], $row3['id'], $row3['countNum'], $row3['created_at']);
            $render->checkOriginalEnd(); 

            if (isset($_COOKIE['member_id'])) {
              $render->innerTextBox($row3['nickname'], 4, $row3['id'] );
            }

            $query4 = new Query();
            $result4 = $query4->checkSubContent();  
            while ($row4 = $result4->fetch_assoc()) {
              if ($row4['layer'] === '4' && (string)$row3['id'] === $row4['parent_id']) {
                $render->subContentStart();
                $render->checkOriginalStart($row['username'], $row4['username']);
                $render->nicknameAndEdit($row4['nickname'], $row4['username'], $row4['id']);
                $render->socialIconAndContent($row4['content'], $row4['id'], $row4['countNum'], $row4['created_at']);
                $render->checkOriginalEnd(); 
    
                if (isset($_COOKIE['member_id'])) {
                  $render->innerTextBox($row4['nickname'], 5, $row4['id'] );
                }

                $query5 = new Query();
                $result5 = $query5->checkSubContent();  
                while ($row5 = $result5->fetch_assoc()) {
                  if ($row5['layer'] === '5' && (string)$row4['id'] === $row5['parent_id']) {
                    $render->subContentStart();
                    $render->checkOriginalStart($row['username'], $row5['username']);
                    $render->nicknameAndEdit($row5['nickname'], $row5['username'], $row5['id']);
                    $render->socialIconAndContent($row5['content'], $row5['id'], $row5['countNum'], $row5['created_at']);
                    $render->checkOriginalEnd(); 
                    $render->subContentEnd();
                  }
                } 
                $render->subContentEnd();
              }
            } 
            $render->subContentEnd();
          }
        }      
        $render->subContentEnd();
      }      
    }
    echo "</section>";
  }       
}
?>