<?php

$hostname="localhost";
$database="phpaudio";
$username="root";
$password="";
$phpaudio=@mysql_connect($hostname,$username,$password)or trigger_error(mysql_error(),E_USER_ERROR);
?>