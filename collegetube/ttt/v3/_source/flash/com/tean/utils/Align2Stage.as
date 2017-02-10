
package com.tean.utils{

	/**
	* ...
	* @author tean
	*/
	
	import flash.display.DisplayObject;
	import flash.display.Stage;

	public class Align2Stage{

		public function Align2Stage() {

		}
		
		public static function fromCenter(
											   positionObject:DisplayObject, 
											   stageObject:Stage, 
											   positionObjectRegPoint:String = "TL" ):void {
			
			var paddingX:int;
			var paddingY:int;
			
			switch (positionObjectRegPoint) {
				case "TL" :
					paddingX = - positionObject.width / 2;
					paddingY = - positionObject.height / 2;
					break;
				case "TM" :
					paddingX = 0;
					paddingY = - positionObject.height / 2;
					break;
				case "TR" :
					paddingX = positionObject.width / 2;
					paddingY = - positionObject.height / 2;
					break;
				case "ML" :
					paddingX = - positionObject.width / 2;
					paddingY = 0;
					break;
				case "C" :
					paddingX = 0;
					paddingY = 0;
					break;
				case "MR" :
					paddingX = positionObject.width / 2;
					paddingY = 0;
					break;
				case "BL" :
					paddingX = - positionObject.width / 2;
					paddingY = positionObject.height / 2;
					break;
				case "BM" :
					paddingX = 0;
					paddingY = positionObject.height / 2;
					break;
				case "BR" :
					paddingX = positionObject.width / 2;
					paddingY = positionObject.height / 2;
					break;
			}
			
				positionObject.x = stageObject.stageWidth / 2 + paddingX;
				positionObject.y = stageObject.stageHeight / 2 + paddingY;
		}
	}
}