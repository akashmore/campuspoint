$sql = "SELECT `id`, `clubname`, `password` FROM `club`";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result)>0) {
    // output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $clubname=$row['clubname'];
        $clubpass=$row['password'];   
	   echo $clubname.' with pass '.$clubpass.'<br>';
    }
} else {
    echo "0 results";
}

mysqli_close($conn);
?> 
