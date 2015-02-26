<?php
session_start();
include_once("connect.php");

//Get questionnare results
$a1 = strval($_GET['a1']);
$a2 = strval($_GET['a2']);
$a3 = strval($_GET['a3']);
$a4 = strval($_GET['a4']);
$a5 = strval($_GET['a5']);
$a6 = strval($_GET['a6']);
$a7 = strval($_GET['a7']);
$a8 = strval($_GET['a8']);
$a9 = strval($_GET['a9']);
$a10 = strval($_GET['a10']);
$a11 = strval($_GET['a11']);
$a12 = strval($_GET['a12']);
$a13 = strval($_GET['a13']);
$a14 = strval($_GET['a14']);
$a15 = strval($_GET['a15']);
$a16 = strval($_GET['a16']);
$a17 = strval($_GET['a17']);

//SQL to write the last set of questions to the DB
$sql="INSERT INTO `teamr1415`.`AnswersAfter` (`uid`, `sid`, `a1`, `a2`, `a3`, `a4`, `a5`, `a6`,"
	." `a7`, `a8`, `a9`, `a10`, `a11`, `a12`, `a13`, `a14`, `a15`, `a16`, `a17`)"
	." VALUES ('".$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$a1."', '".$a2."', '".$a3."', '"
		.$a4."', '".$a5."', '".$a6."', '".$a7."', '".$a8."', '".$a9."', '".$a10."', '".$a11."', '"
		.$a12."', '".$a13."', '".$a14."', '".$a15."', '".$a16."', '".$a17."');";

mysqli_query($conn,$sql);

//update the Game session table as ended
$sql="UPDATE `teamr1415`.`GameSessions` SET `endtime` = CURRENT_TIMESTAMP WHERE `sid` = '"
	.$_SESSION["sid"]."';";

mysqli_query($conn,$sql);

mysqli_close($conn);

// remove all session variables
session_unset();

// destroy the session
session_destroy(); 
?>