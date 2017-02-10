<?php
include 'connection/connection.php';
error_reporting(0);
session_start();
mysql_select_db($database,$connection);
if(!$_SESSION['username'])	
{
	  header("Location: index.php");
}


$username=$_SESSION['username'];
$_SESSION['username']=$username;

$count1="select * from gallery where username='".$username."'";

$count2="select * from audio where username='".$username."'";

$count3="select * from video where username='".$username."'";

$res_count1=mysql_query($count1,$connection);
$temp1=mysql_num_rows($res_count1);

$res_count2=mysql_query($count2,$connection);
$temp2=mysql_num_rows($res_count2);

$res_count3=mysql_query($count3,$connection);
$temp3=mysql_num_rows($res_count3);


$temp_total=$temp1+$temp2+$temp3;

$data_qur="select * from audio where username='".$username."'";
$data_qur1="select * from members where username='".$username."'";

if(isset($_POST['category']))
{
  $category=$_POST['category'];
  if($category==3)
	  header("Location:profile_image.php"); 
  if($category==2)
	  header("Location:profile_audio.php");   
  if($category==1)
	  header("Location:profile_video.php"); 
  if($category==0)
	  header("Location:profile.php"); 
	  
}


if(isset($_POST['search_button']))
{
	$search_key=$_POST['search_field'];
	//$data_qur="select * from gallery where showname like %.".$search_key."%";
	//$res_search=mysql_query($search_qur,$connection);
	
	$count2="select * from audio where showname like '%".$search_key."%' and username='".$username."'";


}

$res_count2=mysql_query($count2,$connection);



if(mysql_query($data_qur1,$connection))
{
$data_res1=mysql_query($data_qur1,$connection);
$data_row1=mysql_fetch_array($data_res1);

}
if(mysql_query($data_qur,$connection))
{
$data_res=mysql_query($data_qur,$connection);
$data_row=mysql_fetch_array($data_res);
$_SESSION['author_name']=$data_row['author_name'];
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
  <link rel='stylesheet prefetch' href='http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css'>
<link rel='stylesheet prefetch' href='profile.css'>

  </head>
  <body>
   <nav>
  <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#"><span><i class="glyphicon glyphicon-education"></i> CampusPoint</span></a>
    </div>
    <div>
   
  </div>
  
   <div>
      
  </div>
</nav>
</nav>

<div class="container">

 <div class="mail-box">
                  <aside class="sm-side">
                      <div class="user-head">
                          <center>
						  <a class="inbox-avatar" href="javascript:;">
                             <img  width="64" height="60" src="hhh.jpg">
                          </a>
						  </center>
                          <div class="user-name">
                              <h5><a href="#"><a><?php echo $data_row['author_name'];?></h5>
                          </div>
                          
                      </div>
                       <div class="inbox-body">
                          <a href="#myvideo" data-toggle="modal"  title="Compose"    class="btn btn-compose">
                              <span class="glyphicon glyphicon-upload"></span> Upload Video
                          </a>
						  <br><br>
						  <a href="#myaudio" data-toggle="modal"  title="Compose"    class="btn btn-compose">
                          <span class="glyphicon glyphicon-upload"></span>     Upload Audio
                          </a>
						  <br><br>
						  <a href="#mygallery" data-toggle="modal"  title="Compose"    class="btn btn-compose">
                          <span class="glyphicon glyphicon-upload"></span> Upload Images
                          </a>
                          <!-- Modal -->
                           <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myvideo" class="modal fade" style="display: none;">
                              <div class="modal-dialog">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                                          <h4 class="modal-title">Upload video files here...</h4>
                                      </div>
                                      <div class="modal-body">
                                          <form role="form" class="form-horizontal" method="post" action="upload_video.php" enctype="multipart/form-data">

									  <div class="form-group">
                                                  <label class="col-lg-2 control-label">Category</label>
                                                  <div class="col-lg-10">'
													<select class="form-control" id="sel1" name="category">
																<option value="0">--choose option--</option>
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
														<option value="PLACEMENTS">PLACEMENTS</option>  
													</select>
                                                  </div>
                                              </div>
                                              <div class="form-group">
                                                  <label class="col-lg-2 control-label">Name</label>
                                                  <div class="col-lg-10">
                                                      <input type="text" placeholder="" id="cc" name="video_name" class="form-control">
                                                  </div>
                                              </div>
                                              

                                              <div class="form-group">
                                                  <div class="col-lg-offset-2 col-lg-10">
                                                      <span class="btn green fileinput-button">
                                                        <i class="fa fa-plus fa fa-white"></i>
                                                        <span>Attach File</span>
                                                        <input type="file" name="file_upload" multiple="">
                                                      </span>
                                                      <button class="btn btn-send" name="video" type="submit">Upload</button>
                                                  </div>
                                              </div>
                                          </form>
                                      </div>
                                  </div><!-- /.modal-content -->
                              </div><!-- /.modal-dialog -->
                          </div><!-- /.modal -->
						  
						  
						  <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="myaudio" class="modal fade" style="display: none;">
                              <div class="modal-dialog">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                                          <h4 class="modal-title">Upload audio files here...</h4>
                                      </div>
                                      <div class="modal-body">
                                          <form role="form" class="form-horizontal" method="post" action="upload_audio.php" enctype="multipart/form-data">

                                              <div class="form-group">
                                                  <label class="col-lg-2 control-label">Name</label>
                                                  <div class="col-lg-10">
                                                      <input type="text" placeholder="" name="audio_name" id="cc" class="form-control">
                                                  </div>
                                              </div>
                                             

                                              <div class="form-group">
                                                  <div class="col-lg-offset-2 col-lg-10">
                                                      <span class="btn green fileinput-button">
                                                        <i class="fa fa-plus fa fa-white"></i>
                                                        <span>Attach File</span>
                                                        <input type="file" name="file_upload" multiple="">
                                                      </span>
                                                      <button class="btn btn-send" name="audio" type="submit">Upload</button>
                                                  </div>
                                              </div>
                                          </form>
                                      </div>
                                  </div><!-- /.modal-content -->
                              </div><!-- /.modal-dialog -->
                          </div><!-- /.modal -->
						  
						   <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="mygallery" class="modal fade" style="display: none;">
                              <div class="modal-dialog">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                                          <h4 class="modal-title">Upload gallery files here...</h4>
                                      </div>
                                      <div class="modal-body">
                                          <form role="form" class="form-horizontal" method="post" action="upload_image.php" enctype="multipart/form-data">
                                              <div class="form-group">
                                                  <label class="col-lg-2 control-label">Category</label>
                                                  <div class="col-lg-10">
													<select class="form-control" id="sel1" name="cat">
												        <option value="0">--choose option--</option>
														<option value="Nature">Nature</option>
														<option value="Campus">Campus</option>
														<option value="Animals">Animals</option>
														<option value="Fun">Fun</option>
														<option value="Social">Social</option>
														<option value="Sports">Sports</option>
														<option value="Other">Other</option>
														  
													</select>
                                                  </div>
                                              </div>
                                              <div class="form-group">
                                                  <label class="col-lg-2 control-label">Name</label>
                                                  <div class="col-lg-10">
                                                      <input type="text" placeholder="" name="image_name" id="cc" class="form-control">
                                                  </div>
                                              </div>
                                              <div class="form-group">
                                                  <label class="col-lg-2 control-label">Description</label>
                                                  <div class="col-lg-10">
                                                      <input type="text" placeholder="" name="image_description" id="inputPassword1" class="form-control">
                                                  </div>
                                              </div>

                                              <div class="form-group">
                                                  <div class="col-lg-offset-2 col-lg-10">
                                                      <span class="btn green fileinput-button">
                                                        <i class="fa fa-plus fa fa-white"></i>
														<span>Attach File</span>
		
                                                        <input type="file" name="file_upload">
                                                      </span>
                                                      <button class="btn btn-send" name="gallery" type="submit">Upload</button>
                                                  </div>
                                              </div>
                                          </form>
                                      </div>
                                  </div><!-- /.modal-content -->
                              </div><!-- /.modal-dialog -->
                          </div><!-- /.modal -->
						  
						     <div aria-hidden="true" aria-labelledby="myModalLabel" role="dialog" tabindex="-1" id="mysetting" class="modal fade" style="display: none;">
                              <div class="modal-dialog">
                                  <div class="modal-content">
                                      <div class="modal-header">
                                          <button aria-hidden="true" data-dismiss="modal" class="close" type="button">×</button>
                                          <h4 class="modal-title">Authentications update...</h4>
                                      </div>
                                      <div class="modal-body">
                                          <form role="form" class="form-horizontal">
                                              <div class="form-group">
                                                  <label class="col-lg-2 control-label">Username</label>
                                                 <div class="col-lg-10">
                                                      <input type="text" placeholder="" name="username" id="cc" class="form-control">
                                                  </div>
											  </div>
                                              <div class="form-group">
                                                  <label class="col-lg-2 control-label">Old Password</label>
                                                  <div class="col-lg-10">
                                                      <input type="text" placeholder="" name="oldpass" id="cc" class="form-control">
                                                  </div>
                                              </div>
                                              <div class="form-group">
                                                  <label class="col-lg-2 control-label">New Password</label>
                                                  <div class="col-lg-10">
                                                      <input type="text" placeholder="" name="newpass" id="inputPassword1" class="form-control">
                                                  </div>
                                              </div>
												<div class="form-group">
                                                  <label class="col-lg-10 control-label" style="color:red">As soon as you change your credentials you will be logged out....</label>
                                                 
                                              </div>
                                              <div class="form-group">
                                                  <div class="col-lg-offset-2 col-lg-10">
                                                      <button class="btn btn-send" type="submit">Save</button>

                                                      <button class="btn btn-send" type="submit">Cancel</button>
                                                  </div>
                                              </div>
                                          </form>
                                      </div>
                                  </div><!-- /.modal-content -->
                              </div><!-- /.modal-dialog -->
                          </div><!-- /.modal -->
                      </div>
                      <ul class="inbox-nav inbox-divider">
                          <li class="active">
                              <a href="profile.php"> <span class="glyphicon glyphicon-file"></span>&nbsp&nbspAll Files<span class="label label-danger pull-right"><?php echo $temp_total;?></span></a>

                          </li>
                          <li>
                              <a href="profile_video.php"><span class="glyphicon glyphicon-facetime-video"></span>&nbsp&nbspVideo Files<span class="label label-success pull-right"><?php echo $temp3;?></span></a>
                          </li>
                          <li>
                              <a href="profile_audio.php"> <span class="glyphicon glyphicon-headphones"></span>&nbsp&nbspAudio Files<span class="label label-warning pull-right"><?php echo $temp2;?></span></a>
                          </li>
                          <li>
                              <a href="profile_image.php"> <span class="glyphicon glyphicon-camera"></span>&nbsp&nbspGallery Files<span class="label label-info pull-right"><?php echo $temp1?></span></a>
                          </li>
                         
                      </ul>
                     
                      
                      <div class="inbox-body text-center">
                          
                          <div class="btn-group">
						  <a class="btn mini btn-success" href="#mysetting" data-toggle="modal" title="Settings">
                                  <i class="fa fa-cog"></i>
                              </a>
                          </div>
						  <div class="btn-group">
						  <a class="btn mini btn-danger" href="logout.php" data-toggle="tooltip" title="Logout">
                                  <span class="glyphicon glyphicon-off">
                              </a>
                          </div>
                         
                      </div>

                  </aside>
                  <aside class="lg-side">
                      <div class="inbox-head">
                          <h3>Your Corner</h3>
                          <form method="post" action="profile_audio.php" class="pull-right position">
                              <div class="input-append">
                                  <input type="text" name="search_field" class="sr-input" placeholder="Search Files">
                                  <button class="btn sr-btn" name="search_button" type="submit"><i class="fa fa-search"></i></button>
                              </div>
                          </form>
                      </div>
                      <div class="inbox-body">
					    <form name="form" method="post" action="profile_image.php">

                         <div class="mail-option">
                            <center> <h3>Audio Files</h3></center>
                            <select class="form-control" id="sel1" name="category" onchange="form.submit()" >
												       <option selected disabled>Choose files</option>

														<option value="0">All Files</option>
														<option value="1">Video Files</option>
														<option value="2">Audio Files</option>
														<option value="3">Gallery Images</option>
														
														  
						     </select>

                         </div>
						 </form>
                          <table class="table table-inbox table-hover">
                            <tbody>
							<tr class="unread">
										
                                    
                                  <td class="view-message  dont-show">Name</td>
								  <td class="view-message">Delete</td>
								  <td class="view-message">Date</td>
								  <td class="view-message ">Time</td>
                                 
                              </tr>
							  
							<?php
							
							//$data_qur="select * from audio where username='".$username."'";
							//$data_res=mysql_query($data_qur,$connection);
						    
							 
							while($data_row_audio=mysql_fetch_array($res_count2))
							{
								?>
							
							  
                              <tr class="">
                                 
                                 <td class="inbox-small-cells"><?php echo $data_row_audio['showname'];?></td>
                                  <!--<td class="view-message dont-show"><?php echo $data_row_audio['category'];?></td>
								  -->
								  
								  <form action="delete_audio.php" method="post" name="myform">
									<td class="view-message"> <button type="submit" class="btn btn-link" name="yes" ><i class="fa fa-trash-o"></button></td>
									<input type="hidden" name="audio" value="<?php echo $data_row_audio['audio_name']?>"/>
								  </form>
								  
                                 <td class="inbox-small-cells"><?php echo $data_row_audio['date'];?></td>
                                 <td class="inbox-small-cells"><?php echo $data_row_audio['time'];?></td>

						     </tr>
							 <?php
							}
							?>
							
                          </tbody>
                          </table>
                      </div>
                  </aside>
              </div>
</div>
</body>
</html>