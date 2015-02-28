<?php
session_start();
include_once("connect.php");

$did = intval($_GET['did']);
$score = intval($_GET['score']);
//insert passwords that are entered successfully
$sql="INSERT INTO `teamr1415`.`UsersPasswords` (`uid`, `pid`, `sid`, `did`, `scorereceived`, `timestamp`) VALUES ('".$_SESSION["uid"]."', '".$_SESSION["currentpid"]."', '".$_SESSION["sid"]."', '".$did."', ".$score.", CURRENT_TIMESTAMP);";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>