<?php
session_start();
include_once("connect.php");


$sql="INSERT INTO `teamr1415`.`UserEdInfoReads` (`uid`, `sid`, `timeopened`, `gaid`)"
	." VALUES ('".$_SESSION["uid"]."', '".$_SESSION["sid"]."', CURRENT_TIMESTAMP, '".$_SESSION["gaid"]."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>