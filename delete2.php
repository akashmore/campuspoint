<?php
require ('php_not/connections/php_not_and_announ.php');

error_reporting(0);


if($_POST['delete1'])
{
	
	$val=$_POST['text1'];
	
		mysql_select_db($database,$php_not_and_announ);
		
		$qur2="select branch from notices where name='$val' and belong=1";
		$res2=mysql_query($qur2);
		$qur1="delete from notices where name='$val' and belong=1";
		$res1=mysql_query($qur1);
		if($res1)
		{
			$file_del="php_not/upload/notices/".$res2."/".$val;
			echo $file_del;
			unlink($file_del);
		}
		echo '<script language="javascript">';
		echo 'alert("File deleted.");';
		echo 'window.location.href="del_not1.php";';
		echo '</script>';
		
	
	
}

if($_POST['delete2'])
{
	
	$val=$_POST['text2'];
	
		mysql_select_db($database,$php_not_and_announ);
		$qur3="select cid from notices where name='$val' and belong=0";
		$res3=mysql_query($qur3);
		$row3=mysql_fetch_array($res3);
		$year=$row3['cid'];
		
		$qur2="select branch from notices where name='$val' and belong=0";
		$res2=mysql_query($qur2);
		
		$branch=mysql_fetch_array($res2);
		$branch1=$branch['branch'];
		$qur1="delete from notices where name='$val' and belong=0";
		$res1=mysql_query($qur1);
		if($res1)
		{
			$name1 = preg_replace('/\s+/', '', $val);

			$file_del="php_not/upload/notes/".$branch1."/".$year."/".$name1;
			echo $file_del;
			unlink($file_del);
		}
		echo '<script language="javascript">';
		echo 'alert("File deleted.");';
		echo 'window.location.href="del_not1.php";';
		echo '</script>';
		
	
	
}
?>
