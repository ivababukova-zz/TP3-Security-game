<?php
include_once("connect.php");

$p = strval($_GET['p']);
$ent = floatval($_GET['ent']);
$len = intval($_GET['len']);
$sql="INSERT INTO `teamr1415`.`Passwords` (`pid`, `stringrep`, `entropy`, `length`) VALUES (NULL, '".$p."', '".$ent."', '".$len."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>