

package {
	
	import flash.display.*;
	import flash.events.*;
	import flash.geom.*;
	import flash.text.*;
	import flash.media.*;
	import flash.net.*;
	import flash.ui.*;
	import flash.filters.*;
	import flash.utils.Timer;
	
	import flash.external.ExternalInterface;

	import caurina.transitions.*;
	import caurina.transitions.properties.ColorShortcuts;
	
	import com.tean.utils.*;
	import com.tean.events.*;
	import com.tean.video.*;
	
	 public class PlayerDoc2 extends Sprite{
		
		
		private var _youtubePlayer:YouTubePlayer;
		
		private var _stageSetup:StageSetup;
		private var _videoManager:VideoManager;
		
		//player dimensions and positioning
		private var _playerWidth:int;
		private var _playerHeight:int;
		private var _origPlayerWidth:int;//smaller version of the player (this will always be the same)
		private var _origPlayerHeight:int;
		
		private var _componentWidth:int;
		private var _componentHeight:int;
		
		private var _mediaSprite:Sprite;//holds media
		
		private var _playlistLength:int;
		private var _defaultVolume:Number;
		private var _aspectRatio:int;
		
		private var _autoPlay:Boolean=true;
		private var _randomPlay:Boolean;		
		private var _loopingOn:Boolean = true;
		private var _mediaPlaying:Boolean;	
		
		private var globalOptions:Object;
		private var _mediaPath:String;
		
		private var readyTimer:Timer;
		private var autoAdvanceToNextVideo:Boolean;
		
		var _mediaType:String;
		
		
		
		
        public function PlayerDoc2() {
		   //ExternalInterface.call("console.log", "PlayerDoc2");
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
			_stageSetup.addEventListener(StageSetup.ON_RESIZE, handleResize);
			addEventListener(Event.REMOVED_FROM_STAGE, removedFromStageHandler);
		
		
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
			
			
			
			_youtubePlayer = new YouTubePlayer();
			_youtubePlayer.name='_youtubePlayer';
			_youtubePlayer.addEventListener(YouTubePlayer.PLAYER_READY, onYoutubeReady);
			  _youtubePlayer.addEventListener(YouTubePlayer.PLAYER_START, onVideoStart);
			 _mediaSprite.addChild(_youtubePlayer);
			  _youtubePlayer.visible=false;
			 
			 
			 
		}
		
		private function onYoutubeReady(e:Event):void {
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
 
 	 	private function toggleFlashPreview(e:MouseEvent):void{
			//ExternalInterface.call("console.log", "toggleFlashPreview flash");
			//if (ExternalInterface.available)ExternalInterface.call("toggleFlashPreview");
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
				//ExternalInterface.addCallback("pb_togglePlayback", pb_togglePlayback);
				//ExternalInterface.addCallback("pb_seek", pb_seek);
				ExternalInterface.addCallback("pb_setVolume", pb_setVolume);
				ExternalInterface.addCallback("pb_dispose", pb_dispose);
				//ExternalInterface.addCallback("pb_resize", pb_resize);
				//ExternalInterface.addCallback("pb_getFlashDuration", pb_getFlashDuration);
				ExternalInterface.addCallback("setData", setData);
			}
			 this.visible=true;
			 //ExternalInterface.call("console.log",'setup');
		}
		
		public function pb_play(mp:String, ar:int, cw:int, ch:int, mt):void {
			//if (ExternalInterface.available)ExternalInterface.call("console.log", "pb_play preview", mp);
			
			if(btn){
				btn.width = cw;
				btn.height=ch;
			}
			
			_mediaType = mt;
			_mediaPath=mp;
			_aspectRatio = ar;
			_componentWidth=cw;
			_componentHeight=ch;
			
			prepareMedia();
		}
		
		public function pb_togglePlayback():void {
			togglePlayback();
		}

		public function pb_seek(t):void {
			var seekTime = t * _videoManager.getDuration();
			if(seekTime>_videoManager.getDuration()-2) seekTime=_videoManager.getDuration()-2;
			_videoManager.getNetStream().seek(seekTime);
		}
		
		public function pb_setVolume(vol):void {
			if(vol <0) vol = 0;
			else if(vol > 1) vol=1;
			_defaultVolume = vol;
			setVolume();
		}
		
		/**public function pb_resize(cw, ch):void {
			_componentWidth=cw;
			_componentHeight=ch;
			resizeMedia();
			centerMediaSprite();
		}*/
		
		public function pb_getFlashDuration():Number {
			return _videoManager.getDuration();
		}
		
		public function pb_dispose():void {
			removeEventListener(Event.ENTER_FRAME, trackMediaInfo);
			if(_mediaType =='local'){
				if(_videoManager.getNetStream()) _videoManager.dispose();//dispose previous video
			}else{
				if(_youtubePlayer)_youtubePlayer.stopVideo();
				_youtubePlayer.visible=false;
			}
			Tweener.addTween(_mediaSprite, {alpha: 0, time: 0.5, transition: 'easeOutSine'});
		}
		
		public function setData(_settings:Object):void {
			//ExternalInterface.call("console.log", "setData");
			globalOptions = _settings;
			
			if(btn){
				btn.mouseChildren = false;
				btn.buttonMode = true;
				btn.addEventListener(MouseEvent.CLICK, toggleFlashPreview);
				btn.x=btn.y=0;
				btn.alpha=0;
			}
		
			_defaultVolume=globalOptions.defaultVolume;
		}
		
		//*********** video manager listeners
		
		//execution order
		//3,4,1,8,6,7
		
		private function onVideoStart(e:Event):void {	
			//trace(1);
			//ExternalInterface.call("console.log",'onVideoStart');
			
			if(_mediaType =='local'){
			
				setVolume();
				addEventListener(Event.ENTER_FRAME, trackMediaInfo);
				
				if(!_autoPlay){//pause media, let it buffer
					_videoManager.getNetStream().seek(0);
					_videoManager.getNetStream().pause();
					_mediaPlaying = false;
				}else{//play media
					_mediaPlaying = true;
				}
			
			}else{
				resizeMedia();
				centerMediaSprite();
				if (ExternalInterface.available)ExternalInterface.call("flashPreviewVideoStart2");
			}
			
			if(_autoPlay) Tweener.addTween(_mediaSprite, {alpha: 1, time: 0.5, transition: 'easeOutSine' });//show video
			if (ExternalInterface.available)ExternalInterface.call("flashPreviewVideoStart");
			
		}
		
		private function onVideoEnd():void {	
			//ExternalInterface.call("console.log",'onVideoEnd');
			//trace(2);
				if(autoAdvanceToNextVideo){
					if(_videoManager.getNetStream()) _videoManager.dispose();
				   // if (ExternalInterface.available)  ExternalInterface.call("flashVideoEnd");
				}else{
					_videoManager.setVideoEnded(false);
					_videoManager.getNetStream().seek(0);
					if(!_autoPlay){
						_videoManager.getNetStream().pause();
						//if (ExternalInterface.available) ExternalInterface.call("showPlayBtn");
					}
					addEventListener(Event.ENTER_FRAME, trackMediaInfo);
				}
	   }
		
		private function onStartVideoDispose(e:Event):void {	
			//trace(3);
			removeEventListener(Event.ENTER_FRAME, trackMediaInfo);
		}
		
		private function onEndVideoDispose(e:Event):void {	
			//trace(4);
			var i:int=0;
			var len:int = _mediaSprite.numChildren;
			for(i;i<len;i++){
				if(_mediaSprite.getChildAt(i).name=='local'){
					try{
						_mediaSprite.removeChildAt(i);//remove video
					}catch(er:Error){}
					break;
				}
			}
			_mediaSprite.scaleX = _mediaSprite.scaleY = 1;//reset scale
			_mediaSprite.alpha = 0;
		}
		
		private function onPreloaderOn(e:Event):void {	
			//trace(5);
			//if(!_videoManager.getVideoEnded()) holder_mc.player_mc.preloader_mc.visible = true;//show preloader
		}
		
		private function onPreloaderOff(e:Event):void {	
			//trace(6);
			//holder_mc.player_mc.preloader_mc.visible = false;//hide preloader
		}
		
		private function onVideoIntro(e:Event):void {	
			//trace(7);
		}
		
		private function onMetaDataReady(e:Event):void {
			//trace(8);
			//when video metadata gets available, get video, resize it proportionally and align
			var video:DisplayObject = _videoManager.getVideo() as DisplayObject;
			video.name = 'local';
			//video.x = (- video.width / 2);//center reg point
			//video.y = (- video.height / 2);
			video.width = _componentWidth;
			video.height = _componentHeight;
			
			
			_mediaSprite.addChild(video);
			//resizeMedia();
			//centerMediaSprite();
		}
		
		private function onInvalidMediaDuration(e:Event):void {}
		private function onInvalidMediaSize(e:Event):void {}
		
		
		private function prepareMedia():void {
			if(_mediaType =='local'){
				if(_videoManager.getNetStream()) _videoManager.dispose();//dispose previous video
				_videoManager.setURL(_mediaPath);//get new media url
				_videoManager.newConnection();//init play of new video
			}else{
				_youtubePlayer.stopVideo(); 
				 _youtubePlayer.visible=true;
				_youtubePlayer.setPlayer(_componentWidth,_componentHeight, _mediaPath, 0, 'small', true, true);
			}
		}
		
		private function setVolume():void {	
			_videoManager.setVolume(_defaultVolume);
		}
		
		private function trackMediaInfo(e:Event):void {//enter frame
			
			var _bytesLoaded:Number = _videoManager.getNetStream().bytesLoaded;
			var _bytesTotal:Number = _videoManager.getNetStream().bytesTotal;
			var time:Number = _videoManager.getNetStream().time;
			var duration:Number = _videoManager.getDuration();
			
			if (_bytesLoaded == _bytesTotal){
				//trace("done loading");
			}
			
			if (duration > 0){
				
				//ExternalInterface.call("dataUpdateFlash", _bytesLoaded, _bytesTotal, time, duration);
									
				//checking for video end
				if( time == duration || _videoManager.getVideoEnded()){
					//if(!_mediaScrubbing){
						//trace("video ended");
						removeEventListener(Event.ENTER_FRAME, trackMediaInfo);
						onVideoEnd();
					//}
				}
			}
		}
		
		private function togglePlayback() {
			if(_mediaPlaying){
				try{
					_videoManager.getNetStream().pause();
				}catch(er:Error){}
				_mediaPlaying = false;
			}else{//media stopped
				try{
					_videoManager.getNetStream().resume();
				}catch(er:Error){}
				_mediaPlaying = true;
			}
		}
		
		
		
		
		private function resizeMedia():void {
			if(!_mediaSprite || _mediaSprite.numChildren == 0) return;//dont resize _mediaSprite if there is no video inside 
		
			if(_aspectRatio == 0) {//normal media dimensions
				/**if(_mediaType =='local'){
					_mediaSprite.width = _videoManager.getNormalWidth();
					_mediaSprite.height = _videoManager.getNormalHeight();
				}else{
					_mediaSprite.width = _componentWidth;
					_mediaSprite.height = _componentHeight;
				}*/
			}
			else if(_aspectRatio == 1) {//fitscreen
				//AspectRatio.calculateObjectRatio(stage.stageWidth,stage.stageHeight,_mediaSprite, true );
			}
			else if(_aspectRatio == 2) {//fullscreen
				//AspectRatio.calculateObjectRatio(stage.stageWidth,stage.stageHeight,_mediaSprite, false );
				
				//_mediaSprite.width = _componentWidth;
				//_mediaSprite.height = _componentHeight;
				
				//_mediaSprite.scaleX = _mediaSprite.scaleY = 1;
				
				//ExternalInterface.call("console.log", "resizeMedia preview", _mediaSprite.width, ',  ',_mediaSprite.height,_mediaSprite.getChildByName('local').width,',  ', _mediaSprite.getChildByName('local').height)
				
				
			}
		}

		private function centerMediaSprite():void {
			/*if(_mediaType == 'local'){
				//_mediaSprite.x = int(stage.stageWidth/2);
				//_mediaSprite.y = int(stage.stageHeight/2);
				_mediaSprite.x = int(stage.stageWidth/2-_mediaSprite.width/2);
				_mediaSprite.y = int(stage.stageHeight/2-_mediaSprite.height/2);
			}else{
				_mediaSprite.x = int(stage.stageWidth/2-_mediaSprite.width/2);
				_mediaSprite.y = int(stage.stageHeight/2-_mediaSprite.height/2);
			}*/
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
				_youtubePlayer.removeEventListener(YouTubePlayer.PLAYER_START, onVideoStart);
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
			
			try{
				removeChild(_mediaSprite);
				_mediaSprite = null;
			}catch(er:Error){}
			
		}
	}
}
