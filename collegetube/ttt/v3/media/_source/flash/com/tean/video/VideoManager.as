


//NetStream.Buffer.Full, NetStream.Buffer.Flush - hidePreloader();
//NetStream.Buffer.Empty, NetStream.Seek.InvalidTime - showPreloader();




package com.tean.video{
	
	/**
	* ...
	* @author tean
	*/
	
	import flash.display.*;
	import flash.events.*;
    import flash.media.*;
    import flash.net.*;
	import flash.external.ExternalInterface;
	
	import caurina.transitions.*;
	
	public class VideoManager extends EventDispatcher{
		
		private var _video:Video;//video object, this holds the visual representation of the video
		private var _sndTransform:SoundTransform;//for volume
		private var _clientObject:Object;
		private var _netConnection:NetConnection;
		private var _netStream:NetStream;
		
		private var _normalWidth:int;
		private var _normalHeight:int;
		private var _defaultWidth:int = 320;//if normal values fail 
		private var _defaultHeight:int = 240;
		
		private var _duration:int;//video duration
		private var _firstTimeBufferFull:Boolean;
		private var _videoEnded:Boolean;
		private var _useSmoothing:Boolean;
		
		private var _bufferTime:int;
		private var _url:String;
		
		public static const VIDEO_START:String = "VIDEO_START";
		public static const VIDEO_END:String = "VIDEO_END";
		public static const START_VIDEO_DISPOSE:String = "START_VIDEO_DISPOSE";
		public static const END_VIDEO_DISPOSE:String = "END_VIDEO_DISPOSE";
		public static const PRELOADER_ON:String = "PRELOADER_ON";//show preloader
		public static const PRELOADER_OFF:String = "PRELOADER_OFF";//hide preloader
		public static const VIDEO_INTRO:String = "VIDEO_INTRO";//when video is faded in
		public static const METADATA_READY:String = "METADATA_READY";
		public static const INVALID_METADATA_DURATION:String = "INVALID_METADATA_DURATION";
		public static const INVALID_METADATA_SIZE:String = "INVALID_METADATA_SIZE";
		
		
		public function VideoManager(  ) {
			
			
		}
		
		public function newConnection():void {//this is called first
		
			// create a new connection
			_netConnection = new NetConnection();
			_netConnection.addEventListener(SecurityErrorEvent.SECURITY_ERROR, doSecurityError, false, 0, true);
			_netConnection.addEventListener(NetStatusEvent.NET_STATUS, doNetStatus, false, 0, true);
			_netConnection.addEventListener(IOErrorEvent.IO_ERROR, doIOError, false, 0, true);
			
			try{
				_netConnection.connect(null);// let set it to HTTP "streaming" mode, the null is to specify we are NOT connecting to a media server
			}
			catch(er: Error){}
		}
		
		private function newStream():void {
		
			// create a new stream
			_netStream = new NetStream(_netConnection);
			_netStream.addEventListener(AsyncErrorEvent.ASYNC_ERROR, doAsyncError, false, 0, true);
			_netStream.addEventListener(NetStatusEvent.NET_STATUS, doNetStatus, false, 0, true);
			_netStream.addEventListener(IOErrorEvent.IO_ERROR, doIOError, false, 0, true);
		
			_sndTransform = new SoundTransform();
			//create client object for metadata
			_clientObject = new Object();
			_clientObject.onMetaData = doMetaData;
			_clientObject.onCuePoint = doCuePoint;
			_netStream.client = _clientObject;
		
			_video = new Video();
			if(_useSmoothing) _video.smoothing = true;//set video smoothing
			_video.attachNetStream(_netStream);// attach the netStream to the video object
			
			_netStream.bufferTime = _bufferTime;//set buffer time
			
			try{
				_netStream.play(_url);
				dispatchEvent(new Event(VideoManager.VIDEO_START));
			}
			catch(err: Error){}
		}
		
		private function doCuePoint(infoObject:Object):void {
			//trace("cuepoint: time = " + infoObject.time + " name= " + infoObject.name + " type= " + infoObject.type);
		}
		
		private function doMetaData(infoObject:Object):void {
			
			//trace("metaData appears only once on start");
			
			// if the event contains duration information
			if (infoObject.duration != null) {
		
				//trace("metadata: duration = " + infoObject.duration + " width = " + infoObject.width + " height = " + infoObject.height + " framerate = " + infoObject.framerate);
		
				// set the mediaData's duration
				_duration = infoObject.duration;
		
			}else{
				dispatchEvent(new Event(VideoManager.INVALID_METADATA_DURATION));
			}
		
			// we receive the width and height of the video here
			_normalWidth = infoObject.width;
			_normalHeight = infoObject.height;
			//trace(video.videoWidth);//or this
			//trace(video.videoHeight);
			
			// if they are invalid, go to your default values
			if (isNaN(_normalWidth) || isNaN(_normalHeight)) {
				
				//trace("video has wrong dimension information!");
				_normalWidth = _defaultWidth;
				_normalHeight = _defaultHeight;
				
				dispatchEvent(new Event(VideoManager.INVALID_METADATA_SIZE));
				
			}
			
			_video.width = _normalWidth;
			_video.height = _normalHeight;
			//trace(_video.width, _video.height);
			
			dispatchEvent(new Event(VideoManager.METADATA_READY));

		}
		
		private function doSecurityError(e:SecurityErrorEvent):void {
			
			trace("AbstractStream.securityError:"+e.text);
			// when this happens, you don't have security rights on the server containing the FLV file
			// a crossdomain.xml file would fix the problem easily
		
		}
		
		private function doIOError(e:IOErrorEvent):void {
			
			trace("AbstractScreem.ioError:"+e.text);
			// there was a connection drop, a loss of internet connection, or something else wrong. 404 error too.
		
		}
		
		private function doAsyncError(e:AsyncErrorEvent) {
			
			trace("AsyncError:"+e.text);
			// this is more related to streaming server from my experience, but you never know
		
		}
		
		// this private function handles the Stream's & netConnection's NetStatus events. They could be seperated
		private function doNetStatus(e:NetStatusEvent):void {
			
			//trace("NetStatus tracer: " + e.info.code, e.target);
			
			switch (e.info.code) {
		
				case "NetConnection.Connect.Success" :// The connection attempt succeeded.
					//trace("NetConnection.Connect.Success");
					newStream();//It is recommended that you wait for a successful connection before you call netStream.play(). 
					break;
		
				case "NetConnection.Connect.Failed" :// The connection attempt failed. 
					//trace("NetConnection.Connect.Failed");
					break;
		
				//happens after netStream.close(); ?
				case "NetConnection.Connect.Closed" :// The connection was closed successfully. 
					//trace("NetConnection.Connect.Closed");
					break;
		
				case "NetConnection.Connect.Rejected" :// The connection attempt did not have permission to access the application. 
					//trace("NetConnection.Connect.Rejected");
					break;
		
				case "NetStream.Play.StreamNotFound" :
					trace("NetStream.Play.StreamNotFound");
					
					dispatchEvent(new Event(VideoManager.VIDEO_END));//go to next video if current not found.
					
					break;
		
				case "NetStream.Buffer.Full" :// The buffer is full and the stream will begin playing.
					//trace("NetStream.Buffer.Full");
					
					dispatchEvent(new Event(VideoManager.PRELOADER_OFF));
		
					if (!_firstTimeBufferFull) {//on the beggining of the video.
						_firstTimeBufferFull = true;
						dispatchEvent(new Event(VideoManager.VIDEO_INTRO));
					}
					
					break;
		
					// The netStream object now sends "netStream.Buffer.Flush" status messages when the buffer is being emptied, f.ex. when you reach the end of a file. This is helpful especially if videos are shorter than the buffer time you selected. In this case the "netStream.Buffer.Full" message was never send making it difficult to build UIs around it.
				case "NetStream.Buffer.Flush" ://Data has finished streaming, and the remaining buffer will be emptied.
					//trace("NetStream.Buffer.Flush");
					
					dispatchEvent(new Event(VideoManager.PRELOADER_OFF));
					
					break;
		
					//Data is not being received quickly enough to fill the buffer. Data flow will be interrupted until the buffer refills, at which time a _netStream.Buffer.Full message will be sent and the stream will begin playing again.
				case "NetStream.Buffer.Empty" :
					//trace("NetStream.Buffer.Empty");
					
					if(!_videoEnded) dispatchEvent(new Event(VideoManager.PRELOADER_ON));
					
					break;
		
				//this is dispatched at the end of the _video 
				case "NetStream.Play.Stop" ://Playback has stopped.
					//trace("NetStream.Play.Stop");
		
					/*
						if (loopingMode) {
							_netStream.seek(0);//loop current video
						} else {
							//continue with the normal loading of the next video
						}
					*/
					
					_videoEnded = true;
					dispatchEvent(new Event(VideoManager.VIDEO_END));
					
					break;
		
				case "NetStream.Play.Start" ://Playback has started.
					//trace("NetStream.Play.Start");
					//if (ExternalInterface.available)ExternalInterface.call("console.log", "NetStream.Play.Start")
					if (ExternalInterface.available)ExternalInterface.call("flashPreviewVideoStart2");
					break;
		
				case "NetStream.Pause.Notify" :// The stream is paused.
					//trace("NetStream.Pause.Notify");
					break;
		
				case "NetStream.Unpause.Notify" ://The stream is resumed.
					//trace("NetStream.Unpause.Notify");
					break;
		
				case "NetStream.Seek.Failed" :// The seek fails, which happens if the stream is not seekable. 
					//trace("NetStream.Seek.Failed");
					break;
		
					/*
					if you seek to close to the end of currently downloaded video the stream gets paused and sometimes (not always) this gets dispatched "NetStream.Seek.InvalidTime" and there is a short pause and it only resumes after "NetStream.Unpause.Notify" & "NetStream.Buffer.Full" gets dispatched. (thats why showPreloader is here as well.)
					For video downloaded with progressive download, the user has tried to seek or play past the end of the video data that has downloaded thus far, or past the end of the video once the entire file has downloaded. The message.details property contains a time code that indicates the last valid position to which the user can seek.
					this happens when somebody seeks to close to the end.. if it happens, revert to the last known playing position, or the closest valid seek time by looking in the info object.*/
				case "NetStream.Seek.InvalidTime" :
					//trace("NetStream.Seek.InvalidTime");
					
					dispatchEvent(new Event(VideoManager.PRELOADER_ON));
					
					//_stream.seek(_lastPos);
					
					//trace( e.info.details );
					_netStream.seek(e.info.details); //to the closest valid seek time by looking in the info object
					_netStream.resume();
					
					break;
		
				case "NetConnection.Call.Failed" ://The netConnection.call method was not able to invoke the server-side method or command. 
					//trace("NetConnection.Call.Failed");
					break;
		
					//An Action Message Format (AMF) operation is prevented for security reasons. Either the AMF URL is not in the same domain as the SWF file, or the AMF server does not have a policy file that trusts the domain of the SWF file.  
				case "NetConnection.Call.Prohibited" :
					//trace("NetConnection.Call.Prohibited");
					break;
		
			}
		}
		
		public function dispose():void{
			
			dispatchEvent(new Event(VideoManager.START_VIDEO_DISPOSE));
			
			// if either the netStream or netConnection are open, remove event listeners and close them
			if (_netStream != null) {
				
				_netStream.removeEventListener(AsyncErrorEvent.ASYNC_ERROR, doAsyncError);
				_netStream.removeEventListener(NetStatusEvent.NET_STATUS, doNetStatus);
				_netStream.removeEventListener(IOErrorEvent.IO_ERROR, doIOError);
				try{
					_netStream.close();//will stop loading of the video!
				}catch(er: Error){}
				
				_netStream = null; 
			}
			
			if (_netConnection != null) {
				
				_netConnection.removeEventListener(NetStatusEvent.NET_STATUS, doNetStatus);
				_netConnection.removeEventListener(IOErrorEvent.IO_ERROR, doIOError);
				_netConnection.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, doSecurityError);
				try{
					_netConnection.close();//close net connection
				}catch(er: Error){}
				
				_netConnection = null; 
			}
			
			if(_sndTransform) _sndTransform = null;
			if(_clientObject) _clientObject = null;
			
			if(_video) _video.clear();//clear video screen
			
			_firstTimeBufferFull = false;
			_videoEnded = false;
			
			dispatchEvent(new Event(VideoManager.END_VIDEO_DISPOSE));
			
		}
		
		
		public function setVolume(v:Number):void {
			
			_sndTransform.volume = v;
			//restraints
			if (_sndTransform.volume > 1) _sndTransform.volume = 1;
			else if (_sndTransform.volume < 0) _sndTransform.volume = 0;
			//apply sound transform
			_netStream.soundTransform = _sndTransform;
			
		}
		
		
		//getters and setters
		
		public function getNetStream():NetStream {
			return _netStream;
		}
		
		public function getDuration():int {
			return _duration;
		}
		
		public function getVideoEnded():Boolean {
			return _videoEnded;
		}
		
		public function setVideoEnded(v:Boolean):void {
			_videoEnded = v;
		}
		
		public function getNormalWidth():int {
			return _normalWidth;
		}
		
		public function getNormalHeight():int {
			return _normalHeight;
		}
		
		public function getVideo():Video {
			return _video;
		}
		
		public function setBufferTime(val:int):void{
			_bufferTime = val;
		}
		
		public function setURL(val:String):void{
			_url = val;
		}
		
		public function setSmoothing(val:Boolean):void{
			_useSmoothing = val;
		}
		
	}
}