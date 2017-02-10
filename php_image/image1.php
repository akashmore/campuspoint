<?php
require_once('connections/phpimage.php');
error_reporting(0);
mysql_select_db($database,$phpimage);
$id=$_GET['cid'];
$qur="select * from image where cid='$id'";
$res=mysql_query($qur,$phpimage);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>image</title>
</head>
<body>

<?php 
while($row=mysql_fetch_array($res))
{	
?>
<img src="<?php echo $row['path'] ?>"width="300" height="200"/><br/>

<?php   

}?>

</body>
</html>