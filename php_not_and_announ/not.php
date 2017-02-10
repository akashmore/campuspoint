<?php
require_once('connections/php_not_and_announ.php');
error_reporting(0);
mysql_select_db($database,$php_not_and_announ);
$id=$_GET['cid'];
$qur="select * from notices where cid='$id'";
$res=mysql_query($qur,$php_not_and_announ);

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>image</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
 

</head>
<body>

	
<?php 
while($row=mysql_fetch_array($res))
{	
?>
<p <?php echo $row['path']; ?>><p><br/>

<?php   
}?>

</body>
</html>