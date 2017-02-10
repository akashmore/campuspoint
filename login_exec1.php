 <?php
require_once('connection.php');
error_reporting(0);


if(isset($_POST['username']) && isset($_POST['password']))
{
	$user=$_POST['username'];
	$pass=$_POST['password'];
	
    
	mysql_select_db($mysql_database,$bd);
	$qur="select * from member where BINARY username='$user'";
    $res=mysql_query($qur);
	
	
	if(mysql_num_rows($res)>0)
	{
		mysql_select_db($mysql_database,$bd);
		$qur1="select * from member where BINARY password='$pass' and BINARY username='$user'";
		$res1=mysql_query($qur1);
		if(mysql_num_rows($res1)>0)
		{
			echo "<script language='javascript'>";
		    echo 'window.location.href="home.php";';
		    echo "</script>";
	    }
		else
		{
			 echo '<script language="javascript">';
		    echo 'alert("Password not matched.");';
		    echo 'window.location.href="login.php";';
		    echo '</script>';
		}
	}
	else
	{
		    echo '<script language="javascript">';
		    echo 'alert("Username not matched.");';
		    echo 'window.location.href="login.php";';
		    echo '</script>';
	}
	
}
?>
