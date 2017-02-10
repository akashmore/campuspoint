<?php
require_once('connections/php_not_and_announ.php');
error_reporting(0);

if($_POST['submit'])
{
	
	$name=basename($_FILES['file_upload']['name']);
	$name1 = preg_replace('/\s+/', '', $name);

	$t_name=$_FILES['file_upload']['tmp_name'];
	$dir='upload';
	$cat=$_POST['cat'];
	$branch=$_POST['branch'];
	$choose=$_POST['choose'];
	$types = array('image/jpeg','application/pdf','image/jpg');
	if($choose=="Notices")
		$bel=1;
	else
		$bel=0;
if($bel==1)
{
if(in_array($_FILES['file_upload']['type'],$types))
{	
        mysql_select_db($database,$php_not_and_announ);
		
		$qur4="select name from notices where BINARY branch='$branch' and cid='$cat' and belong='1'";
		$res4=mysql_query($qur1,$php_not_and_announ);
		$row4=mysql_fetch_array($res1);
		$file_name=$row4['name'];
		
		if($file_name==$name)
		{
			echo '<script language="javascript">';
		    echo 'alert("File name is already exists.");';
		    echo 'window.location.href="../home.php";';
		    echo '</script>';
		}
    else
	{
	if(move_uploaded_file($t_name,$dir."/notices/".$branch."/".$cat."/".$name1))
	{
		
		
	
		mysql_select_db($database,$php_not_and_announ);
        $qur="insert into notices(mid,cid,name,path,branch,belong) values('','$cat','$name','php_not/upload/notices/$branch/$cat/$name1','$branch','$bel')";	
		
		$res=mysql_query($qur,$php_not_and_announ);
		echo '<script language="javascript">';
		echo 'alert("File is successfully uploaded.");';
		echo 'window.location.href="../home.php";';
		echo '</script>';
	
		
		
		
	}
	else
	{
		    echo '<script language="javascript">';
			echo 'alert("There is a problem while uploading your file please upload again...");';
			echo 'window.location.href="../home.php";';
			echo '</script>';
	}
	}
}
else
{
	echo '<script language="javascript">';
	echo 'alert("only jpg and pdf files are allowed to upload.");';
    echo 'window.location.href = "../home.php";';
	echo '</script>';
}
}
else
{
	if(in_array($_FILES['file_upload']['type'],$types))
{	

    mysql_select_db($database,$php_not_and_announ);
		
		$qur4="select name from notices where BINARY branch='$branch' and cid='$cat' and belong='1'";
		$res4=mysql_query($qur1,$php_not_and_announ);
		$row4=mysql_fetch_array($res1);
		$file_name=$row4['name'];
		
		if($file_name==$name)
		{
			echo '<script language="javascript">';
		    echo 'alert("File name is already exists.");';
		    echo 'window.location.href="../home.php";';
		    echo '</script>';
		}
		
		
		/*$qur1="select * from notices where BINARY branch='$branch' and cid='$cat' and belong='0'";
		$res1=mysql_query($qur1,$php_not_and_announ);
		if(mysql_num_rows($res1)>0)
		{
			echo '<script language="javascript">';
		    echo 'alert("File name is already exists.");';
		    echo 'window.location.href="../home.php";';
		    echo '</script>';
		}*/
    else
	{

	if(move_uploaded_file($t_name,$dir."/notes/".$branch."/".$cat."/".$name1))
	{
		
		mysql_select_db($database,$php_not_and_announ);
		
		$qur1="select * from notices";
		$res1=mysql_query($qur1,$php_not_and_announ);
		
        $qur="insert into notices(mid,cid,name,path,branch,belong) values('','$cat','$name','php_not/upload/notes/$branch/$cat/$name1','$branch','$bel')";	
		
		$res=mysql_query($qur,$php_not_and_announ);
		echo '<script language="javascript">';
		echo 'alert("File is successfully uploaded.");';
		echo 'window.location.href="../home.php";';
		echo '</script>';
		
		
		
		
	}
	else
	{
		    echo '<script language="javascript">';
			echo 'alert("There is a problem while uploading your file please upload again...");';
			echo 'window.location.href="../home.php";';
			echo '</script>';
	}
	}
}
else
{
	echo '<script language="javascript">';
	echo 'alert("only jpg and pdf files are allowed to upload.");';
    echo 'window.location.href = "../home.php";';
	echo '</script>';
}
}
	
	
}

?>
