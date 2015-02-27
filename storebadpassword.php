<?php
session_start();
include_once("connect.php");

$did = intval($_GET['did']);

//insert passwords that don't match those set on the doors in the game
$sql="INSERT INTO `teamr1415`.`UsersBadPwdEntries` (`pid`, `uid`, `did`, `sid`) VALUES ('"
	.$_SESSION["currentpid"]."', '".$_SESSION["uid"]."', '".$did."', '".$_SESSION["sid"]."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>