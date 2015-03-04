<?php
session_start();
include_once("connect.php");

//Get user note
$note = strval($_GET['note']);

//SQL to insert into the notes taken table
$sql="INSERT INTO `teamr1415`.`UsersNotesTaken` (`uid`, `sid`, `note`, `gaid`) VALUES ('"
	.$$_SESSION["uid"]."', '".$_SESSION["sid"]."', '".$note."', '".$_SESSION["gaid"]."')";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>