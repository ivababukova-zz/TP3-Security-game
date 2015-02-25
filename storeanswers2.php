<?php
include_once("connect.php");

//Get questionnare results - NEED TO ADD IN WHAT TYPE THEY ARE: strval, intval, floatval ....
$a1 = val($_GET['a1']);
$a2 = val($_GET['a2']);
$a3 = val($_GET['a3']);
$a4 = val($_GET['a4']);
$a5 = val($_GET['a5']);
$a6 = val($_GET['a6']);
$a7 = val($_GET['a7']);
$a8 = val($_GET['a8']);
$a9 = val($_GET['a9']);
$a10 = val($_GET['a10']);
$a11 = val($_GET['a11']);
$a12 = val($_GET['a12']);
$a13 = val($_GET['a13']);
$a14 = val($_GET['a14']);
$a15 = val($_GET['a15']);
$a16 = val($_GET['a16']);
$a17 = val($_GET['a17']);


//Generate SQL for results insert
$sql="INSERT INTO `teamr1415`.`AnswersAfter` (`a1`, `a2`, `a3`, `a4`, `a5`, `a6`,"
	." `a7`, `a8`, `a9`, `a10`, `a11`, `a12`, `a13`, `a14`, `a15`, `a16`, `a17`)"
	." VALUES ('".$a1."', '".$a2."', '".$a3."', '".$a4."', '".$a5."', '".$a6."', '"
		.$a7."', '".$a8."', '".$a9."', '".$a10."', '".$a11."', '".$a12."', '".$a13."', '"
		.$a14."', '".$a15."', '".$a16."', '".$a17."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>