<?php 
session_start();
include_once("connect.php");
echo $_SESSION['userstatus']; 
mysqli_close($conn);
?>