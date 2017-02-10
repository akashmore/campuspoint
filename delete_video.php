<?php
include 'connection/connection.php';
error_reporting(0);
session_start();
mysql_select_db($database,$connection);
$username=$_SESSION['username'];
if(isset($_POST['yes']))
{
	
	$val=$_POST['video'];
	
		mysql_select_db($database,$connection);
		
		
		$qur1="delete from video where BINARY video_name='$val' and username='$username'";
		$res1=mysql_query($qur1);
		if($res1)
		{
			$file_del="php_video/upload/".$val;
			unlink($file_del);
		}
		echo '<script language="javascript">';
		echo 'alert("File deleted.");';
		echo 'window.location.href="profile.php";';
		echo '</script>';
		
	
	
}

if(isset($_POST['no']))
{
	

     header("Location: index.php");

	
	
}
?>