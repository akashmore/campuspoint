<?php
//converting veriables
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$number=$_POST['number'];
$recipient = 'hupareshubham@gmail.com'; 
$subject="Contact Form"; 
//creating message
$content = "New contact form submission \n From: ".$name.",\n Email: ".$email.", \n Message: ".$message.", \n Phone Number: ".$number;

//sending message
mail($recipient, $message, $content);
	
?>