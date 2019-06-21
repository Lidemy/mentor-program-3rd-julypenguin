<?php

class Render {
  private $username = "";
  private $pageIndex = 1;

  function __construct($username, $pageIndex) {
    $this->username = $username;
    $this->pageIndex = $pageIndex;
  }

  function subContentStart() {
    echo  "<session class='subContentBox'>
             <div class='next-arror'> >> </div>
           <div class='inner-info__wrapper'>";
  }

  function subContentEnd() {
    echo  "</div> 
         </session>";
  }

  function checkOriginalStart($parentUsername, $contentUsername) {
    if ($parentUsername === $contentUsername) {
      echo  "<div class='inner-info original'>";
    } else {
      echo  "<div class='inner-info'>";
    }
  }

  function checkOriginalEnd() {
    echo  "</div>";
  }

  function nicknameAndEdit($nickname, $contentUsername, $id) {
    echo    "<div class='nameId'>" . escape($nickname) . "</div>";  

    if ($this->username === $contentUsername || $_SERVER['PHP_SELF'] === '/group3/julypenguin/week12/admin.php') {
      echo  "<a href='update.php?page=$this->pageIndex&id=$id' class='edit-icon'><i class='far fa-edit'></i></a>
             <a href='handle_delete.php?id=$id' class='delete-icon'><i class='fas fa-times'></i></a>";
    }
  }

  function socialIconAndContent($content, $id, $count, $createdAt) {
    echo  "<div class='content'>" . escape($content);
    if (isset($_COOKIE['member_id'])) {      
      echo  "<a href='handle_thumbsup.php?id=$id'><i class='far fa-thumbs-up'></i></a>";
    } else {
      echo  "<i class='far fa-thumbs-up'></i>";
    }
    echo    "<span class='thumbsup-number'>" . escape($count) . "</span>
           </div>
           <div class='time'>" . escape($createdAt) . "</div>";
  }

  function innerTextBox($nickname, $layer, $id) {
    if (isset($_COOKIE['member_id'])) {
    echo  "<form class='inner-enterTextBox' action='handle_add_comment.php' method='post'>
            <textarea class='inner-comment' name='content' placeholder='回應 $nickname'></textarea>
            <input type='hidden' name='layer' value=$layer>
            <input type='hidden' name='parent_id' value=$id>
            <input class='inner-submit' type='submit' value='回覆留言' />
          </form>";
    }
  }

  function subContent($row, $layerStart, $layerEnd, $originUser) {
    if ($layerStart > $layerEnd) {
      return;
    }
    $this->innerTextBox($row['nickname'], $layerStart, $row['id']);
  
    $query2 = new Query();
    $result2 = $query2->checkSubContent();
    while ($row2 = $result2->fetch_assoc()) {
      if ($row2['layer'] === (string)$layerStart && (string)$row['id'] === $row2['parent_id']) {
        $this->subContentStart();
        $this->checkOriginalStart($originUser, $row2['username']);
        $this->nicknameAndEdit($row2['nickname'], $row2['username'], $row2['id']);
        $this->socialIconAndContent($row2['content'], $row2['id'], $row2['countNum'], $row2['created_at']);
        $this->checkOriginalEnd();
        $this->subContent($row2, $layerStart+1, $layerEnd, $originUser);
        $this->subContentEnd();
      }
    }
  }
}