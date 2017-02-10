<?php

include 'connection/connection.php';
session_start();
$username=$_SESSION['username'];
$author_name=$_SESSION['author_name'];

if(isset($_POST['audio']))
{
	date_default_timezone_set('Asia/Kolkata');

	$date=date("d-m-y");
	$time=date("h:i:sa");
	$showname=$_POST['audio_name'];
	$audio_name=basename($_FILES['file_upload']['name']);
	$t_name=$_FILES['file_upload']['tmp_name'];
	$dir='php_audio/upload';
	$types = array('audio/mpeg3', 'audio/mp3', 'audio/mpeg');

if (in_array($_FILES['file_upload']['type'], $types)) 
{
	
	mysql_select_db($database,$connection);
		
		$qur1="select * from audio where BINARY audio_name='$audio_name'";
		$res1=mysql_query($qur1,$connection);
		$row1=mysql_fetch_array($res1);
		if(mysql_num_rows($row1)>0)
		{
			echo '<script language="javascript">';
		    echo 'alert("File name is already exists.");';
		    echo 'window.location.href="profile.php";';
		    echo '</script>';
		}
    else
	{
	
	if(move_uploaded_file($t_name,$dir."/".$name))
	{
		mysql_select_db($database,$connection);
		$qur="insert into audio(id,username,author_name,audio_name,path,date,time) values('','$username','$author_name','$audio_name','upload/$name','$date','$time')";
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
	echo 'alert("only  mp3 files are allowed to upload.");';
    echo 'window.location.href = "profile.php";';
	echo '</script>';
}
}
?>