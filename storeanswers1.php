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
$a18 = strval($_GET['a18']);
$a19 = strval($_GET['a19']);
$a20 = strval($_GET['a20']);
$a21 = strval($_GET['a21']);
$a22 = strval($_GET['a22']);
$a23 = strval($_GET['a23']);
$a24 = strval($_GET['a24']);
$a25 = strval($_GET['a25']);
$a26 = strval($_GET['a26']);
$a27 = strval($_GET['a27']);
$a28 = strval($_GET['a28']);
$a29 = strval($_GET['a29']);
$a30 = strval($_GET['a30']);
$a31 = strval($_GET['a31']);
$a32 = strval($_GET['a32']);
$a33 = strval($_GET['a33']);
$a34 = strval($_GET['a34']);
$a35 = strval($_GET['a35']);
$a36 = strval($_GET['a36']);
$a37 = strval($_GET['a37']);
$a38 = strval($_GET['a38']);



$sql="INSERT INTO `teamr1415`.`AnswersBefore` (`uid`, `sid`, `a1`, `a2`, `a3`, `a4`, `a5`, `a6`,"
	." `a7`, `a8`, `a9`, `a10`, `a11`, `a12`, `a13`, `a14`, `a15`, `a16`, `a17`, `a18`,"
	." `a19`, `a20`, `a21`, `a22`, `a23`, `a24`, `a25`, `a26`, `a27`, `a28`, `a29`, `a30`,"
	." `a31`, `a32`, `a33`, `a34`, `a35`, `a36`, `a37`, `a38`)"
	." VALUES ('".$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$a1."', '".$a2."', '".$a3."', '"
		.$a4."', '".$a5."', '".$a6."', '".$a7."', '".$a8."', '".$a9."', '".$a10."', '".$a11."', '"
		.$a12."', '".$a13."', '".$a14."', '".$a15."', '".$a16."', '".$a17."', '".$a18."', '"
		.$a19."', '".$a20."', '".$a21."', '".$a22."', '".$a23."', '".$a24."', '".$a25."', '"
		.$a26."', '".$a27."', '".$a28."', '".$a29."', '".$a30."', '".$a31."', '".$a32."', '"
		.$a33."', '".$a34."', '".$a35."', '".$a36."', '".$a37."', '".$a38."');";
mysqli_query($conn,$sql);
//Update to say we have the 1st questionnaire results for this user
$sql="UPDATE `User` SET `q1` = 1 WHERE `uid` = '".$_SESSION["uid"]."';";
mysqli_query($conn,$sql);
//close connection
mysqli_close($conn);
?>