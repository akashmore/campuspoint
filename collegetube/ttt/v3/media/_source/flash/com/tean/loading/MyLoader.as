

package com.tean.loading{
	
	/**
	* ...
	* @author tean
	*/
	
    import flash.net.*;
	import flash.display.*;
    import flash.events.*;

    public class MyLoader extends EventDispatcher {
		
		private var _URLRequest:URLRequest;
		private var _loader:Loader;
		private var _percent:Number = 0;
		private var _content:DisplayObject;

		public static const TARGET_NEEDED:String = "TARGET_NEEDED";

        public function MyLoader( ) {}
		
		public function load( url:String ) {
			
			try{
				removeListeners();
				_loader.close();
				//_loader.unload();
				_loader = null;
			}catch(er:Error){
				//trace(er);
			}
			
			_loader = new Loader();
			
			addListeners();
			
			_URLRequest = new URLRequest( url );
						
			try {
				_loader.load( _URLRequest );
			} catch (e:Error) {
				trace("Unable to load requested document: " + _URLRequest.url);
				trace(e.message);
			}
		}

        private function addListeners():void {
			
            _loader.contentLoaderInfo.addEventListener(Event.COMPLETE, completeHandler, false, 0, true);
            _loader.contentLoaderInfo.addEventListener(HTTPStatusEvent.HTTP_STATUS, onEvent, false, 0, true);
            _loader.contentLoaderInfo.addEventListener(Event.INIT, onEvent, false, 0, true);
            _loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler, false, 0, true);
            _loader.contentLoaderInfo.addEventListener(Event.OPEN, openHandler, false, 0, true);
            _loader.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS, progressHandler, false, 0, true);
            _loader.contentLoaderInfo.addEventListener(Event.UNLOAD, onEvent, false, 0, true);
        }
		
		private function removeListeners():void {

            _loader.contentLoaderInfo.removeEventListener(Event.COMPLETE, completeHandler);
            _loader.contentLoaderInfo.removeEventListener(HTTPStatusEvent.HTTP_STATUS, onEvent);
            _loader.contentLoaderInfo.removeEventListener(Event.INIT, onEvent);
            _loader.contentLoaderInfo.removeEventListener(IOErrorEvent.IO_ERROR, ioErrorHandler);
            _loader.contentLoaderInfo.removeEventListener(Event.OPEN, openHandler);
            _loader.contentLoaderInfo.removeEventListener(ProgressEvent.PROGRESS, progressHandler);
            _loader.contentLoaderInfo.removeEventListener(Event.UNLOAD, onEvent);

		}
		
		private function openHandler(e:Event):void {//Dispatched by the associated LoaderInfo object when the loading operation starts.
           //dispatchEvent(new Event(Event.OPEN));
        }
		
		private function progressHandler(e:ProgressEvent):void {
			_percent = e.target.bytesLoaded / e.target.bytesTotal;
        }

        private function ioErrorHandler(event:IOErrorEvent):void {
            trace("ioErrorHandler: " + event);
			dispatchEvent(new Event(MyLoader.TARGET_NEEDED));
        }
		
		private function onEvent(event:*):void {
			dispatchEvent(event);
		}

		private function completeHandler(e:Event):void {
			
			try{
				var loader:Loader = Loader(e.target.loader);
			}catch(er:Error){
				trace(er);
			}
			
			if (loader == null) {
				onEvent(new ErrorEvent(ErrorEvent.ERROR, false, false, "Failed to load the: " + _URLRequest.url));
				return;
			}
			
			try{
				_content = e.target.content;
			}catch(er2:Error){
				trace(er2);
			}
			
			
			try{
				_loader.unload();
			}catch(er4:Error){
				trace(er4);
			}
			
			removeListeners();
			
			_percent = 0;
			
			dispatchEvent(new Event(Event.COMPLETE));
       
        }
		
		public function getContent():DisplayObject {
			return _content;
		}
		
		public function getPercent():Number {
			return _percent;
		}
		
		public function killLoader():void{
			
			if(_loader) removeListeners();
			
			_percent = 0;
			
			if (_loader == null)
				return void;
			
			try{
				_loader.close();
			}
			catch(error: Error){
					//trace(error.message);
					//trace("trying to close loader");
				try{
					_loader.unload();
				}
				catch(e: Error)	{
					//trace(e.message);
					//trace("trying to unload loader");
				}
			}
		}
    }
}