 <?php
require_once('connection.php');
error_reporting(0);


if(isset($_POST['old_username'])&&isset($_POST['new_username'])&&isset($_POST['old_password'])&&isset($_POST['new_password']))
{
	$old_user=$_POST['old_username'];
	$new_user=$_POST['new_username'];
	$old_pass=$_POST['old_password'];
	$new_pass=$_POST['new_password'];
    
	mysql_select_db($mysql_database,$bd);
	$qur="select * from member where BINARY username='$old_user'";
    $res=mysql_query($qur);
	if(mysql_num_rows($res)>0)
    {
		$qur1="select * from member where BINARY username='$old_user'";
		$res1=mysql_query($qur1);
		$row1=mysql_fetch_array($res1);
		
		if($row1['password']==$old_pass)
	    {
			$qur3="select * from member where BINARY username='$new_user'";
			$res3=mysql_query($qur3);
			if(mysql_num_rows($res3)>0)
			{
				echo '<script language="javascript">';
		    echo 'alert("Username already exist please choose another username.");';
		    echo 'window.location.href="setting.php";';
		    echo '</script>';
			}
			else
			{
			$qur4="select * from member where BINARY password='$new_pass'";
			$res4=mysql_query($qur4);
			if(mysql_num_rows($res4)>0)
			{
				echo '<script language="javascript">';
		    echo 'alert("Password already exist please choose another password.");';
		    echo 'window.location.href="setting.php";';
		    echo '</script>';
			}
			else
			{
		     $qur2="UPDATE member SET username='$new_user',password='$new_pass' WHERE BINARY username='$old_user' and BINARY password='$old_pass'";
		     $res2=mysql_query($qur2);
			 echo '<script language="javascript">';
		    echo 'alert("Username and Password Successfully changed.");';
		    echo 'window.location.href="setting.php";';
		    echo '</script>';
		    }
			}
		}
		else
		{
			echo '<script language="javascript">';
		    echo 'alert("Old password not matched.");';
		    echo 'window.location.href="setting.php";';
		    echo '</script>';
		
	    }
	}
	else
    {
		    echo '<script language="javascript">';
		    echo 'alert(" Old Username not matched.");';
		    echo 'window.location.href="setting.php";';
		    echo '</script>';
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

</head>
 <style>
 
 

 
 
 #butt{
	 color:white;
 }
 #butt:hover{
	 
	 -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform:translateZ(0) scale(1.00); /* Safari and Chrome */
    -moz-transform:scale(1.00); /* Firefox */
    -ms-transform:scale(1.00); /* IE 9 */
    -o-transform:translatZ(0) scale(1.00); /* Opera */
    transform:translatZ(0) scale(1.00);
	
	
	
	-moz-box-shadow: 0 0 10px #000000; -webkit-box-shadow: 0 0 10px #ccc; box-shadow: 0 0 10px #000000; 
 }
 #back{
	     margin-top:100px;
		 <!--margin-left:340px;-->
	     box-shadow: 10px 20px 10px #888888;
         width:500px;
		 height:330px;
		 background:white;
			moz-box-shadow: 0 0 20px #000000; -webkit-box-shadow: 0 10px 20px #ccc; box-shadow: 0px 20px 30px #000000; 
 
 }
 #shubham{
	 background:#FF9933;
	 height:80px;
 }
 #back2{
	 height:10px;
	 background:white;
 }

 #line{
	  height: 5px;
	  background:#cccccc;
    border: 0;
    box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
 }

::-webkit-input-placeholder {
   color: rgb(250, 255, 189);
}


form {
  
 
  background:rgb(250, 255, 189);
  
}

form input {
  border: none;
  background-color:rgb(250, 255, 189);
  
  outline: none;
}


#butt{
	background:#FF9933;
	color:white;
	width:150px;
	height:50px;
	font-family:sans-serif;
}

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
 </style>
 
  <body style="background:#cccccc;">
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
    <div>
	</nav>
  </nav>
  <center>
  <div id="back">
  
      <center><div id="shubham"><h2 style="font-family:times new roman;"><br>Change Password <br><br/><br></h2></div></center>
	  
	 <hr id="line">
	  
	  <center>
	  <form action="setting.php" method="post" enctype="multipart/form-data">
	    <input type="text" name="old_username" placeholder="Old Username" class="form-control" />
        <hr id="line">
		<input type="text" name="new_username" placeholder="New Username" class="form-control"  /><hr id="line">

		<input type="text" name="old_password" placeholder="Old Password" class="form-control"/><hr id="line">

        <input type="text" name="new_password" placeholder="New Password" class="form-control" /><hr id="line">
		<br/>
        
       <button type="submit" id="butt" >Save Changes</button>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp  <a href="home.php"><button type="button" id="butt">Cancel</button></a><br>
         <br>
		<hr id="line">
		
	  </form>
      </center>	 
	  </div>
</center>
</body>
</html>
	  


  
  