<?php
error_reporting(0);

include 'connection/connection.php';

if(isset($_POST['register']))
{
	$email=$_POST['email'];
	$password=$_POST['password'];
	$hashed_password = crypt($password);
	
	$name=$_POST['name'];
	$prn=$_POST['prn'];
	$username=$prn."_".$_POST['username'];

	
	mysql_select_db($database,$connection);
	$search_query="select * from members where username='".$username."'";
	$res_search=mysql_query($search_query,$connection);
	$count=mysql_num_rows($res_search);
	
	if($count>0)
	{
		echo "<script>";
		echo 'alert("Username is already exist.");';
		echo '</script>';
	}
	else
	{
		$insert_query="insert into members(id,username,password,email,name,class) values('','$username','$hashed_password','$email','$name','$prn');";
		$result_query=mysql_query($insert_query,$connection);
		if($result_query)
		{
			echo "<script>";
			echo 'alert("You have successfully registered.");';
			echo '</script>';
		}
	}
}
if(isset($_POST['login']))
{ 
    session_start();
	$Username=$_POST['username'];
	$Password=$_POST['password'];

	mysql_select_db($database,$connection);
	$qur="select * from members where username='".$Username."'";
	$result=@mysql_query($qur,$connection);
	 function hash_equals($str1, $str2)
    {
        if(strlen($str1) != strlen($str2))
        {
            return false;
        }
        else
        {
            $res = $str1 ^ $str2;
            $ret = 0;
            for($i = strlen($res) - 1; $i >= 0; $i--)
            {
                $ret |= ord($res[$i]);
            }
            return !$ret;
        }
    }
	while($row=mysql_fetch_array($result))
	{
		$password=$row['password'];
		
	    

		
		if (hash_equals($password, crypt($Password,$password))) 
		{
   //echo "Password verified!";
	$val=TRUE;
	break;
	}
	}
	
	
   
	
	/*$count_lines=mysql_num_rows($result);
	if($count_lines>0)
		$val=TRUE;
	else
		$val=FALSE;
	$row  = @mysql_fetch_array($result);*/
	if($val) 
	{
		echo "<script>";
		echo "alert('success')";
		echo "</script>";
		$_SESSION['username']=$Username;
	    header('Location: profile.php');
   }
	else 
	{
		echo "<script>";
		echo "alert('Invalid Username or Password')";
		echo "</script>";
	}
	
	
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
  <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=PT+Sans|Roboto+Slab" rel="stylesheet">

<style>
#shubham:hover{
	-moz-box-shadow: 0 0 10px #FFF; -webkit-box-shadow: 0 0 10px #ccc; box-shadow: 0 0 10px #FFF; 

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

#foot{
width:100%;
height:relative;
background:rgb(0,196,223);
}
.prettyline {
  height: 5px;
  border-top: 0;
  background: #c4e17f;
  border-radius: 5px;
  background-image: -webkit-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
  background-image: -moz-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
  background-image: -o-linear-gradient(left, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
  background-image: linear-gradient(to right, #c4e17f, #c4e17f 12.5%, #f7fdca 12.5%, #f7fdca 25%, #fecf71 25%, #fecf71 37.5%, #f0776c 37.5%, #f0776c 50%, #db9dbe 50%, #db9dbe 62.5%, #c49cde 62.5%, #c49cde 75%, #669ae1 75%, #669ae1 87.5%, #62c2e4 87.5%, #62c2e4);
}
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
		<li><a href="#signup" data-toggle="modal" data-target=".bs-modal-sm"><span ><i class="glyphicon glyphicon-user"></i> Login</span></a></li>
		
		<li><a href="feedback.php"><span ><i class="glyphicon glyphicon-edit"></i> feedback</span></a></li>

      </ul>
    </div>
  </div>

</nav>
<br><br>
<center><div class="col-sm-12" style="font-family: 'Lobster', cursive;color:white;background-color:light-blue;"><h1>WELCOME TO THE CAMPUS POINT</h1></div></center>
 <center><div class="col-sm-12" style="font-family: 'Lobster', cursive;color:white;background-color:light-blue"><h3>"The Ultimate Corner"</h3></div></center>
 

 <div class="image">
	<img src="images/d6.jpg" class="img">
</div>


 <div class="container-fluid">
 
  <div class="row">
    <div class="col-sm-4 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:skyblue">
	
	  <center><a href="php_image/home.php"><h2>Gallery</h2></a><center>
  <br><br> 
 <a href="php_image/home.php"><img src="images/gallery.png"></img></a>
  </div>
  <div class="col-sm-4">
	<!-- BEGIN # BOOTSNIP INFO -->
	
  

<!-- Modal -->
<div class="modal fade bs-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
        <br>
        <div class="bs-example bs-example-tabs">
            <ul id="myTab" class="nav nav-tabs">
              <li class="active"><a href="#signin" data-toggle="tab">Sign In</a></li>
              <li class=""><a href="#signup" data-toggle="tab">Register</a></li>
              
            </ul>
        </div>
      <div class="modal-body">
        <div id="myTabContent" class="tab-content">
        
        <div class="tab-pane fade active in" id="signin">
            <form class="form-horizontal" method="post" action="index.php">
            <fieldset>
            <!-- Sign In Form -->
            <!-- Text input-->
            <div class="control-group">
              <label class="control-label" for="userid">Username</label>
              <div class="controls">
                <input required="" id="userid" name="username" type="text" class="form-control" placeholder="" class="input-medium" required="">
              </div>
            </div>

            <!-- Password input-->
            <div class="control-group">
              <label class="control-label" for="passwordinput">Password</label>
              <div class="controls">
                <input required="" id="passwordinput" name="password" class="form-control" type="password" placeholder="********" class="input-medium">
              </div>
            </div>

            <!-- Multiple Checkboxes (inline) -->
            <div class="control-group">
              <label class="control-label" for="rememberme"></label>
              <div class="controls" style="padding-left:20px;">
                <label class="checkbox inline" for="rememberme-0">
                  <input type="checkbox" name="rememberme" id="rememberme-0" value="Remember me">
                  Remember me
                </label>
              </div>
            </div>

            <!-- Button -->
            <div class="control-group">
              <label class="control-label" for="signin"></label>
              <div class="controls">
                <button id="signin" name="login" class="btn btn-success">Sign In</button>
              </div>
            </div>
			<br>
			<a href="#forgot" data-toggle="tab">Forgot Password?</a>
			
            </fieldset>
            </form>
        </div>
		<div class="tab-pane fade" id="forgot">
            <form class="form-horizontal" method="post" action="index.php">
            <fieldset>
            <!-- Sign In Form -->
            <!-- Text input-->
            <div class="control-group">
              <label class="control-label" for="userid">Email</label>
              <div class="controls">
                <input required="" id="userid" name="email" type="text" class="form-control" placeholder="" class="input-medium" required="">
              </div>
            </div>

           

            <!-- Button -->
            <div class="control-group">
              <label class="control-label" for="signin"></label>
              <div class="controls">
                <button id="signin" name="login" class="btn btn-success">Send</button>
              </div>
            </div>
			<br>

			
            </fieldset>
            </form>
        </div>
        <div class="tab-pane fade" id="signup">
            <form class="form-horizontal" method="post" action="index.php">
            <fieldset>
            <!-- Sign Up Form -->
            <!-- Text input-->
			 <div class="control-group">
              <label class="control-label" for="name">Full Name</label>
              <div class="controls">
                <input id="Email" name="name" class="form-control" type="text" placeholder="" class="input-large" required="">
              </div>
            </div>
			
			 <div class="control-group">
              <label class="control-label" for="prn">PRN NO</label>
              <div class="controls">
                <input id="Email" name="prn" class="form-control" type="text" placeholder="" class="input-large" required="">
              </div>
            </div>
			
            <div class="control-group">
              <label class="control-label" for="Email">Email</label>
              <div class="controls">
                <input id="Email" name="email" class="form-control" type="text" placeholder="" class="input-large" required="">
              </div>
            </div>
            
            <!-- Text input-->
            <div class="control-group">
              <label class="control-label" for="userid">Username</label>
              <div class="controls">
                <input id="userid" name="username" class="form-control" type="text" placeholder="" class="input-large" required="">
              </div>
            </div>
            
            <!-- Password input-->
            <div class="control-group">
              <label class="control-label" for="password">Password</label>
              <div class="controls">
                <input id="password" name="password" class="form-control" type="password" placeholder="********" class="input-large" required="">
                
              </div>
            </div>
            
            <!-- Text input-->
            <div class="control-group">
              <label class="control-label" for="reenterpassword">Re-Enter Password</label>
              <div class="controls">
                <input id="reenterpassword" class="form-control" name="reenterpassword" type="password" placeholder="********" class="input-large" required="">
              </div>
            </div>
            
            <!-- Multiple Radios (inline) -->
            <br>
            
            
            <!-- Button -->
            <div class="control-group">
              <label class="control-label" for="confirmsignup"></label>
              <div class="controls">
                <button id="confirmsignup" name="register" type="submit" class="btn btn-success">Sign Up</button>
              </div>
            </div>
			
            </fieldset>
            </form>
      </div>
    </div>
      </div>
      <div class="modal-footer">
      <center>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </center>
      </div>
    </div>
  </div>
</div>
	

<!-- END # BOOTSNIP INFO -->

</div>
	<div class="col-sm-4 img-hover" style="background-color:white;font-family: 'Lobster', cursive;color:skyblue">
	<center><h2><a href="about.html">About</h2></a></center>
  <br><br> 
    <center><a href="about.html"><img class="img-responsive img-ronded" src="images/about.png"></img></a></center>
  </div>
</div>
</div>
<br><br>

	
	 <center><div class="col-sm-12" style="font-family: 'Lobster', cursive;color:green"><h2>-- Follow us on --</h2></div></center>
	
	
	<div style="background-color:black;font-family: 'Lobster', cursive;color:white">
	<div class="teachers">
	<div class="container-fluid">
	
		
			<div class="col-md-4 text-center">
				
					
					<h3>Shubham Hupare</h3>
					
					<i class="glyphicon glyphicon-earphone"></i> 7058563707
					<br>
					<!--<i class="glyphicon glyphicon-envelope"></i> hupareshubham@gmail.com-->
					<center>
	
	<a target="_blank" title="find us on Facebook" href="http://www.facebook.com/shubham.hupare.73"><img id="shubham" alt="follow me on facebook" src="images/fb.ico" height="32" width="32" border=0></a>&nbsp&nbsp
	<a target="_blank" title="find us on Google+" href="https://plus.google.com/u/0/108291905379630720213"><img id="shubham" alt="follow me on google+" src="images/Google-plus.ico" height="32" width="32" border=0></a>&nbsp&nbsp
		<a target="_blank" title="find us on Google+" href="https://www.linkedin.com/in/shubham-hupare-babb19a2"><img id="shubham" alt="follow me on google+" src="images/linkedin-icon.png" height="32" width="32" border=0></a>

	
	
	</center>	
			</div>	
            		
			
			
			<div class="col-md-4 text-center">
				
					
					<h3>Akash More</h3>
						
					<i class="glyphicon glyphicon-earphone"></i> 7387971032
					<br>
					<!--<i class="glyphicon glyphicon-envelope"></i> akashmore1997.am85@gmail.com-->
					<center>
	
	<a target="_blank" title="find us on Facebook" href="https://www.facebook.com/akash.more.315080"><img id="shubham" alt="follow me on facebook" src="images/fb.ico" height="32" width="32" border=0></a>&nbsp&nbsp
	<a target="_blank" title="find us on Google+" href="https://plus.google.com/100090608075056523779"><img id="shubham" alt="follow me on google+" src="images/Google-plus.ico" height="32" width="32" border=0></a>&nbsp&nbsp
		<a target="_blank" title="find us on Google+" href="https://www.linkedin.com/in/akash-more-707440104"><img id="shubham" alt="follow me on google+" src="images/linkedin-icon.png" height="32" width="32" border=0></a>

	
	
	</center>	
				
			</div>
			<div class="col-md-4 text-center">
				
					
						<h3>Nilesh Bonde</h3>
								
					<i class="glyphicon glyphicon-earphone"></i> 8605740124
					<br>
					<!--<i class="glyphicon glyphicon-envelope"></i> nileshbonde13@gmail.com-->
					<center>
	
	<a target="_blank" title="find us on Facebook" href="http://www.facebook.com/shubham.hupare.73"><img alt="follow me on facebook" src="images/fb.ico" height="32" width="32" border=0></a>&nbsp&nbsp
	<a target="_blank" title="find us on Google+" href="https://plus.google.com/u/0/108291905379630720213/posts"><img alt="follow me on google+" src="images/Google-plus.ico" height="32" width="32" border=0></a>&nbsp&nbsp
		<a target="_blank" title="find us on Google+" href="https://www.linkedin.com/in/shubham-hupare-babb19a2?trk=nav_responsive_tab_profile"><img alt="follow me on google+" src="images/linkedin-icon.png" height="32" width="32" border=0></a>

	
	
	</center>	
						
		
		
	        </div>
			<br>
	</div>
</div>
</div>
<footer id="foot">



</footer>

	</body>
</html>
