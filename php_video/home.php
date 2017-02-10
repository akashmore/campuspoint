<?php
require_once('connections/phpvideo.php');
mysql_select_db($database,$phpvideo);

$qur="select * from cat";
$res=mysql_query($qur,$phpvideo);
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>home</title>
</head>

<body>
<?php 
while($row=mysql_fetch_array($res))
{	
?>
<h1><a href="video.php?cid=<?php echo $row['id'] ?>"><?php echo $row['name'] ?></a></h1>
<br/>
<?php   

}?>


</body>
</html>