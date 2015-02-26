<?php 
session_start();
include_once("connect.php");

if ($_SESSION['userstatus'] == "exists"){

	$sql="UPDATE `teamr1415`.`GameSessions` SET `endtime` = CURRENT_TIMESTAMP WHERE `sid` = '"
	.$_SESSION["sid"]."';";

	mysqli_query($conn,$sql);
	// remove all session variables
	session_unset();
	// destroy the session
	session_destroy(); 
}
echo $_SESSION['userstatus']; 
mysqli_close($conn);
?>