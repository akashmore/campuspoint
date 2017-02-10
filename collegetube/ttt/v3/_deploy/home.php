<?php
require_once('connections/phpvideo.php');
mysql_select_db($database,$phpvideo);

$qur="select * from cat";
$res=mysql_query($qur,$phpvideo);
?>
<!DOCTYPE html>
<html lang="en">
	
		
		
		
   
   
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

hr { 
    display: block;
    margin-top: 0.08em;
    margin-bottom: 0.005em;
    margin-left: auto;
    margin-right: auto;
    border-style: inset;
    border-width: 3px;
	color:#000000;
} 

.img-hover img {
    -webkit-transition: all .3s ease; /* Safari and Chrome */
  	-moz-transition: all .3s ease; /* Firefox */
  	-o-transition: all .3s ease; /* IE 9 */
  	-ms-transition: all .3s ease; /* Opera */
  	transition: all .3s ease;
	
	
	
}
.img-hover img:hover {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform:translateZ(0) scale(1.20); /* Safari and Chrome */
    -moz-transform:scale(1.20); /* Firefox */
    -ms-transform:scale(1.20); /* IE 9 */
    -o-transform:translatZ(0) scale(1.20); /* Opera */
    transform:translatZ(0) scale(1.20);
	
	
	-moz-box-shadow: 0 0 10px #000000; -webkit-box-shadow: 0 0 10px #ccc; box-shadow: 0 0 10px #000000; 
}
  
  
.grayscale {
  -webkit-filter: brightness(1.10) grayscale(100%) contrast(90%);
  -moz-filter: brightness(1.10) grayscale(100%) contrast(90%);
  filter: brightness(1.10) grayscale(100%); 
}


.img{
	width:100%;
	margin-top:-200px;
}

<!--.img-hover img{ -moz-box-shadow: 0 0 10px #ccc; -webkit-box-shadow: 0 0 10px #ccc; box-shadow: 0 0 10px #ccc;  }--> 
</style>
</head>
  
  
  
  
  <body> 
	
  <nav class="navbar navbar-inverse navbar-fixed-top">
  
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#"><span><i class="glyphicon glyphicon-education"></i> CampusPoint</span></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
         <li><a href="../../../../index.html"><span ><i class="glyphicon glyphicon-home"></i> Home</span></a></li>
		<li><a href="../../../../1page.html"><span ><i class="glyphicon glyphicon-th"></i> QuickAccess</span></a></li>
        <li><a href="../../../../departments.html"><span ><i class="glyphicon glyphicon-star"></i> Departments</span></a></li>
        <li><a href="../../../../clubs.html"><span ><i class="glyphicon glyphicon-asterisk"></i> Clubs</span></a></li>
        <li><a href="../../../../collegetube/ttt/v3/_deploy/home.php"><span ><i class="glyphicon glyphicon-play-circle"></i> CollegeTube</span></a></li>
        <li><a href="../../../../php_audio/audio.php"><span ><i class="glyphicon glyphicon-headphones"></i> CollegeTune</span></a></li>
		<li><a href="../../../../contact.html"><span ><i class="glyphicon glyphicon-envelope"></i> Contact</span></a></li>
		<li><a href="../../../../login.php"><span ><i class="glyphicon glyphicon-user"></i> Login</span></a></li>
      </ul>
    </div>
  </div>

 
</nav>
  		
  <br><br><br><br>
<div class="row">



<?php 
while($row=mysql_fetch_array($res))
{
	
if($row['id']==-1)
{	
?>

<center><a href="video.php?cid=<?php echo $row['id']; ?>"><?php echo "<div  class='col-sm-4 img-hover' style='height:135px;background-color:white;font-family: 'Lobster', cursive;color:skyblue'><center><h2 style='font-weight:bold;font-size:20px;color:#000000;'>Placement Videos</h2></center><br><img class='img-responsive img-ronded' src=".$row['image']." width='150px' height='200px' style='display:block;'/></div>"; ?></a></center>
<center><?php echo "<div  class='col-sm-4 img-hover' style='height:135px;background-color:white;font-family: 'Lobster', cursive;color:skyblue'><br><img class='img-responsive img-ronded' src='images/222.png' width='180px' height='150px' style='display:block;'/></div>"; ?></a></center>

<?php


}

if($row['id']==0)
{
	?>
	<center><a href="video.php?cid=<?php echo $row['id']; ?>"><?php echo "<div  class='col-sm-4 img-hover' style='height:135px;background-color:white;font-family: 'Lobster', cursive;color:skyblue'><center><h2 style='font-weight:bold;font-size:20px;color:black;'>All Videos</h2></center><br><img class='img-responsive img-ronded' src=".$row['image']." width='150px' height='200px' style='display:block'/></div>"; ?></a></center><br/><br/>
</div>
<br><br><br><br>
	<?php

echo "<hr>
<div style='background-color: #26a69a;height:10px;'>    </div>
<hr>";

	echo "<center><h2 style='font-weight:bold;font-size:20px;color:#000000;'>Departmental Videos</h2></center>";
    echo "<br>";

}

if($row['id']>0&&$row['id']<=6)
{	
?>

<center><a href="video.php?cid=<?php echo $row['id']; ?>"><?php echo "<div  class='col-sm-2 img-hover' style='height:135px;background-color:white;font-family: 'Lobster', cursive;color:skyblue'><br><img class='img-responsive img-ronded' src=".$row['image']." width='100px' height='200px' style='display:block;'/></div>"; ?></a></center>
<?php

}
if($row['id']>6&&$row['id']<=12)
{
if($row['id']==7)
{
	echo "<hr>
<div style='background-color: #26a69a;height:10px;'>    </div>
<hr>";
echo "<center><h2 style='font-weight:bold;font-size:20px;color:#000000;'>Clubs Videos</h2></center>";
    echo "<br>";
}
	?>

<center><a href="video.php?cid=<?php echo $row['id']; ?>"><?php echo "<div  class='col-sm-2 img-hover' style='height:135px;background-color:white;font-family: 'Lobster', cursive;color:skyblue'><br><img class='img-responsive img-ronded' src=".$row['image']." width='100px' height='100px' style='display:block;'/></div>"; ?></a></center>
<?php	

}
if($row['id']>12&&$row['id']<=18)
{

?>
<?php
if($row['id']==18)
{
	?>
	<center><a href="video.php?cid=<?php echo $row['id']; ?>"><?php echo "<div  class='col-sm-2 ' style='height:135px;background-color:white;font-family: 'Lobster', cursive;color:skyblue'><br>"; ?></a></center>
<?php
}
else
{	
?>
<center><a href="video.php?cid=<?php echo $row['id']; ?>"><?php echo "<div  class='col-sm-2 img-hover' style='height:135px;background-color:white;font-family: 'Lobster', cursive;color:skyblue'><br><img class='img-responsive img-ronded' src=".$row['image']." width='100px' height='100px' style='display:block;'/></div>"; ?></a></center>
<?php	
}
}
}
?>

</body>
</html>