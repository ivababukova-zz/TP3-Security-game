<?php
session_start();
include_once("connect.php");


//SQL to write the last set of questions to the DB
$sql="INSERT INTO `teamr1415`.`UserGameAttempts` (`uid`, `sid`, `gaid`, starttime)"
	." VALUES ('".$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$_SESSION["gaid"]."', CURRENT_TIMESTAMP);";

mysqli_query($conn,$sql);

mysqli_close($conn);
?>