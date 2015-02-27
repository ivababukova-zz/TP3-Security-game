<?php
session_start();
include_once("connect.php");

$tid = strval($_GET['tid']);

//insert door visits
$sql="INSERT INTO `teamr1415`.`UsersToolsCollected` (`uid`, `sid`, `tid`) VALUES ('"
	.$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$tid."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>