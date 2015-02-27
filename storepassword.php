<?php
session_start();
include_once("connect.php");

$p = strval($_GET['p']);
$ent = floatval($_GET['ent']);
$len = intval($_GET['len']);

//determine if password exist yet or not
$sql="SELECT CASE WHEN ('"
	.$p."' IN (SELECT DISTINCT `stringrep` FROM `Passwords`)) THEN "
	."(SELECT `pid` FROM `teamr1415`.`Passwords` WHERE `stringrep` = '".$p."') "
	."ELSE 0 END AS `existsornot`;";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_array($result);

if ($row['existsornot'] == 0){
	//It doesn't exist yet, so insert into the passwords table
	$sql="INSERT INTO `teamr1415`.`Passwords` "
	."(`pid`, `stringrep`, `entropy`, `length`, `timesused`, `lastused`) "
	."VALUES (NULL, '".$p."', '".$ent."', '".$len."', 1, CURRENT_TIMESTAMP);";
	mysqli_query($conn,$sql);
	//Get the new password's ID from the database
	$sql="SELECT `pid` FROM `teamr1415`.`Passwords` WHERE `stringrep` = '".$p."';";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_array($result);
	//Store whichever is the current password for easy access
	$_SESSION["currentpid"] = $row['pid'];
} else {
	//update when password was last used and increment the usage
	$sql="UPDATE `Passwords` SET `lastused` = CURRENT_TIMESTAMP, timesused = timesused + 1 WHERE `pid` = '".$row['existsornot']."';";
	mysqli_query($conn,$sql);
	//Store whichever is the current password for easy access
	$_SESSION["currentpid"] = $row['existsornot'];
}

//$sql="INSERT INTO `teamr1415`.`Passwords` (`pid`, `stringrep`, `entropy`, `length`) VALUES (NULL, '".$p."', '".$ent."', '".$len."');";
//mysqli_query($conn,$sql);

////get the pid of new password
//$sql="SELECT `pid` FROM `teamr1415`.`Passwords` WHERE `stringrep` = '".$p."';";
//$result = mysqli_query($conn,$sql);
//$row = mysqli_fetch_array($result);

mysqli_close($conn);
?>