

    
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
 
 <script>
function backButtonOverride()
{
  // Work around a Safari bug
  // that sometimes produces a blank page
  setTimeout("backButtonOverrideBody()", 1);

}

function backButtonOverrideBody()
{
  // Works if we backed up to get here
  try {
    history.forward();
  } catch (e) {
    // OK to ignore
  }
  // Every quarter-second, try again. The only
  // guaranteed method for Opera, Firefox,
  // and Safari, which don't always call
  // onLoad but *do* resume any timers when
  // returning to a page
  setTimeout("backButtonOverrideBody()",100);
}
</script>
 
 </head>
 <style>
 #butt{
	 color:#26a69a;
 }
 </style>
 <div>
  <body onLoad="backButtonOverride()">
  <nav>
  <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#"><span><i class="glyphicon glyphicon-education"></i> CampusPoint</span></a>
    </div>
    <div>
      <ul class="nav navbar-right">
        
		<center><li><a class="navbar-brand" href="login.php">&nbsp&nbsp&nbsp&nbsp<span ><i class=" glyphicon glyphicon-user"></i> Logout</span></a></li></center>

	  </ul>
  </div>
  
   <div>
      <ul class="nav navbar-right">
        
		<center><li><a class="navbar-brand" href="setting.php">&nbsp&nbsp&nbsp&nbsp<span ><i class="glyphicon glyphicon-cog " ></i> Setting  </span></a></li></center>

	  </ul>
  </div>
</nav>
</nav>
<br><br><br><br>
<center><h1>Login Success!!!</h1></center>
<br>
<center><div class="col-sm-12" style="font-family: 'Lobster', cursive;color:#4CAF50;background-color:light-blue;"><h1>Upload your audios, videos, documents, images here!!!</h1></div></center>
<br><br>
<div class="container-fluid">
<div class="row">

<div class="col-sm-12">

<div class="row">
   <center>
    <div class="col-sm-3 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:#26a69a">
	
	  <center><h2>IMAGES</h2><center>
  <br><br> 
  
	<form action="upload3.php" method="post" enctype="multipart/form-data">
<input type="file" name="file_upload" /><br/>
<select name="cat">
<option value="1">clubs</option>
<option value="2">campus</option>
</select>
<!--cat_ID:<input type="text" name="cat"/></br>-->
<a href="del_image1.php"><input id="butt" type="button" name="delete3" value="delete"/></a>

<input type="submit" name="submit" value="upload" />
</form>
 
  </div>
  </center>
  <center>
	<div class="col-sm-3 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:#26a69a">
	<center><h2>AUDIO</h2></center>
  <br><br> 
     <form action="upload4.php" method="post" enctype="multipart/form-data">
<input type="file" name="file_upload" /><br/>
<!--cat_ID:<input type="text" name="cat"/></br>-->
<a href="delete_audio.php"><input id="butt" type="button" name="delete3" value="delete"/></a>

<input type="submit" name="submit" value="upload" />
</form>
  </div>
  </center>
  <center>
  <div class="col-sm-3 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:#26a69a">
	<center><h2>VIDEO</h2></center>
  <br><br> 
     <form action="upload5.php" method="post" enctype="multipart/form-data">
<input type="file" name="file_upload" /><br/>
<select name="cat" onchange="myFunction1(this)">
<option value="0">--choose option--</option>
<option value="1">IT</option>
<option value="2">CSE</option>
<option value="3">Mechanical</option>
<option value="4">Civil</option>
<option value="5">Electronics</option>
<option value="6">Electrical</option>
<option value="7">SAIT</option>
<option value="8">ACSES</option>
<option value="9">WLUG</option>
<option value="10">EESA</option>
<option value="11">ELESA</option>
<option value="12">ROTRACT</option>
<option value="13">PACE</option>
<option value="14">MESA</option>
<option value="15">ART-CIRCLE</option>
<option value="16">CESA</option>
<option value="17">SOFTA</option>
<option value="-1">PLACEMENTS</option>  
</select>
<!--cat_ID:<input type="text" name="cat"/></br>-->
<input id='text1' type = 'hidden' name = 'text1' value = '' />
<script type='text/javascript'>
              function myFunction1(ddl) {
                 document.getElementById('text1').value = ddl.options[ddl.selectedIndex].text;
                  }
</script>
		
<a href="del_video1.php"><input id="butt" type="button" name="delete" value="delete"/></a>

<input type="submit" name="submit" value="upload" />
</form>
  </div>
  </center>
  <center>
  <div class="col-sm-3 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:#26a69a">
	<center><h2>Notices and Notes</h2></center>
  <br><br> 
     <form action="php_not/upload_not.php" method="post" enctype="multipart/form-data">
<input type="file" name="file_upload" /><br/>
<select name="branch">
<option value="IT">IT</option>
<option value="CSE">CSE</option>
<option value="Mechanical">Mechanical</option>
<option value="Civil">Civil</option>
<option value="Electronics">Electronics</option>
<option value="Electrical">Electrical</option>
<option value="SAIT">SAIT</option>
<option value="ACSES">ACSES</option>
<option value="WLUG">WLUG</option>
<option value="EESA">EESA</option>
<option value="ELESA">ELESA</option>
<option value="ROTRACT">ROTRACT</option>
<option value="PACE">PACE</option>
<option value="MESA">MESA</option>
<option value="ART-CIRCLE">ART-CIRCLE</option>
<option value="CESA">CESA</option>
<option value="SOFTA">SOFTA</option>
</select>
<select name="cat">
<option value="1">SY</option>
<option value="2">TY</option>
<option value="3">B.Tech</option>
</select>
<select name="choose">
<option value="Notices">Notice</option>
<option value="Notes">Notes</option>
</select>
<br><br>
<a href="del_not1.php"><input id="butt" type="button" name="delete" value="delete"/></a>
<input type="submit" name="submit" value="upload" />
</form>
  </div>
  
  </center>
  
</div>



</body>
</html> 

