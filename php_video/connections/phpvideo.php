<?php

$hostname="localhost";
$database="phpvideo";
$username="root";
$password="";
if($phpvideo=@mysql_connect($hostname,$username,$password)or trigger_error(mysql_error(),E_USER_ERROR))
	echo "kkkkkkkk";
else 
	echo "lllllll";
?>