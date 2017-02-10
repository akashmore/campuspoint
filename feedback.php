<!DOCTYPE html>
<html>
<head>

<meta http-equiv="refresh" content="0: url=http://shubhamhupare.esy.es/feedback.php">
</head>
<body>
<script>
window.location.replace("http://shubhamhupare.esy.es/feedback1.html");
</script>
<form method="POST" action="sendmail.php">
    Name:<br/>
        <input type="text" name="name" />
        <br/><br/>
    EMail:<br/>
        <input type="text" name="email" />
        <br/><br/>
	Phone Number:<br/>
        <input type="text" name="number" />
        <br/><br/>
    Message: <br/>
        <textarea name="message" rows="10" cols="50" >
        </textarea><br/>
    <input type="submit" value="submit" />
</form>
</body>
</html>