<?php
session_start();
include_once("connect.php");


//$sql="UPDATE `teamr1415`.`UserEdInfoReads` SET `timeclosed` = CURRENT_TIMESTAMP WHERE `uid` = '"
//	.$_SESSION["uid"]."' AND `sid` = '".$_SESSION["sid"]."' AND `timeopened` = (SELECT MAX(`timeopened`) FROM `teamr1415`.`UserEdInfoReads` WHERE `uid` = '"
//		.$_SESSION["uid"]."' AND `sid` = '".$_SESSION["sid"]."' GROUP BY `sid`, `uid`);";

$sql="UPDATE `UserEdInfoReads` "
	."SET `timeclosed` = CURRENT_TIMESTAMP "
	."WHERE `usedredid` IN (SELECT `mrid` FROM (SELECT MAX(A.`usedredid`) AS `mrid` FROM `UserEdInfoReads` AS A WHERE A.`uid` = '"
		.$_SESSION["uid"]."' AND A.`sid` = '".$_SESSION["sid"]."' GROUP BY A.`uid`, A.`sid`)tblTemp)";

mysqli_query($conn,$sql);
mysqli_close($conn);
?>