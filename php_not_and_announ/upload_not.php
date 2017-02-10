<?php
require_once('connections/php_not_and_announ.php');
error_reporting(0);

if($_POST['submit'])
{
	$name=basename($_FILES['file_upload']['name']);
	echo $name;
	$t_name=$_FILES['file_upload']['tmp_name'];
	$dir='upload_not';
	$cat=$_POST['cat'];
	echo $cat;
	$branch=$_POST['branch'];
	echo $branch;
	//$year=$_POST['year'];
	if(move_uploaded_file($t_name,$dir."/".$branch."/".$name))
	{
		
		mysql_select_db($database,$php_not_and_announ);
        $qur="insert into notices(mid,cid,name,path) values('','$cat','$name','php_not/upload_not/$branch/$name')";	
		if(mysql_query($qur))
			echo "[pass]";
		else
			echo "[Fail]";
		$res=mysql_query($qur,$php_not_and_announ);
		if(!$res)
			echo "failed";
		else
			echo "success";
		echo "file uploaded.";
		
	}
	else
	{
		echo "file not uploaded.";
	}
}
?>

