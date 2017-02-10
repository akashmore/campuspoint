<?php
require ('php_video/connections/phpvideo.php');
error_reporting(0);


if($_POST['delete1'])
{
	
	$val=$_POST['text1'];
	
		mysql_select_db($database,$phpvideo);
		
		
		$qur1="delete from video where name='$val'";
		$res1=mysql_query($qur1);
		if($res1)
		{
			$file_del="collegetube/ttt/v3/_deploy/upload/".$val;
			unlink($file_del);
		}
		echo '<script language="javascript">';
		echo 'alert("File deleted.");';
		echo 'window.location.href="del_video1.php";';
		echo '</script>';
		
	
	
}

if($_POST['delete2'])
{
	
	$val=$_POST['text2'];
	
		mysql_select_db($database,$phpvideo);
		
		
		$qur1="delete from video where name='$val'";
		$res1=mysql_query($qur1);
		if($res1)
		{
			$file_del="collegetube/ttt/v3/_deploy/upload/".$val;
			unlink($file_del);
		}
		echo '<script language="javascript">';
		echo 'alert("File deleted.");';
		echo 'window.location.href="del_video1.php";';
		echo '</script>';
		
	
	
}

if($_POST['delete3'])
{
	
	$val=$_POST['text3'];
	
		mysql_select_db($database,$phpvideo);
		
		
		$qur1="delete from video where name='$val'";
		$res1=mysql_query($qur1);
		if($res1)
		{
			$file_del="collegetube/ttt/v3/_deploy/upload/".$val;
			unlink($file_del);
		}
		echo '<script language="javascript">';
		echo 'alert("File deleted.");';
		echo 'window.location.href="del_video1.php";';
		echo '</script>';
		
	
	
}
?>