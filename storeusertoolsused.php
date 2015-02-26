<?php
session_start();
include_once("connect.php");

//$stringrep = strval($_GET['stringrep']);
//$uid = intval($_GET['uid']);
//$did = intval($_GET['did']);
//$sid = intval($_GET['sid']);
//$leng = intval($_GET['leng']);
//
//
//$sql="INSERT INTO `teamr1415`.`UsersBadPwdEntries` (`bpwdid`, `uid`, `did`, `sid`, `stringrep`, `length`) VALUES (NULL, '".$uid."', '".//$did."', '".$sid."', '".$stringrep."', '".$leng."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>