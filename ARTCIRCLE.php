<?php
require_once('php_not/connections/php_not_and_announ.php');
mysql_select_db($database,$php_not_and_announ);
$id=1;
$qur="select * from notices";
$res=mysql_query($qur,$php_not_and_announ);
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
	 
<style>
  body {
      position: relative; 
  }
  #section1 {padding-top:50px;height:auto: #fff; background-color: #1E88E5;}
  #section2 {padding-top:50px;height:auto: #fff; background-color: #673ab7;}
  #section3 {padding-top:50px;height:auto;color: #fff; background-color: #6666CC;}
  #section41 {padding-top:50px;height:500px;color: #fff; background-color: #00bcd4;}
  #section42 {padding-top:50px;height:500px;color: #fff; background-color: #009688;}
  
  
  
  #list{
	  color:white;
	  font-size:30px;
	  font-family:san-serif;
  }
  
  span.under {
	  color:white;
	  text-decoration:none;
  }
  </style>
</head>
<body data-spy="scroll" data-target=".navbar" data-offset="50">

<nav class="navbar navbar-inverse navbar-fixed-top">
  
  <div class="container-fluid">
    <div class="navbar-header">
     <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="about.html"><span><i class="glyphicon glyphicon-education"></i> CampusPoint</span></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
         <li><a href="index.html"><span ><i class="glyphicon glyphicon-home"></i> Home</span></a></li>
		<li><a href="1page.html"><span ><i class="glyphicon glyphicon-th"></i> QuickAccess</span></a></li>
        <li><a href="departments.html"><span ><i class="glyphicon glyphicon-star"></i> Departments</span></a></li>
        <li><a href="clubs.html"><span ><i class="glyphicon glyphicon-asterisk"></i> Clubs</span></a></li>
        <li><a href="collegetube/ttt/v3/_deploy/home.php"><span ><i class="glyphicon glyphicon-play-circle"></i> CollegeTube</span></a></li>
        <li><a href="php_audio/audio.php"><span ><i class="glyphicon glyphicon-headphones"></i> CollegeTune</span></a></li>
		<li><a href="contact.html"><span ><i class="glyphicon glyphicon-envelope"></i> Contact</span></a></li>
		<li><a href="login.php"><span ><i class="glyphicon glyphicon-user"></i> Login</span></a></li>
      </ul>
    </div>
  </div>

</nav>
<br><br>
<div class="container">                                       
  <div class="dropdown">
  <br>
    <button class="btn btn-default dropdown-toggle" type="button" id="menu1" data-toggle="dropdown">Other Clubs
    <span class="caret"></span></button>
    <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
				  <li role="presentation"><a role="menuitem" tabindex="-1" href="SAIT.php">SAIT</a></li>

	<li role="presentation"><a role="menuitem" tabindex="-1" href="PACE.php">PACE</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="ACCESS.php">ACSES</a></li>
      <li role="presentation"><a role="menuitem" tabindex="-1" href="WLUG.php">WLUG</a></li>
       <li role="presentation"><a role="menuitem" tabindex="-1" href="EESA.php">EESA</a></li>
        <li role="presentation"><a role="menuitem" tabindex="-1" href="ELESA.php">ELESA</a></li>
		  <li role="presentation"><a role="menuitem" tabindex="-1" href="ROTRACT.php">ROTRACT</a></li>
		  <li role="presentation"><a role="menuitem" tabindex="-1" href="MESA.php">MESA</a></li>
		  <li role="presentation"><a role="menuitem" tabindex="-1" href="ARTCIRCLE.php">ART CIRCLE</a></li>
		  <li role="presentation"><a role="menuitem" tabindex="-1" href="CESA.php">CESA</a></li>
		  <li role="presentation"><a role="menuitem" tabindex="-1" href="SOFTA.php">SOFTA</a></li>
		  
		  
		  
    </ul>
 </div>
</div>

<div class="container-fluid">
  <div class="row">
   <center><div class="row"> <center><div class="col-sm-12" style="background-color:white;font-family: 'Lobster', cursive;color:green"><h2>-- ART-CIRCLE --</h2></div></center>
   <br><br>
  

 <h2>--NOTICES--</h2>
 
 
  
  

  
  
<br><br>
    <div id="section1" class="container">

    <h2 style="color:#ff9800;font-family:'Lobster';font-size:50px">--SY--</h2>
	  <?php 
	  mysql_select_db($database,$php_not_and_announ);
	  $qur1="select path,name from notices where cid='1' and branch='ART-CIRCLE' and belong=1";
	  $res1=mysql_query($qur1);
	   $num=mysql_num_rows($res1);

	  if($num==0)
		  echo "<h3 id='list'>Notices are not displayed yet....</h3>";
	  else
	  {
	  while($row1=mysql_fetch_array($res1))
	  {
		  
	      echo "<center><a href=".$row1['path']."><li id='list'>".$row1['name']."</li></a></center>";
          echo "<br/>";
	  }}
	  ?>
     </div>  

	<div id="section2" class="container">

    <h2 style="color:#ff9800;font-family:'Lobster';font-size:50px">--TY--</h2>
	  <?php 
	  mysql_select_db($database,$php_not_and_announ);
	  $qur1="select path,name from notices where cid='2' and branch='ART-CIRCLE' and belong=1";
	  $res1=mysql_query($qur1);
	   $num=mysql_num_rows($res1);

	  if($num==0)
		  echo "<h3 id='list'>Notices are not displayed yet....</h3>";
	  else
	  {
	  while($row1=mysql_fetch_array($res1))
	  {
		  
	      echo "<center><a href=".$row1['path']."><li id='list'>".$row1['name']."</li></a></center>";
          echo "<br/>";
	  }}
	  ?>
     </div>    

      <div id="section3" class="container">
	  <h2 style="color:#ff9800;font-family:'Lobster';font-size:50px">--B-Tech--</h2>
	  <?php 
	  mysql_select_db($database,$php_not_and_announ);
	  $qur1="select path,name from notices where cid='3' and branch='ART-CIRCLE' and belong=1";
	  $res1=mysql_query($qur1);
	   $num=mysql_num_rows($res1);

	  if($num==0)
		  echo "<h3 id='list'>Notices are not displayed yet....</h3>";
	  else
	  {
	  while($row1=mysql_fetch_array($res1))
	  {
		  
	      echo "<center><a href=".$row1['path']."><li id='list'>".$row1['name']."</li></a></center>";
          echo "<br/>";
	  }}
	  ?>
     
	</div>



</body>
</html>