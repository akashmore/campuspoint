

package com.tean.events {
	
	import flash.events.*;
	
	public class CustomEvent extends Event {
		
		//component resize 
		public static const COMPONENT_RESIZE:String = "ComponentResize";
		
		//xml loader 
		public static const XML_LOADED:String = "XmlLoaded";
		
		//css loader 
		public static const CSS_LOADED:String = "CssLoaded";
		
		//stage setup
		public static const ON_STAGE_RESIZE:String = "OnStageResize";
		public static const ON_ENTER_FULLSCREEN:String = "OnEnterFullscreen";
		public static const ON_EXIT_FULLSCREEN:String = "OnExitFullscreen";
		
		//video controls 
		public static const FULLSCREEN_TOGGLE:String = "FULLSCREEN_TOGGLE";
		public static const PLAYBACK_TOGGLE:String = "PLAYBACK_TOGGLE";
		public static const SEEKBAR_DOWN:String = "SEEKBAR_DOWN";
		public static const SEEKBAR_UP:String = "SEEKBAR_UP";
		public static const SEEKBAR_CHANGE:String = "SEEKBAR_CHANGE";
		public static const VOLUME_CHANGE:String = "VOLUME_CHANGE";
		public static const MEDIA_START:String = "MEDIA_START";
		
		//inactive cursor events
		public static const MOUSE_HIDE:String = "MouseHide";
		public static const MOUSE_SHOW:String = "MouseShow";
		
		//navigation
		public static const NAVIGATION_CHANGE:String = "NavigationChange";
		
		//category module
		public static const GALLERY_REQUEST:String = "GalleryRequest";
		public static const CATEGORY_OUT:String = "CategoryOut";
		
		//gallery module
		public static const MEDIA_ON:String = "MediaOn";//when media transition in finishes
		public static const MEDIA_NAME_CHANGE:String = "MediaNameChange";//when media name changes
		public static const MEDIA_REQUEST:String = "MediaRequest";
		
		//bottom bar
		public static const BOTTOM_BAR_ON:String = "BottomBarOn";
		
		//doc
		public static const ENTER_VIDEO_SECTION:String = "EnterVideoSection";
		public static const EXIT_VIDEO_SECTION:String = "ExitVideoSection";
		
		public static const VIDEO_ON:String = "VideoOn";
		public static const VIDEO_OFF:String = "VideOff";
		
		
		
		public static const MODULE_TRANSITION_ON_START:String = "ModuleTransitionOnStart";//module mask on start
		public static const MODULE_TRANSITION_ON_END:String = "ModuleTransitionOnEnd";//module mask on end
		
		
		
		//copyright
		public static const COPYRIGHT_ON:String = "CopyrightOn";
		public static const COPYRIGHT_OFF:String = "CopyrightOff";
		
		//music
		public static const OVER_EQUALIZER:String = "OverEqualizer";
		public static const OUT_EQUALIZER:String = "OutEqualizer";
		
		
		public static const ERROR_PAGE:String = "ErrorPage";
		
		
		//text typewritter mask
		public static const CONTENT_MASK_ON:String = "ContentMaskOn";
		public static const CONTENT_MASK_OFF:String = "ContentMaskOff";
		
		
		
		//mp3 player
		public static const PLAYER_CLOSE:String = "PlayerClose";
		public static const MEDIA_TOGGLE_CHANGE:String = "MediaToggleChange";
		
		
		
		
		
		public function CustomEvent (type:String, bubbles:Boolean = false, cancelable:Boolean = false) {
			super(type, bubbles, cancelable);
		}
		
		/**
		 * The clone function is only used by Flash when bubbles == true.  
		 * This function is used to correctly duplicate an event instance 
		 * when the event travels up the display list.  You should never 
		 * have to call this function yourself, but it is important for 
		 * the player.
		 * 
		 * @return a duplicate of the original event, with correct target information.
		 */		
		
		public override function clone() : Event{
			return new CustomEvent(type, bubbles, cancelable);
		}
		
		/**
		 * An optional function.  Use this to control how much or how little data you wish to see in
		 * the event's toString() function.  
		 * 
		 * @return A string representation of the event.
		 */
		
		public override function toString():String {
			return formatToString("CustomEvent", "type", "bubbles", "cancelable", "eventPhase");
		}
	}
}