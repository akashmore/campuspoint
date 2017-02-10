<?php
require_once('connections/phpvideo.php');
error_reporting(0);
mysql_select_db($database,$phpvideo);
$id=$_GET['cid'];
$qur="select * from video where cid='$id'";
$res=mysql_query($qur,$phpvideo);
?>



<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
		<title>College Tube</title>
        
        <link rel="stylesheet" type="text/css" href="css/jquery.jscrollpane.css" media="all" />
        <link rel="stylesheet" type="text/css" href="css/jquery.selectbox.css" />
		<link rel="stylesheet" type="text/css" href="css/videoGallery_buttons.css" />
        <!--[if lte IE 8 ]><link rel="stylesheet" type="text/css" href="css/ie_below_9.css" /><![endif]-->
        
        <script type="text/javascript" src="js/swfobject.js"></script>
		<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="js/jquery.dotdotdot-1.5.1.js"></script>
        <script type="text/javascript" src="js/jquery.address.js"></script>
        <script type="text/javascript" src="js/jquery.mousewheel.min.js"></script>
        <script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
        <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
        <script type="text/javascript" src="js/jquery.selectbox-0.2.js"></script>
        <script bodytype="text/javascript" src="http://www.youtube.com/player_api"></script>
        <script type="text/javascript" src="js/jquery.apPlaylistManager.min.js"></script>
        <script type="text/javascript" src="js/jquery.apYoutubePlayer.min.js"></script>
        <script type="text/javascript" src="js/jquery.vg.settings_buttons.js"></script>
        <script type="text/javascript" src="js/jquery.func.js"></script>
        <script type="text/javascript" src="js/jquery.vg.func.js"></script>
		<script type="text/javascript" src="js/jquery.videoGallery.min.js"></script>
		
		
		
   
   
   <link rel="stylesheet" href="bootstrap.min.css">
     <script src="bootstrap.min.js"></script>
     <script src="jquery.js"></script>
	 <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
		
	  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	
	
  </head>
  

  
  
  
  
  <body style="background:#303030"> 
	
  <nav class="navbar navbar-inverse navbar-fixed-top">
  
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a class="navbar-brand" href="#"><span><i class="glyphicon glyphicon-education"></i> CampusPoint</span></a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
         <li><a href="../../../../index.html"><span ><i class="glyphicon glyphicon-home"></i> Home</span></a></li>
		<li><a href="../../../../1page.html"><span ><i class="glyphicon glyphicon-th"></i> QuickAccess</span></a></li>
        <li><a href="../../../../departments.html"><span ><i class="glyphicon glyphicon-star"></i> Departments</span></a></li>
        <li><a href="../../../../clubs.html"><span ><i class="glyphicon glyphicon-asterisk"></i> Clubs</span></a></li>
        <li><a href="../../../../collegetube/ttt/v3/_deploy/index.html"><span ><i class="glyphicon glyphicon-play-circle"></i> CollegeTube</span></a></li>
        <li><a href="../../../../collegetune/index.html"><span ><i class="glyphicon glyphicon-headphones"></i> CollegeTune</span></a></li>
		<li><a href="../../../../contact.html"><span ><i class="glyphicon glyphicon-envelope"></i> Contact</span></a></li>
		<li><a href="../../../../login.php"><span ><i class="glyphicon glyphicon-user"></i> Login</span></a></li>
      </ul>
    </div>
  </div>

 
</nav>
  		
  <br><br><br><br><br><br>
  

  		<center>
		<div id="mainWrapper">
		
         
    	<div class="componentWrapper">

        	 <!-- player part -->
			 
             <div class="playerHolder">
             	 <!-- local video holder -->
                 <div class="mediaHolder"></div>
                 
                 <!-- youtube main iframe holder -->
                 <div class="youtubeIframeMain"></div>
                 
                 <!-- flash local main --> 
                 <div id="flashMain">
                     <a href="http://www.adobe.com/go/getflashplayer">
                        <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />
                     </a>
                 </div>
                
                 <!-- preview image --> 
                 <div class="mediaPreview"></div>
                 
                 <!-- preloader for local video --> 
                 <div class="preloader"></div>
                 
                 <!-- big play button -->
             	 <center><div class="big_play"><img src='data/icons/big_play3.png' width='76' height='76' alt='big_play'/></div></center>
                 
                 <div class="playerControls">
                 
                      <div class="player_playControl"><img src='data/icons/play.png' width='12' height='14' alt=''/></div>
                        
                    <div class="player_seekbar">
                          <div class="progress_bg"></div>
                          <div class="load_level"></div>
                          <div class="progress_level"></div>
                      </div>
                      
                      <div class="player_fullscreen"><img src='data/icons/fullscreen_enter.png' width='12' height='12' alt=''/></div>
                      
                      <div class="volume_seekbar">
                         <div class="volume_bg"></div>
                         <div class="volume_level"></div>
                      </div>
                      <div class="player_volume"><img src='data/icons/volume.png' width='13' height='14' alt=''/></div>
                      
                      <div class="player_mediaTime"><p>00:00 | 00:00</p></div>
                      
                      <div class="player_volume_tooltip"><p>0</p></div>
                      
                      <div class="player_progress_tooltip"><p>0:00 | 0:00</p></div>
                      
                 </div>
                 
                 
             	 <!-- media description --> 
             	 <div class="infoHolder"><div class="info_inner"></div></div>
             
                 <!-- description btn --> 
                 <div class="player_addon">
                     <div class="playlist_toggle"><img src='data/icons/playlist.png' width='40' height='40' alt='playlist_toggle'/></div>
                 </div>
                 
             </div>
             <!-- playlist part -->
             <div class="playlistHolder">
            
                 <div class="componentPlaylist">
                 
                 	 <!-- playlist items will be appended here! -->
                     <div class="playlist_inner"><div class="playlist_content"></div></div>
                     
                     <!-- flash mini preview -->
                     <div id="flashPreviewHolder">
                         <div id="flashPreview">
                             <a href="http://www.adobe.com/go/getflashplayer">
                                <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" />
                             </a>
                         </div>
                     </div>
                    
                     <!-- youtube iframe preview holder -->
                     <div class="youtubeIframePreview"></div>
                     
                 </div>
                 
                 <div class="thumbBackward"></div>	
            	 <div class="thumbForward"></div>
                 
             </div>
             
             <!-- this just holds the data, remains hidden! -->
             <div class="playlistData">
             
             	  

				 <!-- local tracks -->
                 <ul id='playlist1' data-address="playlist1">
				 <?php 
					
					$xid=1;
					while($row=mysql_fetch_array($res))
					{
						
						$xid++;
				?>
					
                     <li data-address="<?php echo 'local'.$xid;?>" class="playlistNonSelected" data-type='local' data-mp4Path="<?php echo $row['path'];?>" data-ogvPath="<?php echo $row['path'];?>" data-webmPath="<?php echo $row['path'];?>" data-imagePath='../media/video/1/main/01.jpg' data-description="<span class='infoTitle'>Nulla mauris justo</span><br/><br/>Ullamcorper nec, sollicitudin a, blandit ut, metus. Ut quis velit. Maecenas magna dui, laoreet ac, malesuada quis, blandit vitae, leo. Mauris blandit mollis eros. Maecenas porttitor varius odio. Nunc auctor gravida odio. Sed ac ante viverra dolor suscipit gravida. Vestibulum accumsan enim nec ipsum. Nunc cursus sapien. Etiam fermentum luctus arcu. Curabitur vitae velit eget nisl ornare sollicitudin. Etiam vitae erat. Integer sapien. Vivamus non massa non est consequat pulvinar. Suspendisse accumsan interdum odio. Suspendisse egestas elit in metus. Nam faucibus. Aenean dictum. Nunc libero. Fusce tellus justo, sagittis sollicitudin, ultricies et, lacinia quis, diam. Vestibulum id nibh sed turpis laoreet blandit. Suspendisse porta, quam ac ultricies sagittis, libero nisi gravida sem, in convallis sem ante nec purus. Suspendisse in tellus vitae purus porttitor pharetra. Curabitur in ipsum. Fusce lobortis, ligula eu facilisis semper, arcu ipsum ornare lorem, ultricies tempor diam arcu vitae est. Aliquam non sapien. Phasellus quam. Praesent eu ligula id mauris tincidunt hendrerit. Fusce nec enim. Nam posuere. Morbi at ipsum vitae diam tempus mollis. Pellentesque sollicitudin condimentum neque. Sed auctor consequat lorem. Donec quis lacus fringilla augue venenatis vulputate. Duis lobortis consectetur libero. Aliquam erat volutpat. Etiam interdum bibendum purus. Vivamus id tellus et tellus dictum molestie. Nam sit amet arcu dictum mauris rhoncus tristique. Nunc rhoncus porta velit. 
Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris consequat. Quisque leo erat, egestas quis, pellentesque eu, suscipit sit amet, sem. Proin dapibus enim id nibh. Fusce diam. Duis sagittis erat eget est. Nam pulvinar egestas elit. Quisque turpis nisl, ornare eu, ultrices eu, sodales sit amet, neque. Quisque id dui non mauris congue venenatis. Praesent cursus, ipsum sed hendrerit sollicitudin, lacus orci gravida orci, nec convallis tellus ligula vulputate risus. Phasellus arcu. Sed commodo sapien rutrum nulla. Donec dictum lectus vel purus. Cras massa nisi, ultrices nec, bibendum eu, mollis in, nibh. Fusce tempus, elit non egestas mattis, ligula neque tincidunt nisl, in aliquam neque dui ut diam. Pellentesque aliquam fermentum leo. Proin placerat sollicitudin nisi. Sed at diam eu nisl feugiat tempor. Pellentesque non leo.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='http://www.flashtuning.net' target='_blank'>Link</a>"><div class="playlistThumb"><img class='thumb' src='../media/video/1/preview/01.jpg' width='120' height='68' alt=''/></div><div class='playlistInfo'><p><span class='playlistTitle'>WCE campus sagli </span><br><span class="playlistContent">Its our world</span></p></div></li>
                     
					 <?php   
                    }?>
                 </ul>
                 
                 
             </div> 
             </div>
			 </div>
			 
			 </center>
        
        <!-- public api -->
    	<div id='publicFunctions'>
       		<p>PUBLIC METHODS</p><br/>
            <ul>
                <!-- play/stop active media -->
				
                <li><a href='#' onClick="api_togglePlayback(); return false;">toggle playback</a></li>
                
                <!-- play next media -->
                <li><a href='#' onClick="api_nextMedia(); return false;">Play next media</a></li>
                
                <!-- play previous media -->
                <li><a href='#' onClick="api_previousMedia(); return false;">Play previous media</a></li>
                
                <!-- set volume (0-1) -->
                <li><a href='#' onClick="api_setVolume(0.5); return false;">Set volume (0.5)</a></li>
                
                <!-- toggle playlist  -->
                <li><a href='#' onClick="api_togglePlaylist(); return false;">toggle playlist</a></li>
                
                <!-- toggle description -->
                <li><a href='#' onClick="api_toggleDescription(); return false;">toggle description</a></li>
                
                <!-- destroy media -->
                <li><a href='#' onClick="api_destroyMedia(); return false;">destroy media</a></li>
                
                 
                
                <li><a href='#' onClick="api_loadMedia(1); return false;">load media 1</a></li>
                <li><a href='#' onClick="api_loadMedia(2); return false;">load media 2</a></li>
                <li><a href='#' onClick="api_loadMedia(3); return false;">load media 3</a></li>
                <li><a href='#' onClick="api_loadMedia(4); return false;">load media 4</a></li>
                <li><a href='#' onClick="api_loadMedia(5); return false;">load media 5</a></li>
                
                <li><a href='#' onClick="api_loadMedia('playlist1'); return false;">load playlist 1</a></li>
                <li><a href='#' onClick="api_loadMedia('playlist2'); return false;">load playlist 2</a></li>
                <li><a href='#' onClick="api_loadMedia('playlist3'); return false;">load playlist 3</a></li>
                
                <!-- if useLivePreview = true, call this to clean active preview item if needed -->
                <li><a href='#' onClick="api_cleanPreviewVideo(); return false;">clean preview video</a></li>
                
            </ul>
         </div>
 
      </body>
</html>
