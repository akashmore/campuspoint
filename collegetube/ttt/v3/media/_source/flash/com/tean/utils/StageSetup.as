

package com.tean.utils{
	
	/**
	* ...
	* @author tean
	*/
	
	import flash.display.*;
	import flash.events.*;

	public class StageSetup extends EventDispatcher{
		// PROPERTIES _____________________________________________________________________________________

		private var _stage:Stage;
		
		public static const ON_RESIZE:String = "ON_RESIZE";
		public static const IN_FULLSCREEN:String = "IN_FULLSCREEN";
		public static const OUT_FULLSCREEN:String = "OUT_FULLSCREEN";

		// CONSTRUCTOR ____________________________________________________________________________________

		public function StageSetup(stageRef:Stage) {
			
			_stage = stageRef;
			//set stage alignment and scale mode
			_stage.align = StageAlign.TOP_LEFT;
			_stage.scaleMode = StageScaleMode.NO_SCALE;
			//add listeners for stage resize and fullscreen
			_stage.addEventListener(Event.RESIZE, handleResize, false, 0, true);
			_stage.addEventListener(FullScreenEvent.FULL_SCREEN, handleFullScreen, false, 0, true);
		}
		
		private function handleResize(e:Event):void{
			dispatchEvent(new Event(StageSetup.ON_RESIZE));
		}
		
		private function handleFullScreen(e:FullScreenEvent):void{
			if(e.fullScreen){//in fullscreen
				dispatchEvent(new Event(StageSetup.IN_FULLSCREEN));
			}else{//out of fullscreen
				dispatchEvent(new Event(StageSetup.OUT_FULLSCREEN));
			}
		}
		
		public function removeListeners():void{
			if(_stage){
				_stage.removeEventListener(Event.RESIZE, handleResize);
				_stage.removeEventListener(FullScreenEvent.FULL_SCREEN, handleFullScreen);
			}
		}
	}
}