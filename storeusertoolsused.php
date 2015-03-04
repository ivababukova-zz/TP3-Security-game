<?php
session_start();
include_once("connect.php");

//Get tool id
$tid = intval($_GET['tid']);

//SQL to insert into the usertools used table
$sql="INSERT INTO `teamr1415`.`UsersToolsUsed` (`uid`, `sid`, `tid`) VALUES ('".$$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$tid."')";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>