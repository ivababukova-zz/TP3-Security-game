<?php 
session_start();
include_once("connect.php");

$won = strval($_GET['won']);
$finalscore = intval($_GET['finalscore']);

if ($won = "yes"){
	//Update user game session table with final score and successful result
	$sql="UPDATE `teamr1415`.`UserGameAttempts` SET `overallscore` = '"
	.$finalscore."', `success` = 1, `endtime` = CURRENT_TIMESTAMP WHERE `uid` = '".$_SESSION["uid"]."' AND `sid` = '".$_SESSION["sid"]."' AND `gaid` = '".$_SESSION["gaid"]."';";
	mysqli_query($conn,$sql);
} else {
	//Update user game session table with final score and unsuccessful result
	$sql="UPDATE `teamr1415`.`UserGameAttempts` SET `overallscore` = '"
	.$finalscore."', `success` = 0, `endtime` = CURRENT_TIMESTAMP WHERE `uid` = '".$_SESSION["uid"]."' AND `sid` = '".$_SESSION["sid"]."' AND `gaid` = '".$_SESSION["gaid"]."';";
	mysqli_query($conn,$sql);
}



if ($_SESSION['userstatus'] == "exists"){

	$sql="UPDATE `teamr1415`.`GameSessions` SET `endtime` = CURRENT_TIMESTAMP WHERE `sid` = '"
	.$_SESSION["sid"]."';";

	mysqli_query($conn,$sql);
	// remove all session variables
	session_unset();
	// destroy the session
	session_destroy(); 
}
echo $_SESSION['q2']; 
mysqli_close($conn);
?>