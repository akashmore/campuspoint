<?php

$hostname="localhost";
$database="php_not_and_announ";
$username="root";
$password="";
$php_not_and_announ=@mysql_connect($hostname,$username,$password)or trigger_error(mysql_error(),E_USER_ERROR);
?>