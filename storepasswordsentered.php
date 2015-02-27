<?php
session_start();
include_once("connect.php");

$did = intval($_GET['did']);
$scorereceived = intval($_GET['scorereceived'])
//insert passwords that didn't conform to the door's policy
$sql="INSERT INTO `teamr1415`.`UsersPasswords` (`pid`, `uid`, `did`, `sid`, `scorereceived`) VALUES ('"
	.$_SESSION["currentpid"]."', '".$_SESSION["uid"]."', '".$did."', '".$_SESSION["sid"]."', '".$scorereceived."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>