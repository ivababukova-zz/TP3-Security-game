<?php
session_start();
include_once("connect.php");

//Get tool id
$tid = intval($_GET['tid']);
//Get whether or not successful
$success = intval($_GET['success']);

//SQL to insert into the usertools used table
$sql="INSERT INTO `teamr1415`.`UsersToolsUsed` (`uid`, `sid`, `tid`, `success`, `gaid`) VALUES ('"
	.$$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$tid."', '".$success."', '".$_SESSION["gaid"]."')";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>