<?php

$hostname="localhost";
$database="phpimage";
$username="root";
$password="password";
$phpimage=@mysql_connect($hostname,$username,$password)or trigger_error(mysql_error(),E_USER_ERROR);
?>