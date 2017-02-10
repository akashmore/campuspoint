<?php

error_reporting(0);
include 'connection/connection.php';
session_start();
$username=$_SESSION['username'];
$author_name=$_SESSION['author_name'];

if(isset($_POST['video']))
{
	date_default_timezone_set('Asia/Kolkata');

	$date=date("d-m-y");
	$time=date("h:i:sa");
	$showname=$_POST['video_name'];
	$video_name=basename($_FILES['file_upload']['name']);
	$t_name=$_FILES['file_upload']['tmp_name'];
	$dir='php_video/upload';
	$cat=$_POST['category'];
	$types = array('video/webm', 'video/mp4', 'video/flv','video/3gp','video/mpeg','video/avi','video/mov','video/swf');

if (in_array($_FILES['file_upload']['type'], $types)) 
{
	mysql_select_db($database,$connection);
		
		$qur1="select * from video where BINARY video_name='$video_name' and BINARY category='$cat'";
		$res1=mysql_query($qur1,$connection);
		if(mysql_num_rows($res1)>0)
		{
			echo '<script language="javascript">';
		    echo 'alert("File name is already exists.");';
		    echo 'window.location.href="profile.php";';
		    echo '</script>';
		}
    else
	{
	if(move_uploaded_file($t_name,$dir."/".$video_name))
	{
		mysql_select_db($database,$connection);
		$qur="insert into video(id,username,author_name,video_name,path,category,showname,date,time) values('','$username','$author_name','$video_name','upload/$name','$cat','$showname','$date','$time')";
		$res=mysql_query($qur,$connection);
		echo '<script language="javascript">';
		echo 'alert("File is successfully uploaded.");';
		echo 'window.location.href="profile.php";';
		echo '</script>';
		
	}
	else
	{
		echo '<script language="javascript">';
			echo 'alert("There is a problem while uploading your file please upload again...");';
			echo 'window.location.href="profile.php";';
			echo '</script>';
	}
	}
}
else
{
	echo '<script language="javascript">';
	echo 'alert("only video files are allowed to upload.");';
    echo 'window.location.href = "profile.php";';
	echo '</script>';
}
}
?>