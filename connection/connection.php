<?php

$hostname="localhost";
$database="users";
$username="root";
$password="";
$connection=@mysql_connect($hostname,$username,$password)or trigger_error(mysql_error(),E_USER_ERROR);


?>