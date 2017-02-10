

package {
	
	import flash.display.*;
	import flash.events.*;
	import flash.geom.*;
	import flash.text.*;
	import flash.media.*;
	import flash.net.*;
	import flash.ui.*;
	import flash.filters.*;
	import flash.utils.*;
	import flash.system.*;
	
	import flash.external.ExternalInterface;

	import caurina.transitions.*;
	import caurina.transitions.properties.ColorShortcuts;
	
	import com.tean.utils.*;
	import com.tean.events.*;
	import com.tean.video.*;
	import com.tean.loading.*;
	import com.tean.display.*;
	
	 public class PlayerDoc extends Sprite{
		
		private var _youtubePlayer:YouTubePlayer;
		private var yt_inited:Boolean;
		
		private var _stageSetup:StageSetup;
		private var _videoManager:VideoManager;
		
		private var _mediaSprite:Sprite;//holds media
		private var _mediaSprite_yt:Sprite;//holds media
		
		private var _playlistLength:int;
		private var _aspectRatio:int;
		
		private var _autoPlay:Boolean;
		private var _randomPlay:Boolean;		
		private var _realAutoPlay:Boolean;
		private var _loopingOn:Boolean;
		private var _mediaPlaying:Boolean;	
		private var _defaultVolume:Number;	
		
		private var globalOptions:Object;
		private var _mediaPath:String;
		
		private var readyTimer:Timer;
		private var autoAdvanceToNextVideo:Boolean;
		private var _mediaScrubbing:Boolean;
		
		private var _mediaType:String='';
		
		private var _testAspectRatioShape:Shape;		
		private var _currentWidth:int;
		private var _currentHeight:int;
		
		private var _videoInited:Boolean;
		
        public function PlayerDoc() {
		   this.visible=false;
           if (stage) {
				init();// stage accessible, call init function
			} else {
				addEventListener(Event.ADDED_TO_STAGE, init);// call init when stage accessible
			}
		}
			
		private function init(event:Event = null):void {
			if (event) {// called via event, remove it
				removeEventListener(Event.ADDED_TO_STAGE, init);
			}
			
			_stageSetup = new StageSetup(stage);
			_stageSetup.addEventListener(StageSetup.IN_FULLSCREEN, inFullScreen);
			_stageSetup.addEventListener(StageSetup.OUT_FULLSCREEN, outFullScreen);
			_stageSetup.addEventListener(StageSetup.ON_RESIZE, handleResize);
			addEventListener(Event.REMOVED_FROM_STAGE, removedFromStageHandler);
			
			//for video aspect ratio
			_testAspectRatioShape = new Shape();
			
		
			_videoManager = new VideoManager();
			_videoManager.addEventListener(VideoManager.VIDEO_START, onVideoStart);
			//_videoManager.addEventListener(VideoManager.VIDEO_END, onVideoEnd);
			_videoManager.addEventListener(VideoManager.START_VIDEO_DISPOSE, onStartVideoDispose);
			_videoManager.addEventListener(VideoManager.END_VIDEO_DISPOSE, onEndVideoDispose);
			_videoManager.addEventListener(VideoManager.PRELOADER_ON, onPreloaderOn);
			_videoManager.addEventListener(VideoManager.PRELOADER_OFF, onPreloaderOff);
			_videoManager.addEventListener(VideoManager.VIDEO_INTRO, onVideoIntro);
			_videoManager.addEventListener(VideoManager.METADATA_READY, onMetaDataReady);
			_videoManager.addEventListener(VideoManager.INVALID_METADATA_DURATION, onInvalidMediaDuration);
			_videoManager.addEventListener(VideoManager.INVALID_METADATA_SIZE, onInvalidMediaSize);
			
			//set buffer time
			var bufferTime:int = 3;//in seconds
			_videoManager.setBufferTime(bufferTime);
			//set smoothing
			_videoManager.setSmoothing(true);


			_mediaSprite = new Sprite();//holds video
			_mediaSprite.alpha=0;	
			addChildAt(_mediaSprite,0);
			
			_mediaSprite_yt = new Sprite();//holds video
			_mediaSprite_yt.alpha=0;	
			addChildAt(_mediaSprite_yt,0);
			
			
			_youtubePlayer = new YouTubePlayer();
			_youtubePlayer.name='_youtubePlayer';
			 _youtubePlayer.addEventListener(YouTubePlayer.PLAYER_READY, onYoutubeReady);
			 _youtubePlayer.addEventListener(YouTubePlayer.PLAYER_START, yt_onVideoStart);
			 _youtubePlayer.addEventListener(YouTubePlayer.PLAYER_START_PAUSE, yt_onVideoStartPause);
			 _youtubePlayer.addEventListener(YouTubePlayer.PLAYER_END, yt_onVideoEnd);
			  _youtubePlayer.addEventListener(YouTubePlayer.STATE_CUED, onVideoCue);
			 
			 _mediaSprite_yt.addChild(_youtubePlayer);
			 _youtubePlayer.visible=false;
			
		}
			
		private function onYoutubeReady(e:Event):void{
			 _youtubePlayer.removeEventListener(YouTubePlayer.PLAYER_READY, onYoutubeReady);
			 
			 if (ExternalInterface.available){
				try	{
					//ExternalInterface.call("console.log", "Adding callback...\n");
					if (checkJavaScriptReady())		{
						//ExternalInterface.call("console.log", "JavaScript is ready.\n");
						setup();
					}else	{
						//ExternalInterface.call("console.log", "JavaScript is not ready, creating timer.\n");
						readyTimer = new Timer(100,0);
						readyTimer.addEventListener(TimerEvent.TIMER, timerHandler);
						readyTimer.start();
					}
				}catch (error:SecurityError)	{
					//ExternalInterface.call("console.log", "A SecurityError occurred: " + error.message + "\n");
				}
				catch (error:Error)	{
					//ExternalInterface.call("console.log", "An Error occurred: " + error.message + "\n");
				}
			}
			else{
				//ExternalInterface.call("console.log", "External interface is not available for this container.");
			}
		}
		
		private function checkJavaScriptReady():Boolean{
			var isReady:Boolean = ExternalInterface.call("isReady");
			return isReady;
		}
		
		private function timerHandler(e:TimerEvent):void{
			//ExternalInterface.call("console.log", "Checking JavaScript status...\n");
			var isReady:Boolean = checkJavaScriptReady();
			if (isReady)	{
				readyTimer.stop();
				readyTimer.removeEventListener(TimerEvent.TIMER, timerHandler);
				readyTimer = null;
				//ExternalInterface.call("console.log", "JavaScript is ready.\n");
				setup();
			}
		}
		
		private function setup():void{
			
			if(ExternalInterface.available){
				ExternalInterface.addCallback("pb_play", pb_play);
				ExternalInterface.addCallback("pb_togglePlayback", pb_togglePlayback);
				ExternalInterface.addCallback("pb_togglePlayback2", pb_togglePlayback2);
				ExternalInterface.addCallback("pb_dispose", pb_dispose);
				ExternalInterface.addCallback("pb_resize", pb_resize);
				ExternalInterface.addCallback("setData", setData);
				ExternalInterface.addCallback("pb_getMediaPlaying", pb_getMediaPlaying);
				ExternalInterface.addCallback("pb_setVolume", pb_setVolume);
				ExternalInterface.addCallback("pb_seek", pb_seek);
				ExternalInterface.addCallback("pb_getFlashDuration", pb_getFlashDuration);
			}
			 this.visible=true;
		}
		
		public function pb_seek(t):void {
			var seekTime;
			if(_mediaType == 'local'){
				seekTime = t * _videoManager.getDuration();
				if(seekTime>_videoManager.getDuration()-2) seekTime=_videoManager.getDuration()-2;
				_videoManager.getNetStream().seek(seekTime);
			}else{
				seekTime = t * _youtubePlayer.getDuration();
				if(seekTime>_youtubePlayer.getDuration()-2) seekTime=_youtubePlayer.getDuration()-2;
				_youtubePlayer.seekTo(seekTime);
			}
		}
		
		private function toggleFlashPlay2(e:MouseEvent):void{
			pb_togglePlayback();
		}
		
		public function pb_getMediaPlaying():Boolean {
			return _mediaPlaying;
		}
		
		public function pb_play(mp:String, ar:int, cw:int, ch:int, mt:String, ap:Boolean):void {
			_mediaPath=mp;
			_aspectRatio = ar;
			_mediaType = mt;
			_autoPlay = ap;
			prepareMedia();
		}
		
		public function pb_togglePlayback():void {
			togglePlayback();
		}
		
		public function pb_setVolume(vol):void {
			if(vol <0) vol = 0;
			else if(vol > 1) vol=1;
			_defaultVolume = vol;
			setVolume();
		}
		
		public function pb_resize(cw, ch):void {
			resizeMedia();
			centerMediaSprite();
		}
		
		public function pb_getFlashDuration():Number {
			var toreturn;
			if(_mediaType == 'local'){
				toreturn =  _videoManager.getDuration();
			}else{
				toreturn =  _youtubePlayer.getDuration();
			}
			return toreturn;
		}
		
		public function pb_dispose():void {
			removeEventListener(Event.ENTER_FRAME, trackMediaInfo);
			if(_mediaType == 'local'){
				_mediaSprite.visible=false;
				if(_videoManager.getNetStream()) _videoManager.dispose();//dispose previous video
			}else{
				_mediaSprite_yt.visible=false;
				if(_youtubePlayer)_youtubePlayer.stopVideo(); 
			}
		}
		
		public function setData(_settings:Object):void {
			globalOptions = _settings;
			
			_realAutoPlay = _settings.autoPlay;
			_loopingOn =_settings.loopingOn;
			autoAdvanceToNextVideo=_settings.autoAdvanceToNextVideo;
			_defaultVolume=_settings.defaultVolume;
		}
		
		//************ volume bar
		
		private function setVolume():void {	
			if(_mediaType == 'local'){
				_videoManager.setVolume(_defaultVolume);
			}else{
				_youtubePlayer.setVolume(_defaultVolume);
			}
		}
		
		private function trackMediaInfo(e:Event):void {//enter frame
			var _bytesLoaded:Number;
			var _bytesTotal:Number;
			var time:Number;
			var duration:Number;
			
			if(_mediaType == 'local'){
				_bytesLoaded = _videoManager.getNetStream().bytesLoaded;
				_bytesTotal = _videoManager.getNetStream().bytesTotal;
				time = _videoManager.getNetStream().time;
				duration = _videoManager.getDuration();
			}else{
				_bytesLoaded = _youtubePlayer.getVideoBytesLoaded();
				_bytesTotal = _youtubePlayer.getVideoBytesTotal();
				time = _youtubePlayer.getCurrentTime();
				duration = _youtubePlayer.getDuration();
			}
			
			if (_bytesLoaded == _bytesTotal){
				//trace("done loading");
			}
				
			if (duration > 0){	
				
				if (ExternalInterface.available)  ExternalInterface.call("dataUpdateFlash", _bytesLoaded, _bytesTotal, time, duration);
				
				if(_mediaType == 'local'){
						//checking for video end
						if(time == duration || _videoManager.getVideoEnded()){
							if(!_mediaScrubbing){
								//trace("video ended");
								onVideoEnd();
							}
						}
				}else{
					
				}
				
			}
		}
		
		//*********** video manager listeners
		
		//execution order
		//3,4,1,8,6,7
		
		
		private function onVideoCue(e:Event):void {	
			
			if(_mediaType == 'youtube' && !yt_inited){//has to happen only once
				
				yt_inited = true;
				resizeMedia();
				centerMediaSprite();
				
				setVolume();
				addEventListener(Event.ENTER_FRAME, trackMediaInfo);
				
				_mediaSprite_yt.alpha=0;
				_mediaSprite_yt.visible=true;
				Tweener.addTween(_mediaSprite_yt, {alpha: 1, time: 0.5, transition: 'easeOutSine' });//show video
			
			}
		}
			
		
		private function yt_onVideoStart(e:Event):void {	
			//if(ExternalInterface.available) ExternalInterface.call( "console.log" , "yt_onVideoStart");
			
			resizeMedia();
			centerMediaSprite();
			
			_videoInited=true;
			
			setVolume();
			addEventListener(Event.ENTER_FRAME, trackMediaInfo);
			
			_mediaPlaying = true;
			
			_mediaSprite_yt.alpha=0;
			_mediaSprite_yt.visible=true;
			Tweener.addTween(_mediaSprite_yt, {alpha: 1, time: 0.5, transition: 'easeOutSine' });//show video
			if (ExternalInterface.available)  ExternalInterface.call("flashVideoStart");
			
		}
		
		private function yt_onVideoEnd(e:Event):void {	
			//if(ExternalInterface.available) ExternalInterface.call( "console.log" , "yt_onVideoEnd");
			//
			if(autoAdvanceToNextVideo){
				removeEventListener(Event.ENTER_FRAME, trackMediaInfo);
				_youtubePlayer.stopVideo(); 
				_youtubePlayer.visible=false;
				_videoInited=false;
				if (ExternalInterface.available)  ExternalInterface.call("flashVideoEnd");
			}else{
				_youtubePlayer.seekTo(0);
				if(!_autoPlay){
					_youtubePlayer.pauseVideo();
				}
				//addEventListener(Event.ENTER_FRAME, trackMediaInfo);
			}
	   }
	   
	   private function yt_onVideoStartPause(e:Event) {
		 //  if(ExternalInterface.available) ExternalInterface.call( "console.log" , "yt_onVideoStartPause");
			_mediaPlaying = false;
			if (ExternalInterface.available) ExternalInterface.call("flashVideoPause");
		}
		
		private function onVideoStart(e:Event):void {	
			//  if(ExternalInterface.available) ExternalInterface.call("console.log", 'onVideoStart local');
			setVolume();
			addEventListener(Event.ENTER_FRAME, trackMediaInfo);
			
			if(!_autoPlay){//pause media, let it buffer
				_videoManager.getNetStream().seek(0);
				_videoManager.getNetStream().pause();
				_mediaPlaying = false;
			}else{//play media
				_mediaPlaying = true;
			}
			
			_mediaSprite.alpha=0;
			_mediaSprite.visible=true;
			Tweener.addTween(_mediaSprite, {alpha: 1, time: 0.5, transition: 'easeOutSine' });//show video
			if (ExternalInterface.available)  ExternalInterface.call("flashVideoStart");
			
		}
				
		private function onVideoEnd():void {	
		  // if(ExternalInterface.available) ExternalInterface.call("console.log", 'onVideoEnd local : ', autoAdvanceToNextVideo);
			if(autoAdvanceToNextVideo){
				if(_videoManager.getNetStream()) _videoManager.dispose();
				if (ExternalInterface.available)  ExternalInterface.call("flashVideoEnd");
			}else{
				_videoManager.setVideoEnded(false);
				_videoManager.getNetStream().seek(0);
				if(!_realAutoPlay){
					_videoManager.getNetStream().pause();
					_mediaPlaying = false;
					if (ExternalInterface.available) ExternalInterface.call("flashVideoPause");
				}
				addEventListener(Event.ENTER_FRAME, trackMediaInfo);
			}
	   }
		
		private function onStartVideoDispose(e:Event):void {	
			removeEventListener(Event.ENTER_FRAME, trackMediaInfo);
		}
		
		private function onEndVideoDispose(e:Event):void {	
			//trace(4);
				try{
					while(_mediaSprite.numChildren)_mediaSprite.removeChildAt(0);//remove video
				}catch(er:Error){}
			_mediaSprite.scaleX = _mediaSprite.scaleY = 1;//reset scale
			_mediaSprite.visible=false;
			_videoInited=false;
		}
		
		private function onPreloaderOn(e:Event):void {	
		}
		
		private function onPreloaderOff(e:Event):void {	
		}
		
		private function onVideoIntro(e:Event):void {	
		}
		
		private function onMetaDataReady(e:Event):void {
			// if(ExternalInterface.available) ExternalInterface.call("console.log", 'onMetaDataReady local');
			 
			//when video metadata gets available, get video, resize it proportionally and align
			if(_mediaType == 'local'){
				var video:DisplayObject = _videoManager.getVideo() as DisplayObject;
				video.name = 'local';
				//video.x = (- video.width / 2);//center reg point
				//video.y = (- video.height / 2);
				_mediaSprite.addChild(video);
				resizeMedia();
				centerMediaSprite();
				
				_videoInited=true;
			}
		}
		
		private function onInvalidMediaDuration(e:Event):void {}
		private function onInvalidMediaSize(e:Event):void {}
		
		
		private function prepareMedia():void {
			_videoInited=false;
			if(_mediaType == 'local'){
				if(_videoManager.getNetStream()) _videoManager.dispose();//dispose previous video
				_videoManager.setURL(_mediaPath);//get new media url
				_videoManager.newConnection();//init play of new video
			}else{
				yt_inited=false;
				removeEventListener(Event.ENTER_FRAME, trackMediaInfo);
				_youtubePlayer.stopVideo(); 
				 _youtubePlayer.visible=true;
				 
				 Graphic.drawRect(_testAspectRatioShape, 0x0000ff, 0, stage.stageWidth,stage.stageHeight);
				var o:Object = AspectRatio.retrieveStageRatio(stage, _testAspectRatioShape, false);
				_currentWidth = o.width;
				_currentHeight = o.height;
				 
				 _youtubePlayer.setPlayer(_currentWidth,_currentHeight, _mediaPath,_defaultVolume, 'default', autoAdvanceToNextVideo, _autoPlay);
			}
		}
		
		private function togglePlayback() {
			if(_mediaPlaying){
				try{
					if(_mediaType == 'local'){
						_videoManager.getNetStream().pause();
					}else{
						_youtubePlayer.pauseVideo();
					}
				}catch(er:Error){}
				if (ExternalInterface.available)  ExternalInterface.call("flashVideoPause");
				_mediaPlaying = false;
			}else{//media stopped
				try{
					if(_mediaType == 'local'){
						_videoManager.getNetStream().resume();
					}else{
						_youtubePlayer.playVideo();
					}
				}catch(er:Error){}
				if (ExternalInterface.available)  ExternalInterface.call("flashVideoResume");
				_mediaPlaying = true;
			}
		}
		
		public function pb_togglePlayback2(_on:Boolean) {
			if(!_on){
				try{
					if(_mediaType == 'local'){
						_videoManager.getNetStream().pause();
					}else{
						_youtubePlayer.pauseVideo();
					}
				}catch(er:Error){}
				if (ExternalInterface.available)  ExternalInterface.call("flashVideoPause");
				_mediaPlaying = false;
			}else{//media stopped
				try{
					if(_mediaType == 'local'){
						_videoManager.getNetStream().resume();
					}else{
						_youtubePlayer.playVideo();
					}
				}catch(er:Error){}
				if (ExternalInterface.available)  ExternalInterface.call("flashVideoResume");
				_mediaPlaying = true;
			}
		}
		
		
		private function getTime():String {// bar time
		
			var time:String;
			//format time
			var minutesCurr;
			var secondsCurr;
			if(_mediaType == 'local'){
				minutesCurr = int(_videoManager.getNetStream().time/60);
				secondsCurr = int(_videoManager.getNetStream().time%60);
			}else{
				minutesCurr = int(_youtubePlayer.getCurrentTime()/60);
				secondsCurr = int(_youtubePlayer.getCurrentTime()%60);
			}
					
			if (secondsCurr < 10) {//add 0 infront if time less than 10
				secondsCurr = "0" + secondsCurr;
			}
			if (minutesCurr < 10) {//add 0 infront if time less than 10
				minutesCurr = "0" + minutesCurr;
			}
			var minutesTot;
			var secondsTot;
			//format time
			if(_mediaType == 'local'){
				minutesTot = int(_videoManager.getDuration()/60);
				secondsTot = int(_videoManager.getDuration()%60);
			}else{
				minutesTot = int(_youtubePlayer.getDuration()/60);
				secondsTot = int(_youtubePlayer.getDuration()%60);
			}
				
			if (secondsTot < 10) {
				secondsTot = "0" + secondsTot;//add 0 infront if time less than 10
			}
			if (minutesTot < 10) {
				minutesTot = "0" + minutesTot;//add 0 infront if time less than 10
			}
			
			time = minutesCurr + ":" + secondsCurr + " | " + minutesTot + ":" + secondsTot;//set new time
			return time;
		}
		
		private function getTime2(value:Number):String {
		
			var time:String;
			//format time
			var minutesCurr = int(value/60);
			var secondsCurr = int(value%60);
					
			if (secondsCurr < 10) {//add 0 infront if time less than 10
				secondsCurr = "0" + secondsCurr;
			}
			if (minutesCurr < 10) {//add 0 infront if time less than 10
				minutesCurr = "0" + minutesCurr;
			}
			var minutesTot;
			var secondsTot;
			//format time
			if(_mediaType == 'local'){
				minutesTot = int(_videoManager.getDuration()/60);
				secondsTot = int(_videoManager.getDuration()%60);
			}else{
				minutesTot = int(_youtubePlayer.getDuration()/60);
				secondsTot = int(_youtubePlayer.getDuration()%60);
			}
				
			if (secondsTot < 10) {
				secondsTot = "0" + secondsTot;//add 0 infront if time less than 10
			}
			if (minutesTot < 10) {
				minutesTot = "0" + minutesTot;//add 0 infront if time less than 10
			}
				
			time = minutesCurr + ":" + secondsCurr + " | " + minutesTot + ":" + secondsTot;//set new time
			return time;
		}
		
		//************** fullscreen
		
		private function toggleFullscreen():void {
			if (stage.displayState == StageDisplayState.NORMAL) {
				stage.displayState = StageDisplayState.FULL_SCREEN;
			} else {
				stage.displayState = StageDisplayState.NORMAL;
			}
		}
		
		private function inFullScreen(e:Event):void {
		}
				
		private function outFullScreen(e:Event):void {
		}
		
		
		
		private function resizeMedia():void {
			if(_mediaType == '')return;
			if(_mediaType == 'local'){
				if(_aspectRatio == 0 ){
					_mediaSprite.width = _videoManager.getNormalWidth();
					_mediaSprite.height = _videoManager.getNormalHeight();
				}else if(_aspectRatio == 1 || _aspectRatio == 2){
					AspectRatio.calculateStageRatio(stage, _mediaSprite, _aspectRatio == 1 ? true : false);
				}
			}else{	
				if(_aspectRatio == 0 ){
					_currentWidth = 640;
					_currentHeight = 360;
				}else if(_aspectRatio == 1 || _aspectRatio == 2){
					Graphic.drawRect(_testAspectRatioShape, 0x0000ff, 0, stage.stageWidth,stage.stageHeight);
					var o:Object = AspectRatio.retrieveStageRatio(stage, _testAspectRatioShape, _aspectRatio == 1 ? true : false);
					_currentWidth = o.width;
					_currentHeight = o.height;
				}
				_youtubePlayer.setSize(_currentWidth, _currentHeight);
			}
		}

		private function centerMediaSprite():void {
			if(_mediaType == 'local'){
				_mediaSprite.x = int(stage.stageWidth/2-_mediaSprite.width/2);
				_mediaSprite.y = int(stage.stageHeight/2-_mediaSprite.height/2);
			}else{
				_mediaSprite_yt.x = int(stage.stageWidth / 2 - _currentWidth / 2);
				_mediaSprite_yt.y = int(stage.stageHeight / 2 - _currentHeight / 2);
			}
		}
		
		//**************** stage resize
		
		private function handleResize(e:Event = null):void {
			resizeMedia();
			centerMediaSprite();
		}
		
		
		//*************** cleaning
		
		private function removedFromStageHandler(e:Event):void {

			removeEventListener(Event.REMOVED_FROM_STAGE, removedFromStageHandler);
			removeEventListener(Event.ENTER_FRAME, trackMediaInfo);
			
			Tweener.removeAllTweens();
			
			if(_stageSetup){
				_stageSetup.removeEventListener(StageSetup.ON_RESIZE, handleResize);
				_stageSetup.removeListeners();
				_stageSetup = null;
			}
			
			if(_youtubePlayer){
				_youtubePlayer.removeEventListener(YouTubePlayer.PLAYER_READY, onYoutubeReady);
				_youtubePlayer.removeEventListener(YouTubePlayer.PLAYER_START, yt_onVideoStart);
				_youtubePlayer.removeEventListener(YouTubePlayer.PLAYER_START_PAUSE, yt_onVideoStartPause);
				_youtubePlayer.removeEventListener(YouTubePlayer.PLAYER_END,yt_onVideoEnd);
				_youtubePlayer.removeEventListener(YouTubePlayer.STATE_CUED,onVideoCue);
				
				_youtubePlayer.dispose();
				_youtubePlayer=null;
			}
			
			if(_videoManager){
				_videoManager.dispose();
				_videoManager.removeEventListener(VideoManager.VIDEO_START, onVideoStart);
				//_videoManager.removeEventListener(VideoManager.VIDEO_END, onVideoEnd);
				_videoManager.removeEventListener(VideoManager.START_VIDEO_DISPOSE, onStartVideoDispose);
				_videoManager.removeEventListener(VideoManager.END_VIDEO_DISPOSE, onEndVideoDispose);
				_videoManager.removeEventListener(VideoManager.PRELOADER_ON, onPreloaderOn);
				_videoManager.removeEventListener(VideoManager.PRELOADER_OFF, onPreloaderOff);
				_videoManager.removeEventListener(VideoManager.VIDEO_INTRO, onVideoIntro);
				_videoManager.removeEventListener(VideoManager.METADATA_READY, onMetaDataReady);
				_videoManager.removeEventListener(VideoManager.INVALID_METADATA_DURATION, onInvalidMediaDuration);
				_videoManager.removeEventListener(VideoManager.INVALID_METADATA_SIZE, onInvalidMediaSize);
				_videoManager = null;
			}
			
			if(readyTimer){
				readyTimer.stop();
				readyTimer.removeEventListener(TimerEvent.TIMER, timerHandler);
				readyTimer = null;
			}
			
			if(_mediaSprite){
				try{
					removeChild(_mediaSprite);
					_mediaSprite = null;
				}catch(er:Error){}
			}
			
			if(_mediaSprite_yt){
				try{
					removeChild(_mediaSprite_yt);
					_mediaSprite_yt = null;
				}catch(er:Error){}
			}
			
		}
	}
}
