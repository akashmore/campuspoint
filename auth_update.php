<?php

error_reporting(0);
include 'connection/connection.php';
session_start();
$username=$_SESSION['username'];

$author_name=$_SESSION['author_name'];
if(!$_SESSION['username'] or isset($_POST['cancel']))	
{
	  header("Location: index.php");
}
if(isset($_POST['update']))
{
	
	$user=$_POST['username'];
	$oldpass=$_POST['oldpass'];
	$newpass=$_POST['newpass'];
	$val=false;
	mysql_select_db($database,$connection);
	
	$search_qur="select * from members";
	$search_res=mysql_query($search_qur,$connection);
	if($search_res)
	{
		while($res_row=mysql_fetch_Array($search_res))
		{
			if($res_row['username']==$user and $res_row['password']==$oldpass)
			{
			    $val=true;
				break;
			}
		}
	}
	else
	{
		echo '<script language="javascript">';
		echo 'alert("xxxxxxxxxxxx.");';
		echo '</script>';
	}
	if($val)
	{
		$update_qur="update members SET password='".$newpass."' where username='".$user."'";
		$res_update=mysql_query($update_qur,$connection);
		
		if($res_update)
		{
			echo '<script language="javascript">';
		echo 'alert("password successfully updated.");';
		echo '</script>';
			 header("Location: logout.php");
		}
	}
	else
	{
		echo '<script language="javascript">';
		echo 'alert("old password is incorrect");';
		echo 'window.location.href = "profile.php";';
		echo '</script>';
	}
	

}
?>