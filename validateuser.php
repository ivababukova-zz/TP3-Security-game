<?php
include_once("connect.php");

//Get questionnare results - NEED TO ADD IN WHAT TYPE THEY ARE: strval, intval, floatval ....
$emailAdd = val($_GET['emailAdd']);

//Generate SQL for results insert
//$sql="INSERT INTO `teamr1415`.`AnswersBefore` (`a1`, `a2`, `a3`, `a4`)"." VALUES ('".$a1."', '".$a2."', '".$a3."', '".$a4."', '".$a5."', '".$a6."');";
$sql="SELECT CASE WHEN ".$emailAdd." IN "
		."(SELECT DISTINCT `emailadd` "
			."FROM `teamr1415`.`Users`) THEN 'exists' "
				."ELSE 'newuser' END AS `userstatus`, "
				."CASE WHEN ".$emailAdd." IN "
					."(SELECT DISTINCT `emailadd` "
						."FROM `teamr1415`.`Users`) THEN (SELECT `uid` FROM `teamr1415`.`Users` WHERE emmailadd = ".$emailAdd.") "
					."ELSE 0 END AS `uid`";
$result = mysqli_query($conn,$sql);
mysqli_close($conn);
?>