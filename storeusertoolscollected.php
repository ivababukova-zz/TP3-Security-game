<?php
session_start();
include_once("connect.php");

$tid = strval($_GET['tid']);

//insert door visits
$sql="INSERT INTO `teamr1415`.`UsersToolsCollected` (`uid`, `sid`, `tid`, `gaid`) VALUES ('"
	.$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$tid."', '".$_SESSION["gaid"]."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>