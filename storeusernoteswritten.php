<?php
session_start();
include_once("connect.php");

//Get user note
$note = strval($_GET['note']);

//SQL to insert into the notes taken table
$sql="INSERT INTO `teamr1415`.`UsersNotesTaken` (`uid`, `sid`, `note`) VALUES ('"
	.$$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$note."')";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>