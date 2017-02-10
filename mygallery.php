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
  .carousel-inner > .item > img,
  .carousel-inner > .item > a > img {
      width: 80%;
      margin: auto;
  }
  </style>

 </head>
 <div>
  <body>
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
        <li><a href="collegetube.html"><span ><i class="glyphicon glyphicon-play-circle"></i> CollegeTube</span></a></li>
        <li><a href="college tune.html"><span ><i class="glyphicon glyphicon-headphones"></i> CollegeTune</span></a></li>
		<li><a href="contact.html"><span ><i class="glyphicon glyphicon-envelope"></i> Contact</span></a></li>
		<li><a href="login.php"><span ><i class="glyphicon glyphicon-user"></i> Login</span></a></li>
      </ul>
    </div>
  </div>

</nav></br></br></br>
<form action="mygallery.php" method ="GET">
	Choose a category:
	<select name="c">
	<option value="D">Departments</option>
    <option value="CL">Clubs</option>
	</select>&nbsp
	<input type="submit" value="Submit">
	</form>


<?php
error_reporting(1);
 
$con=mysql_connect("localhost","root","password")or die("Could not connect database");
 
mysql_select_db("simple_login",$con) or die("Could not select database");
 
extract($_GET);

 
/*$query=mysql_query("SELECT * FROM audio WHERE f_id='So'");*/

if(isset($_GET['c'])&&!empty($_GET['c'])){
	if($_GET['c']=='CL'){
	?>
<form action="mygallery.php" method ="GET">
Choose your club:
<select name="Dept">
<option value="S">SAIT</option>
<option value="A">ACESE</option>
<option value="W">WLUG</option>
<option value="E">EESA</option>
<option value="EL">ELESA</option>
<option value="SE">SESA</option>
<option value="ME">MESA</option>
<option value="RO">ROTARACT</option>
<option value="P">PACE</option>
<option value="SO">SOFTA</option>
<option value="ART">ART-CIRCLE</option></select>
<input type="submit" value="Submit" name="sub1">
</form>

<?php } else if($_GET['c']=='D') {?>
<form action="mygallery.php" method ="GET">
Choose your Department:
<select name="Dept">
<option value="IT">IT</option>
<option value="CSE">CSE</option>
<option value="MECH">MECHANICAL</option>
<option value="CIVIL">CIVIL</option>
<option value="ELE">ELECTRONICS</option>
<option value="EL">ELECTRICAL</option>
</select>
<input type="submit" value="Submit" name="sub2">
</form>
	<?php } }
extract($_GET);
$code=$_GET['Dept'];


?>

<div class="col-sm-12" style="background-color:white;font-family: 'Lobster', cursive;color:orange">
<center><h2>--Gallery--</h2></center>
<div class="container">
  <br>
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
  <?php
	if("$sub1"||"$sub2")
	{
		
			$gal=$_GET['Dept'];
			$query=mysql_query("SELECT * FROM gallery WHERE f_id='$gal' ");
					$query1=mysql_query("SELECT * FROM gallery WHERE f_id='$gal' ");
			$cnt=1;
			?>
    <!-- Indicators -->
    <ol class="carousel-indicators">
	<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
	<?php	
	while($all_gal=mysql_fetch_array($query))
 
	{
?>


      <li data-target="#myCarouse<?php echo $cnt?>" data-slide-to="<?php echo $cnt?>"></li>
	  
<?php $cnt++;
$flg=1; } ?>
    </ol> 
	<div class="carousel-inner" role="listbox">
      
	<?php	
	while($all_gal=mysql_fetch_array($query1))
 
	{if($flg==1)
		{
?>

    <!-- Wrapper for slides -->
		<div class="item active">
        <img src="images/<?php echo $all_gal['gallery_nm'];?>" width="500" height="350">
      </div>
<?php
$flg=0;}
else 
	{ ?>
	<div class="item">
        <img src="images/<?php echo $all_gal['gallery_nm'];?>" width="500" height="350">
      </div>
<?php }}} ?>

    <!-- Left and right controls -->
    <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>
</body>
</html>
