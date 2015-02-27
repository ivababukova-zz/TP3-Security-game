<?php
session_start();
include_once("connect.php");

$did = intval($_GET['did']);

//insert passwords that didn't conform to the door's policy
$sql="INSERT INTO `teamr1415`.`UserFailedPasswordAttempts` (`pid`, `uid`, `did`, `sid`) VALUES ('"
	.$_SESSION["currentpid"]."', '".$_SESSION["uid"]."', '".$did."', '".$_SESSION["sid"]."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>