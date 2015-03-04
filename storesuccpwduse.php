<?php
session_start();
include_once("connect.php");

$did = intval($_GET['did']);

//insert door visits
$sql="INSERT INTO `teamr1415`.`UsersSuccessfulPasswordUse` (`uid`, `sid`, `did`, `gaid`) VALUES ('"
	.$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$did."', '".$_SESSION["gaid"]."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>