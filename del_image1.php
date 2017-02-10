
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

</body>
</html>

<?php

require ('php_image/connections/phpimage.php');
error_reporting(0);


echo "<div class='col-sm-12 img-hover' style='background-color:white;font-family: 'san-serif', cursive;color:#181818'>
	<center><h1>CLUBS</h1></center>
</div>";

echo "<br/><br/><br/><br/><br/>";
echo "<center>";
		echo "<form action='delete_image.php' method='post' enctype='multipart/form-data'>";
		mysql_select_db($database,$phpimage);
		$qur1="select * from image where cid=1";
		$res1=mysql_query($qur1);
		$cnt=1;
		//echo "<center>";
		echo "<select name='shubham' onchange='myFunction1(this)'>";
		echo "<option selected='true' disabled='disabled'>List of images</option>";   

		while($row1=mysql_fetch_array($res1))
	    { 
	       
		   echo "<option value=".$cnt.">".$row1['name']."</option>";
		   $cnt++;
	    }
	    echo "</select>";
		
		echo "<input id='text1' type = 'hidden' name = 'text1' value = '' />";
		echo "<script type='text/javascript'>
              function myFunction1(ddl) {
                 document.getElementById('text1').value = ddl.options[ddl.selectedIndex].text;
                  }
                 </script>";
		echo "&nbsp&nbsp&nbsp"."<input type='submit' name='delete1' value='delete' />";
		echo "</form>";
		echo "</center>";
		echo "<br/><br/><br/><br/><br/>";
	echo "<div class='col-sm-12 img-hover' style='background-color:white;font-family: 'san-serif', cursive;color:#181818'>
	<center><h1>CAMPUS</h1></center>
</div>";

echo "<br/><br/><br/><br/>";
echo "<center>";
		echo "<form action='delete_image.php' method='post' enctype='multipart/form-data'>";
		mysql_select_db($database,$phpimage);
		$qur1="select * from image where cid=2";
		$res1=mysql_query($qur1);
		$cnt=1;
		//echo "<center>";
		echo "<select name='shubham' onchange='myFunction2(this)'>";
		echo "<option selected='true' disabled='disabled'>List of images</option>";   

		while($row1=mysql_fetch_array($res1))
	    { 
	       
		   echo "<option value=".$cnt.">".$row1['name']."</option>";
		   $cnt++;
	    }
	    echo "</select>";
		
		echo "<input id='text2' type = 'hidden' name = 'text2' value = '' />";
		echo "<script type='text/javascript'>
              function myFunction2(ddl) {
                 document.getElementById('text2').value = ddl.options[ddl.selectedIndex].text;
                  }
                 </script>";
		echo "&nbsp&nbsp&nbsp"."<input type='submit' name='delete2' value='delete' />";
		echo "</form>";
		echo "</center>";	
		
	?>
	