


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
      <a class="navbar-brand" href="#"><span><i class="glyphicon glyphicon-education"></i> CampusPoint</span></a>
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
	<center><h1>Departmental Videos</h1></center>
</div>
<br/><br/><br/>
<center>

<form action="delete_video.php" method="post" enctype="multipart/form-data">
<br/><br/><br/>
BRANCH&nbsp&nbsp
<select name="department">
<option value="">--choose option--</option>
<option value="IT">IT</option>
<option value="CSE">CSE</option>
<option value="Mechanical">Mechanical</option>
<option value="Civil">Civil</option>
<option value="Electronics">Electronics</option>
<option value="Electrical">Electrical</option>
</select>
<br><br>
<input id="butt" type="submit" name="show1" value="show videos"/>
</form>
</center>
<br/>

<div class="col-sm-12 img-hover" style="background-color:white;font-family: 'san-serif', cursive;color:#181818">
	<center><h1>Clubs Videos</h1></center>
</div>
<br/><br/><br/>
<center>
<form action="delete_video.php" method="post" enctype="multipart/form-data">
<br/><br/>
Clubs&nbsp&nbsp
<select name="clubs">
<option value="">--choose option--</option>
<option value="SAIT">SAIT</option>
<option value="ACSES">ACSES</option>
<option value="WLUG">WLUG</option>
<option value="EESA">EESA</option>
<option value="ELESA">ELESA</option>
<option value="ROTRACT">ROTRACT</option>
<option value="PACE">PACE</option>
<option value="MESA">MESA</option>
<option value="ART_CIRCLE">ART-CIRCLE</option>
<option value="CESA">CESA</option>
<option value="SOFTA">SOFTA</option>
</select>
<br><br>
<input id="butt" type="submit" name="show2" value="show videos"/>

</form>
</center>


<br>
<div class="col-sm-12 img-hover" style="background-color:white;font-family: 'san-serif', cursive;color:#181818">
	<center><h1>Placement Videos</h1></center>
</div>
<br><br><br>
<center>
<form action="delete_video.php" method="post" enctype="multipart/form-data">
<br/><br/>
<input id="butt" type="submit" name="show3" value="show videos"/>

</form>
</center>
</body>
</html>