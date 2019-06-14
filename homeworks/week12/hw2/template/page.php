<?php
$query->checkPage();

if ($query->pageIndex > 1) {
  echo "<a href='?page=$query->prePage' class='page pageNum'> < </a>";
} else {
  echo  "<div class='page no-allow '> < </div>",
        "<div class='etc'>...</div>";
}

for ($i=1; $i <= $query->pages; $i++) {
  echo ($i === $query->pageIndex) ? 
        "<a href='?page=$i' class='pageNum page current'>$i</a>" :
        "<a href='?page=$i' class='pageNum page'>$i</a>";
}

echo    "<div class='etc'>...</div>";

if ($query->pageIndex < $query->pages) {
  echo  "<a href='?page=$query->nextPage' class='page pageNum'> > </a>";
} else {
  echo "<div class='page no-allow '> > </div>";
}

?>