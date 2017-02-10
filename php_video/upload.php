<?php
require_once('connections/phpvideo.php');
error_reporting(0);

if($_POST['submit'])
{
	$name=basename($_FILES['file_upload']['name']);
	$t_name=$_FILES['file_upload']['tmp_name'];
	$dir='upload';
	$cat=$_POST['cat'];
	if(move_uploaded_file($t_name,$dir."/".$name))
	{
		mysql_select_db($database,$phpvideo);
		$qur="insert into video(mid,cid,name,path) values('','$cat','$name','upload/$name')";
		$res=mysql_query($qur,$phpvideo);
		echo "file uploaded.";
		
	}
	else
	{
		echo "file not uploaded.";
	}
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>upload</title>
</head>
<body>
<form action="upload.php" method="post" enctype="multipart/form-data">
<input type="file" name="file_upload" /><br/>
cat_ID:<input type="text" name="cat"/></br>
<input type="submit" name="submit" value="upload" />
</form>
</body>
</html>