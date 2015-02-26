<?php
include_once("connect.php");

//Get questionnare results - NEED TO ADD IN WHAT TYPE THEY ARE: strval, intval, floatval ....
$emailadd = strval($_GET['emailadd']);
$_SESSION["username"] = strval($_GET['username']);

//Generate SQL for results insert
$sql="SELECT CASE WHEN '".$emailadd."' IN "
		."(SELECT DISTINCT `emailadd` "
			."FROM `teamr1415`.`User`) THEN 'exists' "
				."ELSE 'newuser' END AS `userstatus`, "
				."CASE WHEN '".$emailadd."' IN "
					."(SELECT DISTINCT `emailadd` "
						."FROM `teamr1415`.`User`) THEN (SELECT `uid` FROM `teamr1415`.`User` WHERE emailadd = '".$emailadd."') "
					."ELSE 0 END AS `uid`;";

//$sql="SELECT CASE WHEN '".$emailadd."' IN (SELECT DISTINCT `emailadd` FROM `teamr1415`.`User`) THEN 'exists' ELSE 'newuser' END AS `userstatus`, CASE WHEN '".$emailadd."' IN (SELECT DISTINCT `emailadd` FROM `teamr1415`.`User`) THEN (SELECT `uid` FROM `teamr1415`.`User` WHERE `emailadd` = '".$emailadd."') ELSE 0 END AS `uid`; 
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_array($result);

//update session variables
$_SESSION["uid"] = $row['uid'];
$_SESSION["userstatus"] = $row['userstatus'];

if ($_SESSION["userstatus"] == "newuser") {
	//insert a new user to the user table
	$sql="INSERT INTO `teamr1415`.`User` (`uid`, `username`, `emailadd`) VALUES (NULL, '"
		.$_SESSION["username"]."', '".$emailadd."');";
	mysqli_query($conn,$sql);
	// get the new user's uid
	$sql="SELECT `uid` FROM `User` WHERE `emailadd` = '".$emailadd."'";
	$result = mysqli_query($conn,$sql);
	$row = mysqli_fetch_array($result);
	$_SESSION["uid"] = $row['uid'];
	$sql="INSERT INTO `teamr1415`.`UsersPasswords` "
		."(`uid`, `pid`, `sid`, `did`, `scorereceived`) "
		."VALUES ('".$_SESSION["uid"]."', '1', '4', '1', '1');";
	mysqli_query($conn,$sql);
}

mysqli_close($conn);
?>