<?php
require_once('connections/php_not_and_announ.php');
error_reporting(0);
mysql_select_db($database,$php_not_and_announ);
$id=$_GET['cid'];
$qur="select * from announ";
$res=mysql_query($qur,$php_not_and_announ);
?>