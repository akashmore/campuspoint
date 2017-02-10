<?php
$hostname="localhost";
$database="users";
$username="root";
$password="";
$connection=@mysql_connect($hostname,$username,$password)or trigger_error(mysql_error(),E_USER_ERROR);


	$username=$_POST['username'];
	$email=$_POST['email'];
	$password=$_POST['password'];
	
	mysql_select_db($database,$connection);
	$search_query="select * from users where username='".$username."'";
	$res_search=mysql_query($search_qur,$connection);
	$count=mysql_num_rows($res_search);
	if($count>0)
	{
		echo "<script>";
		echo 'alert("Username is already exist.");';
		echo '</script>';
	}
	else
	{
		$insert_query="insert into users(id,username,password,email) values('','$username','$password','$email');";
		$result_query=mysql_query($insert_query,$connection);
		if($result_query)
		{
			echo "<script>";
			echo 'alert("You have successfully registered.");';
			echo '</script>';
		}
	}
	
	
	

?>