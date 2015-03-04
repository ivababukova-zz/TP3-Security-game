<?php
session_start();
include_once("connect.php");

$cid = strval($_GET['cid']);

//insert door visits
$sql="INSERT INTO `teamr1415`.`UsersEducationalInfoCollected` (`uid`, `sid`, `cid`, `gaid`) VALUES ('"
	.$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$cid."', '".$_SESSION["gaid"]."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>