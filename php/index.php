<?php
$servername = "localhost";
$username = "root";
$password = '';
$dbname = "camuspoint";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

?>
<!doctype html>
<html>
 <head>
   <title>Campus Point</title>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link rel="stylesheet" href="css/bootstrap.min.css">
     <script src="js/bootstrap.min.js"></script>
     <script src="js/jquery.js"></script>
	 <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>

 </head>
 <div>
  <body>
  <nav class="navbar navbar-fixed-top">
  <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#">CampusPoint</a>
    </div>
    <div>
      <ul class="nav navbar-nav">
        <li><a href="index.html"><span ><i class="glyphicon glyphicon-home"></i> Home</span></a></li>
		<li><a href="1page.html"><span ><i class="glyphicon glyphicon-th"></i> QuickAccess</span></a></li>
        <li><a href="departments.html"><span ><i class="glyphicon glyphicon-star"></i> Departments</span></a></li>
        <li><a href="clubs.html"><span ><i class="glyphicon glyphicon-asterisk"></i> Clubs</span></a></li>
        <li><a href="collegetube.html"><span ><i class="glyphicon glyphicon-play-circle"></i> CollegeTube</span></a></li>
        <li><a href="college tune.html"><span ><i class="glyphicon glyphicon-headphones"></i> CollegeTune</span></a></li>
		<li><a href="contact.html"><span ><i class="glyphicon glyphicon-envelope"></i> Contact</span></a></li>
		
		
  </div>
</nav>
</nav>
<br><br><br><br><br><br><br><br><br>
<center><h2>Login</h2></center>

</body>
</html>