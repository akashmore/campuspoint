


package com.tean.utils {
	
	/**
	* ...
	* @author tean
	*/
	
	import flash.events.*;
	import flash.display.*;
	import flash.text.*;
	import flash.geom.*;
	
	import caurina.transitions.*;
	
	public class ToolTip extends Sprite{

		private var _OnTime:Number;//tween on / off time
		private var _OffTime:Number;
		
		private var _onEase:String = "EaseOutExpo";//tween on / off ease
		private var _offEase:String = "EaseOutExpo";
		
		private var _toolTip:MovieClip;//reference to the actual tooltip
		
		private var _initalX:int;//position of tooltip when its inactive 
		private var _initalY:int;
		
		private var _bgColor:uint;
		private var _textColor:uint;
		
		public function ToolTip(toolTip:MovieClip, toolTipOnTime:Number, toolTipOffTime:Number, bgColor:uint, textColor:uint ) {
			
			_toolTip = toolTip;
			_OnTime = toolTipOnTime;
			_OffTime = toolTipOffTime;
			_bgColor = bgColor;
			_textColor = textColor;
			
			init();
			
		}
		
		private function init():void {//setup tooltip
			
			//color toolTip bg
			var color:ColorTransform = new ColorTransform();
			color.color = _bgColor; 
			_toolTip.bg_mc.transform.colorTransform = color;
			
			_toolTip.alpha = 0;
			_toolTip.mouseEnabled = false;
			_toolTip.mouseChildren = false;
			
			_toolTip.blendMode = "layer";//we are tweening the alpha of the whole tooltip
			//position all elements
			_toolTip.bg_mc.x = _toolTip.bg_mc.y = 0;//background
			_toolTip.inner.x = _toolTip.inner.y = 0;//inner holds textfield
			_toolTip.mask_mc.x =_toolTip.mask_mc.y = 0;//bg mask
			_toolTip.inner.mask_mc.x =_toolTip.inner.mask_mc.y = 0;//txt mask
			
			//text color
			_toolTip.inner.txt.textColor = _textColor;
			_toolTip.inner.txt.autoSize = "center";
			_toolTip.inner.txt.text = "A01WT";//set text for getting textfield height
			
			_toolTip.bg_mc.width = 0;
			_toolTip.mask_mc.width = 0;
			_toolTip.inner.mask_mc.width = 0;
			
			var h:int = _toolTip.inner.txt.height;
			_toolTip.bg_mc.height = h + 1;
			_toolTip.mask_mc.height = h + 1;
			_toolTip.inner.mask_mc.height = h + 1;
			_toolTip.inner.txt.text = "";//remove text
			
			_toolTip.bg_mc.mask = _toolTip.mask_mc;//mask tooltip text with background
			_toolTip.inner.mask = _toolTip.inner.mask_mc;//mask tooltip text with background
			
			
			var d:DisplayObject = _toolTip.parent.getChildByName("controls_mc");//find controls child index
			if(d) {
				//trace(d.x, d.y);
				//get position of the controls
				//_initalX = d.x + d.width / 2;
				//_initalY = d.y - 20;
				//_toolTip.x = _initalX;//this works because if there are no controls there will be no tooltip as well
				//_toolTip.y = _initalY;
			}
			
			_toolTip.y = int(_toolTip.parent.y - 17);
			
		}

		public function activate(s:String):void {//called on button rollover
			//trace("activate");
			setText(s);//set text
			
			addEventListener(Event.ENTER_FRAME, track);
			
			Tweener.removeTweens(_toolTip.inner.mask_mc);//remove text mask tween, and start a new one
			_toolTip.inner.mask_mc.width = 0;
			
			Tweener.addTween(_toolTip, {alpha: 1, time: _OnTime, transition: _onEase });//tooltip alpha
			//10px wider than text
			Tweener.addTween(_toolTip.bg_mc, {width: _toolTip.inner.txt.width + 10, time: _OnTime, transition: _onEase });//background width
			Tweener.addTween(_toolTip.mask_mc, {width: _toolTip.inner.txt.width + 10, time: _OnTime, transition: _onEase });//background mask width
			
			Tweener.addTween(_toolTip.inner.mask_mc, {width: _toolTip.inner.txt.width + 10, time: _OnTime, transition: _onEase });//text mask width
			
		}
		
		public function deactivate():void {//called on button rollout
			//trace("deactivate");
			Tweener.addTween(_toolTip.bg_mc, {width: 0, time: _OffTime, transition: _offEase });//background width
			Tweener.addTween(_toolTip.mask_mc, {width: 0, time: _OffTime, transition: _offEase });//background mask width
			Tweener.addTween(_toolTip.inner.mask_mc, {width: 0, time: _OffTime, transition: _offEase, onComplete: removeTracking });//text mask width
		}
		
		public function setText(s:String):void{
			//set tooltip text
			_toolTip.inner.txt.text = s;
			//position textfield
			_toolTip.inner.txt.x = - int(_toolTip.inner.txt.width / 2);//center on x axis
			_toolTip.inner.txt.y = - int(_toolTip.inner.txt.height);
		}
		
		private function track(e:Event):void {//tween tooltip towards the mouse
			_toolTip.x = int(_toolTip.parent.mouseX);
			//Tweener.addTween(_toolTip, {y: int(_toolTip.parent.mouseY - 20), time: 0.6, transition:"easeOutSine" });
		}
		
		private function removeTracking():void {
			//trace("removeTracking");
			
			//remove tracking listener
			removeEventListener(Event.ENTER_FRAME, track);
			//Tweener.removeTweens(_toolTip, "x", "y");//needed, otherwise even after we removed track listener, tooltip still jumped toward the mouse
	
			//reset settings
			_toolTip.alpha = 0;
			//set tooltip to initial position
			//_toolTip.x = _initalX;
			//_toolTip.y = _initalY;
			
			_toolTip.bg_mc.width = 0;
			//reset mask widths
			_toolTip.mask_mc.width = 0;
			_toolTip.inner.mask_mc.width = 0;
			_toolTip.inner.txt.text = "";//clear text
		}
		
		public function dispose():void {
			removeEventListener(Event.ENTER_FRAME, track);
			Tweener.removeAllTweens();
		}
	}
}