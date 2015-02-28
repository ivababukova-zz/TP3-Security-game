<?php
session_start();
include_once("connect.php");

$did = intval($_GET['did']);
$penalty = intval($_GET['penalty']);
//insert passwords that are entered successfully
$sql="INSERT INTO `teamr1415`.`UserPasswordsResets` (`uid`, `sid`, `did`, `penalty`) VALUES ('"
	.$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$did."', '".$penalty."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>