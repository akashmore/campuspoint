<?php
error_reporting(0);
require_once('connections/connection.php');
mysql_select_db($database,$phpimage);
$qur="select * from gallery";
if(isset($_POST['category']))
{
  $category=$_POST['category'];
  $qur="select * from gallery where category='".$category."'";
}
  $res=mysql_query($qur,$connection);

?>
<!doctype html>
<html>
 <head>
  <link rel="shortcut icon" href="../images/logo1.png"/>
  <?php include "header.php";?>
   <title>Gallery</title>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   
<style>

.carousel-inner > .item > img,
  .carousel-inner > .item > a > img {
      width: 70%;
      margin: auto;
  }
.select-style {
    padding: 0;
    margin: 5px;
    border: 1px solid #ccc;
    width: 120px;
    border-radius: 3px;
    overflow: hidden;
    background-color: #fff;
  
    background: #fff url("http://www.scottgood.com/jsg/blog.nsf/images/arrowdown.gif") no-repeat 90% 50%;
}

.select-style select {
    padding: 5px 8px;
    width: 130%;
    border: none;
    box-shadow: none;
    background-color: transparent;
    background-image: none;
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
}

.select-style select:focus {
    outline: none;
}
</style>
 </head>
 
 <body>
   <br><br><br><br>


<center><h2 style="background-color:white;font-family: 'Lobster', cursive;color:orange">--Gallery--</h2></center>
<div class="container">
  <br>
  
  <form name="form" method="post" action="gallery.php">
  <center>
  <div class="row">
  <div class="col-sm-4">
   <div class="select-style">
  <select name="category" onchange="form.submit()" >
        <option selected disabled hidden>Clubs</option>

    <option value="SAIT">SAIT</option>
    <option value="ACSES">ACSES</option>
    <option value="WLUG">WLUG</option>
    <option value="ROTRACT">ROTRACT</option>
  </select>
</div>
</div>
  <div class="col-sm-4">

<div class="select-style">
  <select name="category" onchange="form.submit()">
        <option selected disabled hidden>Departments</option>

    <option value="IT">IT</option>
    <option value="CSE">CSE</option>
    <option value="ELE">ELE</option>
    <option value="EEE">EEE</option>
  </select>
</div>
</div>
  <div class="col-sm-4">

<div class="select-style">
  <select name="category" onchange="form.submit()">
      <option selected disabled hidden>Campus</option>

    <option value="IT">FUN</option>
    <option value="CSE">ANIMALS</option>
    <option value="ELE">NATURE</option>
    <option value="EEE">SPORTS</option>
  </select>
</div>
</div>
  </center>
  </form>
  <br><br>
  <div id="myCarousel" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner" role="listbox">
  <div class="item active">
        <img src="images/c2.png" alt="Chania" width="460" height="345">
      </div>
  
<?php 
while($row=mysql_fetch_array($res))
{ 
echo "<div class='item'>";
?>
<img src="<?php echo $row['path'] ?>" width="300" height="200"></img><br/>

<?php   
echo "</div>";
}?>
</div>
<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>



</body>
</html>
