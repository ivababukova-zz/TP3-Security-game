<?php
session_start();
include_once("connect.php");

$colour = strval($_GET['colour']);

//insert door visits
$sql="INSERT INTO `teamr1415`.`UsersPoliciesCollected` (`uid`, `sid`, `colour`) VALUES ('"
	.$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$colour."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>