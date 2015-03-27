<?php
session_start();
include_once("connect.php");

$sql="UPDATE `UserEdInfoReads` "
	."SET `timeclosed` = CURRENT_TIMESTAMP "
	."WHERE `usedredid` IN (SELECT `mrid` FROM (SELECT MAX(A.`usedredid`) AS `mrid` FROM `UserEdInfoReads` AS A WHERE A.`uid` = '"
		.$_SESSION["uid"]."' AND A.`gaid` = '".$_SESSION["gaid"]."' AND A.`sid` = '".$_SESSION["sid"]."' GROUP BY A.`uid`, A.`sid`, A.`gaid`)tblTemp)";

mysqli_query($conn,$sql);
mysqli_close($conn);
?>