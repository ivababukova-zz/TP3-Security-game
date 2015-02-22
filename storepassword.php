<?php
include_once("connect.php");

$p = strval($_GET['p']);
$ent = floatval($_GET['ent']);
$sql="INSERT INTO `teamr1415`.`Passwords` (`pid`, `stringrep`, `entropy`) VALUES (NULL, '".$p."', '".$ent."');";
mysqli_query($conn,$sql);
mysqli_close($conn);
?>