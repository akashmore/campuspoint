<?php
require ('php_not/connections/php_not_and_announ.php');
error_reporting(0);

if($_POST['delete1'])
{
	
	//mysql_select_db($database,$php_not_and_announ);
	$val=$_POST['make_text1'];
	//echo "######".$val."#######";
	//mysql_select_db($database,$php_not_and_announ);
	//$qur6="select * from notices where name=$val";
	//$res6=mysql_query($qur6,$php_not_and_announ);
	
	
	//echo "<br>";
	//echo $val;
	//echo "<br>";
		mysql_select_db($database,$php_not_and_announ);
		
		$qur3="delete from notices where name='$val' and belong=1";
		
	if(mysql_query($qur3))
		echo "shubham";
	else
		echo "hapse";
	$res3=mysql_query($qur3,$php_not_and_announ);
	if(!$res3)
		echo "failllll";
	else
		echo "passsssss";
	
}

if($_POST['delete2'])
{
	
	//mysql_select_db($database,$php_not_and_announ);
	$val=$_POST['make_text2'];
	//echo "######".$val."#######";
	//mysql_select_db($database,$php_not_and_announ);
	//$qur6="select * from notices where name=$val";
	//$res6=mysql_query($qur6,$php_not_and_announ);
	
	
	//echo "<br>";
	//echo $val;
	//echo "<br>";
		mysql_select_db($database,$php_not_and_announ);
		
		$qur3="delete from notices where name='$val' and belong=1";
	if(mysql_query($qur3))
		echo "shubham";
	else
		echo "hapse";
	$res3=mysql_query($qur3,$php_not_and_announ);
	if(!$res3)
		echo "failllll";
	else
		echo "passsssss";
	
}

if($_POST['delete3'])
{
	
	//mysql_select_db($database,$php_not_and_announ);
	$val=$_POST['make_text3'];
	//echo "######".$val."#######";
	//mysql_select_db($database,$php_not_and_announ);
	//$qur6="select * from notices where name=$val";
	//$res6=mysql_query($qur6,$php_not_and_announ);
	
	
	//echo "<br>";
	//echo $val;
	//echo "<br>";
		mysql_select_db($database,$php_not_and_announ);
		
		$qur3="delete from notices where name='$val' and belong=1";
	if(mysql_query($qur3))
		echo "shubham";
	else
		echo "hapse";
	$res3=mysql_query($qur3,$php_not_and_announ);
	if(!$res3)
		echo "failllll";
	else
		echo "passsssss";
	
}

if($_POST['delete4'])
{
	
	//mysql_select_db($database,$php_not_and_announ);
	$val=$_POST['make_text4'];
	//echo "######".$val."#######";
	//mysql_select_db($database,$php_not_and_announ);
	//$qur6="select * from notices where name=$val";
	//$res6=mysql_query($qur6,$php_not_and_announ);
	
	
//	echo "<br>";
	//echo $val;
	//echo "<br>";
		mysql_select_db($database,$php_not_and_announ);
		
		$qur3="delete from notices where name='$val' and belong=0";
	if(mysql_query($qur3))
		echo "shubham";
	else
		echo "hapse";
	$res3=mysql_query($qur3,$php_not_and_announ);
	if(!$res3)
		echo "failllll";
	else
		echo "passsssss";
	
}

if($_POST['delete5'])
{
	
	//mysql_select_db($database,$php_not_and_announ);
	$val=$_POST['make_text5'];
	//echo "######".$val."#######";
	//mysql_select_db($database,$php_not_and_announ);
	//$qur6="select * from notices where name=$val";
	//$res6=mysql_query($qur6,$php_not_and_announ);
	
	
//	echo "<br>";
//	echo $val;
	//echo "<br>";
		mysql_select_db($database,$php_not_and_announ);
		
		$qur3="delete from notices where name='$val' and belong=0";
	if(mysql_query($qur3))
		echo "shubham";
	else
		echo "hapse";
	$res3=mysql_query($qur3,$php_not_and_announ);
	if(!$res3)
		echo "failllll";
	else
		echo "passsssss";
	
}

if($_POST['delete6'])
{
	
	//mysql_select_db($database,$php_not_and_announ);
	$val=$_POST['make_text6'];
	//echo "######".$val."#######";
	//mysql_select_db($database,$php_not_and_announ);
	//$qur6="select * from notices where name=$val";
	//$res6=mysql_query($qur6,$php_not_and_announ);
	
	
	//echo "<br>";
	//echo $val;
//	echo "<br>";
		mysql_select_db($database,$php_not_and_announ);
		
		$qur3="delete from notices where name='$val' and belong=0";
	if(mysql_query($qur3))
		echo "shubham";
	else
		echo "hapse";
	$res3=mysql_query($qur3,$php_not_and_announ);
	if(!$res3)
		echo "failllll";
	else
		echo "passsssss";
	
}
?>



<!doctype html>
<html>
 <head>
  <link rel="shortcut icon" href="images/logo1.png"/>
   <title>Campus Point</title>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link rel="stylesheet" href="css/bootstrap.min.css">
     <script src="js/bootstrap.min.js"></script>
     <script src="js/jquery.js"></script>
	 <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
 </head>
 <div>
  <body>
  <nav class="navbar navbar-fixed-top">
  <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="about.html"><span><i class="glyphicon glyphicon-education"></i> CampusPoint</span></a>
    </div>
    <div>
      <ul class="nav navbar-right">
        
		<center><li><a class="navbar-brand" href="home.php"><span ><i class="glyphicon glyphicon-hand-left"></i>back</span></a></li></center>
		
	
  </div>
</nav>
</nav>
<br><br>
<center><div class="col-sm-12" style="font-family: 'Lobster', cursive;color:#4CAF50;background-color:light-blue;"><h1>Delete Your Files here!!!</h1></div></center>
<br><br>
<div class="col-sm-12 img-hover" style="background-color:white;font-family: 'san-serif', cursive;color:#181818">
	<center><h1>DEPARTMENTS</h1></center>
</div>

<div class="container-fluid">
<div class="row">



<div class="col-sm-12">

<div class="row">
<div class="col-sm-4 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:#26a69a">
	<center><h2>SY</h2></center>
  <br><br> 
  <center>
<form action="del_not.php" method="post" enctype="multipart/form-data">
<?php
mysql_select_db($database,$php_not_and_announ);
	$qur2="select * from notices where cid=1 and belong=1";
	$res2=mysql_query($qur2,$php_not_and_announ);
	$cnt=1;
	echo "<select  name='shubham' onchange='myFunction1(this)'>";
	echo "<option value='0' >--choose option--</option>";
	while($row1=mysql_fetch_array($res2))
	{
		echo "<option value=".$cnt.">".$row1['name']."</option>";
		$cnt++;
	}
	echo "</select>";
	echo "<input id='make_text1' type = 'hidden' name = 'make_text1' value = '' />";

?>

<script type="text/javascript">
    function myFunction1(ddl) {
        document.getElementById('make_text1').value = ddl.options[ddl.selectedIndex].text;
    }
</script>
  <!--<input type="button" onclick="myFunction()"/>-->

&nbsp&nbsp&nbsp
<input type="submit" name="delete1" value="delete" />
</form>
</center>
</div>

<div class="col-sm-4 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:#26a69a">
	<center><h2>TY</h2></center>
  <br><br>
<center>  
<form action="del_not.php" method="post" enctype="multipart/form-data">
<?php
mysql_select_db($database,$php_not_and_announ);
	$qur2="select * from notices where cid=2 and belong=1";
	$res2=mysql_query($qur2,$php_not_and_announ);
	$cnt=1;
	echo "<select  name='shubham' onchange='myFunction2(this)'>";
		echo "<option value='0' >--choose option--</option>";

	while($row1=mysql_fetch_array($res2))
	{
		echo "<option value=".$cnt.">".$row1['name']."</option>";
		$cnt++;
	}
	echo "</select>";
	echo "<input id='make_text2' type = 'hidden' name = 'make_text2' value = '' />";

?>

<script type="text/javascript">
    function myFunction2(ddl) {
        document.getElementById('make_text2').value = ddl.options[ddl.selectedIndex].text;
    }
</script>
  <!--<input type="button" onclick="myFunction()"/>-->

&nbsp&nbsp&nbsp
<input type="submit" name="delete2" value="delete" />
</form>
</center>
</div>

<div class="col-sm-4 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:#26a69a">
	<center><h2>B-Tech</h2></center>
  <br><br> 
  <center>
<form action="del_not.php" method="post" enctype="multipart/form-data">
<?php
mysql_select_db($database,$php_not_and_announ);
	$qur2="select * from notices where cid=3 and belong=1";
	$res2=mysql_query($qur2,$php_not_and_announ);
	$cnt=1;
	echo "<select  name='shubham' onchange='myFunction3(this)'>";
		echo "<option value='0' >--choose option--</option>";

	while($row1=mysql_fetch_array($res2))
	{
		echo "<option value=".$cnt.">".$row1['name']."</option>";
		$cnt++;
	}
	echo "</select>";
	echo "<input id='make_text3' type = 'hidden' name = 'make_text3' value = '' />";

?>

<script type="text/javascript">
    function myFunction3(ddl) {
        document.getElementById('make_text3').value = ddl.options[ddl.selectedIndex].text;
    }
</script>
  <!--<input type="button" onclick="myFunction()"/>-->

&nbsp&nbsp&nbsp
<input type="submit" name="delete3" value="delete" />
</form>
</center>
</div>
</div>

<br><br>
<div class="col-sm-12 img-hover" style="background-color:white;font-family: 'san-serif', cursive;color:#181818">
	<center><h1>CLUBS</h1></center>
</div>

<div class="container-fluid">
<div class="row">



<div class="col-sm-12">


<div class="row">
<div class="col-sm-4 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:#26a69a">
	<center><h2>SY</h2></center>
  <br><br> 
  <center>
<form action="del_not.php" method="post" enctype="multipart/form-data">
<?php
mysql_select_db($database,$php_not_and_announ);
	$qur2="select * from notices where cid=1 and belong=0";
	$res2=mysql_query($qur2,$php_not_and_announ);
	$cnt=1;
	echo "<select  name='shubham' onchange='myFunction4(this)'>";
	echo "<option value='0' >--choose option--</option>";
	while($row1=mysql_fetch_array($res2))
	{
		echo "<option value=".$cnt.">".$row1['name']."</option>";
		$cnt++;
	}
	echo "</select>";
	echo "<input id='make_text4' type = 'hidden' name = 'make_text4' value = '' />";

?>

<script type="text/javascript">
    function myFunction4(ddl) {
        document.getElementById('make_text4').value = ddl.options[ddl.selectedIndex].text;
    }
</script>
  <!--<input type="button" onclick="myFunction()"/>-->

&nbsp&nbsp&nbsp
<input type="submit" name="delete4" value="delete" />
</form>
</center>
</div>

<div class="col-sm-4 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:#26a69a">
	<center><h2>TY</h2></center>
  <br><br>
<center>  
<form action="del_not.php" method="post" enctype="multipart/form-data">
<?php
mysql_select_db($database,$php_not_and_announ);
	$qur2="select * from notices where cid=2 and belong=0";
	$res2=mysql_query($qur2,$php_not_and_announ);
	$cnt=1;
	echo "<select  name='shubham' onchange='myFunction5(this)'>";
		echo "<option value='0' >--choose option--</option>";

	while($row1=mysql_fetch_array($res2))
	{
		echo "<option value=".$cnt.">".$row1['name']."</option>";
		$cnt++;
	}
	echo "</select>";
	echo "<input id='make_text5' type = 'hidden' name = 'make_text5' value = '' />";

?>

<script type="text/javascript">
    function myFunction5(ddl) {
        document.getElementById('make_text5').value = ddl.options[ddl.selectedIndex].text;
    }
</script>
  <!--<input type="button" onclick="myFunction()"/>-->

&nbsp&nbsp&nbsp
<input type="submit" name="delete5" value="delete" />
</form>
</center>
</div>

<div class="col-sm-4 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:#26a69a">
	<center><h2>B-Tech</h2></center>
  <br><br> 
  <center>
<form action="del_not.php" method="post" enctype="multipart/form-data">
<?php
mysql_select_db($database,$php_not_and_announ);
	$qur2="select * from notices where cid=3 and belong=0";
	$res2=mysql_query($qur2,$php_not_and_announ);
	$cnt=1;
	echo "<select  name='shubham' onchange='myFunction6(this)'>";
		echo "<option value='0' >--choose option--</option>";

	while($row1=mysql_fetch_array($res2))
	{
		echo "<option value=".$cnt.">".$row1['name']."</option>";
		$cnt++;
	}
	echo "</select>";
	echo "<input id='make_text6' type = 'hidden' name = 'make_text6' value = '' />";

?>

<script type="text/javascript">
    function myFunction6(ddl) {
        document.getElementById('make_text6').value = ddl.options[ddl.selectedIndex].text;
    }
</script>
  <!--<input type="button" onclick="myFunction()"/>-->

&nbsp&nbsp&nbsp
<input type="submit" name="delete6" value="delete" />
</form>
</center>
</div>
</div>

</body>
</html>	

