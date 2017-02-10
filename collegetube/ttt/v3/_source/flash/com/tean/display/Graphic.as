


package com.tean.display{

	/**
	* ..
	* @author tean
	*/
	
	import flash.display.*;
	import flash.utils.*;
	import flash.geom.*;

	public class Graphic {

		public function Graphic() {
			
		}
		
		/*
			Draws a rounded rectangle. You must set the line style, fill, or both before you call the drawRoundRect() method, by calling the linestyle(), lineGradientStyle(), beginFill(), beginGradientFill(), or beginBitmapFill() method. 
	
		Parameters  x:Number — A number indicating the horizontal position relative to the registration point of the parent display object (in pixels).  
		  
		 y:Number — A number indicating the vertical position relative to the registration point of the parent display object (in pixels).  
		  
		 width:Number — The width of the round rectangle (in pixels).  
		  
		 height:Number — The height of the round rectangle (in pixels).  
		  
		 eW:Number — The width of the ellipse used to draw the rounded corners (in pixels).  
		  
		 ellipseHeight:Number — The height of the ellipse used to draw the rounded corners (in pixels). Optional; if no value is specified, the default value matches that provided for the eW parameter.  
		
		
		Throws  ArgumentError — If the width, height, eW or ellipseHeight parameters are not a number (Number.NaN).  

		*/
		
		public static function drawRoundRect(obj:DisplayObject, color:uint, alpha:Number, w:int, h:int, eW:int, regPoint:String = "tl", x:int = 0, y:int = 0):void {
			
			var g:Graphics;
			
			if( obj is Sprite ){
				g = Sprite(obj).graphics;
			}else if( obj is Shape ){
				g = Shape(obj).graphics;
			}else{
				/*
				Generates, or throws, an error that can be handled, or caught, by a catch code block. If an exception is not caught by a catch block, the string representation of the thrown value is sent to the Output panel. If an exception is not caught by a catch or finally block, the string representation of the thrown value is sent to the log file. 
				*/
				throw new Error("Invalid object for a graphics property"); 
				return;
			}
				
			g.clear();	
			g.beginFill(color, alpha);
			
			switch (regPoint){
				
				case "xy":
					g.drawRoundRect(x, y, w, h, eW);
					break;		
				
				case "tl":
					g.drawRoundRect(0, 0, w, h, eW);
					break;
			
				case "tr":
					g.drawRoundRect( - w, 0, w, h, eW);
					//g.drawRoundRect(0, 0, - w, h, eW);//same as above
					break;
				
				case "bl":
					g.drawRoundRect(0, - h, w, h, eW);
					break;
					
				case "br":
					g.drawRoundRect( - w, - h, w, h, eW);
					break;
					
				case "mt":
					g.drawRoundRect( - w / 2, 0, w, h, eW);
					break;
			
				case "ml":
					g.drawRoundRect( 0, - h / 2, w, h, eW);
					break;
			
				case "mr":
					g.drawRoundRect( - w, - h / 2, w, h, eW);
					break;
			
				case "mb":
					g.drawRoundRect( - w / 2, - h, w, h, eW);
					break;
					
				case "c":
					g.drawRoundRect( - w / 2, - h / 2, w, h, eW);
					break;	
					
			}
			
			g.endFill();
			
		}
		
		/*
		Draws a rectangle. You must set the line style, fill, or both before you call the drawRect() method, by calling the linestyle(), lineGradientStyle(), beginFill(), beginGradientFill(), or beginBitmapFill() method. 

		Parameters  x:Number — A number indicating the horizontal position relative to the registration point of the parent display object (in pixels).  
	  
		 y:Number — A number indicating the vertical position relative to the registration point of the parent display object (in pixels).  
		  
		 width:Number — The width of the rectangle (in pixels).  
		  
		 height:Number — The height of the rectangle (in pixels).  
		
		
		Throws  ArgumentError — If the width or height parameters are not a number (Number.NaN).  
	
		*/
		
		public static function drawRect(obj:DisplayObject, color:uint, alpha:Number, w:int, h:int, regPoint:String = "tl", x:int = 0, y:int = 0):void {
			
			//trace("from drawRect " + obj);
			
			var g:Graphics;
			
			if( obj is Sprite ){
				g = Sprite(obj).graphics;
			}else if( obj is Shape ){
				g = Shape(obj).graphics;
			}else{
				/*
				Generates, or throws, an error that can be handled, or caught, by a catch code block. If an exception is not caught by a catch block, the string representation of the thrown value is sent to the Output panel. If an exception is not caught by a catch or finally block, the string representation of the thrown value is sent to the log file. 
				*/
				throw new Error("Invalid object for a graphics property"); 
				return;
			}
				
			g.clear();	
			g.beginFill(color, alpha);
			
			switch (regPoint){
				
				case "xy":
					g.drawRect(x, y, w, h);
					break;	
				
				case "tl":
					g.drawRect(0, 0, w, h);
					break;
			
				case "tr":
					g.drawRect( - w, 0, w, h);
					//g.drawRect(0, 0, - w, h);//same as above
					break;
				
				case "bl":
					g.drawRect(0, - h, w, h);
					break;
					
				case "br":
					g.drawRect( - w, - h, w, h);
					break;
					
				case "mt":
					g.drawRect( - w / 2, 0, w, h);
					break;
			
				case "ml":
					g.drawRect( 0, - h / 2, w, h);
					break;
			
				case "mr":
					g.drawRect( - w, - h / 2, w, h);
					break;
			
				case "mb":
					g.drawRect( - w / 2, - h, w, h);
					break;
					
				case "c":
					g.drawRect( - w / 2, - h / 2, w, h);
					break;			
					
			}
			
			g.endFill();
			
		}
		
		/*
		The current scaling grid that is in effect. If set to null, the entire display object is scaled normally when any scale transformation is applied. 

		When you define the scale9Grid property, the display object is divided into a grid with nine regions based on the scale9Grid rectangle, which defines the center region of the grid. The eight other regions of the grid are the following areas: 
		
		The upper-left corner outside of the rectangle 
		The area above the rectangle 
		The upper-right corner outside of the rectangle 
		The area to the left of the rectangle 
		The area to the right of the rectangle 
		The lower-left corner outside of the rectangle 
		The area below the rectangle 
		The lower-right corner outside of the rectangle 
		You can think of the eight regions outside of the center (defined by the rectangle) as being like a picture frame that has special rules applied to it when scaled.
		
		When the scale9Grid property is set and a display object is scaled, all text and gradients are scaled normally; however, for other types of objects the following rules apply:
		
		Content in the center region is scaled normally. 
		Content in the corners is not scaled. 
		Content in the top and bottom regions is scaled horizontally only. Content in the left and right regions is scaled vertically only. 
		All fills (including bitmaps, video, and gradients) are stretched to fit their shapes. 
		If a display object is rotated, all subsequent scaling is normal (and the scale9Grid property is ignored).

		*/
		
		public static function apply9(obj:DisplayObject, x:int, y:int, w:int, h:int):void {
			
			var scale9Grid:Rectangle = new Rectangle(x, y, w, h);
			try{
				obj.scale9Grid = scale9Grid;
			}catch(er:Error){}
			
		}
	}
}
