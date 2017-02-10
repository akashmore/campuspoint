<?php
include 'connection/connection.php';
session_start();
error_reporting(0);
$username=$_SESSION['username'];
$author_name=$_SESSION['author_name'];
if(!$_SESSION['username'])	
{
	  header("Location: index.php");
}
if(isset($_POST['gallery']))
{
	date_default_timezone_set('Asia/Kolkata');

	$date=date("d-m-y");
	$time=date("h:i:sa");
	$showname=$_POST['image_name'];
	$image_name=basename($_FILES['file_upload']['name']);
	$t_name=$_FILES['file_upload']['tmp_name'];
	$dir='php_image/upload';
	$description=$_POST['image_description'];
	$cat=$_POST['cat'];
	$types = array('image/jpeg', 'image/gif', 'image/png','image/jpg');
if(in_array($_FILES['file_upload']['type'],$types))
{
		mysql_select_db($database,$connection);
		
		$qur1="select * from gallery where BINARY image_name='$image_name' and BINARY category='$cat'";
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
		
	if(move_uploaded_file($t_name,$dir."/".$image_name))
	{
		mysql_select_db($database,$connection);
		$qur1="select * from members where username='".$username."'";
		$res1=mysql_query($qur1,$connection);
		$row1=mysql_fetch_array($res1);
		$author_name=$row1['name'];
		
		$qur="insert into gallery(id,username,author_name,image_name,path,category,showname,date,time) values('','$username','$author_name','$image_name','upload/$image_name','$cat','$showname','$date','$time')";
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
	echo 'alert("only images are allowed to upload.");';
    echo 'window.location.href = "profile.php";';
	echo '</script>';
	}
}



?>