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
#form{
	width:500px;
	height:200px;
	border-radius: 25px;
    border: 2px solid #73AD21;
    padding: 20px;
    
}
</style>
</head>
 
 <body>

  <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="about.html"><span><i class="glyphicon glyphicon-education"></i> CampusPoint</span></a>
    </div>
	<div>
      <ul class="nav navbar-right">
        
		<center><li><a class="navbar-brand" href="setting.php"><span ><i class="glyphicon glyphicon-hand-left"></i>back</span></a></li></center>
		
	
  </div>
    <div>
	</nav>
  <center>
 <div id="form">
 <form action="forgot_pass.php" method="post" enctype="multipart/form-data">
	    <input type="text" name="mail" placeholder="E-Mail" class="form-control" />
        <hr id="line">
		
		
       
       <button type="submit" id="butt" >OK</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  <a href="setting.php"><button type="button" id="butt">Cancel</button></a><br>
         <br>
		<hr id="line">
		
	  </form>
	  </div>
	  </center>
</body>