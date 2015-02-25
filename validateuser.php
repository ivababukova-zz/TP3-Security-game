<?php
include_once("connect.php");

//Get questionnare results - NEED TO ADD IN WHAT TYPE THEY ARE: strval, intval, floatval ....
$emailAdd = val($_GET['emailAdd']);
$_SESSION["username"] = strval($_GET['username']);

//Generate SQL for results insert
$sql="SELECT CASE WHEN ".$emailAdd." IN "
		."(SELECT DISTINCT `emailadd` "
			."FROM `teamr1415`.`Users`) THEN 'exists' "
				."ELSE 'newuser' END AS `userstatus`, "
				."CASE WHEN ".$emailAdd." IN "
					."(SELECT DISTINCT `emailadd` "
						."FROM `teamr1415`.`Users`) THEN (SELECT `uid` FROM `teamr1415`.`Users` WHERE emmailadd = ".$emailAdd.") "
					."ELSE 0 END AS `uid`";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_array($result);

//update session variables
$_SESSION["uid"] = $row['uid'];
$_SESSION["userstatus"] = $row['userstatus'];


mysqli_close($conn);
?>