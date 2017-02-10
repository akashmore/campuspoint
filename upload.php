<?php 
	session_start();
	
if(isset($_FILES['video']))	
{	
	 $target = "upload/"; 
	 $uploaded_size = $_FILES['video']['size'];
	 $uploaded_type = @strtolower(end(explode('.',$_FILES['video']['name'])));
	 $tmp_name = $_FILES['video']['tmp_name'];
	 $ok=1; 
	 if ($ok==0) 
	 { 
	 echo "Sorry your file was not uploaded"; 
	 } 
	 
	
	 else 
	 { 
        $fname=$_SESSION['SESS_FIRST_NAME'];
		$nameis = "$fname.".$uploaded_type;
		$path ="upload/".$_SESSION['SESS_FIRST_NAME']."/".$_FILES['video']['name'].".".$uploaded_type;
		$name=$_FILES["video"]["tmp_name"];
		//echo $path;
		 if(move_uploaded_file($name, $path)) 
		 { 
		
			//echo "<a href="upload1.php"><h2>For more uploads click here.....</h2></a>";  
			header ('location: upload1.php');
			//echo "The file ". $_FILES['video']['name']. " has been uploaded"; 
		 } 
		 else 
		 { 
			//echo "<a href="upload2.php"><h2>For RETRY click here.....</h2></a>" 
			//echo mysql_error();
			header ('location: upload2.php');
			//echo "Sorry, there was a problem uploading your file."; 
		 } 
	 } 
}
	
?>  
