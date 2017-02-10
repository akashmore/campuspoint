<?php
require ('php_audio/connections/phpaudio.php');
error_reporting(0);


if($_POST['delete1'])
{
	
	$val=$_POST['text1'];
	
		mysql_select_db($database,$phpaudio);
		
		
		$qur1="delete from audio where BINARY name='$val'";
		$res1=mysql_query($qur1);
		if($res1)
		{
			$del_file="php_audio/upload/".$val;
			//echo $del_file;
			unlink($del_file);
		}
		echo '<script language="javascript">';
		echo 'alert("File deleted.");';
		echo 'window.location.href="delete_audio.php";';
		echo '</script>';
		
	
	
}
?>