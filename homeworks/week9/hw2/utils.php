<?php

function alertMessage($message, $location) {
  echo "<script> alert('$message');
        window.location = '$location' </script>";
}



