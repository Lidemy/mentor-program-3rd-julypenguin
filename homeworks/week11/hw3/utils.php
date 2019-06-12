<?php

function alertMessage($message, $location) {
  echo "<script> alert('$message');
        window.location = '$location' </script>";
}

function randomString() {
  $randomLength=20;
  $random = '';
  for ($i=1; $i <=$randomLength; $i++) { 
    $category = rand(1, 3);
    $category === 1 && ($randomChar = rand(97, 122));
    $category === 2 && ($randomChar = rand(65, 90));
    $category === 3 && ($randomChar = rand(45, 57));
    $addChar = chr($randomChar);
    $random = $random . $addChar;
  }
  return $random;
}





