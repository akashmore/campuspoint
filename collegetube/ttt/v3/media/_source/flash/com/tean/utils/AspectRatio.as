
/*

this class is responsible for proportional object resize

*/


package com.tean.utils{

	/**
	* ...
	* @author tean
	*/
	
	import flash.display.*;

	public class AspectRatio {
		
		public function AspectRatio() {

		}
		
		/*
		
		compare aspect ratio of an object versus stage
		
		*/
		
		public static function calculateStageRatio( stageRef:Stage, _target:DisplayObject, _fitScreen:Boolean, _paddingX:int = 0, _paddingY:int = 0 ):int {

			var a:int;
			
			var destinationRatio:Number = (stageRef.stageWidth - _paddingX) / (stageRef.stageHeight - _paddingY);//destination ratio of an object
			var targetRatio:Number = _target.width / _target.height;//target ratio of an object

			if (targetRatio < destinationRatio) {
				if (!_fitScreen) {//fullscreen
					_target.height = ((stageRef.stageWidth - _paddingX) / _target.width) * _target.height;
					_target.width = (stageRef.stageWidth - _paddingX);
					a = 2;
				} else {//fitscreen
					_target.width = ((stageRef.stageHeight - _paddingY) / _target.height) * _target.width;
					_target.height = (stageRef.stageHeight - _paddingY);
					a = 1;
				}
			} else if (targetRatio > destinationRatio) {
				if (_fitScreen) {//fitscreen
					_target.height = ((stageRef.stageWidth - _paddingX) / _target.width) * _target.height;
					_target.width = (stageRef.stageWidth - _paddingX);
					a = 1;
				} else {//fullscreen
					_target.width = ((stageRef.stageHeight - _paddingY) / _target.height) * _target.width;
					_target.height = (stageRef.stageHeight - _paddingY);
					a = 2;
				}
			} else {//fitscreen & fullscreen
				_target.width = (stageRef.stageWidth - _paddingX);
				_target.height = (stageRef.stageHeight - _paddingY);
				a = 0;
			}
			
			return a;
		}
		
		/*
		
		get stage aspect ratio 
		
		*/
		
		public static function retrieveStageRatio( stageRef:Stage, _target:DisplayObject, _fitScreen:Boolean, _paddingX:int = 0, _paddingY:int = 0 ):Object {

			var o:Object = new Object();
					
			var destinationRatio:Number = (stageRef.stageWidth - _paddingX) / (stageRef.stageHeight - _paddingY);//destination ratio of an object
			var targetRatio:Number = _target.width / _target.height;//target ratio of an object

			if (targetRatio < destinationRatio) {
				if (!_fitScreen) {//fullscreen
					o.height = ((stageRef.stageWidth - _paddingX) / _target.width) * _target.height;
					o.width = (stageRef.stageWidth - _paddingX);
				} else {//fitscreen
					o.width = ((stageRef.stageHeight - _paddingY) / _target.height) * _target.width;
					o.height = (stageRef.stageHeight - _paddingY);
				}
			} else if (targetRatio > destinationRatio) {
				if (_fitScreen) {//fitscreen
					o.height = ((stageRef.stageWidth - _paddingX) / _target.width) * _target.height;
					o.width = (stageRef.stageWidth - _paddingX);
				} else {//fullscreen
					o.width = ((stageRef.stageHeight - _paddingY) / _target.height) * _target.width;
					o.height = (stageRef.stageHeight - _paddingY);
				}
			} else {//fitscreen & fullscreen
				o.width = (stageRef.stageWidth - _paddingX);
				o.height = (stageRef.stageHeight - _paddingY);
			}
			
			return o;
		}
		
		/*
		
		compare aspect ratio of an object versus another object
		
		*/
		
		public static function calculateObjectRatio( _componentWidth:int,_componentHeight:int, _target:DisplayObject, _fitScreen:Boolean, _paddingX:int = 0, _paddingY:int = 0 ):int {

			var a:int;
			
			var destinationRatio:Number = (_componentWidth - _paddingX) / (_componentHeight- _paddingY);//destination ratio of an object
			var targetRatio:Number = _target.width / _target.height;//target ratio of an object

			if (targetRatio < destinationRatio) {
				if (!_fitScreen) {//fullscreen
					_target.height = ((_componentWidth - _paddingX) / _target.width) * _target.height;
					_target.width = (_componentWidth - _paddingX);
					a = 2;
				} else {//fitscreen
					_target.width = ((_componentHeight - _paddingY) / _target.height) * _target.width;
					_target.height = (_componentHeight - _paddingY);
					a = 1;
				}
			} else if (targetRatio > destinationRatio) {
				if (_fitScreen) {//fitscreen
					_target.height = ((_componentWidth - _paddingX) / _target.width) * _target.height;
					_target.width = (_componentWidth - _paddingX);
					a = 1;
				} else {//fullscreen
					_target.width = ((_componentHeight - _paddingY) / _target.height) * _target.width;
					_target.height = (_componentHeight - _paddingY);
					a = 2;
				}
			} else {//fitscreen & fullscreen
				_target.width = (_componentWidth - _paddingX);
				_target.height = (_componentHeight - _paddingY);
				a = 0;
			}
			
			return a;
		}
		
		/*
		
		get object aspect ratio 
		
		*/
		
		public static function retrieveObjectRatio( obj:DisplayObject, _target:DisplayObject, _fitScreen:Boolean, _paddingX:int = 0, _paddingY:int = 0 ):Object {

			var o:Object = new Object();
			
			var destinationRatio:Number = (obj.width - _paddingX) / (obj.height - _paddingY);//destination ratio of an object
			var targetRatio:Number = _target.width / _target.height;//target ratio of an object

			if (targetRatio < destinationRatio) {
				if (!_fitScreen) {//fullscreen
					o.height = ((obj.width - _paddingX) / _target.width) * _target.height;
					o.width = (obj.width - _paddingX);
				} else {//fitscreen
					o.width = ((obj.height - _paddingY) / _target.height) * _target.width;
					o.height = (obj.height - _paddingY);
				}
			} else if (targetRatio > destinationRatio) {
				if (_fitScreen) {//fitscreen
					o.height = ((obj.width - _paddingX) / _target.width) * _target.height;
					o.width = (obj.width - _paddingX);
				} else {//fullscreen
					o.width = ((obj.height - _paddingY) / _target.height) * _target.width;
					o.height = (obj.height - _paddingY);
				}
			} else {//fitscreen & fullscreen
				o.width = (obj.width - _paddingX);
				o.height = (obj.height - _paddingY);
			}
			
			return o;
		}
	}
}