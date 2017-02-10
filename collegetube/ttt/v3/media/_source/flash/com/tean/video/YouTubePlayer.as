/*

Functions

Queueing functions
_player.cueVideoById(videoId:String, startSeconds:Number, suggestedQuality:String):Void
    Loads the specified video's thumbnail and prepares the _player to play the video. The _player does not request the FLV until playVideo() or seekTo() is called.

        * The required videoId parameter specifies the YouTube Video ID of the video to be played. In YouTube Data API video feeds, the <yt:videoId> tag specifies the ID.
        * The optional startSeconds parameter accepts a float/integer and specifies the time from which the video should start playing when playVideo() is called. If you specify a startSeconds value and then call seekTo(), then the _player plays from the time specified in the seekTo() call. When the video is cued and ready to play, the _player will broadcast a video cued event (5).
        * The optional suggestedQuality parameter specifies the suggested playback quality for the video. Please see the definition of the setPlaybackQuality function for more information about playback quality.

_player.loadVideoById(videoId:String, startSeconds:Number, suggestedQuality:String):Void
    Loads and plays the specified video.

        * The required videoId parameter specifies the YouTube Video ID of the video to be played. In YouTube Data API video feeds, the <yt:videoId> tag specifies the ID.
        * The optional startSeconds parameter accepts a float/integer. If it is specified, then the video will start from the closest keyframe to the specified time.
        * The optional suggestedQuality parameter specifies the suggested playback quality for the video. Please see the definition of the setPlaybackQuality function for more information about playback quality.

_player.cueVideoByUrl(mediaContentUrl:String, startSeconds:Number):Void
    Loads the specified video's thumbnail and prepares the _player to play the video. The _player does not request the FLV until playVideo() or seekTo() is called.

        * The mediaContentUrl must be a fully qualified YouTube _player URL in the format http://www.youtube.com/v/VIDEO_ID. In YouTube Data API video feeds, the url attribute of the <media:content> tag contains a fully qualified _player URL when the tag's format attribute has a value of 5.
        * startSeconds accepts a float/integer and specifies the time from which the video should start playing when playVideo() is called. If you specify startSeconds and then call seekTo(), then the _player plays from the time specified in the seekTo() call. When the video is cued and ready to play, the _player will broadcast a video cued event (5).

_player.loadVideoByUrl(mediaContentUrl:String, startSeconds:Number):Void
    Loads and plays the specified video.

        * The mediaContentUrl must be a fully qualified YouTube _player URL in the format http://www.youtube.com/v/VIDEO_ID. In YouTube Data API video feeds, the url attribute of the <media:content> tag contains a fully qualified _player URL when the tag's format attribute has a value of 5.
        * startSeconds accepts a float/integer and specifies the time from which the video should start playing. If startSeconds (number can be a float) is specified, the video will start from the closest keyframe to the specified time.

Playback controls and _player settings

Playing a video
_player.playVideo():Void
    Plays the currently cued/loaded video. The final _player state after this function executes will be playing (1).
_player.pauseVideo():Void
    Pauses the currently playing video. The final _player state after this function executes will be paused (2) unless the _player is in the ended (0) state when the function is called, in which case the _player state will not change.
_player.stopVideo():Void
    Stops and cancels loading of the current video. This function should be reserved for rare situations when you know that the user will not be watching additional video in the _player. If your intent is to pause the video, you should just call the pauseVideo function. If you want to change the video that the _player is playing, you can call one of the queueing functions without calling stopVideo first.

    Important: Unlike the pauseVideo function, which leaves the _player in the paused (2) state, the stopVideo function could put the _player into any not-playing state, including ended (0), paused (2), video cued (5) or unstarted (-1).
_player.seekTo(seconds:Number, allowSeekAhead:Boolean):Void
    Seeks to a specified time in the video.

        * The seconds parameter identifies the time from which the video should start playing.
              o If the _player has already buffered the portion of the video to which the user is advancing, then the _player will start playing the video at the closest keyframe to the specified time. This behavior is governed by the seek() method of the Flash _player's NetStream object. In practice, this means that the _player could advance to a keyframe just before or just after the specified time. (For more information, see Adobe's documentation for the NetStream class.)
              o If the _player has not yet buffered the portion of the video to which the user is seeking, then the _player will start playing the video at the closest keyframe before the specified time.
        * The allowSeekAhead parameter determines whether the _player will make a new request to the server if seconds parameter specifies a time outside of the currently buffered video data. We recommend that you set this parameter to false while the user is dragging the mouse along a video progress bar and then set the parameter to true when the user releases the mouse.

          This approach lets the user scroll to different points of the video without requesting new video streams by scrolling past unbuffered points in the video. Then, when the user releases the mouse button, the _player will advance to the desired point in the video, only requesting a new video stream if the user is seeking to an unbuffered point in the stream.


    The final _player state after this function executes will be playing (1) unless the value of the seconds parameter is greater than the video length, in which case the final _player state will be ended (0).
_player.clearVideo():Void
    Clears the video display. This function is useful if you want to clear the video remnant after calling stopVideo(). Note that this function has been deprecated in the ActionScript 3.0 Player API.

Changing the _player volume
_player.mute():Void
    Mutes the _player.
_player.unMute():Void
    Unmutes the _player.
_player.isMuted():Boolean
    Returns true if the _player is muted, false if not.
_player.setVolume(volume:Number):Void
    Sets the volume. Accepts an integer between 0 and 100.
_player.getVolume():Number
    Returns the _player's current volume, an integer between 0 and 100. Note that getVolume() will return the volume even if the _player is muted.

Setting the _player size
_player.setSize(width:Number, height:Number):Void
    Sets the size in pixels of the _player. This method should be used instead of setting the width and height properties of the MovieClip. Note that this method does not constrain the proportions of the video _player, so you will need to maintain a 4:3 aspect ratio. The default size of the chromeless SWF when loaded into another SWF is 320px by 240px and the default size of the embedded _player SWF is 480px by 385px.

Playback status
_player.getVideoBytesLoaded():Number
    Returns the number of bytes loaded for the current video.
_player.getVideoBytesTotal():Number
    Returns the size in bytes of the currently loaded/playing video.
_player.getVideoStartBytes():Number
    Returns the number of bytes the video file started loading from. Example scenario: the user seeks ahead to a point that hasn't loaded yet, and the _player makes a new request to play a segment of the video that hasn't loaded yet.
_player.getPlayerState():Number
    Returns the state of the _player. Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
_player.getCurrentTime():Number
    Returns the elapsed time in seconds since the video started playing.

Playback quality
_player.getPlaybackQuality():String
    This function retrieves the actual video quality of the current video. It returns undefined if there is no current video. Possible return values are highres, hd1080, hd720, large, medium and small.
_player.setPlaybackQuality(suggestedQuality:String):Void
    This function sets the suggested video quality for the current video. The function causes the video to reload at its current position in the new quality. If the playback quality does change, it will only change for the video being played. Calling this function does not guarantee that the playback quality will actually change. However, if the playback quality does change, the onPlaybackQualityChange event will fire, and your code should respond to the event rather than the fact that it called the setPlaybackQuality function.

    The suggestedQuality parameter value can be small, medium, large, hd720, hd1080, highres or default. We recommend that you set the parameter value to default, which instructs YouTube to select the most appropriate playback quality, which will vary for different users, videos, systems and other playback conditions.

    When you suggest a playback quality for a video, the suggested quality will only be in effect for that video. You should select a playback quality that corresponds to the size of your video _player. For example, if your page displays a 1280px by 720px video _player, a hd720 quality video will actually look better than an hd1080 quality video. We recommend calling the getAvailableQualityLevels() function to determine which quality levels are available for a video.

    The list below shows the playback quality levels that correspond to different standard _player sizes. We recommend that you set the height of your video _player to one of the values listed below and that you size your _player to use 16:9 aspect ratio. As stated above, even if you choose a standard _player size, we also recommend that you set the suggestedQuality parameter value to default to enable YouTube to select the most appropriate playback quality.

        * Quality level small: Player height is 240px, and _player dimensions are at least 320px by 240px for 4:3 aspect ratio.
        * Quality level medium: Player height is 360px, and _player dimensions are 640px by 360px (for 16:9 aspect ratio) or 480px by 360px (for 4:3 aspect ratio).
        * Quality level large: Player height is 480px, and _player dimensions are 853px by 480px (for 16:9 aspect ratio) or 640px by 480px (for 4:3 aspect ratio).
        * Quality level hd720: Player height is 720px, and _player dimensions are 1280px by 720px (for 16:9 aspect ratio) or 640px by 720px (for 4:3 aspect ratio).
        * Quality level hd1080: Player height is 1080px, and _player dimensions are 1920px by 1080px (for 16:9 aspect ratio) or 1440px by 1080px (for 4:3 aspect ratio).
        * Quality level highres: Player height is greater than 1080px, which means that the _player's aspect ratio is greater than 1920px by 1080px.
        * Quality level default: YouTube selects the appropriate playback quality. This setting effectively reverts the quality level to the default state and nullifies any previous efforts to set playback quality using the cueVideoById, loadVideoById or setPlaybackQuality functions.


    If you call the setPlaybackQuality function with a suggestedQuality level that is not available for the video, then the quality will be set to the next lowest level that is available. For example, if you request a quality level of large, and that is unavailable, then the playback quality will be set to medium (as long as that quality level is available).

    In addition, setting suggestedQuality to a value that is not a recognized quality level is equivalent to setting suggestedQuality to default.
_player.getAvailableQualityLevels():Array
    This function returns the set of quality formats in which the current video is available. You could use this function to determine whether the video is available in a higher quality than the user is viewing, and your _player could display a button or other element to let the user adjust the quality.

    The function returns an array of strings ordered from highest to lowest quality. Possible array element values are highres, hd1080, hd720, large, medium and small. This function returns an empty array if there is no current video.

    Your client should not automatically switch to use the highest (or lowest) quality video or to any unknown format name. YouTube could expand the list of quality levels to include formats that may not be appropriate in your _player context. Similarly, YouTube could remove quality options that would be detrimental to the user experience. By ensuring that your client only switches to known, available formats, you can ensure that your client's performance will not be affected by either the introduction of new quality levels or the removal of quality levels that are not appropriate for your _player context.

Retrieving video information
_player.getDuration():Number
    Returns the duration in seconds of the currently playing video. Note that getDuration() will return 0 until the video's metadata is loaded, which normally happens just after the video starts playing.
_player.getVideoUrl():String
    Returns the YouTube.com URL for the currently loaded/playing video.
_player.getVideoEmbedCode():String
    Returns the embed code for the currently loaded/playing video.

Adding an event listener
_player.addEventListener(event:String, listener:Function):Void
    Adds a listener function for the specified event. The Events section below identifies the different events that the _player might fire. The listener is a reference to the function that will execute when the specified event fires.

Special Functions

The ActionScript specific API calls are listed below:

_player.destroy():Void
    This function destroys the _player instance. It should be called before unloading the _player SWF from your parent SWF.

    Important: You should always call _player.destroy() to unload a YouTube _player. This function will close the NetStream object and stop additional videos from downloading after the _player has been unloaded. If your code contains additional references to the _player SWF, you also need to destroy those references separately when you unload the _player.

Events

onReady
    This event is fired when the _player is loaded and initialized, meaning it is ready to receive API calls.

onStateChange
    This event is fired whenever the _player's state changes. Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5). When the SWF is first loaded it will broadcast an unstarted (-1) event. When the video is cued and ready to play it will broadcast a video cued event (5).
onPlaybackQualityChange
    This event is fired whenever the video playback quality changes. For example, if you call the setPlaybackQuality(suggestedQuality) function, this event will fire if the playback quality actually changes. Your code should respond to the event and should not assume that the quality will automatically change when the setPlaybackQuality(suggestedQuality) function is called. Similarly, your code should not assume that playback quality will only change as a result of an explicit call to setPlaybackQuality or any other function that allows you to set a suggested playback quality.

    The value that the event broadcasts is the new playback quality. Possible values are "small", "medium", "large", "hd720", "hd1080", and "highres".
onError
    This event is fired when an error in the _player occurs. The possible error codes are 100, 101, and 150. The 100 error code is broadcast when the video requested is not found. This occurs when a video has been removed (for any reason), or it has been marked as private. The 101 error code is broadcast when the video requested does not allow playback in the embedded _players. The error code 150 is the same as 101, it's just 101 in disguise! 

*/





package com.tean.video{
	
	import flash.events.*;
	import flash.display.*;
	import flash.net.*;
    import flash.system.*;
    import flash.external.ExternalInterface;
	
	import com.tean.utils.*;
	import com.tean.events.*;
	
	import caurina.transitions.*;
	
	public class YouTubePlayer extends Sprite {
		
		
		public static const PLAYER_READY:String = "PLAYER_READY";
		public static const PLAYER_END:String = "PLAYER_END";
		public static const PLAYER_START:String = "PLAYER_START";
		public static const STATE_CUED:String = "STATE_CUED";
		public static const PLAYER_START_PAUSE:String = "PLAYER_START_PAUSE";
		
		private const QUALITY_SMALL : String = "small";
        private const QUALITY_MEDIUM : String = "medium";
        private const QUALITY_LARGE : String = "large";
        private const QUALITY_HD720 : String = "hd720";
        private const QUALITY_HD1080 : String = "hd1080";
        private const QUALITY_HIGHRES : String = "highres";
        private const QUALITY_DEFAULT : String = "default";
		
		private const PLAYER_URL:String = "http://www.youtube.com/apiplayer?version=3";
		private const SECURITY_DOMAIN:String = "http://www.youtube.com";
		private const YOUTUBE_API_PREFIX:String =	"http://gdata.youtube.com/feeds/api/videos/";
		private const YOUTUBE_API_VERSION:String = "2";
		private const YOUTUBE_API_FORMAT:String = "5";
		private const WIDESCREEN_ASPECT_RATIO:String = "widescreen";
		private const QUALITY_TO_PLAYER_WIDTH:Object = {small: 320,medium: 640, large: 854, hd720: 1280 };
		
		private const UNSTARTED:int = -1;
		private const STATE_ENDED:int = 0;
		private const STATE_PLAYING:int = 1;
		private const STATE_PAUSED:int = 2;
		private const BUFFERING:int = 3;
		private const STATE_CUED:int = 5;

		private var _loader:Loader;
		private var _player:Object;
		private var _videoUrl:String='';
		
		private var _progressRatio:Number; //returns the ratio difference between the bytes loaded and the bytes total, from 0 to 1, (usefull for the progress bar)
		private var _fullnessRatio:Number; //returns the ratio difference between the playhead and the total seconds, from 0 to 1, (usefull for the fullness bar)
		private var _ismuted:Boolean; // returns true if _player is muted
				
		private var _autoPlay:Boolean;		
		private var autoAdvanceToNextVideo:Boolean;
		private var _mediaPlaying:Boolean;	
		private var _defaultVolume;
		
		private var _videoStarted:Boolean;	
		
	    private var isQualityPopulated:Boolean;
		private var isWidescreen:Boolean;
		private var youtubeApiLoader:URLLoader;
		
		
		
		
		private var _duration:Number = 0;//remeber video duration for seek bug 
		private var _durationSet:Boolean;	
		
		
		public function YouTubePlayer() {
			this.visible = false;
			 if (stage) {
				init();// stage accessible, call init function
			} else {
				addEventListener(Event.ADDED_TO_STAGE, init);// call init when stage accessible
			}
		}
			
		private function init(e:Event = null):void {
			if (e) {// called via event, remove it
				removeEventListener(Event.ADDED_TO_STAGE, init);
			}
			//addEventListener(Event.REMOVED_FROM_STAGE, removedFromStageHandler);
			
			Security.allowDomain("*");
			Security.loadPolicyFile("http://www.youtube.com/crossdomain.xml");
			//Security.loadPolicyFile("http://img.youtube.com/crossdomain.xml");
			
			//setupYouTubeApiLoader();
			
			_loader = new Loader();
			configureListeners(_loader.contentLoaderInfo);
			try {
				_loader.load(new URLRequest(PLAYER_URL));
			} catch (er:Error) {
				trace(er);
			}
			
		}
		
		private function setupYouTubeApiLoader():void {
			youtubeApiLoader = new URLLoader();
			youtubeApiLoader.addEventListener(IOErrorEvent.IO_ERROR, youtubeApiLoaderErrorHandler);
			youtubeApiLoader.addEventListener(Event.COMPLETE, youtubeApiLoaderCompleteHandler);
			youtubeApiLoader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, securityErrorHandler);
		}
		
		private function loadYoutubeApi():void {
			  var request:URLRequest = new URLRequest(YOUTUBE_API_PREFIX + _videoUrl);
		
			  var urlVariables:URLVariables = new URLVariables();
			  urlVariables.v = YOUTUBE_API_VERSION;
			  urlVariables.format = YOUTUBE_API_FORMAT;
			  request.data = urlVariables;
		
			  try {
					youtubeApiLoader.load(request);
			  } catch (er:Error) {
				  if(ExternalInterface.available) ExternalInterface.call( "console.log" , "loadYoutubeApi" + er);
			  }
		}
		
		private function securityErrorHandler(e:SecurityErrorEvent):void {
            if(ExternalInterface.available) ExternalInterface.call( "console.log" , "securityErrorHandler" + e);
        }
		
		private function youtubeApiLoaderErrorHandler(e:IOErrorEvent):void {
			if(ExternalInterface.available) ExternalInterface.call( "console.log" , "youtubeApiLoaderErrorHandler" + e);
		}
	
		private function youtubeApiLoaderCompleteHandler(e:Event):void {
			if(ExternalInterface.available) ExternalInterface.call( "console.log" , "youtubeApiLoaderCompleteHandler" + e);
			
			youtubeApiLoader.removeEventListener(IOErrorEvent.IO_ERROR, youtubeApiLoaderErrorHandler);
			youtubeApiLoader.removeEventListener(Event.COMPLETE, youtubeApiLoaderCompleteHandler);
			var atomData:String = youtubeApiLoader.data;
		
			// Parse the YouTube API XML response and get the value of the aspectRatio element.
			var atomXml:XML = new XML(atomData);
			var aspectRatios:XMLList = atomXml..*::aspectRatio;
		
			isWidescreen = aspectRatios.toString() == WIDESCREEN_ASPECT_RATIO;
		
		    isQualityPopulated = false;
			 // Cue up the video once we know whether it's widescreen.
			 // Alternatively, you could start playing instead of cueing with
			 // player.loadVideoById(videoIdTextInput.text);
			 // player.cueVideoById(videoIdTextInput.text);
			 
			// if(ExternalInterface.available) ExternalInterface.call( "console.log" , "atomXml" + atomXml);
			// trace(atomXml);
		}
		
		private function configureListeners(dispatcher:IEventDispatcher):void {
			dispatcher.addEventListener(Event.INIT, onLoaderInit);
			dispatcher.addEventListener(Event.COMPLETE, completeHandler);
			dispatcher.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
		}
		
		private function removeListeners(dispatcher:IEventDispatcher):void {
			dispatcher.removeEventListener(Event.INIT, onLoaderInit);
			dispatcher.removeEventListener(Event.COMPLETE, completeHandler);
			dispatcher.removeEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
		}
	
		private function onLoaderInit(e:Event):void {
			//if(ExternalInterface.available) ExternalInterface.call( "console.log" , "onLoaderInit");
			addChild(_loader);
			_player = _loader.content; 
			
			_player.addEventListener("onReady", onPlayerReady); //called when the _player is ready  
		    _player.addEventListener("onError", onPlayerError); //called when the _player has errors  
		    _player.addEventListener("onStateChange", onPlayerStateChange); //called when the playing state is changed  
			_player.addEventListener("onPlaybackQualityChange", onVideoPlaybackQualityChange);
				
		}
		
		private function ioErrorHandler(e:IOErrorEvent):void {
			trace("ioErrorHandler: " + e);
		}
		
		private function completeHandler(e:Event):void {
			//if(ExternalInterface.available) ExternalInterface.call( "console.log" , "completeHandler");
			removeListeners(_loader.contentLoaderInfo);
			
		}
		
		private function onPlayerReady(e:Event):void {  
	 	    _player.removeEventListener("onReady", onPlayerReady);
			//if(ExternalInterface.available) ExternalInterface.call( "console.log" , "onReady");
			
			 dispatchEvent(new Event(YouTubePlayer.PLAYER_READY));
			this.visible = true;
		} 
		
		public function setPlayer(w:int, h:int, url:String, vol:Number, quality:String, adv:Boolean, ap:Boolean):void {
	   
	        _videoStarted=false;//reset
		    _defaultVolume = vol;
			autoAdvanceToNextVideo = adv;		
			_autoPlay=ap;
			if(quality == 'small'){//preview
				autoAdvanceToNextVideo=false;
				_autoPlay=true;
			}

		    _player.setSize(w, h); //set player size
			if(_autoPlay){
				  _player.loadVideoById(url, quality);
			}else{
				  _player.cueVideoById(url, quality);
			}
			_player.setVolume(_defaultVolume);
			
			//if(ExternalInterface.available) ExternalInterface.call( "console.log" , w, ', ',h, ', ',url, ', ',vol,', ', quality, ', ',adv,  ', ', ap);
			
			/**this.blendMode = "layer";
			this.alpha = 0;
			Tweener.addTween(this, {alpha:1, time: 0.5, transition: "easeOutSine" }); */
			
		}
		
		private function onVolumeChange(e:CustomEvent):void {	
			_player.setVolume(_defaultVolume * 100);
		}
		
		private function onPlaybackToggle(e:CustomEvent):void {	
			togglePlayback();
		}
		
		public function togglePlayback():void {	
			if(_mediaPlaying){//media playing, stop it
				try{
					_player.pauseVideo();//pause media
				}catch(er:Error){}
				_mediaPlaying = false;
			}else{//media stopped, resume it
				try{
					_player.playVideo();//resume media
				}catch(er:Error){}
				_mediaPlaying = true;
			}
		}
		
		
		
		
		private function onPlayerError(e:Event):void {
			ExternalInterface.call( "console.log" , "onPlayerError " + e);
		}
	
		/*
		This event is fired whenever the _player's state changes. Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5). When the SWF is first loaded it will broadcast an unstarted (-1) event. When the video is cued and ready to play it will broadcast a video cued event (5).
		*/
		private function onPlayerStateChange(e:Event):void {
			//ExternalInterface.call( "console.log" , "onPlayerStateChange " + Object(e).data);
		
			  switch (Object(e).data) {
				case STATE_ENDED:
				if(!autoAdvanceToNextVideo) {
					_player.seekTo(0);
					if(_autoPlay){
						_player.playVideo();
					}else{
						_player.pauseVideo();
						dispatchEvent(new Event(YouTubePlayer.PLAYER_START_PAUSE));
					}
				}else{
					dispatchEvent(new Event(YouTubePlayer.PLAYER_END));
				}
				  break;
		
				case STATE_PLAYING:
					if(!_videoStarted){
						  dispatchEvent(new Event(YouTubePlayer.PLAYER_START));
						  _videoStarted=true;
					  }
				  break;
		
				case STATE_PAUSED:
				//if(ExternalInterface.available) ExternalInterface.call( "console.log" , "STATE_PAUSED");
				  break;
		
				case BUFFERING:
				//if(ExternalInterface.available) ExternalInterface.call( "console.log" , "BUFFERING");
				  break;
		
				case STATE_CUED:
				//if(ExternalInterface.available) ExternalInterface.call( "console.log" , "STATE_CUED");
				dispatchEvent(new Event(YouTubePlayer.STATE_CUED));
				  break;
				  
			   case UNSTARTED:
				  break;
				  
			  }
		}

		
		private function onVideoPlaybackQualityChange(e:Event):void {
			//trace("onVideoPlaybackQualityChange", Object(e).data);
			// trace(_player.getAvailableQualityLevels());
		}
		
		public function setPlaybackQuality(quality:String):void{
			_player.setPlaybackQuality(quality);
		}
		
		public function getAvailableQualityLevels():Array{
			return _player.getAvailableQualityLevels();
		}

		//Returns the number of bytes loaded for the current video.
		public function getVideoBytesLoaded() :Number {
			return _player.getVideoBytesLoaded();
		}
		
		//Returns the size in bytes of the currently loaded/playing video.	
		public function getVideoBytesTotal() :Number {
			return _player.getVideoBytesTotal();
		}
		
		//Returns the number of bytes the video file started loading from. Example scenario: the user seeks ahead to a point that hasn't loaded yet, and the player makes a new request to play a segment of the video that hasn't loaded yet.
		public function getVideoStartBytes() :Number {
			return _player.getVideoStartBytes();
		}
		
		//Returns the elapsed time in seconds since the video started playing. 
		public function getCurrentTime() :Number {
			return _player.getCurrentTime();
		}
		
		//Returns the duration in seconds of the currently playing video. Note that getDuration() will return 0 until the video's metadata is loaded, which normally happens just after the video starts playing.
		public function getDuration() :Number {
			return _player.getDuration();
		}
		
		//Returns the embed code for the currently loaded/playing video. 
		public function getVideoEmbedCode() :String {
			return _player.getVideoEmbedCode();
		}
		
		//Returns the YouTube.com URL for the currently loaded/playing video.
		public function getVideoUrl() :String {
			return _player.getVideoUrl();
		}
		
		//Seeks to a specified time in the video. 
		public function seekTo(seconds:Number, allowSeekAhead:Boolean=true):void {
			_player.seekTo(seconds, allowSeekAhead);
		}
		
		public function playVideo() :void {
			_player.playVideo();
		}
		
		public function pauseVideo():void {
			_player.pauseVideo();
		}
		
		public function stopVideo() :void {
			_player.stopVideo();
		}
		
		public function muteVideo() :void {
			_player.mute();
		}
		
		public function unmuteVideo() :void {
			_player.unMute();
		}
		
		public function setSize(w:int, h:int):void {
			if(_player) _player.setSize(w, h);
		}
		
		// Sets the volume. Accepts an integer between 0 and 100.
		public function setVolume(v:Number):void {
			_player.setVolume(v * 100);
		}
		
		//  Returns the _player's current volume, an integer between 0 and 100. Note that getVolume() will return the volume even if the _player is muted.
		public function getVolume():Number{
			return _player.getVolume();
		}
		
		public function queueVideoById(_videoUrl : String, quality : String = QUALITY_DEFAULT):void {
            _player.cueVideoById(_videoUrl, quality);
        }

        public function loadVideoById(_videoUrl : String, quality : String = QUALITY_DEFAULT):void {
            _player.loadVideoById(_videoUrl, quality);
        }

        public function queueVideoByUrl(url : String, quality : String = QUALITY_DEFAULT):void {
            _player.cueVideoByUrl(url, quality);
        }

        public function loadVideoByUrl(url : String, quality : String = QUALITY_DEFAULT):void{
            _player.loadVideoByUrl(url, quality);
        }

        /**
         * parse out the Youtube Video ID from the video URL
         * @param   url
         * @return String
         */
        public function getIdFromURL(url:String):String{
            var parts : Array = [];
            if (url.indexOf("watch?v=") != -1) {
                parts = url.split("watch?v=");
            } else if (url.indexOf("watch/v/") != -1) {
                parts = url.split("watch/v/");
            } else if (url.indexOf("youtu.be/") != -1) {
                parts = url.split("youtu.be/");
            }
            return String(parts[1]).split("/").join("");
        }

        /**
         * get the thumbnail of the video
         * @param String youtube Video ID
         * @return URLRequest
         */
        public function getThumbnail(videoId : String):URLRequest{
            return new URLRequest("http://img.youtube.com/vi/" + videoId + "/0.jpg"); 
        }

		
		
		
		
		public function getMediaPlaying():Boolean {
			return _mediaPlaying;
		}
		
		
		
		
		
		
		//private function removedFromStageHandler(e:Event):void {
			//removeEventListener(Event.REMOVED_FROM_STAGE, removedFromStageHandler);
		public function dispose():void{
			//we cant use removed from stage because video and controls are being reparented when video switches component / fullscreen mode
			
			Tweener.removeTweens(this);
			
			if(_player){
				_player.mute();
				_player.removeEventListener("onReady", onPlayerReady); 
				_player.removeEventListener("onError", onPlayerError);
				_player.removeEventListener("onStateChange", onPlayerStateChange); 
				_player.removeEventListener("onPlaybackQualityChange", onVideoPlaybackQualityChange);
				
				_player.stopVideo();
				_player.destroy();
				_player = null;
				
			}
			
			if(_loader){
				removeListeners(_loader.contentLoaderInfo);
				try{
					_loader.close();
				}catch(error: Error){
					try{
						_loader.unload();
					}catch(e: Error)	{}
				}
				try{
					removeChild(_loader);
					_loader = null;
				}catch(error: Error){}
			}
		}
	}
}








