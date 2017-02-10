<?php

$hostname="localhost";
$database="phpvideo";
$username="root";
$password="";
$phpvideo=@mysql_connect($hostname,$username,$password)or trigger_error(mysql_error(),E_USER_ERROR);
?>