<?php
session_start();
include_once("connect.php");

$colour = strval($_GET['colour']);

//insert door visits
$sql="INSERT INTO `teamr1415`.`UsersPoliciesCollected` (`uid`, `sid`, `colour`, `gaid`) VALUES ('"
	.$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$colour."', '".$_SESSION["gaid"]."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>