<?php
require_once('connections/php_not_and_announ.php');
error_reporting(0);

if($_POST['submit'])
{
	$name=basename($_FILES['file_upload']['name']);
	$t_name=$_FILES['file_upload']['tmp_name'];
	$dir='upload_announ';
	$cat=$_POST['cat'];
	$branch=$_POST['branch'];
	echo $branch;
	$year=$_POST['year'];
	if(move_uploaded_file($t_name,$dir."/".$branch."/".$name))
	{
		mysql_select_db($database,$php_not_and_announ);
		$qur="insert into not(mid,cid,name,path) values('','$cat','$name','upload_announ/$branch/$name')";
		$res=mysql_query($qur,$php_not_and_announ);
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
<form action="upload_not.php" method="post" enctype="multipart/form-data">
<input type="file" name="file_upload" /><br/>
<select name="branch">
<option value="IT">IT</option>
<option value="CSE">CSE</option>
<option value="Mechanical">Mechanical</option>
<option value="Civil">Civil</option>
<option value="Electronics">Electronics</option>
<option value="Electrical">Electrical</option>
</select>
<select name="year">
<option value="SY">SY</option>
<option value="TY">TY</option>
<option value="BTECH">B.Tech</option>
</select>
<input type="submit" name="submit" value="upload" />
</form>
</body>
</html>