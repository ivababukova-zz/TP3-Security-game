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
$a18 = val($_GET['a18']);
$a19 = val($_GET['a19']);
$a20 = val($_GET['a20']);
$a21 = val($_GET['a21']);
$a22 = val($_GET['a22']);
$a23 = val($_GET['a23']);
$a24 = val($_GET['a24']);
$a25 = val($_GET['a25']);
$a26 = val($_GET['a26']);
$a27 = val($_GET['a27']);
$a28 = val($_GET['a28']);
$a29 = val($_GET['a29']);
$a30 = val($_GET['a30']);
$a31 = val($_GET['a31']);
$a32 = val($_GET['a32']);
$a33 = val($_GET['a33']);

//Generate SQL for results insert
$sql="INSERT INTO `teamr1415`.`AnswersBefore` (`a1`, `a2`, `a3`, `a4`, `a5`, `a6`,"
	." `a7`, `a8`, `a9`, `a10`, `a11`, `a12`, `a13`, `a14`, `a15`, `a16`, `a17`, `a18`,"
	." `a19`, `a20`, `a21`, `a22`, `a23`, `a24`, `a25`, `a26`, `a27`, `a28`, `a29`, `a30`,"
	." `a31`, `a32`, `a33`)"
	." VALUES ('".$a1."', '".$a2."', '".$a3."', '".$a4."', '".$a5."', '".$a6."', '"
		.$a7."', '".$a8."', '".$a9."', '".$a10."', '".$a11."', '".$a12."', '".$a13."', '"
		.$a14."', '".$a15."', '".$a16."', '".$a17."', '".$a18."', '".$a19."', '".$a20."', '"
		.$a21."', '".$a22."', '".$a23."', '".$a24."', '".$a25."', '".$a26."', '".$a27."', '"
		.$a28."', '".$a29."', '".$a30."', '".$a31."', '".$a32."', '".$a33."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>