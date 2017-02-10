
/*
 * Video Gallery With Live Playlist v3.03
 */

(function($) {

	$.fn.videoGallery = function(settings) {
	
	
	var _componentInited=false;
	
	var _body = $('body');
	var _window = $(window);
	var _doc = $(document);
	
	var baseURL = window.location.href;
	//console.log(baseURL);

	var _downEvent = "";
	var _moveEvent = "";
	var _upEvent = "";
	var hasTouch;
	var touchOn=true;
	if("ontouchstart" in window) {
		hasTouch = true;
		_downEvent = "touchstart.ap";
		_moveEvent = "touchmove.ap";
		_upEvent = "touchend.ap";
	}else{
		hasTouch = false;
		_downEvent = "mousedown.ap";
		_moveEvent = "mousemove.ap";
		_upEvent = "mouseup.ap";
	}

	
	//****************
	var _iframe;
	
	var mp4Support = canPlayMP4();
	var vorbisSupport = canPlayVorbis();
	var webmSupport = canPlayWebM();
	//console.log("vorbisSupport = " + vorbisSupport, ", mp4Support = " + mp4Support, ", webmSupport = " + webmSupport);
	var html5Support=(!!document.createElement('video').canPlayType);
	//html5Support=true;
	
	//icons
	var preloaderUrl='data/loading.gif';
	var ic_pause = 'data/icons/pause.png';
	var ic_pause_on = 'data/icons/pause_on.png';
	var ic_play = 'data/icons/play.png';
	var ic_play_on = 'data/icons/play_on.png';
	var ic_mute = 'data/icons/mute.png';
	var ic_mute_on = 'data/icons/mute_on.png';
	var ic_volume = 'data/icons/volume.png';
	var ic_volume_on = 'data/icons/volume_on.png';
	var ic_playlist = 'data/icons/playlist.png';
	var ic_playlist_on = 'data/icons/playlist_on.png';
	var ic_info = 'data/icons/info.png';
	var ic_info_on = 'data/icons/info_on.png';
	var ic_fullscreen_enter = 'data/icons/fullscreen_enter.png';
	var ic_fullscreen_enter_on = 'data/icons/fullscreen_enter_on.png';
	var ic_fullscreen_exit = 'data/icons/fullscreen_exit.png';
	var ic_fullscreen_exit_on = 'data/icons/fullscreen_exit_on.png';
	
	
	
	
	//elements
	var mainWrapper = $('#mainWrapper');
	var componentWrapper = $('.componentWrapper');
	var componentPlaylist = componentWrapper.find('.componentPlaylist');
	var innerWrapper = componentWrapper.find('.innerWrapper');
	var playlist_inner = componentWrapper.find('.playlist_inner');
	var playlist_content = componentWrapper.find('.playlist_content');
	var playlistHolder=componentWrapper.find('.playlistHolder');
	var playlistData=componentWrapper.find('.playlistData');
	var origPlaylistHolderLeft = parseInt(playlistHolder.css('left'),10);
	var playerHolder=componentWrapper.find('.playerHolder');
	var playerHolderOrigW = playerHolder.width();
	var playerHolderOrigH = playerHolder.height();
	var player_mediaTime=componentWrapper.find('.player_mediaTime');
	var playerControls=componentWrapper.find('.playerControls');
	var player_playControl = componentWrapper.find('.player_playControl');
	var player_seekbar = componentWrapper.find('.player_seekbar');
	var progress_bg = componentWrapper.find('.progress_bg');
	var load_level = componentWrapper.find('.load_level');
	var progress_level = componentWrapper.find('.progress_level');
	var volume_seekbar = componentWrapper.find('.volume_seekbar');
	var volume_bg = componentWrapper.find('.volume_bg');
	var volume_level = componentWrapper.find('.volume_level');
	var player_fullscreen= componentWrapper.find('.player_fullscreen');
	
	
	//main
	var flashMain = settings.flashMain;
	var youtubeIframeMain = componentWrapper.find('.youtubeIframeMain');
	
	//preview
	var flashPreview = settings.flashPreview;
	var flashPreviewHolder = componentWrapper.find('#flashPreviewHolder');
	
	var youtubeIframePreview=componentWrapper.find('.youtubeIframePreview').bind('click', function(e){
		togglePlayBack();
		return false;
	});
	/*left: = safari fix, preview has to be inside playlist only the first time, later we can move it -10000*/
	youtubeIframePreview.css({left:-youtubeIframePreview.width()+5+'px'}).bind('click', function(){
		return false;	
	});
	var yt_overlay_blocker;//block click on yt iframe (for html5 non-wall layout!)
	
	var playerHolder=componentWrapper.find('.playerHolder');
	var mediaHolder=componentWrapper.find('.mediaHolder').bind('click', function(){
		togglePlayBack();
		return false;
	});
	var mediaPreview=componentWrapper.find('.mediaPreview').bind('click', function(){
		togglePlayBack();
		return false;
	});
	var player_addon = componentWrapper.find('.player_addon');
	var playlist_toggle = componentWrapper.find('.playlist_toggle');
	var info_toggle = componentWrapper.find('.info_toggle');
	var infoHolder =componentWrapper.find('.infoHolder');
	var player_volume =componentWrapper.find('.player_volume');
	var bigPlay =componentWrapper.find('.big_play').css('cursor', 'pointer').bind('click', function(){
		togglePlayBack();
		return false;
	});
	var info_inner =componentWrapper.find('.info_inner');
	var preloader =componentWrapper.find('.preloader');
	var playlistControls =componentWrapper.find('.playlistControls');
	
	var scrollPaneRedo, previewOrigW, previewOrigH;
	
	//settings
	var previewPath=settings.previewPath;
	var wallPath=settings.wallPath;
	var useLivePreview=!isMobile ? settings.useLivePreview : false;
	if(!useLivePreview){
		componentWrapper.find('.youtubeIframePreview').remove();
		flashPreviewHolder.remove();
	}
	var autoPlay=settings.autoPlay;
	var yt_autoPlay= settings.autoPlay;
	var initialAutoplay= settings.autoPlay;
	if(isMobile){
		autoPlay =false;
		yt_autoPlay = false;
	}
	var autoAdvanceToNextVideo=settings.autoAdvanceToNextVideo;
	var autoHideControls=isMobile ? false : settings.autoHideControls;
	var autoOpenDescription=settings.autoOpenDescription;
	var playlistOrientation =settings.playlistOrientation;
	var playlistType = settings.playlistType;
	var scrollType = settings.scrollType;
	var closePlaylistOnVideoSelect = settings.closePlaylistOnVideoSelect;
	var autoOpenPlaylist=settings.autoOpenPlaylist;
	var randomPlay=settings.randomPlay;
	var loopingOn=settings.loopingOn;
	var autoMakePlaylistThumb = settings.autoMakePlaylistThumb;
	var autoMakePlaylistInfo = settings.autoMakePlaylistInfo;
	var outputPlaylistData=settings.outputPlaylistData;
	var useWebmVideoFormat = settings.useWebmVideoFormat;
	var aspectRatio=settings.aspectRatio;
	var closePlaylistOnVideoSelect=settings.closePlaylistOnVideoSelect;
	var layout100perc=settings.layout100perc;
	var playlistHidden=settings.playlistHidden;
	var useYoutubeHighestQuality = settings.useYoutubeHighestQuality;
	if(playlistHidden){
		playlistHolder.css('display','none');
		componentWrapper.find('.playlist_toggle').remove();	
	} 
	//wall
	if(playlistType=='wall'){//override defaults
		playlistHidden=false;
		autoMakePlaylistThumb=true;	
		activeItem=-1;
	}
	
	if(isiPhoneIpod){
		aspectRatio=1;//no elements above video!
		//remove elements above video since we cant use them
		infoHolder.remove();
		playerControls.remove();
		player_addon.remove();
	}
	
	//vars
	var folderCounter, folderProcessArr = [];
	var _currentInsert, remove_node;//for youtube playlist append position
	var descriptionArr = [];//for youtube description
	var deeplinkData = [];
	var liProcessArr=[];
	var processPlaylistLength, processPlaylistCounter;
	var _activePlaylist;
	var _playlistTransitionOn=false;
	var lightbox_use=false, no_action_item=false;
	var html5video_inited=false;
	
	var mp4Path, ogvPath, imagePath;
	var previewVideo, previewVideoUp2Js;
	var lastPlaylist;
	var mediaPreviewType;
	var currentPreviewID=-1, pp_currentPreviewID=-1;
	
	var yt_wall_pp_arr=[];//store pretyphoto a tags in which we need to wrap yt_overlay_blocker over yt iframe for wall layout
	var current_wall_yt_blocker;//for html5 wall layout, and flash layout
	var wallLayoutInited=false;
	
	var boxWidth, boxHeight, boxMarginBottom, boxMarginRight;
	
	var activePlaylistHit;
	var activePlaylistID;
	var activePlaylistThumb;
	var activePlaylistThumbImg;
	var activePlaylistPreloader;
	var activePlaylistVideoDiv;
	
	//fullscreen
	var fullscreenCount=0;
	var fullscreenPossible = false;
	if(checkFullScreenSupport()){
		fullscreenPossible = true;
	}else{
		//remove fs button in 100% layout becuase it doesnt do anything.
		if(isIE && layout100perc){
			componentWrapper.find('.player_fullscreen').remove();
			//move buttons right since we remove fs buton
			var r_shift = 30;
			player_mediaTime.css('right', parseInt(player_mediaTime.css('right'),10) - r_shift + 'px');
			volume_seekbar.css('right', parseInt(volume_seekbar.css('right'),10) - r_shift + 'px');
            player_volume.css('right', parseInt(player_volume.css('right'),10) - r_shift + 'px');
		}	
	}
	
	//youtube
	var _youtubePlayer, _youtubePreviewPlayer, _videoProcessCounter=0,_videoProcessData=[],playlistStartCounter, playlistEnlargeCounter=50, youtubePlaylistPath, 
	_youtubeInited=false, _youtubePreviewInited=false, _youtubeChromeless=true, currentObj;

	var previewPoster;
	var preloader;
	var windowResizeIntervalID;
	var windowResizeInterval = 250;//execute resize after time finish
	
	var videoInited=false;
	var mediaPath, flashMediaPath;	
	var previewMediaPath;	
	var ytMediaPath;
	var mediaPlaying=false;
	var thumbWidth, thumbHeight;
	
	var scrollCheckInterval = 100;
	var scrollCheckIntervalID;
	var flashReadyInterval = 100;
	var flashReadyIntervalID;
	var flashCheckDone=false;
	
	var dataInterval = 250;//tracking media data
	var dataIntervalID;
	
	var thumbArr = [];
	var thumbImgArr = [];
	var thumbHitDivArr = [];
	var thumbPreloaderArr = [];
	var thumbVideoDivArr = [];
	var playlistArr=[];
	var playlistLength=0;
	
	var useRolloversOnButtons=true;
	var mediaWidth;
	var mediaHeight;
	var mediaType;
	var componentSize = 'normal';
	var video;
	var videoUp2Js;
	var infoOpened=false;
	
	
	var bodyOverflowOrig = _body.css('overflow');
	
	//scroll
	var info_scrollPaneApi;
	var scrollPane, scrollPaneApi;
	
	//buttons
	var thumbBackward, thumbForward;
	var _thumbScrollIntervalID;
	var _thumbsScrollValue=50;	
	var _thumbForwardSize;
	var _thumbBackwardSize;
	var _thumbInnerContainerSize, thumbInnerContainer;
	
	if(isIE && !ieBelow9){//hide outline for youtube iframe
		youtubeIframeMain.css({
			left: -1+'px', 
			top: -1+'px', 
			width: componentWrapper.width()+2+'px',
			height: componentWrapper.height()+2+'px'
		});
	}
	
	if(playlistType != 'wall'){
		if(scrollType == 'buttons'){
			thumbInnerContainer = playlist_inner;	
			if(hasTouch){
				initTouch();
			}
		}
	}
	
	var buttonArr=[
		player_playControl,
		componentWrapper.find('.playlist_toggle'),
		componentWrapper.find('.info_toggle'),
		componentWrapper.find('.player_fullscreen'),
		componentWrapper.find('.player_prev'),
		componentWrapper.find('.player_next')
	];
	var btn,len = buttonArr.length,i=0;
	for(i;i<len;i++){
		btn = $(buttonArr[i]).css('cursor', 'pointer').bind('click', clickControls);
		if(!isMobile && useRolloversOnButtons){
			btn.bind('mouseover', overControls).bind('mouseout', outControls);
		}
	}
	
	//*********** seekbar
	
	var seekBarDown=false,seekBarElementsSize,playerControlsSize,seekBarSize;
	
	player_seekbar.css('cursor', 'pointer').bind(_downEvent,function(e){
		_onDragStartSeek(e);
		return false;		
	}); 
	
	// Start dragging 
	function _onDragStartSeek(e) {
		if(!_componentInited || _playlistTransitionOn) return false;
		if(volumebarDown) return false;
		if(!seekBarDown){					
			var point;
			if(hasTouch){
				var currTouches = e.originalEvent.touches;
				if(currTouches && currTouches.length > 0) {
					point = currTouches[0];
				}else{	
					return false;						
				}
			}else{
				point = e;								
				e.preventDefault();						
			}
			seekBarDown = true;
			_doc.bind(_moveEvent, function(e) { _onDragMoveSeek(e); });
			_doc.bind(_upEvent, function(e) { _onDragReleaseSeek(e); });		
		}
		return false;	
	}
				
	function _onDragMoveSeek(e) {	
		var point;
		if(hasTouch){
			var touches;
			if(e.originalEvent.touches && e.originalEvent.touches.length) {
				touches = e.originalEvent.touches;
			}else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
				touches = e.originalEvent.changedTouches;
			}else{
				return false;
			}
			// If touches more then one, so stop sliding and allow browser do default action
			if(touches.length > 1) {
				return false;
			}
			point = touches[0];	
			e.preventDefault();				
		} else {
			point = e;
			e.preventDefault();		
		}
		setProgress(point.pageX);
		
		return false;		
	}
	
	function _onDragReleaseSeek(e) {
		if(seekBarDown){	
			seekBarDown = false;			
			_doc.unbind(_moveEvent).unbind(_upEvent);	
			
			var point;
			if(hasTouch){
				var touches;
				if(e.originalEvent.touches && e.originalEvent.touches.length) {
					touches = e.originalEvent.touches;
				}else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
					touches = e.originalEvent.changedTouches;
				}else{
					return false;
				}
				// If touches more then one, so stop sliding and allow browser do default action
				if(touches.length > 1) {
					return false;
				}
				point = touches[0];	
				e.preventDefault();				
			} else {
				point = e;
				e.preventDefault();		
			}
			setProgress(point.pageX);
		}
		return false;
	}	
	
	function setProgress(x) {
		var newPercent,ct,ct2f, seekPercent;
		
		seekPercent = x - progress_bg.offset().left;
		if(seekPercent<0) seekPercent=0;
		else if(seekPercent>seekBarSize) seekPercent=seekBarSize;
		newPercent = Math.max(0, Math.min(1, seekPercent / seekBarSize));
		//console.log('newPercent = ', newPercent);
		
		if(mediaType == 'local'){
			progress_level.css('width', seekPercent+'px');
			if(html5Support){
				if(videoInited){
					ct = newPercent * videoUp2Js.duration;
					ct2f = ct.toFixed(1);
					//console.log(videoUp2Js.seekable, videoUp2Js.seekable.length)
					try{
						videoUp2Js.currentTime = ct2f;
					}catch(er){}
				}
			}else{
				if(typeof getFlashMovie(flashMain) !== "undefined")getFlashMovie(flashMain).pb_seek(newPercent); 
			}
		}else if(mediaType == 'youtube_single' || mediaType == 'youtube_playlist'){
			if(html5Support){
				if(_youtubePlayer){
					ct = newPercent * _youtubePlayer.getDuration();
					ct2f = ct.toFixed(1);
					_youtubePlayer.seek(ct2f);
				}
			}else{
				if(typeof getFlashMovie(flashMain) !== "undefined")getFlashMovie(flashMain).pb_seek(newPercent);
			}
		}
	}
	
	var player_progress_tooltip = componentWrapper.find('.player_progress_tooltip').css('left', parseInt(player_seekbar.css('left'), 10) + 'px');
	if(!isMobile)player_seekbar.bind('mouseover', mouseOverHandlerSeek);
	
	//************* seekbar tooltip
		
	function mouseOverHandlerSeek() {
		if(!videoInited) return false;
		player_progress_tooltip.css('display', 'block');
		player_seekbar.bind('mousemove', mouseMoveHandlerSeekTooltip).bind('mouseout', mouseOutHandlerSeek);
		_doc.bind('mouseout', mouseOutHandlerSeek);
	}
	
	function mouseOutHandlerSeek() {
		if(!videoInited) return false;
		player_progress_tooltip.css('display', 'none');
		player_seekbar.unbind('mousemove', mouseMoveHandlerSeekTooltip).unbind('mouseout', mouseOutHandlerSeek);
		_doc.unbind('mouseout', mouseOutHandlerSeek);
	}
	
	function mouseMoveHandlerSeekTooltip(e){
		var s = e.pageX - player_seekbar.offset().left;
		if(s<0) s=0;
		else if(s>seekBarSize) s=seekBarSize;
		
		var center = s + parseInt(player_seekbar.css('left'), 10) - player_progress_tooltip.width() / 2;
		player_progress_tooltip.css('left', center + 'px');
		
		var newPercent = Math.max(0, Math.min(1, s / seekBarSize));
		var value, fd;
		
		if(mediaType == 'local'){
			if(html5Support){
				value=newPercent * videoUp2Js.duration;
				//console.log(value);
				player_progress_tooltip.find('p').html(formatCurrentTime(value)+formatDuration(videoUp2Js.duration));
			}else{
				if(typeof getFlashMovie(flashMain) !== "undefined"){
					fd = getFlashMovie(flashMain).pb_getFlashDuration();
					value=newPercent * fd;
					player_progress_tooltip.find('p').html(formatCurrentTime(value)+formatDuration(fd));
				}
			}
		}else if(mediaType == 'youtube_single' || mediaType == 'youtube_playlist'){
			if(html5Support){
				value=newPercent *_youtubePlayer.getDuration();
				player_progress_tooltip.find('p').html(formatCurrentTime(value)+formatDuration(_youtubePlayer.getDuration()));
			}else{
				if(typeof getFlashMovie(flashMain) !== "undefined"){
					fd = getFlashMovie(flashMain).pb_getFlashDuration();
					value=newPercent * fd;
					player_progress_tooltip.find('p').html(formatCurrentTime(value)+formatDuration(fd));
				}
			}
		}
	}
	
	//********* volume
	
	var defaultVolume =settings.defaultVolume;
	if(defaultVolume<0) defaultVolume=0;
	else if(defaultVolume>1)defaultVolume=1;
	var _lastVolume = defaultVolume;
	var volumebarDown=false;
	var volumeSize=volume_bg.width();
	volume_level.css('width', defaultVolume*volumeSize+'px');
	
	player_volume.css('cursor','pointer').bind('click', function(){
		if(!_componentInited || _playlistTransitionOn) return false;
		var url;
		if(defaultVolume == 0){//is muted
			defaultVolume = _lastVolume;//restore last volume
			//if(mediaType == 'local' && html5Support)videoUp2Js.muted = false;
			url = !isMobile ? ic_volume_on: ic_volume;
		}else{
			_lastVolume = defaultVolume;//remember last volume
			//if(mediaType == 'local' && html5Support)videoUp2Js.muted = true;
			defaultVolume = 0;//set mute on (volume to 0)
			url = ic_mute;
		}
		setVolume();
		$(this).find('img').attr('src', url);
		return false;
	});

	if(!isMobile){
		player_volume.bind('mouseover', function(){
			if(!_componentInited || _playlistTransitionOn) return false;
			var url;
			if(defaultVolume == 0){
				url =  ic_mute_on;
			}else{
				url = ic_volume_on;
			}
			$(this).find('img').attr('src', url);
			return false;
		}).bind('mouseout', function(){
			if(!_componentInited || _playlistTransitionOn) return false;
			var url;
			if(defaultVolume == 0){
				url =  ic_mute;
			}else{
				url = ic_volume;
			}
			$(this).find('img').attr('src', url);
			return false;
		});
	}
	
	if(defaultVolume == 0){
		player_volume.find('img').attr('src', ic_mute);
	}else if(defaultVolume > 0){
		player_volume.find('img').attr('src', ic_volume);
	}
	
	volume_seekbar.css('cursor', 'pointer').bind(_downEvent,function(e){
		_onDragStartVol(e);
		return false;		
	}); 
	
	// Start dragging 
	function _onDragStartVol(e) {
		if(!_componentInited || _playlistTransitionOn) return false;
		if(seekBarDown) return false;
		if(!volumebarDown){					
			var point;
			if(hasTouch){
				var currTouches = e.originalEvent.touches;
				if(currTouches && currTouches.length > 0) {
					point = currTouches[0];
				}else{	
					return false;						
				}
			}else{
				point = e;								
				e.preventDefault();						
			}
			volumebarDown = true;
			_doc.bind(_moveEvent, function(e) { _onDragMoveVol(e); });
			_doc.bind(_upEvent, function(e) { _onDragReleaseVol(e); });		
		}
		return false;	
	}
				
	function _onDragMoveVol(e) {	
		var point;
		if(hasTouch){
			var touches;
			if(e.originalEvent.touches && e.originalEvent.touches.length) {
				touches = e.originalEvent.touches;
			}else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
				touches = e.originalEvent.changedTouches;
			}else{
				return false;
			}
			// If touches more then one, so stop sliding and allow browser do default action
			if(touches.length > 1) {
				return false;
			}
			point = touches[0];	
			e.preventDefault();				
		} else {
			point = e;
			e.preventDefault();		
		}
		volumeTo(point.pageX);
		
		return false;		
	}
	
	function _onDragReleaseVol(e) {
		if(volumebarDown){	
			volumebarDown = false;			
			_doc.unbind(_moveEvent).unbind(_upEvent);	
			
			var point;
			if(hasTouch){
				var touches;
				if(e.originalEvent.touches && e.originalEvent.touches.length) {
					touches = e.originalEvent.touches;
				}else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
					touches = e.originalEvent.changedTouches;
				}else{
					return false;
				}
				// If touches more then one, so stop sliding and allow browser do default action
				if(touches.length > 1) {
					return false;
				}
				point = touches[0];	
				e.preventDefault();				
			} else {
				point = e;
				e.preventDefault();		
			}
			
			volumeTo(point.pageX);
			
			if(defaultVolume == 0){
				player_volume.find('img').attr('src', ic_mute);
				//if(mediaType == 'local' && html5Support)videoUp2Js.muted = true;
			}else if(defaultVolume > 0){
				player_volume.find('img').attr('src', ic_volume);
				//if(mediaType == 'local' && html5Support)videoUp2Js.muted = false;
			}
		}
		return false;
	}	
	
	function volumeTo(x) {
		defaultVolume = Math.max(0, Math.min(1, (x - volume_bg.offset().left) / volumeSize));
		setVolume();
	}
	
	function setVolume(){
		//console.log('setVolume ', defaultVolume);
		volume_level.css('width', defaultVolume*volumeSize+'px');
		//if(!videoInited)return false;
		if(html5Support){
			if(mediaType == 'local'){
				if(videoUp2Js)videoUp2Js.volume = defaultVolume;
			}else{
				if(_youtubePlayer) _youtubePlayer.setVolume(defaultVolume);
			}
		}else{
			if(typeof getFlashMovie(flashMain) !== "undefined")getFlashMovie(flashMain).pb_setVolume(defaultVolume); 
		}
	}
	
	var player_volume_tooltip = componentWrapper.find('.player_volume_tooltip').css('left', parseInt(volume_seekbar.css('left'), 10) + 'px');
	if(!isMobile)volume_seekbar.bind('mouseover', mouseOverHandlerVolume);
	
	//************* volume tooltip
	
	function mouseOverHandlerVolume() {
		player_volume_tooltip.css('display', 'block');
		volume_seekbar.bind('mousemove', mouseMoveHandlerVolumeTooltip).bind('mouseout', mouseOutHandlerVolume);
		_doc.bind('mouseout', mouseOutHandlerVolume);
	}
	
	function mouseOutHandlerVolume() {
		player_volume_tooltip.css('display', 'none');
		volume_seekbar.unbind('mousemove', mouseMoveHandlerVolumeTooltip).unbind('mouseout', mouseOutHandlerVolume);
		_doc.unbind('mouseout', mouseOutHandlerVolume);
	}
	
	function mouseMoveHandlerVolumeTooltip(e){
		var s = e.pageX - volume_bg.offset().left;
		if(s<0) s=0;
		else if(s>volumeSize) s=volumeSize;
		
		var center = parseInt(playerControls.css('width'),10) + s - parseInt(volume_seekbar.css('right'), 10) - parseInt(volume_seekbar.css('width'), 10) + parseInt(volume_bg.css('left'), 10) - player_volume_tooltip.width()/2;
		player_volume_tooltip.css('left', center + 'px');
		
		var newPercent = Math.max(0, Math.min(1, s / volumeSize));
		var value=parseInt(newPercent * 100, 10);
		player_volume_tooltip.find('p').html(value+' %');
	}
	
	//****************
	
	if(!html5Support){
		mp4Support=true;
	}
	
	//*************** end volume

	function initTouch(){
		var startX,
			startY,
			touchStartX,
			touchStartY,
			moved,
			moving = false;

		thumbInnerContainer.unbind('touchstart.ap touchmove.ap touchend.ap click.ap-touchclick').bind(
			'touchstart.ap',
			function(e){
				if(!_componentInited || _playlistTransitionOn) return false;
				if(!touchOn){//if touch disabled we want click executed
					return true;
				}
				var touch = e.originalEvent.touches[0];
				startX = thumbInnerContainer.position().left;
				startY = thumbInnerContainer.position().top;
				touchStartX = touch.pageX;
				touchStartY = touch.pageY;
				moved = false;
				moving = true;
			}
		).bind(
			'touchmove.ap',
			function(ev){
				if(!moving){
					return;
				}
				var touchPos = ev.originalEvent.touches[0];
				if(playlistOrientation =='horizontal'){
					var value = startX - touchStartX + touchPos.pageX, w = componentPlaylist.width();
					
					//toggle advance buttons
					if(value > 0){
						value=0;	
						togglePrevBtn('off');
					}else{
						togglePrevBtn('on');
					}
					if(value < w- _thumbInnerContainerSize){
						value=w- _thumbInnerContainerSize;	
						toggleNextBtn('off');
					}else{
						toggleNextBtn('on');
					}
								
					thumbInnerContainer.css('left',value+'px');
				}else{
					var value=startY - touchStartY + touchPos.pageY, h = componentPlaylist.height();
					
					//toggle advance buttons
					if(value > 0){
						value=0;	
						togglePrevBtn('off');
					}else{
						togglePrevBtn('on');
					}
					if(value < h- _thumbInnerContainerSize){
						value=h- _thumbInnerContainerSize;	
						toggleNextBtn('off');
					}else{
						toggleNextBtn('on');
					}
					
					thumbInnerContainer.css('top',value+'px');
				}
				moved = moved || Math.abs(touchStartX - touchPos.pageX) > 5 || Math.abs(touchStartY - touchPos.pageY) > 5;
				
				return false;
			}
		).bind(
			'touchend.ap',
			function(e){
				moving = false;
			}
		).bind(
			'click.ap-touchclick',
			function(e){
				if(moved) {
					moved = false;
					return false;
				}
			}
		);
	}
		
	//*************** scroll button functions
		
	function _scrollThumbsBack() {
		var value;
		if(playlistOrientation == 'horizontal'){
			value = parseInt(thumbInnerContainer.css('left'),10);
			value+=_thumbsScrollValue;
			if(value > 0){
				if(_thumbScrollIntervalID) clearInterval(_thumbScrollIntervalID);
				value=0;	
				togglePrevBtn('off');
			}else{
				togglePrevBtn('on');
			}
			thumbInnerContainer.css('left', value+'px');
		}else{
			value = parseInt(thumbInnerContainer.css('top'),10);
			value+=_thumbsScrollValue;
			if(value > 0){
				if(_thumbScrollIntervalID) clearInterval(_thumbScrollIntervalID);
				value=0;	
				togglePrevBtn('off');
			}else{
				togglePrevBtn('on');
			}
			thumbInnerContainer.css('top', value+'px');
		}
		toggleNextBtn('on');
	}
	
	function _scrollThumbsForward() {
		var value;
		if(playlistOrientation == 'horizontal'){
			value = parseInt(thumbInnerContainer.css('left'),10), w = componentPlaylist.width();
			value-=_thumbsScrollValue;
			if(value < w- _thumbInnerContainerSize){
				if(_thumbScrollIntervalID) clearInterval(_thumbScrollIntervalID);
				value=w- _thumbInnerContainerSize;	
				toggleNextBtn('off');
			}else{
				toggleNextBtn('on');
			}
			thumbInnerContainer.css('left', value+'px');
		}else{
			value = parseInt(thumbInnerContainer.css('top'),10), h = componentPlaylist.height();
			value-=_thumbsScrollValue;
			if(value < h- _thumbInnerContainerSize){
				if(_thumbScrollIntervalID) clearInterval(_thumbScrollIntervalID);
				value=h- _thumbInnerContainerSize;	
				toggleNextBtn('off');
			}else{
				toggleNextBtn('on');
			}
			thumbInnerContainer.css('top', value+'px');
		}
		togglePrevBtn('on');
	}
	
	function togglePrevBtn(dir) {
		if(dir == 'on'){
			thumbBackward.css('display','block');
		}else{
			thumbBackward.css('display','none');
		}
	}
	
	function toggleNextBtn(dir) {
		if(dir == 'on'){
			thumbForward.css('display','block');
		}else{
			thumbForward.css('display','none');
		}
	}
	
	function _checkThumbPosition() {
		//console.log('_checkThumbPosition');
		
		if(playlistOrientation == 'horizontal'){
			var w = componentPlaylist.width(), value;
			if(_thumbInnerContainerSize > w){
				togglePrevBtn('on');
				toggleNextBtn('on');
				touchOn=true;
				value = parseInt(thumbInnerContainer.css('left'),10);
				if(value < w- _thumbInnerContainerSize){
					if(_thumbScrollIntervalID) clearInterval(_thumbScrollIntervalID);
					value=w- _thumbInnerContainerSize;	
				}else if(value > 0){
					value=0;
				}
				thumbInnerContainer.css('left', value+'px');
				togglePrevBtn('off');//on beginning
			}else{
				togglePrevBtn('off');
				toggleNextBtn('off');
				touchOn=false;
				//thumbInnerContainer.css('left', w / 2 - _thumbInnerContainerSize / 2 +'px');//center thumbs if less
			}
		}else{
			var h = componentPlaylist.height(), value;
			if(_thumbInnerContainerSize > h){
				togglePrevBtn('on');
				toggleNextBtn('on');
				touchOn=true;
				value = parseInt(thumbInnerContainer.css('top'),10);
				if(value < h- _thumbInnerContainerSize){
					if(_thumbScrollIntervalID) clearInterval(_thumbScrollIntervalID);
					value=h- _thumbInnerContainerSize;	
				}else if(value > 0){
					value=0;
				}
				thumbInnerContainer.css('top', value+'px');
				togglePrevBtn('off');//on beginning
			}else{
				togglePrevBtn('off');
				toggleNextBtn('off');
				touchOn=false;
				//thumbInnerContainer.css('top', h / 2 - _thumbInnerContainerSize / 2 +'px');//center thumbs if less
			}
		}
	}
		
	//**********
	
	function checkScroll(){
		//console.log('checkScroll');
		
		if(scrollType == 'scroll'){
		
			if(playlistType == 'list'){
				if(!scrollPane){
					scrollPane = playlist_inner;
					scrollPane.jScrollPane();
					scrollPaneApi = scrollPane.data('jsp');
					
					scrollPane.bind('jsp-initialised',function(event, isScrollable){
						//console.log('Handle jsp-initialised', this,'isScrollable=', isScrollable);
					})
					if(playlistOrientation == 'horizontal'){
						if(!isMobile)playlist_inner.bind('mousewheel', horizontalMouseWheel);
					}
					
				}else{
					if(playlistHolder.css('display')=='block'){
						scrollPaneApi.reinitialise();
						if(playlistOrientation == 'vertical'){
							scrollPaneApi.scrollToY(0);
							$('.jspPane').css('top',0+'px');
						}else{
							scrollPaneApi.scrollToX(0);
							$('.jspPane').css('left',0+'px');
						}
					}else{
						scrollPaneRedo = true;
					}
				}
			}
		
		}else if(scrollType == 'buttons'){
			
			thumbBackward = componentWrapper.find('.thumbBackward').css({cursor:'pointer', display:'none'})
			.bind(_downEvent, function(){
				if(!_componentInited || _playlistTransitionOn) return false;
				if(_thumbScrollIntervalID) clearInterval(_thumbScrollIntervalID);
				_thumbScrollIntervalID = setInterval(function() { _scrollThumbsBack(); }, 100);
				return false;
			}).bind(_upEvent, function(){
				if(_thumbScrollIntervalID) clearInterval(_thumbScrollIntervalID);
				return false;
			});
			
			thumbForward = componentWrapper.find('.thumbForward').css({cursor:'pointer', display:'none'})
			.bind(_downEvent, function(){
				if(!_componentInited || _playlistTransitionOn) return false;
				if(_thumbScrollIntervalID) clearInterval(_thumbScrollIntervalID);
				_thumbScrollIntervalID = setInterval(function() { _scrollThumbsForward(); }, 100);
				return false;
			}).bind(_upEvent, function(){
				if(_thumbScrollIntervalID) clearInterval(_thumbScrollIntervalID);
				return false;
			});
			
			_checkThumbPosition();
			
			if(!isMobile){
				playlist_inner.bind('mousewheel', function(event, delta, deltaX, deltaY){
					//console.log(event);
					if(!_componentInited || _playlistTransitionOn) return false;
					var d = delta > 0 ? 1 : -1, value, componentPlaylistSize;//normalize
					
					if(playlistOrientation == 'vertical'){
						componentPlaylistSize = componentPlaylist.height();
					}else{
						componentPlaylistSize = componentPlaylist.width();
					}
					
					var s = componentPlaylistSize;
					if(playlistOrientation =='horizontal'){
						if(_thumbInnerContainerSize < s) return false;//if centered
						value = parseInt(thumbInnerContainer.css('left'),10);
						value+=_thumbsScrollValue*d;
						if(value > 0){
							value=0;	
						}else if(value < s- _thumbInnerContainerSize){
							value=s- _thumbInnerContainerSize;	
						}
						thumbInnerContainer.css('left', value+'px');
					}else{
						if(_thumbInnerContainerSize < s) return false;
						value = parseInt(thumbInnerContainer.css('top'),10);
						value+=_thumbsScrollValue*d;
						if(value > 0){
							value=0;	
						}else if(value < s- _thumbInnerContainerSize){
							value=s- _thumbInnerContainerSize;	
						}
						thumbInnerContainer.css('top', value+'px');
					}
					//adjust buttons
					if(value == 0){
						togglePrevBtn('off');
						toggleNextBtn('on');
					}else if(value <= s- _thumbInnerContainerSize){
						toggleNextBtn('off');
						togglePrevBtn('on');
					}else{
						togglePrevBtn('on');
						toggleNextBtn('on');
						touchOn=true;
					}
					return false;
				});	
			}
		}
	}
	
	function horizontalMouseWheel(event, delta, deltaX, deltaY){//for thumb scroll
		if(!_componentInited || _playlistTransitionOn) return false;
		var d = delta > 0 ? -1 : 1;//normalize
		if(scrollPaneApi) scrollPaneApi.scrollByX(d * 100);
		return false;
	}
	
	//***************** playlist manager
	
	var pm_settings = {'randomPlay': randomPlay, 'loopingOn': loopingOn};
	var _playlistManager = $.playlistManager(pm_settings);
	$(_playlistManager).bind('ap_PlaylistManager.COUNTER_READY', function(){
		//console.log('COUNTER_READY');
		
		if(useDeeplink){
			if(!_addressSet){
				//console.log('...1');
				$.address.value(findAddress2(_playlistManager.getCounter()));
				if(!$.address.history()) $.address.history(true);//restore history
			}else{
				//console.log('...2');
				_addressSet=false;
				_disableActiveItem();
				_findMedia();
			}
		}else{
			_disableActiveItem();
			_findMedia();
		}
	});
	$(_playlistManager).bind('ap_PlaylistManager.PLAYLIST_END', function(){
		//console.log('PLAYLIST_END');
		_disableActiveItem();
		videoGalleryPlaylistEnd();
	});
	
	//*************** deeplinking
	/*
	IMPORTANT!
	Since we cant see all the deplinks before each playlist has been processed (this would be valid only for single video links), first search for first level url on each playlist, then process this playlist and create deeplinking for this category (playlist).
	1. on each deeplink change check first level, find if already loaded, if not load, if yes, find second level from there. If not found - 404
	*/
	
	var categoryArr=[],cat;
	playlistData.children("ul[data-address]").each(function(){
			var obj = {};
			cat = $(this);
			obj.categoryName = cat.attr('data-address');
			obj.id = cat.attr('id');
			categoryArr.push(obj);
	});
	//console.log(categoryArr);
	var getDeeplinkData=false;
	//console.log(categoryArr);
	var categoryLength = categoryArr.length;
	//console.log('categoryLength = ', categoryLength);
	
	var useDeeplink=playlistType == 'wall' ? false : settings.useDeeplink;
	if(useDeeplink){
		
		var strict = $.address.strict() ? '#/' : '#';
		var dlink;
		var secondLevelExist=false;
		var secondLevel;
		var firstLevel;
		var deepLink;
		var _addressSet=false;
		var _addressInited=false;
		var addressTimeout=500;
		var addressTimeoutID;
		var _externalChangeEvent;
		var startUrl=settings.activePlaylist;
		if(!isEmpty(startUrl)){
			if(!isEmpty(settings.activeItem)){
				startUrl += '/'+settings.activeItem;//append second level
			}
		}
		//console.log(startUrl);
		var activeCategory;
		var currentCategory;
		var activeItem;
		var transitionFinishInterval=100;
		var transitionFinishIntervalID;
		var reCheckAddressTimeoutID;
		var reCheckAddressTimeout = 250;//address sometimes doesnt fire on beginning
	
		//console.log($.address.strict());
		//$.address.strict(false);
		//$.address.init(initAddress);
		$.address.internalChange(function(e){
			e.stopPropagation();
			//console.log("internalChange: ", e.value);
			if(reCheckAddressTimeoutID) clearTimeout(reCheckAddressTimeoutID);
			onChange(e);
		});
		$.address.externalChange(function(e){
			e.stopPropagation();
			//console.log("externalChange: ", e.value);
			if(reCheckAddressTimeoutID) clearTimeout(reCheckAddressTimeoutID);
			_externalChangeEvent = e;
			if(!_playlistTransitionOn){
				if(!_addressInited){
					//on the beginning onExternalChange fires first, then onInternalChange immediatelly, so skip onExternalChange call
	
					if(e.value == "/"){
						//console.log('strict mode off, skip /');
						
						_addressSet=true;
						$.address.history(false);//skip the "/"
						
						if(!isEmpty(startUrl)){
							$.address.value(startUrl);
							if(!$.address.history()) $.address.history(true);//restore history
						}else{
							//open menu
							//toggleMenuHandler(true);
						}
						
					}else if(isEmpty(e.value)){
						//console.log('strict mode on');
						_addressSet=true;
						$.address.history(false);//skip the ""
						
						if(!isEmpty(startUrl)){
							$.address.value(startUrl);
							if(!$.address.history()) $.address.history(true);//restore history
						}else{
							//open menu
							//toggleMenuHandler(true);
						}
					}else{
						//console.log('other deeplink start');
						onChange(e);
					}
					
					return;
				}
				if(addressTimeoutID) clearTimeout(addressTimeoutID);
				addressTimeoutID = setTimeout(swfAddressTimeoutHandler, addressTimeout);
			}else{
				if(addressTimeoutID) clearTimeout(addressTimeoutID);
				//wait for transition finish
				if(transitionFinishIntervalID) clearInterval(transitionFinishIntervalID);
				transitionFinishIntervalID = setInterval(transitionFinishHandler, transitionFinishInterval);
			}
		});
	}else{//no deeplink
		_activePlaylist=settings.activePlaylist;
		_setPlaylist();	
	}
	
	function transitionFinishHandler() {
		//console.log('transitionFinishHandler');
		if(!_playlistTransitionOn){//when module transition finishes
			if(transitionFinishIntervalID) clearInterval(transitionFinishIntervalID);
			if(addressTimeoutID) clearTimeout(addressTimeoutID);
			onChange(_externalChangeEvent);
		}
	}
	
	function reCheckAddress() {
		//console.log('reCheckAddress');
		if(reCheckAddressTimeoutID) clearTimeout(reCheckAddressTimeoutID);
		_addressSet=true;
		$.address.history(false);//skip the "/"
		
		if(!isEmpty(startUrl)){
			$.address.value(startUrl);
			if(!$.address.history()) $.address.history(true);//restore history
		}else{
			//open menu
			//toggleMenuHandler(true);
		}
	}
	
	function swfAddressTimeoutHandler() {
		//timeout if user repeatedly pressing back/forward browser buttons to stop default action executing immediatelly
		if(addressTimeoutID) clearTimeout(addressTimeoutID);
		onChange(_externalChangeEvent);
	}
	
	//fix for window.load instead of document.ready
	/*if(var reCheckAddressTimeoutID) clearTimeout(var reCheckAddressTimeoutID);
	var reCheckAddressTimeoutID = setTimeout(function(){
		if(reCheckAddressTimeoutID) clearTimeout(reCheckAddressTimeoutID);
		reCheckAddress();
	},var reCheckAddressTimeout);*/
	
	//************************** deeplinking	
			
	/*
	http://www.asual.com/jquery/address/docs/
				
	internalChange is called when we set value ourselves; 
	externalChange is called when the URL is changed or the browser backward or forward button is pressed. 
	
	I don't want to an AJAX request if there are no query parameters in the URL, which is why I test for an empty object.
	if($.isEmptyObject(event.parameters))
	return;
	  
	jQuery.address.strict(false);//Note that you need to disable plugin's strict option, otherwise it would add slash symbol immediately after hash symbol, like this: #/11.
	*/
	
	function filterAllowedChars(str) {
		var allowedChars = "_-";
		var n = str.length;
		var returnStr = "";
		var i = 0;
		var _char;
		var z;
		for (i; i < n; i++) {
			_char = str.charAt(i).toLowerCase(); //convert to lowercase
			if (_char == "\\") _char = "/";
			z = getCharCode(_char);			
			if ((z >= getCharCode("a") && z <= getCharCode("z")) || (z >= getCharCode("0") && z <= getCharCode("9")) || allowedChars.indexOf(_char) >= 0) {
				//only accepted characters (this will remove the spaces as well)
				returnStr += _char;
			}
		}
		return returnStr;
	}
	
	function getCharCode(s) {
		return s.charCodeAt(0);
	}
	
	function initAddress(e) {
		e.stopPropagation();
		//console.log("init: ", e.value);
	}
	
	function onChange(e) {
		e.stopPropagation();
		//console.log("onChange: ", e.value);
		
		if(!_addressInited){
			_addressInited = true;
		}
		
		deepLink = e.value;
		if(deepLink.charAt(0) == "/") deepLink = deepLink.substring(1)//check if first character is slash
		if(deepLink.charAt(deepLink.length - 1) == "/") deepLink = deepLink.substring(0, deepLink.length - 1)//check if last character is slash
		//console.log("onChange after trim: ", deepLink);

		//check if first level exist
		var first_level = findFirstLevel(deepLink);
		if(!findCategoryByName(first_level)){
			alert('404 page not found, check your deeplinks first level!');
			$.address.history(false);//skip invalid url
			return false;
		}
		
		_addressSet=false;

		//check for category change
		if(currentCategory == undefined || currentCategory != activeCategory){
			//process new playlist and get deeplink data
			_setPlaylist();	
			return;
		}
		
		//console.log('console.log(_playlistManager.getCounter(), activeItem); = ', _playlistManager.getCounter(), ' , ', activeItem);
		if(secondLevel){
			if(!findCounterByName(secondLevel)){//if second level exist but invalid
				alert('404 page not found, check your deeplinks second level!');
				$.address.history(false);//skip invalid url
				return;	
			}
		}else{//back from 2 level to one level
			destroyMedia();
			//console.log('here destroyMedia');
			return;
		}
		
		if(_playlistManager.getCounter() != activeItem){
			//console.log('1a.......');
			_addressSet=true;
			if(_playlistManager.getCounter()!=-1)_enableActiveItem();
			_playlistManager.setCounter(activeItem, false);
		}else{
			//console.log('2a.......');
			_disableActiveItem();
			_findMedia();
		}
	}
	
	function findAddress(value){
		//console.log('findAddress');
		
		var arr = value.split('/'), single_level = false;
		if(arr.length!=2){
			single_level = true;
			nameFound=true;
		}
		//console.log(arr);
		var category_name=arr[0],categoryFound=false,nameFound=false,i = 0, len = categoryArr.length;
		
		for(i; i < len;i++){
			if(categoryArr[i].categoryName == category_name){
				//console.log('activeCategory = ', i, ' , category_name = ', category_name);
				activeCategory = i;
				categoryFound=true;
				break;	
			}
		}
		if(!categoryFound) return false;
	
		if(single_level){
			media_name=arr[1];
			
			i = 0, arr = categoryArr[activeCategory].mediaName;
			var len = arr.length;
			for(i; i < len;i++){
				if(arr[i] == media_name){
					//console.log('activeItem = ', i, ' , media_name = ', media_name);
					activeItem = i;
					nameFound=true;
					break;	
				}
			}
		}
		
		if(!categoryFound || !nameFound){
			return false;
		}else{
			return true;	
		}
	}
	
	function findCounterByName(value){
		var found=false, i = 0, arr = categoryArr[activeCategory].mediaName, len = arr.length;
		for(i; i < len;i++){
			if(arr[i] == value){
				//console.log('findCounterByName: ', i, ' ', value);
				activeItem = i;
				found=true;
				break;	
			}
		}
		if(!found){
			return false;
		}else{
			return true;	
		}
	}
	
	function findCategoryByName(value){
		var found=false, i = 0;
		for(i; i < categoryLength;i++){
			if(categoryArr[i].categoryName == value){
				//console.log('findCategoryByName: ', i, value);
				activeCategory = i;
				_activePlaylist = categoryArr[i].id;//get id attributte from current deepling
				found=true;
				break;	
			}
		}
		if(!found){
			return false;
		}else{
			return true;	
		}
	}
	
	function findAddress2(i){//return media name with requested counter
		//console.log('findAddress2');
		var arr = categoryArr[activeCategory].mediaName;
		return categoryArr[activeCategory].categoryName+'/'+arr[i];
	}
	 
	function findFirstLevel(value){
		var str_to_filter, result;
		if(value.indexOf('/') > 0){//two level
			secondLevelExist=true;
			str_to_filter = value.substr(0, value.indexOf('/'));
			firstLevel=str_to_filter;
			secondLevel = value.substr(value.indexOf('/')+1);//remember second part url
		}else{
			firstLevel=value;
			secondLevelExist=false;
			secondLevel=null;
			str_to_filter = value;//single level
		}
		//console.log('firstLevel = ', firstLevel);
		//console.log('secondLevel = ', secondLevel);
		result = filterAllowedChars(str_to_filter);
		return result;
	}
	
	
	//******************* PLAYLIST PROCESS
	
	function _setPlaylist() {
		//console.log('_setPlaylist');
		_playlistTransitionOn=true;
		if(preloader)preloader.css('display','block');
		
		//reset
		if(scrollCheckIntervalID) clearInterval(scrollCheckIntervalID);
		
		if(lastPlaylist){//clean last playlist
			cleanMedia();
			mediaHolder.html('').css('display', 'none');
			cleanPreviewVideo();
			playlist_content.empty();
		}
		
		if(playlistType=='wall'){
			var i = 0, len = yt_wall_pp_arr.length;
			for(i;i<len;i++){
				if(yt_wall_pp_arr[i])yt_wall_pp_arr[i].remove();//remove prettyphoto holders for wall layout
			}
			yt_wall_pp_arr=[];
			if(current_wall_yt_blocker) current_wall_yt_blocker=null;
			wallLayoutInited=false;
		}
		
		html5video_inited=false;
		lightbox_use=false;
		playlistLength=0;
		processPlaylistCounter = -1;
		processPlaylistLength=0;
		_videoProcessData=[];
		liProcessArr = [];
		_playlistManager.reSetCounter();
		
		descriptionArr = [];
		playlistArr=[];
		thumbArr=[];
		thumbImgArr=[];
		thumbPreloaderArr=[];
		thumbVideoDivArr = [];
		thumbHitDivArr=[];
		
		infoOpened=false;
		_thumbInnerContainerSize=0;
		
		if(playlistType!='wall'){
			if(scrollType == 'buttons'){
				if(playlistOrientation =='horizontal'){//reset scroll
					thumbInnerContainer.css('left', 0+'px');
				}else{
					thumbInnerContainer.css('top', 0+'px');
				}	
				//hide buttons
				if(thumbBackward)thumbBackward.css('display','none');
				if(thumbForward)thumbForward.css('display','none');
			}
		}
		if($(playlistData.find("ul[id="+_activePlaylist+"]")).length==0){
			if(!isEmpty(_activePlaylist)){
				alert('Failed playlist selection! No playlist with id: ' + _activePlaylist);
			}else{
				alert('Active playlist is set to none, so no playlist have been loaded.');
				checkPlaylistProcess();
			}
			_playlistTransitionOn=false;
			return false;
		}
		
		
		if($(playlistData.find("ul[id="+_activePlaylist+"]")).find("li[class='playlistNonSelected']").length == 0){
			alert('Playlist is empty. Quitting.');
			checkPlaylistProcess();
			_playlistTransitionOn=false;
			return false;
		};
		
		//check if playlist is xml
		if($(playlistData.find("ul[id="+_activePlaylist+"]")).find("li[class='playlistNonSelected']").eq(0).attr('data-type').toLowerCase() == 'xml'){
			
			remove_node = $(playlistData.find("ul[id="+_activePlaylist+"]")).find("li[class='playlistNonSelected']").eq(0);
			//console.log(remove_node);
			
			currentObj={};
			if(useDeeplink)currentObj.deeplink = remove_node.attr('data-address');
			
			_currentInsert=remove_node;//remember current insert index for append
			
			var url = remove_node.attr('data-mp4Path');
			//console.log('xml url = ',url);
			loadXml(url);

			return;
		}
		
		//check if playlist is folder
		if($(playlistData.find("ul[id="+_activePlaylist+"]")).find("li[class='playlistNonSelected']").eq(0).attr('data-type').toLowerCase() == 'folder'){
			
			folderProcessArr = [];//reset
			
			$(playlistData.find("ul[id="+_activePlaylist+"]")).find("li[class='playlistNonSelected']").each(function(){
				folderProcessArr.push($(this));
			});
			folderCounter = folderProcessArr.length;
			checkFolderCounter();

			return;
		}
		
		//get new playlist
		var playlist = $(playlistData.find("ul[id="+_activePlaylist+"]")).clone().appendTo(playlist_content);
		//console.log(playlist, playlist.length);
		if(playlist.length==0){
			alert('Failed playlist selection 2! No playlist with id: ' + _activePlaylist);
			_playlistTransitionOn=false;
			return false;
		}
		
		currentCategory = activeCategory;
		
		deeplinkData = [];
		//deeplink data, not in build playlist since we execute it every time
		if(useDeeplink){
			getDeeplinkData=false;
			if(!useDeeplink && !activeCategory)activeCategory = playlist.index();
			if(!categoryArr[activeCategory].mediaName){//if not already processed
				getDeeplinkData=true;
				var tempArr=[];
				categoryArr[activeCategory].mediaName=tempArr;
			}
		}
		
		lastPlaylist = playlist;
		liProcessArr = playlist.find("li[class='playlistNonSelected']");
		//console.log(liProcessArr);
		
		//get playlist item size and thumb size
		var box = $("<div/>").addClass('playlistNonSelected').css('opacity',0).appendTo(componentWrapper);
	    boxMarginBottom = parseInt(box.css('marginBottom'),10);
		boxMarginRight = parseInt(box.css('marginRight'),10);
		boxWidth = box.outerWidth(true);
		boxHeight = box.outerHeight(true);
		box.remove();
		box=null;
		
		var thumb = $("<div/>").addClass('playlistThumb').css('opacity',0).appendTo(componentWrapper);
		thumbWidth = thumb.width();
		thumbHeight = thumb.height();
		thumb.remove();
		thumb=null;
		//console.log('boxWidth = ', boxWidth, ', boxHeight = ', boxHeight, ', thumbWidth = ', thumbWidth, ', thumbHeight = ', thumbHeight, 'boxMarginBottom = ', boxMarginBottom);
		
		processPlaylistLength = liProcessArr.length;
		//console.log('processPlaylistLength = ', processPlaylistLength);
		checkPlaylistProcess();
	}
	
	function checkPlaylistProcess() {
		processPlaylistCounter++;
		
		if(processPlaylistCounter < processPlaylistLength){
			_videoProcessData=[];//reset
			_processPlaylistItem();
		}else{
			//console.log('finished processing playlist');
			if(!flashCheckDone){
				flashCheckDone=true;
				
				yt_overlay_blocker=$("<div/>").addClass('yt_overlay_blocker').css({cursor:'pointer', opacity:0, left:-10000+'px'}).bind('click', function(){
					clickPlaylistItem2();
					return false;	
				}).appendTo(componentPlaylist).bind('mouseleave', outPlaylistItem);
				
				if(html5Support){
					$(flashMain).remove();
					flashPreviewHolder.remove();
					if(playlistType!='wall')mediaHolder.css('display', 'block');
				}else{
					youtubeIframeMain.remove();
					youtubeIframePreview.remove();
					mediaHolder.remove();
					if(playlistType!='wall'){
						yt_overlay_blocker.unbind('mouseleave', outPlaylistItem);//not needed in this case					
						if(typeof getFlashMovie(flashMain) !== "undefined"){
							$(flashMain).css('display','block');
							flashReadyIntervalID = setInterval(checkFlashReady, flashReadyInterval);	
						}else{
							checkPlaylistProcess();
						}
					}else{
						if(useLivePreview && typeof getFlashMovie(flashPreview) !== "undefined"){
							$(flashPreview).css('display','block');
							flashReadyIntervalID = setInterval(checkFlashReady2, flashReadyInterval);
						}else{
							checkPlaylistProcess();
						}
					}
					return;
				}
			}
			
			//console.log('finished processing playlist');
			playlistLength= playlistArr.length;
			//console.log(playlistArr);
			//console.log('playlistLength = ', playlistLength);
			
			$('.playlistInfo').dotdotdot();
			
			_playlistManager.setPlaylistItems(playlistLength);
			
			if(outputPlaylistData){
			  try{ 
				  console.log(deeplinkData);	
			  }catch(e){}
			}
			
			if(playlistType!='wall' && playlistLength>0){
			
				//remove margin on last playlist item
				if(playlistType == 'list'){
					if(playlistOrientation == 'vertical'){
						playlistArr[playlistLength-1].css('marginBottom', 0+'px');
					}else{
						playlistArr[playlistLength-1].css('marginRight', 0+'px');
					}
				}
				
				_thumbInnerContainerSize=0;
				var i = 0, div;
				for(i;i<playlistLength;i++){
					div = $(playlistArr[i]);
					if(playlistOrientation == 'horizontal'){
						_thumbInnerContainerSize+=div.outerWidth(true);
					}else{
						_thumbInnerContainerSize+=div.outerHeight(true);
					}
				}
				
				if(scrollType == 'buttons'){
					if(playlistOrientation == 'horizontal'){
						playlist_inner.width(_thumbInnerContainerSize);
					}
				}else if(scrollType == 'scroll'){
					if(playlistOrientation == 'horizontal'){
						lastPlaylist.width(_thumbInnerContainerSize);
					}
				}
			}
				
			//preventSelect(playlistArr);
			
			if(playlistType!='wall'){
			
				checkScroll();
			
			}else{
				if(playlistType=='wall' && lightbox_use){//grab pp nodex per each playlist
					jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({theme:'pp_default',
						deeplinking: false, 
						changepicturecallback: function(){ //called on prettyPhoto open
							if(!isMobile){
								if(currentPreviewID!=-1)itemTriggered(currentPreviewID);//for pp click playlist item wont happen
								else if(pp_currentPreviewID!=-1)itemTriggered(pp_currentPreviewID);
								cleanPreviewVideo();
							}
						},
						callback: function(){}//Called when prettyPhoto is closed 
					});	
				}
			}
			
			if(preloader)preloader.css('display','none');
			_playlistTransitionOn=false;	
			
			if(!_componentInited){
				_componentInited=true;
				_doneResizing();
				_iframe = $('iframe', parent.document).css('zIndex',10000);

				if(playlistType=='wall' && isMobile){//capture item number clicked on mobile for href links
					_doc.on("click", "a[data-apNumToReturn]", function() {   
						if($(this).attr('data-apNumToReturn') != undefined){
							var r = parseInt($(this).attr('data-apNumToReturn'),10);  
							itemTriggered(r);
						}
					});
				}
				
				if(playlistType!='wall'){
					if(autoHideControls){
						playerHolder.bind('mouseenter', overComponent).bind('mouseleave', outComponent);
					}else{
						showControls();
					}
				}
				if(useLivePreview && !playlistHidden){
					playlistHolder.bind('mouseleave', outPlaylist);
				}
				
				videoGallerySetupDone();
				
			}
			
			if(playlistType!='wall'){
				if(useDeeplink){
					//check second level
					if(secondLevelExist){
						if(!findCounterByName(secondLevel)){//if second level exist but invalid
							alert('404 page not found, check your deeplinks second level!');
							$.address.history(false);//skip invalid url
							return;	
						}
						//console.log(activeItem);
						_addressSet=true;
						_playlistManager.setCounter(activeItem, false);
					}
				}else{
					var ai = settings.activeItem;
					if(ai > playlistLength-1)ai = playlistLength-1;
					if(ai>-1){
						_playlistManager.setCounter(ai, false);
					}
				}
			}
		}
	}
	
	function _processPlaylistItem() {
		//console.log('_processPlaylistItem, processPlaylistCounter = ', processPlaylistCounter);
		
		var _item, youtube_path, path, type, thumb, thumbImg, thumbPreloader, videoDiv, hitdiv, attr;
		_item = $(liProcessArr[processPlaylistCounter]);
		
		type = _item.attr('data-type');
	
		if(type == 'local'){

			var obj = {};
			obj.type = 'local';
			obj.mp4Path = _item.attr('data-mp4Path');
			obj.ogvPath = _item.attr('data-ogvPath');
			if(_item.attr('data-webmPath') != undefined && !isEmpty(_item.attr('data-webmPath'))){
				obj.webmPath = _item.attr('data-webmPath');
			}
			obj._item = _item;
			thumb = _item.find("div[class='playlistThumb']");//div
			obj.thumb = thumb;
			obj.thumbImg = thumb.find("img[class='thumb']");
			if(useDeeplink)obj.deeplink = _item.attr('data-address');
			_videoProcessData.push(obj);
			_buildPlaylist();
			
		}else if(type == 'youtube_single'){
			
			path = _item.attr('data-mp4Path');
			youtube_path="http://gdata.youtube.com/feeds/api/videos/"+path+"?v=2&format=5&alt=jsonc";
			
			currentObj={};
			attr = _item.attr('data-address');
			if (useDeeplink && typeof attr !== 'undefined' && attr !== false) {
				 currentObj.deeplink = attr;
			}
			attr = _item.attr('data-link');
			if (typeof attr !== 'undefined' && attr !== false) {
				 currentObj.link = attr;
			}
			attr = _item.attr('data-hook');
			if (typeof attr !== 'undefined' && attr !== false) {
				 currentObj.hook = attr;
			}
			attr = _item.attr('data-target');
			if (typeof attr !== 'undefined' && attr !== false) {
				 currentObj.target = attr;
			}
			attr = _item.attr('data-description');
			if (typeof attr !== 'undefined' && attr !== false) {
				 currentObj.description = attr;
			}
			if(_item.find('.playlistTitle').length>0){
				currentObj.title = _item.find('.playlistTitle').html();
			}
			if(_item.find('.thumb').length>0){
				currentObj.thumb = _item.find('.thumb').attr('src');
			}
			
			_processYoutube(type, youtube_path);
			
		}else if(type == 'youtube_playlist'){
			
			path = _item.attr('data-mp4Path');
			//check for 'PL'
			if(_item.attr('data-mp4Path').substr(0,2).toUpperCase() == 'PL'){
				//path = _item.attr('data-mp4Path').substring(2);
			}
			youtubePlaylistPath=path;
			//console.log(path);
			playlistStartCounter = 1;
			
			youtube_path = "http://gdata.youtube.com/feeds/api/playlists/"+youtubePlaylistPath+"?start-index="+playlistStartCounter+"&max-results=50&v=2&format=5&alt=jsonc";
			
			currentObj={};
			attr = _item.attr('data-address');
			if (useDeeplink && typeof attr !== 'undefined' && attr !== false) {
				 currentObj.deeplink = attr;
			}
			
			attr = _item.attr('data-link');
			if (typeof attr !== 'undefined' && attr !== false) {
				 currentObj.link = attr;
			}
			attr = _item.attr('data-hook');
			if (typeof attr !== 'undefined' && attr !== false) {
				 currentObj.hook = attr;
			}
			attr = _item.attr('data-target');
			if (typeof attr !== 'undefined' && attr !== false) {
				 currentObj.target = attr;
			}
			
			_currentInsert =_item;//remember current insert index for append
			_item.css('display','none');//hide data li
			
			_processYoutube(type, youtube_path);
			
		}else{
			alert('Wrong data-type in playlist! Playlist node data-type cannot be: "' + type + '" . Quitting.');
			if(type == 'xml' || type == 'folder'){
				alert('You CANNOT mix XML or FOLDER playlist with other playlist types (local videos, youtube single videos, youtube playlists). Quitting.');
			}
		}
	}
	
	function loadXml(path){
		var url = path+"?rand=" + (Math.random() * 99999999);
		
		$.ajax({
			type: "GET",
			url: url,
			dataType: "html",
			cache: false
		}).done(function(xml) {
		
			var obj, ul, li, _li, str;
		
			$(xml).find("li[class='playlistNonSelected']").each(function(){
			
				obj = $(this);
				
				str = $('<div>').append(obj.clone()).html();//convert object to string
				str = str.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\<br\>\<br\>/g, "<br\/>");//correct xml file from domdocument creation (<,>,br)
				//str = str.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
				//console.log(str);
			
				ul = document.createElement('ul');
				ul.innerHTML = str;
				li = ul.firstChild;
				//console.log(li);
				
				_li = $(li);
					
				_currentInsert.after(_li);
				_currentInsert=_li;
				
			});
			
			if(remove_node)remove_node.remove();
			_setPlaylist();	

		}).fail(function(jqXHR, textStatus, errorThrown) {
			alert('XML process error: ' + jqXHR.responseText);
			checkPlaylistProcess();
		});	
	}
	
	function loadFolder(){
			
		var _item = folderProcessArr[folderCounter], path = _item.attr('data-mp4Path'), address = _item.attr('data-address');
		_currentInsert = _item;	
			
		if(playlistType=='wall'){
			path += wallPath;
		}else{
			path += '/main/';
		}
		path = path.replace(/\/\//g, "/");
		//console.log(url);
	
		var url = 'folder_parser.php';	
		var data = {"dir": path, "sub_dirs": false}; 

		jQuery.ajax({
			type: 'GET',
			url: url,
			data: data,
			dataType: "json"
		}).done(function(media) {
			
			var li, div, thumb, no_ext, title, path, main_mp4, main_ogv, main_webm, main_jpg, preview_mp4, preview_ogv, preview_webm, preview_jpg, i = 0, len = media.length, entry, title, tw, th;
			//console.log(len);
			
			if(len == 0){
				alert('Folder process failed! No media found.');
				return;
			}
			
			div = $('<div class="playlistThumb thumb"/>').appendTo(componentWrapper);
			tw = div.width(), th = div.height();
			div.remove();
			//console.log(div, tw,th);
			
			for(i; i < len; i++){
				entry = media[i];
				//console.log(entry);
				
				path = entry.path;
				
				if(path.indexOf('\\')){//replace backward slashes
					path = path.replace(/\\/g,"/");
				}
				
				main_mp4 = path;
				main_ogv = path.substr(0, path.lastIndexOf('.')) + '.ogv';//asssume ogv file exist with the same name!
				main_webm = path.substr(0, path.lastIndexOf('.')) + '.webm';//asssume webm file exist with the same name!
				main_jpg = path.substr(0, path.lastIndexOf('.')) + '.jpg';//asssume jpg file exist with the same name!
				
				preview_mp4 = path;
				preview_ogv = path.substr(0, path.lastIndexOf('.')) + '.ogv';//asssume ogv file exist with the same name!
				preview_webm = path.substr(0, path.lastIndexOf('.')) + '.webm';//asssume webm file exist with the same name!
				preview_jpg = path.substr(0, path.lastIndexOf('.')) + '.jpg';//asssume jpg file exist with the same name!
				
				preview_mp4 = preview_mp4.replace('/main/', previewPath);//switch paths
				preview_ogv = preview_ogv.replace('/main/', previewPath);//switch paths
				preview_webm = preview_webm.replace('/main/', previewPath);//switch paths
				preview_jpg = preview_jpg.replace('/main/', previewPath);//switch paths
				
				//create li node
				li = $('<li/>').addClass('playlistNonSelected').attr({'data-id': playlistLength-1, 'data-type': 'local', 
				'data-mp4Path': main_mp4,
				'data-ogvPath': main_ogv,
				'data-webmPath': main_webm,
				'data-imagePath': main_jpg});
				
				//get title from main path
				no_ext = main_mp4.substr(0, main_mp4.lastIndexOf('.'));
				if(no_ext.indexOf('/')){
					title = no_ext.substr(no_ext.lastIndexOf('/')+1);
				}else{
					title = no_ext;
				}
				//remove underscores from title 
				title = title.split("_").join(" ");
				
				//<div class="playlistThumb"><img class='thumb' src='../media/video/1/thumb/01.jpg' width='120' height='68' alt=''/></div>
				thumb = $('<div class="playlistThumb"><img class="thumb" src="'+preview_jpg+'" alt="'+title+'"/></div>').appendTo(li);
				//thumb = $('<div class="playlistThumb"><img class="thumb" src="'+preview_jpg+'" width="'+tw+'" height="'+th+'" alt="'+title+'"/></div>').appendTo(li);
				
				div = $('<div class="playlistInfo"><p><span class="playlistTitle">'+title+'</span></p></div>').appendTo(li);
				
				_currentInsert.after(li);
				_currentInsert=li;
				
				if(useDeeplink)li.attr('data-address', address+(i+1).toString());
			}
			
			_item.remove();
			checkFolderCounter();
			
		}).fail(function(jqXHR, textStatus, errorThrown) {
			alert('Folder process error: ' + jqXHR.responseText);
			alert('Make sure you are running this online or on local server, not offline!');
			checkPlaylistProcess();
		});
	}
	
	function checkFolderCounter() {
		folderCounter--;
		//console.log('checkFolderCounter, ', folderCounter);
		if(folderCounter>-1){
			loadFolder();
		}else{
			_setPlaylist();		
		}
	}
	
	function _processYoutube(type, path) {
		//console.log('_processYoutube: ', type, path);
		jQuery.ajax({
			 url: path,
			 dataType: 'jsonp', 
			 success:function(data){
				 type == 'youtube_single' ? _processYoutubeSingleSuccess(data) : _processYoutubeSuccess(data);
			 },
			 error:function(er){
				 _processYoutubeError(er);
			 }
		});	
	}
	function _processYoutubeSuccess(response) {//for playlist
		 //console.log('_processYoutubeSuccess');
		 //console.log(response);
		
		 if(response.error){
			alert(response.error.message);
			checkPlaylistProcess();
			return;	
		 } 
		 
		 if(response.data.items){
		 
			 var len = response.data.items.length, i = 0, _item, type, path;
			 //console.log('response.data.items.length = ', len);
			 
			 for(i; i < len; i++){
				_item = response.data.items[i].video;
				
				if(!_item || !_item.accessControl){//skip deleted, private videos
					//http://apiblog.youtube.com/2011/12/understanding-playback-restrictions.html
					//https://developers.google.com/youtube/2.0/developers_guide_protocol_uploading_videos#Setting_Access_Controls
					//console.log(i, _item.status.value);	
					continue;
				}
				
				obj = {};
				obj.type = 'youtube_playlist';
				if(useDeeplink)obj.deeplink = currentObj.deeplink+(i+1).toString();
				obj.id = _item.id;
				//console.log(i, _item.id, _item.title, _item.thumbnail);
				if(!currentObj.title){
					obj.title=_item.title?_item.title:'';
				}else{
					obj.title=currentObj.title;
				}
				if(!currentObj.description){
					obj.description=_item.description?_item.description:'';
				}else{
					obj.description=currentObj.description;
				}
				if(!currentObj.thumb && _item.thumbnail){
					obj.thumbnail=_item.thumbnail.sqDefault ? _item.thumbnail.sqDefault : _item.thumbnail.hqDefault;
				}else if(currentObj.thumb){
					obj.thumbnail=currentObj.thumb; 
				}else{
					obj.thumbnail='';  
			    }
				
				_videoProcessData.push(obj); 
			 }
			 
			 playlistStartCounter += playlistEnlargeCounter;
			 //console.log('playlistStartCounter = ', playlistStartCounter);
			 
			 type = 'youtube_playlist';
			 path = "http://gdata.youtube.com/feeds/api/playlists/"+youtubePlaylistPath+"?start-index="+playlistStartCounter+"&max-results=50&v=2&format=5&alt=jsonc";
			_processYoutube(type, path);
		 
		 }else{//on the end
			_buildPlaylist();
		 }
	}
	
	function _processYoutubeSingleSuccess(response) {
		 //console.log(response);
		 /*
		 console.log(response.data);
		 console.log(response.data.title);
		 console.log(response.data.description);
		 console.log(response.data.id);
		 console.log(response.data.thumbnail.sqDefault);
		 console.log(response.data.thumbnail.hqDefault);
		 */
		 
		 var obj = {}, _item;
		 _item = response.data;
		 
		 if(!_item){
			checkPlaylistProcess();
			return;	 
		 }
		 
		 if(!_item.accessControl){//skip deleted, private videos
			//http://apiblog.youtube.com/2011/12/understanding-playback-restrictions.html
			//https://developers.google.com/youtube/2.0/developers_guide_protocol_uploading_videos#Setting_Access_Controls
			//console.log(_item.status.value);
			checkPlaylistProcess();
		 }else{
			 obj.type = 'youtube_single';
			 if(useDeeplink)obj.deeplink = currentObj.deeplink;
			 obj.id = _item.id;
			 if(!currentObj.title){
				 obj.title=_item.title?_item.title:'';
			 }else{
				 obj.title=currentObj.title;
			 }
			 if(!currentObj.description){
				 obj.description=_item.description?_item.description:'';
			 }else{
				 obj.description=currentObj.description;
			 }
			 if(!currentObj.thumb && _item.thumbnail){
				 obj.thumbnail=_item.thumbnail.sqDefault ? _item.thumbnail.sqDefault : _item.thumbnail.hqDefault;
			 }else if(currentObj.thumb){
				 obj.thumbnail=currentObj.thumb; 
			 }else{
				 obj.thumbnail='';  
			 }
			 _videoProcessData.push(obj);
			 
			_buildPlaylist();
		 }
	}

	function _processYoutubeError(er) {
		//console.log(er);
		checkPlaylistProcess();
	}
	
	//************
	
	function _buildPlaylist() {
		//console.log('_buildPlaylist');
		
		var len = _videoProcessData.length, i = 0, ul, li, _item, type, div, thumb, thumbImg, thumbPreloader, videoDiv, hitdiv, loc_path, loc_name, p, a, img;
		//console.log('len = ', len);
		
		if(getDeeplinkData){
			dlink = baseURL + strict + firstLevel + '/';
			var str_to_filter, tempArr = categoryArr[activeCategory].mediaName;
		}
		
		for (i; i < len; i++) {
			
			_item = _videoProcessData[i];
			
			type = _item.type;
			playlistLength+=1;
			
			var mc = playlistLength-1;
			
			//console.log(_item, type);
			
			if(type == 'local'){
				
				playlistArr.push(_item._item);
				
				//bring orig youtube types back (they were initailly marked as 'local' because all xml nodes were created in php before coming to this file, but we still need yt type because of other actions like over playlist item)
				if(_item._item.attr('data-orig-type') != undefined && !isEmpty(_item._item.attr('data-orig-type'))){
					if(!autoMakePlaylistThumb)if(_item.thumb)_item.thumb.remove();
					if(!autoMakePlaylistInfo){
						if(_item._item.find('.playlistInfo').length)_item._item.find('.playlistInfo').remove();
						_item._item.attr('data-description','');
					}
					_item._item.attr('data-type', _item._item.attr('data-orig-type')); 
				}
				
				//check description
				if(_item._item.attr('data-description') != undefined && !isEmpty(_item._item.attr('data-description'))){
					descriptionArr[playlistLength-1] = _item._item.attr('data-description');
				}
				
				if(_item.thumb){
					thumb = _item.thumb;//div
					thumbArr.push(thumb);
					thumbImg = _item.thumbImg;//img
					thumbImgArr.push(thumbImg);
					//fade thumbs in
					thumbImg.stop().animate({'opacity': 1},  {duration: 500, easing: "easeOutSine"});
				}
				
				//hit 
				hitdiv =$("<div/>").css({//hit div for rollover over whole playlist item
				   position: 'absolute',
				   width: boxWidth + 'px',
				   height: boxHeight + 'px',
				   top : 0+'px',
				   left : 0+'px',
				   background: '#ad4',
				   cursor: 'pointer',
				   opacity: 0
				}).attr('dataTitle', 'hitdiv');//hit on top
				
				if(playlistType!='wall'){
					hitdiv.appendTo(_item._item);	
					thumbHitDivArr[playlistLength-1]=hitdiv;
					_item._item.bind('click', clickPlaylistItem).attr('data-id', playlistLength-1);
				}else{
					
					var lnk;
					if(_item._item.attr('data-link') != undefined){
						lnk = _item._item.attr('data-link');
					}
					var hook;
					if(_item._item.attr('data-hook') != undefined){
						hook = _item._item.attr('data-hook');
					}
					var desc = '';
					if(_item._item.attr('data-description') != undefined){
						desc = _item._item.attr('data-description');
					}	
					var tlt = '';
					if(_item._item.find("span[class='playlistTitle']").length){
						tlt = _item._item.find("span[class='playlistTitle']").html();
					}
					
					if(hook!=undefined && lnk!=undefined){//pretyphoto
						lightbox_use=true;
						//create prettyphoto nodes
						/*
						<a class="pp_content" href="http://vimeo.com/14665315" data-rel="prettyPhoto[gallery1]" title="Optional description in Prettyphoto."><img src="link/to/image" width="180" height="120" alt="Optional title in Prettyphoto." /></a>  
						*/
						if(html5Support){
							//console.log(lnk, hook, desc, tlt);
							a = $('<a href="'+lnk+'" data-rel="'+hook+'" title="'+desc+'" />').appendTo(_item._item);
							img = $('<img src="" alt="'+tlt+'"/>').css('display','none').appendTo(a);//we use empty image for prettyphoto title
							hitdiv.appendTo(a);	
							if(isMobile){
								hitdiv.bind('click', function(){//to capture itemTriggered on pp
									itemTriggered($(this).attr('data-id'));
								}).attr('data-id', playlistLength-1);
							}
						}else{//flash
							var ytb=$("<div/>").addClass('yt_overlay_blocker').css({cursor:'pointer', opacity:0, left:-10000+'px'});
							a = $('<a href="'+lnk+'" data-rel="'+hook+'" title="'+desc+'"/>').data('yt_blocker', ytb).appendTo(componentPlaylist);
							img = $('<img src="" alt="'+tlt+'"/>').css('display','none').appendTo(a);//we use empty image for prettyphoto title
							yt_wall_pp_arr[ playlistLength-1] = a;//store them so we can wrap yt_overlay_blocker in them
							ytb.appendTo(a);
							if(!isMobile){
								ytb.bind('mouseleave', outPlaylistItem).attr('data-id', playlistLength-1);
							}
							thumbHitDivArr[playlistLength-1]=ytb;
						}
					}else if(lnk!=undefined){//link
						var target = '_blank';
						if(_item._item.attr('data-target') != undefined && !isEmpty(_item._item.attr('data-target'))){
							target = _item._item.attr('data-target');
						}
						if(html5Support){
							a = $('<a href="'+lnk+'" target="'+target+'" data-apNumToReturn="'+mc+'"/>').appendTo(_item._item);
							hitdiv.appendTo(a);	
							if(!isMobile){
								hitdiv.bind('click', function(){//to capture itemTriggered on link
									if(currentPreviewID!=-1)itemTriggered(currentPreviewID);
									else if(pp_currentPreviewID!=-1)itemTriggered(pp_currentPreviewID);
								}).attr('data-id', playlistLength-1);
							}
						}else{//flash
							var ytb=$("<div/>").addClass('yt_overlay_blocker').css({cursor:'pointer', opacity:0, left:-10000+'px'});
							a = $('<a href="'+lnk+'" target="'+target+'"/>').data('yt_blocker', ytb).appendTo(componentPlaylist);
							yt_wall_pp_arr[ playlistLength-1] = a;//store them so we can wrap yt_overlay_blocker in them
							ytb.appendTo(a);
							if(!isMobile){
								ytb.bind('mouseleave', outPlaylistItem).attr('data-id', playlistLength-1);
							}
							thumbHitDivArr[playlistLength-1]=ytb;
							
							if(!isMobile){
								ytb.bind('click', function(){//to capture itemTriggered on link
									if(currentPreviewID!=-1)itemTriggered(currentPreviewID);
									else if(pp_currentPreviewID!=-1)itemTriggered(pp_currentPreviewID);
								}).attr('data-id', playlistLength-1);
							}
						}
					}else{//no action
						hitdiv.appendTo(_item._item);	
						thumbHitDivArr[playlistLength-1]=hitdiv;
						_item._item.bind('click', clickPlaylistItem).data('no_action', 'true').attr('data-id', playlistLength-1);
					}
				
				}
				
				if(!isMobile){
					if(html5Support){
						_item._item.bind('mouseenter', overPlaylistItem).bind('mouseleave', outPlaylistItem).attr('data-id', playlistLength-1);
					}else{
						_item._item.bind('mouseenter', overPlaylistItem).attr('data-id', playlistLength-1);
					}
				}
			
				if(useLivePreview){
					//video holder
					videoDiv =$("<div/>").addClass('thumb_vid').attr({
					   dataTitle: 'videoDiv'
					}).appendTo($(thumbArr[playlistLength-1]));
					thumbVideoDivArr[playlistLength-1]=videoDiv;
				
					//thumb preloaders
					thumbPreloader=$(new Image()).attr('data-id', playlistLength-1).addClass('thumbPreloader').load(function() {
					}).error(function(e) {
						//console.log("thumb error " + e);
					}).attr({
					  src: preloaderUrl,
					  dataTitle: 'thumbPreloader'
					}).appendTo(thumbArr[playlistLength-1]);
					thumbPreloaderArr[playlistLength-1] = thumbPreloader;
				}
			
			}else if(type == 'youtube_single' || type == 'youtube_playlist'){
				if(type == 'youtube_single'){
					//youtube single already has li node, so just append other necessary attributtes and stuff into it.
					//li = $(liProcessArr[playlistLength-1]);
					li = $(liProcessArr[processPlaylistCounter]);
				}else if(type == 'youtube_playlist'){	
					//create nodes here
					/*
					<li data-address="youtube_single1" class='playlistNonSelected' data-type='youtube_single' data-mp4Path="jYYV0MEAhzU" ><div class="playlistThumb"></div><div class='playlistTitle'>Video title goes here</div><div class="playlistContent">Commodo vitae, commodo in, tempor eu, urna. Etiam justo ipsum maecenas nec tellus.</div></li>
					*/
					li = $('<li/>').addClass('playlistNonSelected').attr({'data-id': playlistLength-1, 'data-type': _item.type, 'data-mp4Path': _item.id});
					_currentInsert.after(li);
					_currentInsert=li;
					if(useDeeplink)li.attr('data-address', _item.deeplink);
				}
				
				
				playlistArr.push(li);
				
				//thumb
				if(autoMakePlaylistThumb){
					if(li.find('.playlistThumb').length>0)li.find('.playlistThumb').remove();
					div = $('<div/>').addClass('playlistThumb').appendTo(li);
					thumb = div;//div
					thumbArr.push(thumb);
					
					//load youtube thumbs
					if(_item.thumbnail){
						thumbImg=$(new Image()).css('opacity',0).attr('data-id', playlistLength-1).load(function() {
							//console.log($(this).width(), $(this).height());
							$(this).addClass('thumb_yt').stop().animate({'opacity': 1},  {duration: 500, easing: "easeOutSine"});
						}).error(function(e) {
							//console.log("thumb error " + e);
						}).attr({
						  src: _item.thumbnail
						}).appendTo(thumb);
						thumbImgArr.push(thumbImg);//img
					}else{
						thumbImgArr.push('');
					}
				}else{
					//search for thumbs, if added manually
					thumb = li.find("div[class='playlistThumb']");//div
					if(thumb){
						thumbArr.push(thumb);
						thumbImg = thumb.find("img[class='thumb']");
						if(thumbImg){
							thumbImg.stop().animate({'opacity': 1},  {duration: 500, easing: "easeOutSine"});
							thumbImgArr.push(thumbImg);//img
						}
					}
				}
				
				//title, description
				if(playlistType!='wall'){
					if(autoMakePlaylistInfo){
						//console.log(_item.title, _item.description);
						var tt = _item.title?_item.title:'', dd = _item.description?_item.description:'';
						if(playlistType=='list'){
							p=$('<p><span class="playlistTitle">'+tt+'</span><br><span class="playlistContent">'+dd+'</span></p>');
						}
						if(li.find('.playlistTitle').length==0){
							div = $('<div/>').html(p).addClass('playlistInfo').appendTo(li);
						}else{
							//already has title, playlist content node	
							if(playlistType=='list'){
								li.find('.playlistTitle').html(tt);
								li.find('.playlistContent').html(dd);
							}else{
								li.find('.playlistTitle').html(tt);
							}
						}
							
						li.attr('data-description', dd);
						descriptionArr[playlistLength-1] = dd;
					}else{
						//search for description (big description over video), if added manually
						if(li.attr('data-description') != undefined && !isEmpty(li.attr('data-description'))){
							descriptionArr[playlistLength-1] = li.attr('data-description');
						}
					}
				}
				
				//hit 
				hitdiv =$("<div/>").css({//hit div for rollover over whole playlist item
				   position: 'absolute',
				   width: boxWidth + 'px',
				   height: boxHeight + 'px',
				   top : 0+'px',
				   left : 0+'px',
				   background: '#ad4',
				   cursor: 'pointer',
				   opacity: 0
				}).attr('dataTitle', 'hitdiv');//hit on top
				
				if(playlistType!='wall'){
					hitdiv.appendTo(li);	
					thumbHitDivArr[playlistLength-1]=hitdiv;
					li.bind('click', clickPlaylistItem).attr('data-id', playlistLength-1);
				}else{
					
					var lnk = currentObj.link ? currentObj.link : undefined;
					var hook = currentObj.hook ? currentObj.hook : undefined;
					//console.log(lnk,hook);
					if(type == 'youtube_playlist'){
						/*with yt playlist, if just hook exist make prettyphoto links to yt video id's, if just link exist make links (but all will have to point to the same link)*/
						if(hook!=undefined)lnk='id';//set it to something not undefined so it gets selected as pp action
					}
					var desc = _item.description?_item.description:'';
					//description limit
					if(desc.length>70)desc=desc.substring(0,70)+'...';
					var tlt = _item.title?_item.title:'';
					//title limit
					if(tlt.length>30)tlt=tlt.substring(0,30)+'...';
					
					var toAppend = componentPlaylist;
					var xpos = -10000;
					
					if(hook!=undefined && lnk!=undefined){//pretyphoto
						if(!useLivePreview){
							toAppend=li;
							xpos=0;
						}
						lightbox_use=true;
						//create prettyphoto nodes
						/*
						<a class="pp_content" href="http://vimeo.com/14665315" data-rel="prettyPhoto[gallery1]" title="Optional description in Prettyphoto."><img src="link/to/image" width="180" height="120" alt="Optional title in Prettyphoto." /></a>  
						*/
						//for youtube wall place all blockers wrapped in prettyphoto in componentPlaylist, hide them on the left and on each preview video, show the one it belongs to.
						if(type == 'youtube_playlist')lnk = 'http://www.youtube.com/watch?v='+_item.id;
						
						var ytb=$("<div/>").addClass('yt_overlay_blocker').css({cursor:'pointer', opacity:0, left:xpos+'px'});
						a = $('<a href="'+lnk+'" data-rel="'+hook+'" title="'+desc+'"/>').data('yt_blocker', ytb).appendTo(toAppend);
						img = $('<img src="" alt="'+tlt+'"/>').css('display','none').appendTo(a);//we use empty image for prettyphoto title

						yt_wall_pp_arr[ playlistLength-1] = a;//store them so we can wrap yt_overlay_blocker in them
						ytb.appendTo(a);
						
						if(!isMobile){
							ytb.bind('mouseleave', outPlaylistItem).attr('data-id', playlistLength-1);
						}else{
							ytb.bind('click', function(){//to capture itemTriggered on link
								itemTriggered($(this).attr('data-id'));
							}).attr('data-id', playlistLength-1);
						}
						thumbHitDivArr[playlistLength-1]=ytb;

					}else if(lnk!=undefined){//link
						if(!useLivePreview){
							toAppend=li;
							xpos=0;
						}
						
						var target = '_blank';
						if(currentObj.target){
							target = currentObj.target;
						}
						
						var ytb=$("<div/>").addClass('yt_overlay_blocker').css({cursor:'pointer', opacity:0, left:xpos+'px'});
						a = $('<a href="'+lnk+'" target="'+target+'" data-apNumToReturn="'+mc+'"/>').data('yt_blocker', ytb).appendTo(toAppend);

						yt_wall_pp_arr[ playlistLength-1] = a;//store them so we can wrap yt_overlay_blocker in them
						ytb.appendTo(a);
						
						if(!isMobile){
							ytb.bind('mouseleave', outPlaylistItem).attr('data-id', playlistLength-1);
						}
						thumbHitDivArr[playlistLength-1]=ytb;
						
						if(!isMobile){
							ytb.bind('click', function(){//to capture itemTriggered on link
								if(currentPreviewID!=-1)itemTriggered(currentPreviewID);
								else if(pp_currentPreviewID!=-1)itemTriggered(pp_currentPreviewID);
							}).attr('data-id', playlistLength-1);
						}
						
					}else{//no action
						hitdiv.appendTo(li);	
						thumbHitDivArr[playlistLength-1]=hitdiv;
						li.bind('click', clickPlaylistItem).data('no_action', 'true').attr('data-id', playlistLength-1);		
					}
				}
				
				if(!isMobile){
					li.bind('mouseenter', overPlaylistItem).bind('mouseleave', outPlaylistItem).attr('data-id', playlistLength-1);
				}
			
				if(useLivePreview){
					//video holder
					videoDiv =$("<div/>").addClass('thumb_vid').attr({
					   dataTitle: 'videoDiv'
					}).appendTo($(thumbArr[playlistLength-1]));
					thumbVideoDivArr[playlistLength-1]=videoDiv;
					
					//thumb preloaders
					thumbPreloader=$(new Image()).attr('data-id', playlistLength-1).addClass('thumbPreloader').load(function() {
					}).error(function(e) {
						//console.log("thumb error " + e);
					}).attr({
					  src: preloaderUrl,
					  dataTitle: 'thumbPreloader'
					}).appendTo(thumbArr[playlistLength-1]);
					thumbPreloaderArr[playlistLength-1] = thumbPreloader;
				}
			}
			
			//deeplinks
			if(useDeeplink && getDeeplinkData){
				str_to_filter = filterAllowedChars(_item.deeplink);
				//console.log(str_to_filter);
				tempArr.push(str_to_filter);
			}
			
			if(outputPlaylistData){
				if(_item.type == 'local'){
					if(mp4Support){
						loc_path = _item.mp4Path;
					}else if(vorbisSupport){
						loc_path = _item.ogvPath;
					}else if(webmSupport){
						if(_item.webmPath)loc_path = _item.webmPath;
					}
					if(loc_path.lastIndexOf('/')){
						loc_name = loc_path.substr(loc_path.lastIndexOf('/')+1);
					}else{
						loc_name = loc_path;
					}
					deeplinkData.push({'id': playlistLength, 'name': loc_name, 'type':_item.type ,'video-id': loc_path, 'deeplink': useDeeplink ? dlink+_item.deeplink : 'undefined'});
				}else{
					li.attr('data-title', _item.title?_item.title:'');
					deeplinkData.push({'id': playlistLength, 'name': _item.title?_item.title:'', 'type':_item.type ,'video-id': _item.id, 'deeplink': useDeeplink ? dlink+_item.deeplink : 'undefined'});
				}
			}
		}
		checkPlaylistProcess();
	}
	

	function togglePlaylist(direction){
		if(!_componentInited || _playlistTransitionOn) return false;
		//console.log('togglePlaylist');
		if(playlistType=='list'){
			if(playlistHolder.css('display')=='block'){
				playlistHolder.css('display','none');
			}else{
				playlistHolder.css('display','block');
				if(scrollPaneRedo){//fix, cant reinit scrollpane while css display is none
					checkScroll();
					scrollPaneRedo=false;	
				}
			}	
		}
	}
	
	//**************** PREVIEW VIDEO
	
	function adjustPreviewVideo(){
		//console.log('adjustPreviewVideo');
		if(activePlaylistThumb){
			
			//calculate video relative position
			var x4 = parseInt(activePlaylistThumb.css('borderLeftWidth'),10);
			var x41 = parseInt(activePlaylistThumb.css('marginLeft'),10);
			var x42 = parseInt(activePlaylistThumb.css('paddingLeft'),10);
			
			var cp_x1 = parseInt(componentPlaylist.css('borderLeftWidth'),10);
			var cp_x2 = parseInt(componentPlaylist.css('marginLeft'),10);
			var cp_x3 = parseInt(componentPlaylist.css('paddingLeft'),10);

			var y4 = parseInt(activePlaylistThumb.css('borderTopWidth'),10);
			var y41 = parseInt(activePlaylistThumb.css('marginTop'),10);
			var y42 = parseInt(activePlaylistThumb.css('paddingTop'),10);
			
			var cp_y1 = parseInt(componentPlaylist.css('borderTopWidth'),10);
			var cp_y2 = parseInt(componentPlaylist.css('marginTop'),10);
			var cp_y3 = parseInt(componentPlaylist.css('paddingTop'),10);
			
			if(!activePlaylistThumb.offset()){
				//console.log('!activePlaylistThumb.offset() = ', activePlaylistThumb.offset());
				return false;
			} 
			
			var t1 = parseInt(activePlaylistThumb.offset().left,10) - parseInt(componentPlaylist.offset().left,10) + x4 + x41 + x42 + cp_x1+cp_x2+cp_x3;
			var t2 = parseInt(activePlaylistThumb.offset().top,10)- parseInt(componentPlaylist.offset().top,10) + y4 + y41 + y42 + cp_y1+cp_y2+cp_y3;
			
			//console.log('adjustPreviewVideo: ', 't1 = ', t1, ' , t2 = ', t2);
			
			if(mediaPreviewType == 'local'){
				if(no_action_item && yt_overlay_blocker)yt_overlay_blocker.css({left: t1+'px', top: t2+'px'});	
				if(current_wall_yt_blocker)current_wall_yt_blocker.css({left: t1+'px', top: t2+'px'});
				flashPreviewHolder.css({left: t1+'px', top: t2+'px'});
			}else if(mediaPreviewType == 'youtube_single' || mediaPreviewType == 'youtube_playlist'){
				if(html5Support){
					if(playlistType=='wall'){
						if(no_action_item && yt_overlay_blocker)yt_overlay_blocker.css({left: t1+'px', top: t2+'px'});
						if(current_wall_yt_blocker)current_wall_yt_blocker.css({left: t1+'px', top: t2+'px'});
						if(wallLayoutInited)youtubeIframePreview.css({left: t1+'px', top: t2+'px'});
					}else{
						if(yt_overlay_blocker)yt_overlay_blocker.css({left: t1+'px', top: t2+'px'});
						youtubeIframePreview.css({left: t1+'px', top: t2+'px'});
					}
				}else{
					if(no_action_item && yt_overlay_blocker)yt_overlay_blocker.css({left: t1+'px', top: t2+'px'});
					if(current_wall_yt_blocker)current_wall_yt_blocker.css({left: t1+'px', top: t2+'px'});
					flashPreviewHolder.css({left: t1+'px', top: t2+'px'});
				}
			}
		}
	}
	
	function overPlaylistItem(e){
		if(!_componentInited || _playlistTransitionOn) return false;
		
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		
		var currentTarget = $(e.currentTarget);
		
		var attr = currentTarget.attr('data-orig-type');
		if (useLivePreview && typeof attr !== 'undefined' && attr !== false) {
			 if(currentTarget.attr('data-orig-type') == 'youtube_single' && !autoMakePlaylistThumb) return false;
		}
		
		var id = parseInt(currentTarget.attr('data-id'),10);
		if(id == _playlistManager.getCounter() || id == currentPreviewID) return false;//active item
		
		currentPreviewID = id;//prevent double rollover
		pp_currentPreviewID = id;
		
		if(playlistType=='wall'){
			no_action_item= false;//reset
			if(currentTarget.data('no_action'))no_action_item= true;
		}
		//console.log('no_action_item = ', no_action_item);
		
		mediaPreviewType=currentTarget.attr('data-type');
		
		if(playlistType!='wall'){
			currentTarget.removeClass('playlistNonSelected').addClass('playlistSelected');
		}
		
		if(useLivePreview){
			
			activePlaylistID = id;
			activePlaylistThumb = $(thumbArr[id]);
			activePlaylistHit = $(thumbHitDivArr[id]);
			//hide thumb
			activePlaylistThumbImg = $(thumbImgArr[id]).stop().animate({'opacity': 0},  {duration: 500, easing: "easeOutSine"});
			//show preloader
			activePlaylistPreloader = $(thumbPreloaderArr[id]).css('display','block');
			//video div
			activePlaylistVideoDiv=$(thumbVideoDivArr[id]);
			
			//console.log(activePlaylistID);
			
			if(html5Support){
				if(mediaPreviewType == 'local'){
					var videoCode='';
					if(mp4Support){
						previewMediaPath = $(playlistArr[id]).attr('data-mp4Path').replace('/main/', previewPath);
						if(!isAndroid){
							videoCode += '<video class="preview_video_cont" width="'+thumbWidth+'" height="'+thumbHeight+'" preload="auto" >';
							videoCode += '<source src="'+previewMediaPath+'"  type="video/mp4" />';
							videoCode += '</video>';
						}else{
							videoCode += '<video class="preview_video_cont" width="'+thumbWidth+'" height="'+thumbHeight+'" preload="auto" >';
							videoCode += '<source src="'+previewMediaPath+'" />';
							videoCode += '</video>';
						}
					}else if(!useWebmVideoFormat){ 
						if(vorbisSupport){
							previewMediaPath = $(playlistArr[id]).attr('data-ogvPath').replace('/main/', previewPath);
							if(!isAndroid){
								videoCode += '<video class="preview_video_cont" width="'+thumbWidth+'" height="'+thumbHeight+'">';
								videoCode += '<source src="'+previewMediaPath+'"  type="video/ogg" />';
								videoCode += '</video>';
							}else{
								videoCode += '<video class="preview_video_cont" width="'+thumbWidth+'" height="'+thumbHeight+'" >';
								videoCode += '<source src="'+previewMediaPath+'" />';
								videoCode += '</video>';
							}
						}else if(webmSupport){
							previewMediaPath = $(playlistArr[id]).attr('data-webmPath').replace('/main/', previewPath);
							if(!isAndroid){
								videoCode += '<video class="preview_video_cont" width="'+thumbWidth+'" height="'+thumbHeight+'" >';
								videoCode += '<source src="'+previewMediaPath+'"  type="video/webm" />';
								videoCode += '</video>';
							}else{
								videoCode += '<video class="preview_video_cont" width="'+thumbWidth+'" height="'+thumbHeight+'" >';
								videoCode += '<source src="'+previewMediaPath+'" />';
								videoCode += '</video>';
							}
						} 
					}else if(useWebmVideoFormat){
						if(webmSupport){
							previewMediaPath = $(playlistArr[id]).attr('data-webmPath').replace('/main/', previewPath);
							if(!isAndroid){
								videoCode += '<video class="preview_video_cont" width="'+thumbWidth+'" height="'+thumbHeight+'" >';
								videoCode += '<source src="'+previewMediaPath+'"  type="video/webm" />';
								videoCode += '</video>';
							}else{
								videoCode += '<video class="preview_video_cont" width="'+thumbWidth+'" height="'+thumbHeight+'" >';
								videoCode += '<source src="'+previewMediaPath+'" />';
								videoCode += '</video>';
							}
						}else if(vorbisSupport){
							previewMediaPath = $(playlistArr[id]).attr('data-ogvPath').replace('/main/', previewPath);
							if(!isAndroid){
								videoCode += '<video class="preview_video_cont" width="'+thumbWidth+'" height="'+thumbHeight+'">';
								videoCode += '<source src="'+previewMediaPath+'"  type="video/ogg" />';
								videoCode += '</video>';
							}else{
								videoCode += '<video class="preview_video_cont" width="'+thumbWidth+'" height="'+thumbHeight+'" >';
								videoCode += '<source src="'+previewMediaPath+'" />';
								videoCode += '</video>';
							}
						}
					}else{
						alert('No supported video format found for playlist preview. Quitting.');	
						return false;
					}
					activePlaylistVideoDiv.html(videoCode);
					previewVideo = activePlaylistVideoDiv.find('.preview_video_cont');//get player reference
					previewVideoUp2Js = previewVideo[0];
					
					previewVideo.bind("ended", previewVideoEndHandler).bind("canplaythrough", previewCanplaythroughHandler)
					.bind("canplay", previewCanplayHandler);
				}else{//youtube
					ytMediaPath = $(playlistArr[id]).attr('data-mp4Path');
					//console.log('ytMediaPath = ',ytMediaPath);
					if(isIE){
						youtubeIframePreview.css({
							left:-10000+'px',
							width:600+'px',
							height:400+'px'
						});
					}
					if(playlistType=='wall'){
						if(current_wall_yt_blocker) current_wall_yt_blocker.css('left',-10000);
						if(yt_wall_pp_arr[id])current_wall_yt_blocker = yt_wall_pp_arr[id].data('yt_blocker');
						//add it immediatelly for wall layout so that prettyphoto is accessible before yt movie starts
						if(scrollCheckIntervalID) clearInterval(scrollCheckIntervalID);
						scrollCheckIntervalID = setInterval(adjustPreviewVideo, scrollCheckInterval);
					}
					_initYoutubePreview();
				}
			}else{
				if(playlistType=='wall'){
					if(current_wall_yt_blocker) current_wall_yt_blocker.css('left',-10000);
					if(yt_wall_pp_arr[id])current_wall_yt_blocker = yt_wall_pp_arr[id].data('yt_blocker');
					//add it immediatelly for wall layout so that prettyphoto is accessible before yt movie starts
					if(scrollCheckIntervalID) clearInterval(scrollCheckIntervalID);
					scrollCheckIntervalID = setInterval(adjustPreviewVideo, scrollCheckInterval);
				}
				previewMediaPath = $(playlistArr[id]).attr('data-mp4Path'); 
				previewMediaPath = previewMediaPath.replace('/main/', previewPath);//switch paths
				if(mediaPreviewType == 'local'){
					if(typeof getFlashMovie(flashPreview) !== "undefined")getFlashMovie(flashPreview).pb_play( previewMediaPath, 2, thumbWidth, thumbHeight, 'local');
				}else{
					if(typeof getFlashMovie(flashPreview) !== "undefined")getFlashMovie(flashPreview).pb_play( previewMediaPath, 2, thumbWidth, thumbHeight, 'youtube');
				}
			}
		}
		return false;
	}
	
	function previewVideoEndHandler(){
		//console.log('previewVideoEndHandler');
		try{
			previewVideoUp2Js.currentTime=0;//rewind
		}catch(er){}
		previewVideoUp2Js.play();//chrome fix
	}
	
	function previewCanplaythroughHandler(){
		initPreviewVideo();
	}
	
	function previewCanplayHandler(){
		initPreviewVideo();
	}
	
	function initPreviewVideo(){
		//console.log('initPreviewVideo');
		if(previewVideo){
			previewVideo.unbind("canplaythrough", previewCanplaythroughHandler).unbind("canplay", previewCanplayHandler);
		}
		//hide preloader
		if(activePlaylistPreloader) activePlaylistPreloader.css('display','none');
		//play video
		if(previewVideoUp2Js) previewVideoUp2Js.play();
	}
	
	function cleanPreviewVideo(){
		//console.log('cleanPreviewVideo');
		if(scrollCheckIntervalID) clearInterval(scrollCheckIntervalID);
		
		if(html5Support){
			if(mediaPreviewType == 'local'){
				if(previewVideo){
					previewVideo.unbind("ended", previewVideoEndHandler).unbind("canplaythrough", previewCanplaythroughHandler).unbind("canplay", previewCanplayHandler).find('source').attr('src','');
				}
				//clean video code
				if(activePlaylistVideoDiv) activePlaylistVideoDiv.html('');
			}else{//youtube
				if(youtubeIframePreview)youtubeIframePreview.css('left',-10000+'px');
				if(isIE){
					if(_youtubePreviewPlayer) _youtubePreviewPlayer.clean();	
				}else{
					if(_youtubePreviewPlayer) _youtubePreviewPlayer.stop();	
				}
				if(current_wall_yt_blocker) current_wall_yt_blocker.css('left',-10000);
				if(yt_overlay_blocker)yt_overlay_blocker.css('left',-10000);
				wallLayoutInited=false;
			}
		}else{
			if(typeof getFlashMovie(flashPreview) !== "undefined")getFlashMovie(flashPreview).pb_dispose();
			//flashPreviewHolder.css('display','none');
			flashPreviewHolder.css('left',-10000+'px');//fix for safari problem above (display: none)
			if(current_wall_yt_blocker) current_wall_yt_blocker.css('left',-10000);
			if(yt_overlay_blocker)yt_overlay_blocker.css('left',-10000);
			wallLayoutInited=false;
		}
		//hide preloader
		if(activePlaylistPreloader) activePlaylistPreloader.css('display','none');
		//show thumb
		if(activePlaylistThumbImg) activePlaylistThumbImg.stop().animate({'opacity': 1},  {duration: 500, easing: "easeOutSine"});
		
		if(isIE && ieBelow9){//rollout fix
			if(playlistType!='wall'){
				var k = _playlistManager.getCounter(), m = 0, pi;
				for(m;m<playlistLength;m++){
					if(m != k){
						pi = $(playlistArr[m]);
						if(pi){
							pi.removeClass('playlistSelected').addClass('playlistNonSelected');
						}
					}
				}
			}
		}
		currentPreviewID=-1;//reset
		//console.log('cleanPreviewVideo');
	}
	
	function outPlaylistItem(e){
		//console.log('outPlaylistItem 0');
		
		if(!_componentInited || _playlistTransitionOn) return false;
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		
		var currentTarget = $(e.currentTarget);
		var id = currentTarget.attr('data-id');
		if(id == _playlistManager.getCounter()) return false;//active item
		
		if(useLivePreview){
			//youtube and flash for ie<9 is a single movie which lies above playlist items, so we have to use hit test point to avoid preview restart when we rollover over actual movie again while still being over playlist item.
			
			if(mediaPreviewType == 'local'){
				if(html5Support){
					cleanPreviewVideo();
				}else{
					if(playlistType!='wall'){
						//hit test point preview movie
						if(activePlaylistHit){
							var t1 = parseInt(activePlaylistHit.offset().left,10) - parseInt(componentPlaylist.offset().left,10),
								t2 = parseInt(activePlaylistHit.offset().top,10)- parseInt(componentPlaylist.offset().top,10),
								d1 = e.pageX - parseInt(componentPlaylist.offset().left,10),
								d2 = e.pageY - parseInt(componentPlaylist.offset().top,10);
	
							if(d1 > t1 && d1 < t1 + boxWidth - boxMarginRight && d2 > t2 && d2 < t2 + boxHeight - boxMarginBottom){
								//console.log('isnt rollout, over flash preview');
								return false;
							}else{
								cleanPreviewVideo();
							}
						}else{
							cleanPreviewVideo();
						}
					}else{
						if(no_action_item){
							cleanPreviewVideo();
						}else{
							//hit test point preview movie
							if(activePlaylistHit){
								var t1 = parseInt(activePlaylistHit.offset().left,10) - parseInt(componentPlaylist.offset().left,10),
									t2 = parseInt(activePlaylistHit.offset().top,10)- parseInt(componentPlaylist.offset().top,10),
									d1 = e.pageX - parseInt(componentPlaylist.offset().left,10),
									d2 = e.pageY - parseInt(componentPlaylist.offset().top,10);
		
								if(d1 > t1 && d1 < t1 + boxWidth - boxMarginRight && d2 > t2 && d2 < t2 + boxHeight - boxMarginBottom){
									//console.log('isnt rollout, over flash preview');
									return false;
								}else{
									cleanPreviewVideo();
								}
							}else{
								cleanPreviewVideo();
							}
						}
					}
				} 
			} 
			else if(mediaPreviewType == 'youtube_single' || mediaPreviewType == 'youtube_playlist'){

				//hit test point preview movie
				if(activePlaylistHit && activePlaylistHit.offset()){
					var t1 = parseInt(activePlaylistHit.offset().left,10) - parseInt(componentPlaylist.offset().left,10),
						t2 = parseInt(activePlaylistHit.offset().top,10)- parseInt(componentPlaylist.offset().top,10),
						d1 = e.pageX - parseInt(componentPlaylist.offset().left,10),
						d2 = e.pageY - parseInt(componentPlaylist.offset().top,10);

					if(d1 > t1 && d1 < t1 + boxWidth - boxMarginRight && d2 > t2 && d2 < t2 + boxHeight - boxMarginBottom){
						
						//console.log(e.pageX, parseInt(componentPlaylist.offset().left,10) + playlistHolder.width());
						//console.log(e.pageY, parseInt(componentPlaylist.offset().top,10) + playlistHolder.height());
						
						if(playlistType!='wall'){
							//check playlist boundaries
							if(e.pageX <= parseInt(componentPlaylist.offset().left,10) ||
							   e.pageY <= parseInt(componentPlaylist.offset().top,10) ||
							   e.pageX >= parseInt(componentPlaylist.offset().left,10) + playlistHolder.width() ||
							   e.pageY >= parseInt(componentPlaylist.offset().top,10) + playlistHolder.height()){
								cleanPreviewVideo();
							}else{
								//console.log('isnt rollout, over yt preview');
								return false;
							}
						}else{
							//console.log('isnt rollout, over yt preview');
							return false;
						}
					}else{
						cleanPreviewVideo();
					}
				}else{
					cleanPreviewVideo();
				}
			}
		}
		
		if(playlistType!='wall'){
			currentTarget.removeClass('playlistSelected').addClass('playlistNonSelected');
		}
		currentPreviewID=-1;//reset
		//console.log('outPlaylistItem');
		return false;
	}
	
	//**************** END PREVIEW VIDEO
	
	function clickPlaylistItem(e){
		if(!_componentInited || _playlistTransitionOn) return false;
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		var currentTarget = $(e.currentTarget);
		var id = currentTarget.attr('data-id');
		currentPreviewID = id;//prevent double rollover
		//console.log('clickPlaylistItem');
		
		if(playlistType!='wall'){
		
			if(id == _playlistManager.getCounter()){//active item
				if(playlistType == 'list' && closePlaylistOnVideoSelect){
					togglePlaylist();
				}
				return false;
			} 
			
			if(useLivePreview) cleanPreviewVideo();
			
			_enableActiveItem();
			_playlistManager.processPlaylistRequest(id);
			
			if(playlistType == 'list' && closePlaylistOnVideoSelect){
				togglePlaylist();
			}
		}
		itemTriggered(id);
		
		return false;
	}
	
	function clickPlaylistItem2(){//called from flash preview click 
		//console.log('clickPlaylistItem2');
		if(!_componentInited || _playlistTransitionOn) return false;
		var id = activePlaylistID;
		
		if(playlistType!='wall'){
			
			if(id == _playlistManager.getCounter()){//active item
				if(playlistType == 'list' && closePlaylistOnVideoSelect){
					togglePlaylist();
				}
				return false;
			} 
			
			if(useLivePreview) cleanPreviewVideo();
			
			_enableActiveItem();
			_playlistManager.processPlaylistRequest(id);
			
		}
		itemTriggered(id);
	}
	
	function _enableActiveItem(){
		//console.log('_enableActiveItem');
		if(playlistType=='wall')return false;
		if(_playlistManager.getCounter()!=-1){
			var i = _playlistManager.getCounter();
			var _item = $(playlistArr[i]);
			if(_item)_item.removeClass('playlistSelected').addClass('playlistNonSelected');
			if(playlistType=='list'){
				var hitdiv = thumbHitDivArr[i];
				if(hitdiv) hitdiv.css('cursor', 'pointer');
			}
		}
	}
	
	function _disableActiveItem(){
		//console.log('_disableActiveItem');
		if(playlistType=='wall')return false;
		var i = _playlistManager.getCounter();
		var _item = $(playlistArr[i]);
		if(_item)_item.removeClass('playlistNonSelected').addClass('playlistSelected');
		if(playlistType=='list'){
			var hitdiv = thumbHitDivArr[i];
			if(hitdiv) hitdiv.css('cursor', 'default');
		}
	}
	
	function clickControls(e){
		if(!_componentInited || _playlistTransitionOn) return false;
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		
		var currentTarget = $(e.currentTarget);
		var c=currentTarget.attr('class');
		var img=currentTarget.find('img');
		
		if(c=='player_playControl'){
			togglePlayBack();
		}else if(c=='playlist_toggle'){
			if(playlistType=='list')togglePlaylist();
		}else if(c=='info_toggle'){
			toggleInfo();
		}else if(c=='player_fullscreen'){
			toggleFullscreen(true);
		}else if(c=='player_prev'){
			previousMedia();
		}else if(c=='player_next'){
			nextMedia();
		}
		return false;
	}
	
	function overControls(e){
		if(!_componentInited || _playlistTransitionOn) return false;
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		
		var currentTarget = $(e.currentTarget);
		var c=currentTarget.attr('class');
		var img=currentTarget.find('img');
		
		if(c=='player_playControl'){
			if(mediaPlaying){
				img.attr('src', ic_pause_on);
			}else{
				img.attr('src', ic_play_on);
			}
		}else if(c=='playlist_toggle'){
			img.attr('src', ic_playlist_on);
		}else if(c=='info_toggle'){
			img.attr('src', ic_info_on);
		}else if(c=='player_fullscreen'){
			if(componentSize== "normal"){
				img.attr('src', ic_fullscreen_enter_on);
			}else{
				img.attr('src', ic_fullscreen_exit_on);
			}
		}
		return false;
	}
	
	function outControls(e){
		if(!_componentInited || _playlistTransitionOn) return false;
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		
		var currentTarget = $(e.currentTarget);
		var c=currentTarget.attr('class');
		var img=currentTarget.find('img');
		
		if(c=='player_playControl'){
			if(mediaPlaying){
				img.attr('src', ic_pause);
			}else{
				img.attr('src', ic_play);
			}
		}else if(c=='playlist_toggle'){
			img.attr('src', ic_playlist);
		}else if(c=='info_toggle'){
			img.attr('src', ic_info);
		}else if(c=='player_fullscreen'){
			if(componentSize== "normal"){
				img.attr('src', ic_fullscreen_enter);
			}else{
				img.attr('src', ic_fullscreen_exit);
			}
		}
		return false;
	}
	
	//*******************
	
	function nextMedia(){
		if(!_componentInited) return;
		_enableActiveItem();
		_playlistManager.advanceHandler(1, true);
	}
	
	function previousMedia(){
		if(!_componentInited) return;
		_enableActiveItem();
		_playlistManager.advanceHandler(-1, true);
	}	
	
	function destroyMedia(){
		//console.log('destroyMedia');
		if(!_componentInited || !mediaType) return;
		if(mediaType)cleanMedia();
		_enableActiveItem();
		_playlistManager.reSetCounter();
	}
		
	function _findMedia(){
		//console.log('_findMedia');
		if(mediaType)cleanMedia();
		
		var data=$(playlistArr[_playlistManager.getCounter()]);
		mediaType = data.attr('data-type');
		ytMediaPath = data.attr('data-mp4Path');
		flashMediaPath= data.attr('data-mp4Path');
		//mediaWidth=parseInt(data.attr('data-width'),10);
		//mediaHeight=parseInt(data.attr('data-height'),10);
		
		if(mediaType == 'local'){
			if(autoPlay){
				if(html5Support){
					initVideo();
				}else{
					if(typeof getFlashMovie(flashMain) !== "undefined"){
						getFlashMovie(flashMain).pb_play(flashMediaPath, aspectRatio, componentWrapper.width(), componentWrapper.height(), 'local', true);
						videoInited=true;
					}
				}
			}else{
				loadPreview();
				showControls();
			}
		}else if(mediaType == 'youtube_single' || mediaType == 'youtube_playlist'){
			if(html5Support){
				_initYoutube();
			}else{
				if(typeof getFlashMovie(flashMain) !== "undefined"){
					getFlashMovie(flashMain).pb_play(ytMediaPath, aspectRatio, componentWrapper.width(), componentWrapper.height(), 'youtube', yt_autoPlay);
					if(autoPlay)videoInited=true;
				}
			}
		}
		if(playlistType!='wall' && !isMobile)itemTriggered(_playlistManager.getCounter());
	}
		
	function cleanMedia(){
		//console.log('cleanMedia');
		if(dataIntervalID) clearInterval(dataIntervalID);
		
		hideControls();
		hideInfo();
			
		if(mediaType && mediaType == 'local'){
			if(html5Support){
				if(videoUp2Js){
					videoUp2Js.pause();
					try{
						videoUp2Js.currentTime = 0;
					}catch(er){}
					videoUp2Js.src = '';
				}
				//video.find('source').attr('src','');
				if(video)video.unbind("ended", videoEndHandler).unbind("loadedmetadata", videoMetadata).unbind("waiting",waitingHandler).unbind("playing", playingHandler).unbind("play", playHandler).unbind("pause", pauseHandler);
				//video.unbind("canplaythrough", canplaythroughHandler).unbind("canplay", canplayHandler).unbind("volumechange", volumechangeHandler).unbind("timeupdate", dataUpdate);
				mediaHolder.css('display', 'none');
				if(!isMobile & html5Support){
					mediaHolder.html('');
					html5video_inited=false;	
				}
			}else{
				if(typeof getFlashMovie(flashMain) !== "undefined")getFlashMovie(flashMain).pb_dispose();
			}
		}else if(mediaType && mediaType == 'youtube_single' || mediaType && mediaType == 'youtube_playlist'){
			if(html5Support){
				if(_youtubePlayer) _youtubePlayer.stop();
				youtubeIframeMain.css('left', -10000+'px');
			}else{
				if(typeof getFlashMovie(flashMain) !== "undefined")getFlashMovie(flashMain).pb_dispose();
				yt_controls_intro=false;
			}
		}	
		
		if(bigPlay.length) toggleBigPlay('off');
		if(previewPoster){
			previewPoster.remove();
			previewPoster=null;
		} 
		mediaPreview.css('display', 'none');
		resetData();
		mediaPlaying=false;
		videoInited=false;//reset
		mediaWidth=mediaHeight=null;
	}
	
	function toggleBigPlay(dir) {
		if(dir=='off'){
			bigPlay.css('opacity', 0); 	
			if(isIE && ieBelow9)bigPlay.css('display', 'none'); 	
		}else{
			bigPlay.css('opacity', 1); 	
			bigPlay.css('display', 'block'); 
		}
	}
	
	//***************** YOUTUBE
	
	function _initYoutube() {
		//console.log('_initYoutube');
		if(!_youtubeInited){
			var data={'autoPlay': yt_autoPlay, 'defaultVolume': defaultVolume, 
			'mediaPath': ytMediaPath, 'youtubeHolder': youtubeIframeMain, 'youtubeChromeless': _youtubeChromeless, 
			'isMobile': isMobile, 'initialAutoplay': initialAutoplay, 'quality':useYoutubeHighestQuality};
			_youtubePlayer = $.youtubePlayer(data);
			$(_youtubePlayer).bind('ap_YoutubePlayer.YT_READY', function(){
				//console.log('ap_YoutubePlayer.YT_READY');
				resizeVideo();
			});
			$(_youtubePlayer).bind('ap_YoutubePlayer.START_PLAY', function(){
				//console.log('ap_YoutubePlayer.START_PLAY');
				videoInited=true;
				
				resizeVideo();
				checkInfo();
				showControls();
				if(dataIntervalID) clearInterval(dataIntervalID);
				dataIntervalID = setInterval(dataUpdate, dataInterval);	
				
				toggleBigPlay('on');
			});
			$(_youtubePlayer).bind('ap_YoutubePlayer.END_PLAY', function(){
				//console.log('ap_YoutubePlayer.END_PLAY');
				videoEndHandler();	
			});
			$(_youtubePlayer).bind('ap_YoutubePlayer.STATE_PLAYING', function(){
				//console.log('ap_YoutubePlayer.STATE_PLAYING');
				playHandler();
			});
			$(_youtubePlayer).bind('ap_YoutubePlayer.STATE_PAUSED', function(){
				//console.log('ap_YoutubePlayer.STATE_PAUSED');
				pauseHandler();
			});
			$(_youtubePlayer).bind('ap_YoutubePlayer.STATE_CUED', function(){//cue doesnt fire always
				//console.log('ap_YoutubePlayer.STATE_CUED');
				if(preloader)preloader.css('display','none');
			});
			_youtubeInited=true;
		}else{
			resizeVideo();
			_youtubePlayer.initVideo(ytMediaPath);
		}
		if(preloader)setTimeout(function(){preloader.css('display','none')},1000);
		showControls();
	}
	
	function _initYoutubePreview() {
	
		//ie9+ and html5 support fix, for other browser swe dont use api
		if(isIE){
	
			if(_youtubePreviewPlayer){
				$(_youtubePreviewPlayer).unbind('ap_YoutubePlayer.YT_READY').unbind('ap_YoutubePlayer.START_PLAY').unbind('ap_YoutubePlayer.END_PLAY');
				_youtubePreviewPlayer = null;
			}
				
			//if(!_youtubePreviewInited){
				var data={'autoPlay': true, 'defaultVolume': 0, 
				'mediaPath': ytMediaPath, 'youtubeHolder': youtubeIframePreview, 'youtubeChromeless': true, 
				'isMobile': isMobile, 'initialAutoplay': initialAutoplay, 'quality':'small', 'small_embed':true, 'isIE': isIE};
				_youtubePreviewPlayer = $.youtubePlayer(data);
				$(_youtubePreviewPlayer).bind('ap_YoutubePlayer.YT_READY', function(){
					//console.log('ap_YoutubePlayer.YT_READY_PREVIEW');
				});
				$(_youtubePreviewPlayer).bind('ap_YoutubePlayer.START_PLAY', function(){
					//console.log('ap_YoutubePlayer.START_PLAY_PREVIEW');
					//hide preloader
					if(activePlaylistPreloader) activePlaylistPreloader.css('display','none');
					if(currentPreviewID==-1){//if video call already requested but not yet started playing
						_youtubePreviewPlayer.stopPreview();//fix, youtube stop wont stop video if it hasnt started playing yet
						cleanPreviewVideo();
						return;
					}
					if(isIE){
						youtubeIframePreview.css({
							width:thumbWidth+'px',
							height:thumbHeight+'px',
							left:0+'px'
						});
					}
					if(playlistType!='wall'){//for wall layout we add timer immediatelly (in overPlaylistItem) after yt_overlay_blocker is created so click on prettyphoto is accessible before yt movie starts
						if(scrollCheckIntervalID) clearInterval(scrollCheckIntervalID);
						scrollCheckIntervalID = setInterval(adjustPreviewVideo, scrollCheckInterval);
					}else{
						wallLayoutInited=true;	
					}
					setTimeout(function(){youtubeIframePreview.css('opacity',1)},100);//safari fix
				});
				$(_youtubePreviewPlayer).bind('ap_YoutubePlayer.END_PLAY', function(){
					//console.log('ap_YoutubePlayer.END_PLAY_PREVIEW');
					if(currentPreviewID==-1){
						_youtubePreviewPlayer.stopPreview();//fix, youtube stop wont stop video if it hasnt started playing yet
						cleanPreviewVideo();
						return;
					}
					//rewind
					//_youtubePreviewPlayer.seek(0);
					_youtubePreviewPlayer.play();
				});
				_youtubePreviewInited=true;
			/*}else{
				_youtubePreviewPlayer.initVideo(ytMediaPath);
			}*/
		}else{
			
			if(!_youtubePreviewInited){
				var data={'autoPlay': true, 'defaultVolume': 0, 
				'mediaPath': ytMediaPath, 'youtubeHolder': youtubeIframePreview, 'youtubeChromeless': true, 
				'isMobile': isMobile, 'initialAutoplay': initialAutoplay, 'quality':'small', 'small_embed':true, 'isIE': isIE};
				_youtubePreviewPlayer = $.youtubePlayer(data);
				$(_youtubePreviewPlayer).bind('ap_YoutubePlayer.YT_READY', function(){
					//console.log('ap_YoutubePlayer.YT_READY_PREVIEW');
				});
				$(_youtubePreviewPlayer).bind('ap_YoutubePlayer.START_PLAY', function(){
					//console.log('ap_YoutubePlayer.START_PLAY_PREVIEW');
					//hide preloader
					if(activePlaylistPreloader) activePlaylistPreloader.css('display','none');
					if(currentPreviewID==-1){//if video call already requested but not yet started playing
						_youtubePreviewPlayer.stopPreview();//fix, youtube stop wont stop video if it hasnt started playing yet
						cleanPreviewVideo();
						return;
					}
					if(playlistType!='wall'){//for wall layout we add timer immediatelly (in overPlaylistItem) after yt_overlay_blocker is created so click on prettyphoto is accessible before yt movie starts
						if(scrollCheckIntervalID) clearInterval(scrollCheckIntervalID);
						scrollCheckIntervalID = setInterval(adjustPreviewVideo, scrollCheckInterval);
					}else{
						wallLayoutInited=true;	
					}
					setTimeout(function(){youtubeIframePreview.css('opacity',1)},100);//safari fix
				});
				$(_youtubePreviewPlayer).bind('ap_YoutubePlayer.END_PLAY', function(){
					//console.log('ap_YoutubePlayer.END_PLAY_PREVIEW');
					if(currentPreviewID==-1){
						_youtubePreviewPlayer.stopPreview();//fix, youtube stop wont stop video if it hasnt started playing yet
						cleanPreviewVideo();
						return;
					}
					//rewind
					//_youtubePreviewPlayer.seek(0);
					_youtubePreviewPlayer.play();
				});
				_youtubePreviewInited=true;
			}else{
				_youtubePreviewPlayer.initVideo(ytMediaPath);
			}
		}
	}
	
	//***************** LOCAL VIDEO
	
	function loadPreview(){
		//console.log('loadPreview');
		
		mediaPreview.css('display', 'block');
		if(preloader) preloader.css('display','block');

		var data=$(playlistArr[_playlistManager.getCounter()]);
		var path = data.attr('data-imagePath');
		var url = path+"?rand=" + (Math.random() * 99999999);
		//console.log(url);
		
		previewPoster = $(new Image()).css({
		   position: 'absolute',
		   display: 'block',
		   opacity: 0
		}).appendTo(mediaPreview)
		.load(function() {
			if(preloader) preloader.css('display','none');
			previewOrigW=this.width;
			previewOrigH=this.height;
			mediaWidth=this.width;
			mediaHeight=this.height;
			resizePreview(previewPoster);
			previewPoster.animate({'opacity': 1},  {duration: 500, easing: "easeOutSine"});
			if(bigPlay.length) toggleBigPlay('on');
		}).error(function(e) {
			//console.log("error " + e);
		}).attr('src', url);
	}
	
	function initVideo(){
		//console.log('initVideo');
		var videoCode='';
		var data=$(playlistArr[_playlistManager.getCounter()]);
		
		if(mp4Support){
			mediaPath=data.attr('data-mp4Path');
		}else if(vorbisSupport){
			mediaPath=data.attr('data-ogvPath');
		}else if(webmSupport){
			mediaPath=data.attr('data-webmPath');
		} 

		if(!html5video_inited){//we need one video source if we want to auto-advance on ios6 (with no click)
		
			if(mp4Support){
				if(!isAndroid){
					videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'">';
					videoCode += '<source src="'+mediaPath+'"  type="video/mp4" />';
					videoCode += '</video>';
				}else{
					videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
					videoCode += '<source src="'+mediaPath+'" />';
					videoCode += '</video>';
				}
			}else if(!useWebmVideoFormat){ 
				if(vorbisSupport){
					if(!isAndroid){
						videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'">';
						videoCode += '<source src="'+mediaPath+'"  type="video/ogg" />';
						videoCode += '</video>';
					}else{
						videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
						videoCode += '<source src="'+mediaPath+'" />';
						videoCode += '</video>';
					}
				}else if(webmSupport){
					if(!isAndroid){
						videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
						videoCode += '<source src="'+mediaPath+'"  type="video/webm" />';
						videoCode += '</video>';
					}else{
						videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
						videoCode += '<source src="'+mediaPath+'" />';
						videoCode += '</video>';
					}
				} 
			}else if(useWebmVideoFormat){
				if(webmSupport){
					if(!isAndroid){
						videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
						videoCode += '<source src="'+mediaPath+'"  type="video/webm" />';
						videoCode += '</video>';
					}else{
						videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
						videoCode += '<source src="'+mediaPath+'" />';
						videoCode += '</video>';
					}
				}else if(vorbisSupport){
					if(!isAndroid){
						videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'">';
						videoCode += '<source src="'+mediaPath+'"  type="video/ogg" />';
						videoCode += '</video>';
					}else{
						videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
						videoCode += '<source src="'+mediaPath+'" />';
						videoCode += '</video>';
					}
				}
			}else{
				alert('No supported video format found. Quitting.');	
				return false;
			}
			mediaHolder.css('display','block').html(videoCode);
			
			video = mediaHolder.find('.video_cont');//get player reference
			videoUp2Js = video[0];
			//console.log(video, videoUp2Js);
			
		}else{
			
			mediaHolder.css('display','block');
			videoUp2Js.src = mediaPath;
			videoUp2Js.load();
			
		}

		videoUp2Js.volume = defaultVolume;
		video.css('position','absolute').bind("ended", videoEndHandler).bind("loadedmetadata", videoMetadata).bind("waiting",waitingHandler).bind("playing", playingHandler).bind("play", playHandler).bind("pause", pauseHandler);
		//video.bind("canplaythrough", canplaythroughHandler).bind("canplay", canplayHandler).bind("volumechange", volumechangeHandler).bind("timeupdate", dataUpdate);
			
		if(isIOS && !html5video_inited){
			videoUp2Js.src = mediaPath;
			videoUp2Js.load();
		}
		else if(isAndroid && !html5video_inited){
			videoUp2Js.play();
			
			if(bigPlay.length) toggleBigPlay('off');
			if(previewPoster){
				previewPoster.stop().animate({ 'opacity':0},  {duration: 500, easing: 'easeOutSine', complete:function(){
					previewPoster.remove();
					previewPoster=null;
				}});
			}
			videoInited=true;
			showControls();
		}
		
		html5video_inited=true;
	}
	
	function waitingHandler(e){//show preloader
		//console.log('waitingHandler');
		if(preloader) preloader.css('display','block');
	}
	
	function playingHandler(e){//hide preloader
		//console.log('playingHandler');
		if(preloader) preloader.css('display','none');
	}
	
	function playHandler(e){
		//console.log('playHandler');
		player_playControl.find('img').attr('src', ic_pause);	
		if(bigPlay.length) toggleBigPlay('off');
		mediaPlaying=true;
	}
	
	function pauseHandler(e){
		//console.log('pauseHandler');
		player_playControl.find('img').attr('src', ic_play);
		if(bigPlay.length) toggleBigPlay('on');
		mediaPlaying=false;
	}
	
	function videoMetadata(e){
		//console.log("videoMetadata: ", videoUp2Js.duration, videoUp2Js.videoWidth, videoUp2Js.videoHeight);
		if(videoUp2Js.videoWidth)mediaWidth=videoUp2Js.videoWidth;
		if(videoUp2Js.videoHeight)mediaHeight=videoUp2Js.videoHeight;
		resizeVideo();
		if(dataIntervalID) clearInterval(dataIntervalID);
		dataIntervalID = setInterval(dataUpdate, dataInterval);
		
		videoUp2Js.play();
		videoInited=true;
		
		checkInfo();
		//if(initialAutoplay) autoPlay=true;
		autoPlay=true;
		showControls();
	}
	
	function togglePlayBack(){
		//console.log('togglePlayBack');
		if(_playlistManager.getCounter() == -1) return false;
		if(mediaType == 'local'){
			 if(!videoInited && !autoPlay){
				if(previewPoster) {
					previewPoster.stop().animate({ 'opacity':0},  {duration: 500, easing: 'easeOutSine', complete:function(){
						previewPoster.remove();
						previewPoster=null;
					}});
				}
				if(html5Support){
					initVideo();
				}else{
					if(typeof getFlashMovie(flashMain) !== "undefined")getFlashMovie(flashMain).pb_play(flashMediaPath, aspectRatio, componentWrapper.width(), componentWrapper.height(), 'local', true);
				}
			 }else{
				if(html5Support){
				    if (videoUp2Js.paused) {
					    videoUp2Js.play();
				    } else {
					    videoUp2Js.pause();
				    }
				}else{
					if(typeof getFlashMovie(flashMain) !== "undefined")getFlashMovie(flashMain).pb_togglePlayback();
				}
			 }
		 }else if(mediaType == 'youtube_single' || mediaType == 'youtube_playlist'){
			  if(html5Support){
				  if(_youtubePlayer){
					  _youtubePlayer.togglePlayback();
				  } 
				  /*if(!isOpera){
					  if(_youtubePlayer){
						  _youtubePlayer.togglePlayback();
					  } 
				  }else{//opera fix
					if(mediaPlaying){
						_youtubePlayer.pause();
						pauseHandler();
					}else{
						_youtubePlayer.play();
						playHandler();
					}  
				  }*/
			  }else{
				  if(typeof getFlashMovie(flashMain) !== "undefined")getFlashMovie(flashMain).pb_togglePlayback();	
				  videoInited=true;
			  }
	   	 }
		 videoInited=true;
		 return false;
	}
	
	function dataUpdate(){
		if(mediaType == 'local'){
			if(html5Support){
				player_mediaTime.find('p').html(formatCurrentTime(videoUp2Js.currentTime)+formatDuration(videoUp2Js.duration));
				if(!seekBarDown){
					progress_level.width((videoUp2Js.currentTime / videoUp2Js.duration) * seekBarSize);
					try{
						var buffered = Math.floor(videoUp2Js.buffered.end(0));
					}catch(error){}
					var percent = buffered / Math.floor(videoUp2Js.duration);
					//console.log(buffered);
					if(!isNaN(percent)){
						load_level.width(percent * seekBarSize);	
					}
				}
			}
		}else if(mediaType == 'youtube_single' || mediaType == 'youtube_playlist'){
			if(html5Support){
				player_mediaTime.find('p').html(formatCurrentTime(_youtubePlayer.getCurrentTime())+formatDuration(_youtubePlayer.getDuration()));
				if(_youtubePlayer && !seekBarDown){
					progress_level.width((_youtubePlayer.getCurrentTime() / _youtubePlayer.getDuration()) * seekBarSize);
					percent = _youtubePlayer.getVideoBytesLoaded() / _youtubePlayer.getVideoBytesTotal();
					load_level.width(percent * seekBarSize);
				}
			}
		}	
	};
	
	function videoEndHandler(){//only for html5 support
		//console.log('videoEndHandler');
		if(autoAdvanceToNextVideo){
			nextMedia();
		}else{
			if(mediaType == 'local'){
				try{
					videoUp2Js.currentTime=0;
				}catch(er){}
				if(videoUp2Js.paused)videoUp2Js.play();
				if(!autoPlay){
					videoUp2Js.pause();
				}
			}else if(mediaType == 'youtube_single' || mediaType == 'youtube_playlist'){
				//_youtubePlayer.seek(0);
				if(autoPlay){
					_youtubePlayer.play();
				}else{
					if(bigPlay.length) toggleBigPlay('off');//hide play btn for yt (it gets called from pause handles yt which fires on end as well) because it already has its own btn on beginning
				}
			}
		}
	}
	
	//********** flash

	this.flashPreviewVideoStart2 = function(){
		//console.log('flashPreviewVideoStart2');
		//hide preloader
		if(activePlaylistPreloader) activePlaylistPreloader.css('display','none');
	}
	this.flashPreviewVideoStart = function(){
		//console.log('flashPreviewVideoStart');
		if(scrollCheckIntervalID) clearInterval(scrollCheckIntervalID);
		scrollCheckIntervalID = setInterval(adjustPreviewVideo, scrollCheckInterval);
	}
	this.flashVideoPause = function(){
		pauseHandler();
	}
	this.flashVideoResume = function(){
		playHandler();
	}
	this.flashVideoEnd = function(){
		nextMedia();	
	}
	this.flashVideoStart = function(){
		videoInited=true;
		playHandler();
		showControls();
		checkInfo();
	}
	this.dataUpdateFlash = function(bl,bt,t,d){
		load_level.width((bl/bt) * seekBarSize);	
		progress_level.width((t/d) * seekBarSize);
		player_mediaTime.html(formatCurrentTime(t)+formatDuration(d));
	}

	function checkFlashReady(){
		//console.log('checkFlashReady');
		if(getFlashMovie(flashMain).setData != undefined){
			if(flashReadyIntervalID) clearInterval(flashReadyIntervalID);
			
			getFlashMovie(flashMain).setData(settings);//pass data to flash
			
			if(useLivePreview && typeof getFlashMovie(flashPreview) !== "undefined"){
				$(flashPreview).css('display','block');
				flashReadyIntervalID = setInterval(checkFlashReady2, flashReadyInterval);
			}else{
				checkPlaylistProcess();
			}
		}
	}
	 
	function checkFlashReady2(){
		//console.log('checkFlashReady2');
		if(getFlashMovie(flashPreview).setData != undefined){
			if(flashReadyIntervalID) clearInterval(flashReadyIntervalID);
			getFlashMovie(flashPreview).setData(settings);//pass data to flash
			flashPreviewHolder.css({
				left:-10000+'px',
				width: thumbWidth+'px',
				height: thumbHeight+'px'
			});
			checkPlaylistProcess();
		}
	}
	
	function getFlashMovie(name) {
		if(name.charAt(0)=='#')name = name.substr(1);//remove'#'
		return (navigator.appName.indexOf("Microsoft") != -1) ? window[name] : document[name];
	}	
	
	//***************** description
	
	function checkInfo(){
		if(componentWrapper.find('.infoHolder').length==0) return;
		//console.log('checkInfo');
		var i = _playlistManager.getCounter();
		if(descriptionArr[i] != undefined && !isEmpty(descriptionArr[i])){
			var infoData = descriptionArr[i];
			//console.log(infoData);
			info_inner.html(infoData);
			
			info_toggle.css({opacity: 0, display: 'block'}).stop().animate({ 'opacity': 1},  {duration: 500, easing: 'easeOutSine'});
			if(autoOpenDescription){
				toggleInfo();
			}
		}
	}
	
	function hideInfo(){
		if(componentWrapper.find('.infoHolder').length==0) return;
		//console.log('hideInfo');
		infoHolder.css('display','none');
		info_toggle.stop().animate({ 'opacity': 0},  {duration: 500, easing: 'easeOutSine', complete: function(){
			info_toggle.css('display','none');
		}});
		infoOpened=false;
	}

	function toggleInfo(){
		if(componentWrapper.find('.infoHolder').length==0) return;
		//console.log('toggleInfo');
		if(!infoOpened){
			infoHolder.css({opacity:0, display:'block'});//show it for jscrollpane!
			
			if(!info_scrollPaneApi){
				info_scrollPaneApi = infoHolder.jScrollPane().data().jsp;
				infoHolder.bind('jsp-initialised',function(event, isScrollable){
					//console.log('Handle jsp-initialised', ' isScrollable=', isScrollable);
				});
				infoHolder.jScrollPane({
					verticalDragMinHeight: 50,
					verticalDragMaxHeight: 70
				});
			}else{
				info_scrollPaneApi.reinitialise();
				info_scrollPaneApi.scrollToY(0);
			}
			
			infoHolder.stop().animate({ 'opacity': 1},  {duration: 500, easing: 'easeOutSine'});
			infoOpened = true;
		}else{
			infoHolder.stop().animate({ 'opacity': 0},  {duration: 500, easing: 'easeOutSine', complete: function(){
				infoHolder.css('display','none');
			}});
			infoOpened=false;
		}
	}
	
	function resizeInfo(){
		if(info_scrollPaneApi){
			info_scrollPaneApi.reinitialise();
			info_scrollPaneApi.scrollToY(0);
		}
	}
	
	//***************
	
	function overComponent(e) {
		if(!_componentInited || _playlistTransitionOn) return false;
		//console.log('overComponent');
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		showControls();
		return false;
	}
	
	function outComponent(e) {
		if(!_componentInited || _playlistTransitionOn) return false;
		//console.log('outComponent');
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		if(autoHideControls && componentSize!= "fullscreen")hideControls();
		if(useLivePreview){
			if(_youtubePreviewPlayer)_youtubePreviewPlayer.stopPreview();//fix, youtube stop wont stop video if it hasnt started playing yet
			cleanPreviewVideo();
			if(playlistType=='list'){
				if(pp_currentPreviewID!=-1 && pp_currentPreviewID != _playlistManager.getCounter() && $(playlistArr[pp_currentPreviewID])){
					$(playlistArr[pp_currentPreviewID]).removeClass('playlistSelected').addClass('playlistNonSelected');
				}	
			}
		}
		return false;
	}
	
	function outPlaylist(e) {
		if(!_componentInited || _playlistTransitionOn) return false;
		//console.log('outPlaylist');
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		if(useLivePreview){
			if(_youtubePreviewPlayer)_youtubePreviewPlayer.stopPreview();//fix, youtube stop wont stop video if it hasnt started playing yet
			cleanPreviewVideo();
			if(playlistType=='list'){	
				if(pp_currentPreviewID!=-1 && pp_currentPreviewID != _playlistManager.getCounter() && $(playlistArr[pp_currentPreviewID])){
					$(playlistArr[pp_currentPreviewID]).removeClass('playlistSelected').addClass('playlistNonSelected');
				}	
			}
		}
		return false;
	}
	
	function showControls(){
		if(playlistType=='wall')return false;
		//console.log('showControls');
		player_addon.css('display','block');
		if(!videoInited) return false;
		playerControls.css('display','block');
		resizeControls();
	}
	
	function hideControls(){
		//console.log('hideControls');
		if(playlistType=='wall')return false;
		player_addon.css('display','none');
		playerControls.css('display','none');
	}
	
	//************* RESIZE
	
	if(playlistType!='wall'){
		_window.resize(function() {
			 if(!_componentInited || _playlistTransitionOn) return false;
			 if(windowResizeIntervalID) clearTimeout(windowResizeIntervalID);
			 windowResizeIntervalID = setTimeout(_doneResizing, windowResizeInterval);
		});
	}
	
	function _doneResizing(){
		//console.log('_doneResizing');
		//onsole.log(componentWrapper.width(), componentWrapper.height());
		//console.log(mainWrapper.width(), mainWrapper.height());
		//console.log(innerWrapper.width(), innerWrapper.height());
		
		checkPlaylist();
		
		if(componentSize== "fullscreen"){
			resizeComponent();	
		}else{
			if(mediaType == 'local'){
				if(!videoInited){
					resizePreview(previewPoster);
				}else{
					if(html5Support)resizeVideo();
				}
			}else if(mediaType == 'youtube_single' || mediaType == 'youtube_playlist'){
				resizeVideo();
			}
		}
		resizeControls();
		if(infoOpened)resizeInfo();
		
	}
	
	function checkPlaylist(){
		if(!playlistHidden){
		
			if(playlistType=='list'){
				
				var w = mainWrapper.width() != 0 ? mainWrapper.width() : getDocumentWidth(), h = mainWrapper.height() != 0 ? mainWrapper.height() : getDocumentHeight(), wp = playerHolder.width(), wpl = playlistHolder.width();
				
				//console.log(w,h);
				
				if(playlistOrientation == 'vertical'){
					
					if(componentSize!= "fullscreen"){
						if(!isiPhoneIpod){ 
							if(w < wp + wpl){
								//console.log(1);
								playlistHolder.css({
									position:'absolute',
									left:wp - wpl+'px'
								});
							}else{
								//console.log(2);
								playlistHolder.css({
									position:'absolute',
									left:wp+'px'
								});
							}
						}else{//iphone, ipod fix!! //let playlist fall below video area in this case! important!!
							playlistHolder.css({
								position:'relative',
								left:0+'px',
								height:250+'px',
								'float':'right',
								clear:'both'
							});
						}
					}else{
						//console.log(3);
						playlistHolder.css({
							position:'fixed',
							left:w - wpl+'px'
						});
	
					}
				}
				
				if(playlistOrientation == 'horizontal'){
					if(componentSize== "fullscreen"){
						playlistHolder.css('width',w+'px');
					}else{
						playlistHolder.css('width',100+'%');
					}
				}
				
				_thumbInnerContainerSize=0;
				var i = 0, div;
				for(i;i<playlistLength;i++){
					div = $(playlistArr[i]);
					if(playlistOrientation == 'horizontal'){
						_thumbInnerContainerSize+=div.outerWidth(true);
					}else{
						_thumbInnerContainerSize+=div.outerHeight(true);
					}
				}
				
				if(scrollType == 'buttons'){
					if(playlistOrientation == 'horizontal'){
						thumbInnerContainer.css('left', 0+'px');
						playlist_inner.width(_thumbInnerContainerSize);
					}else{
						thumbInnerContainer.css('top', 0+'px');
					}
					_checkThumbPosition();
				}else if(scrollType == 'scroll'){
					if(playlistOrientation == 'horizontal'){
						
						lastPlaylist.width(_thumbInnerContainerSize);
					}
					checkScroll();
				}
		
			}
		
		}
	}
	
	function resizeComponent(){
		//console.log('resizeComponent');

		if(componentSize== "fullscreen"){
			_body.css('overflow', 'hidden');
			
			if(!fullscreenPossible){
				if(_iframe.length){
					//console.log(_iframe);
					_iframe.removeClass('ap_vplp_iframe').addClass('ap_vplp_iframe_fs');
				}
			}
			if(playlistType=='list'){
				playerHolder.removeClass('playerHolder').addClass('playerHolder_fs');
			}
			componentWrapper.find('.player_adv').removeClass('player_adv').addClass('player_adv_fs');
		}else{
			_body.css('overflow', bodyOverflowOrig);//restore original overflow
			
			if(!fullscreenPossible){
				if(_iframe.length){
					_iframe.removeClass('ap_vplp_iframe_fs').addClass('ap_vplp_iframe');
				}
			}
			if(playlistType=='list'){
				playerHolder.removeClass('playerHolder_fs').addClass('playerHolder');
			}
			componentWrapper.find('.player_adv_fs').removeClass('player_adv_fs').addClass('player_adv');
		}
		
		if(previewPoster)resizePreview(previewPoster);
		if(html5Support)resizeVideo();
		if(infoOpened)resizeInfo();
		resizeControls();
		showControls();
		
		if(!fullscreenPossible){//for ie currently (position playlist, _doneResizing doesnt get called since no fullscreen event)
			checkPlaylist();
		}
	}
	
	function resizeControls(){
		seekBarElementsSize = getSeekBarElementsSize();
		playerControlsSize = playerControls.outerWidth(true);
		seekBarSize = playerControlsSize - seekBarElementsSize - 30;
		//console.log(seekBarElementsSize, ',', playerControlsSize, ',', seekBarSize);
		
		player_seekbar.width(seekBarSize+20);
		progress_bg.width(seekBarSize);
	}
	
	function getSeekBarElementsSize(){ //get rest player controls elements size together (minus seekbar)
		var a = player_mediaTime.css('display') == 'block' ? player_mediaTime.outerWidth(true) : 0;
			b = player_volume.css('display') == 'block' ? player_volume.outerWidth(true) : 0; 
			c = volume_seekbar.css('display') == 'block' ? volume_seekbar.outerWidth(true) : 0; 
			d = player_fullscreen.css('display') == 'block' ? player_fullscreen.outerWidth(true) : 0;
			//console.log(a,b,c,d);
			if(a == 0) a = 5;
		return player_playControl.outerWidth(true) + a + b + c + d;
	}
	
	function resizePreview(img) {
		if(!img) return false;
		//console.log('resizePreview');
		var o, x, y, w = getComponentSize('w') != 0 ? getComponentSize('w') : getDocumentWidth(), h = getComponentSize('h') != 0 ? getComponentSize('h') : getDocumentHeight();
		
		if(aspectRatio == 0) {//normal media dimensions
			o=getMediaSize();
		}else if(aspectRatio == 1) {//fitscreen
			o = retrieveObjectRatio(true, img,previewOrigW,previewOrigH);
		}else if(aspectRatio == 2) {//fullscreen
			o = retrieveObjectRatio(false, img,previewOrigW,previewOrigH);
		}
		x = parseInt(((w - o.width) / 2),10);
		y = parseInt(((h - o.height) / 2),10);
		/*
		console.log(componentWrapper.width(),', ',componentWrapper.height());
		console.log(getDocumentWidth(),', ',getDocumentHeight());
		console.log(w,', ',h);
		console.log(previewOrigW,', ', previewOrigH);
		console.log(o.width,', ', o.height,', ',w,', ',h);
		*/
		img.css({
			width: o.width+ 'px',
			height: o.height+ 'px',
			left:x+'px',
			top:y+'px'
		});
	}
	
	function resizeVideo() {
		if(_playlistManager.getCounter()==-1) return false;
		//console.log('resizeVideo');
		var o, x, y, w = getComponentSize('w') != 0 ? getComponentSize('w') : getDocumentWidth(), h = getComponentSize('h') != 0 ? getComponentSize('h') : getDocumentHeight();
		
		if(aspectRatio == 0) {//normal media dimensions
			o=getMediaSize();
		}else if(aspectRatio == 1) {//fitscreen
			o = retrieveObjectRatio(true);
		}else if(aspectRatio == 2) {//fullscreen
			o = retrieveObjectRatio(false);
		}
		x = parseInt(((w - o.width) / 2),10);
		y = parseInt(((h - o.height) / 2),10);
		//console.log(o.width, o.height, w,h);
		if(mediaType == 'local'){
			if(video){
				video.css({
					width: o.width+ 'px',
					height: o.height+ 'px',
					left:x+'px',
					top:y+'px'
				});
			}
		}else if(mediaType == 'youtube_single' || mediaType == 'youtube_playlist'){
			if(youtubeIframeMain){
				
				if(aspectRatio == 0) {
				
					if(isIE && !ieBelow9){//hide outline for youtube iframe
						youtubeIframeMain.css({
							left: x+'px', 
							top: y+'px', 
							width: o.width+2+'px',
							height: o.height+2+'px'
						});
					}else{
						youtubeIframeMain.css({
							width:o.width+'px', 
							height:o.height+'px', 
							left:x+'px', 
							top:y+'px'
						});
					}
				
				}else if(aspectRatio == 1 || aspectRatio == 2) {//fitscreen,fullscreen
				
					if(isIE && !ieBelow9){//hide outline for youtube iframe
						youtubeIframeMain.css({
							left: -1+'px', 
							top: -1+'px', 
							width: w+2+'px',
							height: h+2+'px'
						});
					}else{
						youtubeIframeMain.css({
							width: o.width+ 'px',
							height: o.height+ 'px',
							left:x+'px',
							top:y+'px'
						});
					}
				}
			}
		}
	}
	
	 function retrieveObjectRatio( _fitScreen, obj, cw,ch) {
		//console.log('retrieveObjectRatio'); 
		var _paddingX=0,_paddingY=0;
	 
		var w = getComponentSize('w') != 0 ? getComponentSize('w') : getDocumentWidth(), h = getComponentSize('h') != 0 ? getComponentSize('h') : getDocumentHeight();
		
		var targetWidth, targetHeight, val={};
	 	if(!obj){
			var obj = getMediaSize();
			targetWidth = obj.width;
			targetHeight = obj.height;
		}else{
			if(typeof(cw) !== "undefined" && typeof(ch) !== "undefined"){
				targetWidth = cw;
				targetHeight = ch;
			}else{
				targetWidth = obj.width();
				targetHeight = obj.height();
			}
		}
		
		//console.log(w,', ',h);
		//console.log(targetWidth,', ',targetHeight);
		
		var destinationRatio = (w - _paddingX) / (h - _paddingY);
		var targetRatio = targetWidth / targetHeight;

		if (targetRatio < destinationRatio) {
			if (!_fitScreen) {//fullscreen
				val.height = ((w - _paddingX) /targetWidth) * targetHeight;
				val.width = (w - _paddingX);
			} else {//fitscreen
				val.width = ((h - _paddingY) / targetHeight) *targetWidth;
				val.height = (h - _paddingY);
			}
		} else if (targetRatio > destinationRatio) {
			if (_fitScreen) {//fitscreen
				val.height = ((w - _paddingX) /targetWidth) * targetHeight;
				val.width = (w - _paddingX);
			} else {//fullscreen
				val.width = ((h - _paddingY) / targetHeight) *targetWidth;
				val.height = (h - _paddingY);
			}
		} else {//fitscreen & fullscreen
			val.width = (w - _paddingX);
			val.height = (h - _paddingY);
		}
		return val;
	}
	
	function getMediaSize() {
		//console.log('getMediaSize');
		var o={};
		//console.log(videoUp2Js.videoWidth, mediaWidth, videoUp2Js.videoHeight, mediaHeight);
		if(mediaType=='local'){
			if(!mediaWidth || isNaN(mediaWidth) || !mediaHeight || isNaN(mediaHeight)){
				if(videoUp2Js){
					o.width = videoUp2Js.videoWidth;
					o.height = videoUp2Js.videoHeight;
				}else{
					o.width = 640;//default values (16:9)
					o.height = 360;
				}
			}else{
				o.width=mediaWidth;
				o.height=mediaHeight;	
			}
		}else if(mediaType == 'youtube_single' || mediaType == 'youtube_playlist'){
			if(!mediaWidth || isNaN(mediaWidth) || !mediaHeight || isNaN(mediaHeight)){
				o.width = 640;//default youtube values (16:9)
				o.height = 360;
			}else{
				o.width=mediaWidth;
				o.height=mediaHeight;	
			}
		}
		return o;
	}
	
	function getComponentSize(type) {
		if(type == "w"){//width
			return componentSize == "normal" ? componentWrapper.width() : getDocumentWidth();
		}else{//height
			return componentSize == "normal" ? componentWrapper.height() : getDocumentHeight();
		}
	}
	
	function getDocumentWidth(){
		return Math.max(
			//_doc.width(),
			$(window).width(),
			/* For opera: */
			document.documentElement.clientWidth
		);
	};	
	
	function getDocumentHeight(){
		return Math.max(
			$(window).height(),
			/* For opera: */
			document.documentElement.clientHeight
		);
	};
	
	//**************** FULLSCREEN
	
	function setFullscreenIcon(){
		 if ((document.fullScreenElement && document.fullScreenElement !== null) ||   
			  (!document.mozFullScreen && !document.webkitIsFullScreen)) { 
			    componentWrapper.find('.player_fullscreen').find('img').attr('src', ic_fullscreen_enter); 
		  }else{
			   componentWrapper.find('.player_fullscreen').find('img').attr('src', ic_fullscreen_exit); 
		  }
	}
	
	function fullScreenStatus(){
		return document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
	}
	
	if(playlistType!='wall'){
		if(fullscreenPossible){
			
			/*document.addEventListener("fullscreenchange", function () {}, false);
			document.addEventListener("mozfullscreenchange", function () {}, false);
			document.addEventListener("webkitfullscreenchange", function () {}, false);*/
			
			_doc.on("fullscreenchange mozfullscreenchange webkitfullscreenchange", function(){
				//console.log('fullScreenStatus()');
				setFullscreenIcon();
				if(componentSize== "fullscreen" && fullscreenCount>0){
					//console.log('fullscreenchange');
					componentSize="normal";
					resizeComponent();	
				}
				fullscreenCount=1;//firefox fix
			});
		}
	}
	
	function toggleFullscreen(btnInitiated){
		fullscreenCount=0;
		
		if(componentSize== "normal"){
			componentSize= "fullscreen";
			if(!fullscreenPossible)componentWrapper.find('.player_fullscreen').find('img').attr('src', ic_fullscreen_exit); //manual fs icon change in 'full window' mode
		}else{
			componentSize="normal";
			if(!fullscreenPossible)componentWrapper.find('.player_fullscreen').find('img').attr('src', ic_fullscreen_enter);
		}
			
		//http://stackoverflow.com/questions/8427413/webkitrequestfullscreen-fails-when-passing-element-allow-keyboard-input-in-safar
		//https://github.com/martinaglv/jQuery-FullScreen/blob/master/fullscreen/jquery.fullscreen.js#L82
					
		if(fullscreenPossible || html5Support){
		  
			var elem = document.documentElement;
			if (elem.requestFullscreen) {
				//console.log("using W3C Fullscreen API");
				if (document.fullscreenElement) {
					document.exitFullscreen();
				} else {
					elem.requestFullscreen();
				}
			} else if (elem.webkitRequestFullScreen) {
				//console.log("using WebKit FullScreen  API");
				if (document.webkitIsFullScreen) {
					document.webkitCancelFullScreen();
				} else {
					elem.webkitRequestFullScreen();
				}
			} else if (elem.mozRequestFullScreen) {
				//console.log("using Mozilla FullScreen  API");
				if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreenElement) {
					document.mozCancelFullScreen();
				} else {
					elem.mozRequestFullScreen();
				}
			} else {
				//console.log("no fullscreen API");
			}
		}
		
		if(!fullscreenPossible) {
			resizeComponent();	
		}else if(componentSize=="normal" && btnInitiated){
			resizeComponent();		
		}
	}
	
	function checkFullScreenSupport() {
	    var support=false;
	    if (document.documentElement.requestFullscreen) {
		  support=true;
		} else if (document.documentElement.mozRequestFullScreen) {
		   support=true;
		} else if (document.documentElement.webkitRequestFullScreen) {
		   support=true;
		}
		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) { 
			if (document.documentElement.requestFullscreen) {
				support=true;
			} else if (document.documentElement.mozRequestFullScreen) {
				support=true;
			} else if (document.documentElement.webkitRequestFullscreen) {
				support=true;
			}
		}
		//console.log('support=',support);
		return support;
	}
	
	//**************** HELPER FUNCTIONS
	
	function isEmpty(str) {
	    return str.replace(/^\s+|\s+$/g, '').length == 0;
	}
	
	function resetData(){
	  player_mediaTime.find('p').html('0:00 | 0:00');
	  progress_level.width(0);
	  load_level.width(0);
	}		
	
	function canPlayVorbis() {
		var v = document.createElement('video');
		return !!(v.canPlayType && v.canPlayType('video/ogg; codecs="theora, vorbis"').replace(/no/, ''));
	}
	
	function canPlayMP4() {
		var v = document.createElement('video');
		return !!(v.canPlayType && v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"').replace(/no/, ''));
	}
	
	function canPlayWebM() {
		var v = document.createElement('video');
		return !!(v.canPlayType && v.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, ''));
	}
	
	function formatCurrentTime(seconds) {
		seconds = Math.round(seconds);
		minutes = Math.floor(seconds / 60);
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
		seconds = Math.floor(seconds % 60);
		seconds = (seconds >= 10) ? seconds : "0" + seconds;
		return minutes + ":" + seconds;
	}
	
	function formatDuration(seconds) {
		seconds = Math.round(seconds);
		minutes = Math.floor(seconds / 60);
		minutes = (minutes >= 10) ? minutes : "0" + minutes;
		seconds = Math.floor(seconds % 60);
		seconds = (seconds >= 10) ? seconds : "0" + seconds;
		return " | " + minutes + ":" + seconds;
	}
	
	function preventSelect(arr){
		$(arr).each(function() {           
		$(this).attr('unselectable', 'on')
			   .css({
				   '-moz-user-select':'none',
				   '-webkit-user-select':'none',
				   'user-select':'none'
			   })
			   .each(function() {
				   this.onselectstart = function() { return false; };
			   });
		});
	
	}	
	
	// ******************************** PUBLIC FUNCTIONS **************** //
	this.getVolume = function(){
		if(!_componentInited || _playlistTransitionOn) return false;
		return defaultVolume;	
	}
	this.togglePlayback = function(){
		if(!_componentInited || _playlistTransitionOn) return false;
		if(playlistType=='wall') return false;
		if(!mediaType) return false;
		togglePlayBack();
	}
	this.nextMedia = function(){
		if(!_componentInited || _playlistTransitionOn) return false;
		if(playlistType=='wall') return false;
		nextMedia();
	}
	this.previousMedia = function(){
		if(!_componentInited || _playlistTransitionOn) return false;
		if(playlistType=='wall') return false;
		previousMedia();
	}
	this.setVolume = function(val){
		if(!_componentInited || _playlistTransitionOn) return false;
		if(playlistType=='wall') return false;
		if(!videoInited) return false;
		if(val<0) val=0;
		else if(val>1) val=1;
		defaultVolume = val;
		setVolume();
		if(defaultVolume == 0){
			player_volume.find('img').attr('src', ic_mute);
		}else if(defaultVolume > 0){
			player_volume.find('img').attr('src', ic_volume);
		}
	}
	this.destroyMedia = function(){
		if(!_componentInited || _playlistTransitionOn) return false;
		if(playlistType=='wall') return false;
		destroyMedia();
	}
	this.togglePlaylist = function(){
		if(!_componentInited || _playlistTransitionOn) return false;
		if(playlistType=='wall') return false;
		togglePlaylist();
	}
	this.toggleDescription = function(){
		if(!_componentInited || _playlistTransitionOn) return false;
		if(playlistType=='wall') return false;
		if(_playlistManager.getCounter()==-1) return false;
		toggleInfo();
	}
	this.loadMedia = function(value){
		if(!_componentInited || _playlistTransitionOn) return false;
		if(playlistType!='wall'){
			if(useDeeplink){
				if(typeof(value) === 'string'){
					$.address.value(value);
				}else{
					alert('Invalid value loadMedia Deeplink!');
					return false;	
				}
			}else{
				if(typeof(value) === 'number'){
					if(value<0)value=0;
					else if(value>playlistLength-1)value=playlistLength-1;
					_enableActiveItem();
					_playlistManager.processPlaylistRequest(value);
				}else if(typeof(value) === 'string'){
					if(_activePlaylist==value)return false;//playlist already loaded!
					_activePlaylist=value;
					_setPlaylist();			
				}else{
					alert('Invalid value loadMedia no Deeplink!');
					return false;	
				}
			}
		
		}else{//in wall layout only possible to load new playlist, deeplink off by default
			if(typeof(value) === 'string'){
				if(_activePlaylist==value)return false;//playlist already loaded!
				_activePlaylist=value;
				_setPlaylist();			
			}else{
				alert('Invalid value loadMedia Wall Layout!');
				return false;	
			}
		}
	}
	this.loadTrack = function(data){
		if(!_componentInited || _playlistTransitionOn) return false;
		if(playlistType!='wall'){
			
			if(data.thumb){
				
			}else{
				//just play video, no visible playlist
				
			}
		
			
		}else{
			alert('loadTrack method is not available for wall layout! Quitting.');
			return false;	
		}
	}
	this.cleanPreviewVideo = function(){
		if(!_componentInited || _playlistTransitionOn) return false;
		if(!useLivePreview) return false;
		cleanPreviewVideo();
	}
	
	this.outputPlaylistData = function(){
		if(!componentInited) return false;
		if(playlistTransitionOn) return false;
		if(!lastPlaylist) return false;
		try{ 
			console.log(playlistDataArr);	
		}catch(e){}
	}
	
	return this;

	}
	
})(jQuery);





	