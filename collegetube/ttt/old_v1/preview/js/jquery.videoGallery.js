

(function($) {

	$.videoGallery = function (wrapper, flashHolder, flashMiniHolder, settings) {
	
	var componentInited=false;

	var _body = $('body');
	var _window = $(window);
	var _doc = $(document);
	
	var componentWrapper = $(wrapper);
	var componentPlaylist = componentWrapper.find('.componentPlaylist');
	var playlist_inner = componentWrapper.find('.playlist_inner');
	
	var holder = _body.find('.holder');
	var holderWidth=parseInt(holder.css('width'),10);
	var header = holder.find('#header');
	var btnHolder = holder.find('.btn-holder');
	
	//hide all playlists in case user forgot
	playlist_inner.find("ul").each(function() {
		//console.log($(this).attr('id'));
		$(this).css('display','none');
	});
	
	var playlistHolder=componentWrapper.find('.playlistHolder');
	var playerHolder=componentWrapper.find('.playerHolder');
	var player_mediaTime=componentWrapper.find('.player_mediaTime');
	var playerControls=componentWrapper.find('.playerControls');
	
	var activePlaylistID;
	var activePlaylistThumb;
	var activePlaylistThumbImg;
	var activePlaylistPreloader;
	var activePlaylistVideoDiv;
	
	var useLivePreview=settings.useLivePreview;
	var previewVideo, previewVideoUp2Js;
	var autoPlay=settings.autoPlay;
	var initialAutoplay= autoPlay;
	var autoAdvanceToNextVideo=settings.autoAdvanceToNextVideo;
	var lastPlaylist = null;
	var activePlaylist=settings.activePlaylist;
	
	var origPlaylistHolderLeft = parseInt(playlistHolder.css('left'),10);
	
	var ieBelow8=false;
	if ($.browser.msie && parseInt($.browser.version, 10) < 8) {
	  ieBelow8=true;
	  //console.log('ieBelow8');
	}
	
	var agent = navigator.userAgent;
	var isMobile = jQuery.browser.mobile;
	//console.log(isMobile);
	var isIOS=false;
	if(agent.indexOf('iPhone') > -1 || agent.indexOf('iPod') > -1 || agent.indexOf('iPad') > -1) {
		 isIOS=true;
	}
	var isAndroid = agent.indexOf("Android") > -1;
	if(isMobile){
		autoPlay =false;
	}
	
	var vorbisSupport = canPlayVorbis();
	var mp4Support = canPlayMP4();
	var webMsupport = canPlayWebM();
	//console.log("vorbisSupport = " + vorbisSupport, ", mp4Support = " + mp4Support, ", webMsupport = " + webMsupport);
	var html5Support=(!!document.createElement('video').canPlayType);
	
	var fullscreenCount=0;
	var useRealFullscreen=settings.useRealFullscreen;
	var fullscreenPossible = false;
	var toggleFullscreenSrc = componentWrapper.find('.player_fullscreen');
	if(checkFullScreenSupport()){
		fullscreenPossible = true;
	}
	//console.log('fullscreenPossible = ', fullscreenPossible);

	var previewPoster;
	var preloader;
	var preloaderUrl='data/loading.gif';
	var bigPlay;
	var bigPlayUrl='data/icons/big_play.png';
	var autoHideControls=settings.autoHideControls;
	var windowResizeIntervalID;
	var windowResizeInterval = 50;//execute resize after time finish
	var aspectRatio=2;
	var videoInited=false;
	var mediaPath;	
	var previewMediaPath;	
	var mediaPlaying=false;
	
	var thumbWidth, thumbHeight;
	
	var autoOpenDescription=settings.autoOpenDescription;
	
	var scrollCheckInterval = 100;
	var scrollCheckIntervalID;
	var flashReadyInterval = 100;
	var flashReadyIntervalID;
	var flashPreview = $(flashHolder);
	var flashMiniPreview = $(flashMiniHolder);
	flashMiniPreview.css('zIndex',50);
	
	var dataInterval = 100;//tracking media data
	var dataIntervalID;
	
	var playlistOrientation =settings.playlistOrientation;
	var counter;
	
	var thumbArr = [];
	var thumbImgArr = [];
	var thumbHitDivArr = [];
	var thumbPreloaderArr = [];
	var thumbVideoDivArr = [];
	var playlistArr=[];
	var _playlistLength;
	
	var useRolloversOnButtons=true;
	var mediaWidth;
	var mediaHeight;
	var componentSize = 'normal';
	var video;
	var videoUp2Js;
	var mediaWrapper=componentWrapper.find('.mediaWrapper');
	var mediaHolder=componentWrapper.find('.mediaHolder');
	var mediaPreview=componentWrapper.find('.mediaPreview');
	var componentWidth=parseInt(componentWrapper.css('width'),10);
	var componentHeight=parseInt(componentWrapper.css('height'),10);
	var componentMediaWidth=parseInt(mediaWrapper.css('width'),10);
	var componentMediaHeight=parseInt(mediaWrapper.css('height'),10);
	//console.log(componentMediaWidth, componentMediaHeight);
	mediaHolder.css('width', componentMediaWidth+'px');
	mediaHolder.css('height', componentMediaHeight+'px');
	flashPreview.css('width', componentMediaWidth+'px');
	flashPreview.css('height', componentMediaHeight+'px');
	mediaPreview.css('width', componentMediaWidth+'px');
	mediaPreview.css('height', componentMediaHeight+'px');
	
	var mediaWrapperOrigTop = parseInt(mediaWrapper.css('top'),10);
	var mediaWrapperOrigLeft = parseInt(mediaWrapper.css('left'),10);
	
	var shareHolder =componentWrapper.find('#shareHolder');
	var shareOpened=false;
	
	var player_addon = componentWrapper.find('.player_addon');
	var infoHolder =componentWrapper.find('.infoHolder');
	var infoOpened=false;
	var toggleInfoBtn = componentWrapper.find('.player_info');
	
	var playerVolume =componentWrapper.find('.player_volume');
	
	//seekbar
	var seekPercent;
	var seekBarDown=false;
	var seekBar = componentWrapper.find('.player_seekbar');
	var progress_bg = componentWrapper.find('.progress_bg');
	var load_level = componentWrapper.find('.load_level');
	var progress_level = componentWrapper.find('.progress_level');
	var seekBarSize=progress_bg.width();
	
	seekBar.css('cursor', 'pointer');
	seekBar.bind('mousedown touchstart MozTouchDown', mouseDownHandlerSeek);
	
	var controlsSize = parseInt(playerControls.css('width'),10);
	var controlsMediaWidthDiff = componentMediaWidth - controlsSize;
	var controlsSeekbarDiff = controlsSize - seekBarSize;//for fullscreen seekbar size
//	console.log('controlsMediaWidthDiff', controlsMediaWidthDiff);
	
	//remember original sizes for return from fs
	var seekBarSizeOrig=seekBarSize;
	var controlsSizeOrig=controlsSize;
	var bodyOverflowOrig = _body.css('overflow');
	//console.log(bodyOverflowOrig,_body.css('overflow'));
	
	var player_progress_tooltip = componentWrapper.find('.player_progress_tooltip');
	var player_progress_tooltip_value = componentWrapper.find('.player_progress_tooltip_value');
	seekBar.bind('mouseover', mouseOverHandlerSeek);
	player_progress_tooltip.css('left', parseInt(seekBar.css('left'), 10) + 'px');
	
	//volume
	var _lastVolume;//for mute/unmute
	var defaultVolume =settings.defaultVolume;
	if(defaultVolume<0) defaultVolume=0;
	else if(defaultVolume>1)defaultVolume=1;
	_lastVolume = defaultVolume;
	var volumebarDown=false;
	var volumeBar = componentWrapper.find('.volume_seekbar');
	var volume_bg = componentWrapper.find('.volume_bg');
	var volume_level = componentWrapper.find('.volume_level');
	var volumeSize=volume_bg.height();
	volume_level.css('height', defaultVolume*volumeSize+'px');
	volumeBar.css('cursor', 'pointer');
	volumeBar.bind('mousedown touchstart MozTouchDown', mouseDownHandlerVolume);
	
	var player_volume_tooltip = componentWrapper.find('.player_volume_tooltip');
	var player_volume_tooltip_value = componentWrapper.find('.player_volume_tooltip_value');
	volumeBar.bind('mouseover', mouseOverHandlerVolume);
	player_volume_tooltip.css('left', parseInt(volumeBar.css('left'), 10) + 'px');
	
	
	//grid
	var playlistType = settings.playlistType;
	
	var numberOfRowsInPlaylist = settings.numberOfRowsInPlaylist;
	var numberOfColumnsInPlaylist = settings.numberOfColumnsInPlaylist;
	var horizontalPreviewSpacing = settings.horizontalPreviewSpacing;
	var verticalPreviewSpacing = settings.verticalPreviewSpacing;
	var gridArr=[];//for box grid
	var boxWidth;
	var boxHeight;
	var _startIndex;
	var _endIndex;
	var fadeInPreviewTime=500;
	var previewDisplayEndTimeoutID;
	var _noAdvanceControls=false;//less thumbs than rows*column in playlist
	var previewTransitionOn=false;
	var thumbUpOffset=settings.thumbUpOffset;
	var gridIntroHappened=false;//video inited
	var playerTransitionOn=false;
	var forcePause=false;
	
	//
	var innerPlaylist=settings.innerPlaylist;
	var togglePlaylistSide = settings.togglePlaylistSide;
	var closePlaylistOnVideoSelect = settings.closePlaylistOnVideoSelect;
	var autoOpenPlaylist=settings.autoOpenPlaylist;
	var playlistOpened=false;
	
	
	
	if(!html5Support){
		playerControls.remove();
		mp4Support=true;
	}
	
	if(playlistType == 'grid'){
		var playlistBackward = componentWrapper.find('.playlistBackward');
		var playlistClose = componentWrapper.find('.playlistClose');
		var playlistForward = componentWrapper.find('.playlistForward');
		
		playlistControlsOffOpacity=settings.playlistControlsOffOpacity;
		
		playlistBackward.bind("click", togglePlaylistControls);
		playlistClose.bind("click", togglePlaylistControls);
		playlistForward.bind("click", togglePlaylistControls);
		
		var componentMode;
	}else{
		//add horizontal scroll 
		if(playlistOrientation == 'horizontal'){
			//https://groups.google.com/forum/?fromgroups#!topic/jscrollpane/eIqcKh-vEik
			 playlist_inner.bind('mousewheel', horizontalMouseWheel);
             playlistHolder.addClass('playlist_horizontal');
        }
        else {
          playlistHolder.addClass('playlist_vertical');
        }
	}
	
	
	var scrollPaneApi;
	function checkScroll(){
		//console.log('checkScroll');
	
		playlistHolder.css('display', 'block');
		
		if(playlistType == 'line'){
		
			if(!scrollPaneApi){
				scrollPaneApi = playlist_inner.jScrollPane().data('jsp');
				if(playlistOrientation == 'vertical'){
					playlist_inner.jScrollPane({
						verticalDragMinHeight: 50,
						verticalDragMaxHeight: 60
					});
				}else{
					playlist_inner.jScrollPane({
//                        maintainPosition: false,
						horizontalDragMinWidth: 50,
						horizontalDragMaxWidth: 60,
						verticalGutter:20
					});
				}
			}else{
				scrollPaneApi.reinitialise();
				if(playlistOrientation == 'vertical'){
					scrollPaneApi.scrollToY(0);
				}else{
					scrollPaneApi.scrollToX(0);
				}
			}
			    
			if(autoOpenPlaylist){
				togglePlaylist2();
			}
		
		}else{
			playlistHolder.css('top', 0+'px');
			playlistHolder.css('width', getComponentSize('w')+'px');
			playlistHolder.css('height', getComponentSize('h') - 105 +'px');
			playlistHolder.css('zIndex', 20);
			
			componentPlaylist.css('width', getComponentSize('w')+'px');
			componentPlaylist.css('height', getComponentSize('h') -105 +'px');
			componentPlaylist.css('left', 0+'px');
			componentPlaylist.css('top', 0+'px');
			
			playlist_inner.css('width', getComponentSize('w')+'px');
			playlist_inner.css('height', getComponentSize('h')+'px');
			playlist_inner.css('left', 0+'px');
			playlist_inner.css('top', 0+'px');
			
			if(counter==-1){
				componentMode = 'playlist';
				playlistHolder.css('left', 0+'px');
			}else{
				componentMode = 'player';
				gridIntroHappened=true;
				playlistHolder.css('left', -10000+'px');
				playlistHolder.css('height', 0+'px');
			}
		}
		
		if(!componentInited){
			componentInited=true;
			videoGallerySetupDone();
			
			if(autoHideControls){
				componentWrapper.bind('mouseenter', overComponent);
				componentWrapper.bind('mouseleave', outComponent);
			}else{
				showControls();
			}
		}
	}
	
	function horizontalMouseWheel(event, delta, deltaX, deltaY){
		if(!componentInited) return;
		 var d = delta > 0 ? -1 : 1;//normalize
		 if(scrollPaneApi) scrollPaneApi.scrollByX(d * 100);
		 return false;
	}
	
	//************* volume tooltip
	
	function mouseOverHandlerVolume() {
		if(!videoInited) return;
		player_volume_tooltip.css('display', 'block');
		volumeBar.bind('mousemove', mouseMoveHandlerVolumeTooltip);
		volumeBar.bind('mouseout', mouseOutHandlerVolume);
		_doc.bind('mouseout', mouseOutHandlerVolume);
	}
	
	function mouseOutHandlerVolume() {
		if(!videoInited) return;
		player_volume_tooltip.css('display', 'none');
		volumeBar.unbind('mousemove', mouseMoveHandlerVolumeTooltip);
		volumeBar.unbind('mouseout', mouseOutHandlerVolume);
		_doc.unbind('mouseout', mouseOutHandlerVolume);
	}
	
	function mouseMoveHandlerVolumeTooltip(e){
		var s = e.pageX - volume_bg.offset().left;
		if(s<0) s=0;
		else if(s>volumeSize) s=volumeSize;
		
		//var center = controlsSize + s - parseInt(volumeBar.css('right'), 10) + parseInt(volume_bg.css('left'), 10) - player_volume_tooltip.width() / 2;
		var center = parseInt(playerControls.css('width'),10) + s - parseInt(volumeBar.css('right'), 10) - parseInt(volumeBar.css('width'), 10) + parseInt(volume_bg.css('left'), 10) - player_volume_tooltip.width()/2;
		//console.log(controlsSize,' ',  parseInt(volumeBar.css('right'), 10), ' ', parseInt(volume_bg.css('left'), 10),' ', player_volume_tooltip.width()/2);
		player_volume_tooltip.css('left', center + 'px');
		
		var newPercent = Math.max(0, Math.min(1, s / volumeSize));
		var value=parseInt(newPercent * 100, 10);
		player_volume_tooltip_value.html(value+' %');
		var center2 =  player_volume_tooltip.width() / 2 - player_volume_tooltip_value.width() / 2;
		player_volume_tooltip_value.css('left', center2 + 'px');
	}
	
	//********* volume
	
	function mouseDownHandlerVolume(){
		if(!componentInited) return;
		if(seekBarDown) return;
		volumebarDown=true;
		_doc.bind('mousemove', mouseMoveHandlerVolume);
		_doc.bind('mouseup touchend MozTouchUp', mouseUpHandlerVolume);
		volumeBar.bind('mouseup', mouseMoveHandlerVolume);
		return false;
	}
	
	function mouseMoveHandlerVolume(e){
		volumeTo(e.pageY);
	}
	
	function mouseUpHandlerVolume(e){
		_doc.unbind('mousemove', mouseMoveHandlerVolume);
		_doc.unbind('mouseup touchend MozTouchUp', mouseUpHandlerVolume);
		volumeBar.unbind('mouseup', mouseMoveHandlerVolume);
		volumebarDown=false;
//		if(defaultVolume == 0){
//			componentWrapper.find('.player_volume').find('img').attr('src', 'data/icons/volume_off.png');
//			videoUp2Js.muted = true;
//		}else if(defaultVolume > 0){
			componentWrapper.find('.player_volume').find('img').attr('src', 'data/icons/volume_on.png');
			if(videoUp2Js) videoUp2Js.muted = false;
//		}
		return false;
	}
	
	function volumeTo(x) {
		defaultVolume = Math.max(0, Math.min(1, (volume_bg.height() + volume_bg.offset().top - x) / volumeSize));
		setVolume();
	}
	
	function setVolume(){
		//console.log('setVolume ', defaultVolume);
		volume_level.css('height', defaultVolume*volumeSize+'px');
		if(html5Support){
          if(videoUp2Js != null)
			videoUp2Js.volume = defaultVolume;
		}else{
			getFlashMovie('flashPreview').pb_setVolume(defaultVolume); 
		}
	}
	
	//************* seekbar tooltip
	
	function mouseOverHandlerSeek() {
		if(!videoInited) return;
		player_progress_tooltip.css('display', 'block');
		seekBar.bind('mousemove', mouseMoveHandlerSeekTooltip);
		seekBar.bind('mouseout', mouseOutHandlerSeek);
		_doc.bind('mouseout', mouseOutHandlerSeek);
	}
	
	function mouseOutHandlerSeek() {
		if(!videoInited) return;
		player_progress_tooltip.css('display', 'none');
		seekBar.unbind('mousemove', mouseMoveHandlerSeekTooltip);
		seekBar.unbind('mouseout', mouseOutHandlerSeek);
		_doc.unbind('mouseout', mouseOutHandlerSeek);
	}
	
	function mouseMoveHandlerSeekTooltip(e){
		var s = e.pageX - seekBar.offset().left;
		if(s<0) s=0;
		else if(s>seekBarSize) s=seekBarSize;
		
		var center = s + parseInt(seekBar.css('left'), 10) - player_progress_tooltip.width() / 2;
		player_progress_tooltip.css('left', center + 'px');
		//console.log(pos);
		
		var newPercent = Math.max(0, Math.min(1, s / seekBarSize));
		var value, fd;
		
		if(html5Support){
			value=newPercent * videoUp2Js.duration;
			//console.log(value);
			player_progress_tooltip_value.html(formatCurrentTime(value)+formatDuration(videoUp2Js.duration));
		}else{
			/*
			fd = getFlashMovie('flashPreview').pb_getFlashDuration();
			value=newPercent * fd;
			player_progress_tooltip_value.html(formatCurrentTime(value)+formatDuration(fd));
			*/
		}
		var center2 =  player_progress_tooltip.width() / 2 - player_progress_tooltip_value.width() / 2;
		player_progress_tooltip_value.css('left', center2 + 'px');
	}
	
	//************* seekbar
	
	function mouseDownHandlerSeek(){
		if(!componentInited) return;
		if(volumebarDown) return;
		seekBarDown=true;
		_doc.bind('mousemove', mouseMoveHandlerSeek);
		_doc.bind('mouseup touchend MozTouchUp', mouseUpHandlerSeek);
		seekBar.bind('mouseup', mouseMoveHandlerSeek);
		return false;
	}
	
	function mouseMoveHandlerSeek(e){
		setProgress(e.pageX);
//        console.log(e.pageX);
	}
	
	function mouseUpHandlerSeek(e){
		_doc.unbind('mousemove', mouseMoveHandlerSeek);
		_doc.unbind('mouseup touchend MozTouchUp', mouseUpHandlerSeek);
		seekBar.unbind('mouseup', mouseMoveHandlerSeek);
		if(!html5Support){
			/*
			var newPercent = Math.max(0, Math.min(1, seekPercent / seekBarSize));
			getFlashMovie('flashPreview').pb_seek(newPercent);
			*/
		} 
		seekBarDown=false;
		return false;
	}
	
	function setProgress(x) {
		seekPercent = x - progress_bg.offset().left;
		if(seekPercent<0) seekPercent=0;
		else if(seekPercent>seekBarSize) seekPercent=seekBarSize;
		progress_level.css('width', seekPercent+'px');
		var newPercent = Math.max(0, Math.min(1, seekPercent / seekBarSize));
		if(html5Support && videoUp2Js != null){
			var ct = newPercent * videoUp2Js.duration;
			var ct2f = ct.toFixed(1);
			//console.log(videoUp2Js.seekable, videoUp2Js.seekable.length)
			try{
				videoUp2Js.currentTime = ct2f;
			}catch(er){}
		}
	}
	
	//***********
	
	function togglePlaylist2(){
		var playlistSize;
		if(!playlistOpened){
			if(togglePlaylistSide == 'top'){
				playlistHolder.stop().animate({'top': 0+'px'}, {duration: 500, easing: "easeOutQuart"});
			}else if(togglePlaylistSide == 'bottom'){
                playlistSize = parseInt(playlistHolder.css('height'),10);
				playlistHolder.stop().animate({'top': -playlistSize - 30 +'px'}, {duration: 500, easing: "easeOutQuart"});
			}else if(togglePlaylistSide == 'left'){
				playlistHolder.stop().animate({'left': 0+'px'}, {duration: 500, easing: "easeOutQuart"});
			}else if(togglePlaylistSide == 'right'){
				playlistHolder.stop().animate({'right': 0+'px'}, {duration: 500, easing: "easeOutQuart"});
			}
			playlistOpened=true;
		}else{
			if(togglePlaylistSide == 'top'){
				playlistSize = parseInt(playlistHolder.css('height'),10);
				playlistHolder.stop().animate({'top': -playlistSize+'px'}, {duration: 500, easing: "easeOutQuart"});
			}else if(togglePlaylistSide == 'bottom'){
				playlistHolder.stop().animate({'top': 0+'px'}, {duration: 500, easing: "easeOutQuart"});
			}else if(togglePlaylistSide == 'left'){
				playlistSize = parseInt(playlistHolder.css('width'),10) + 2;
				playlistHolder.stop().animate({'left': -playlistSize+'px'}, {duration: 500, easing: "easeOutQuart"});
			}else if(togglePlaylistSide == 'right'){
				playlistSize = parseInt(playlistHolder.css('width'),10) + 2;
				playlistHolder.stop().animate({'right': -playlistSize+'px'}, {duration: 500, easing: "easeOutQuart"});
			}
			playlistOpened=false;
		}
	}
	
	function setPlaylistDefaultState(){
		var playlistSize;
		if(togglePlaylistSide == 'top'){
			playlistSize = parseInt(playlistHolder.css('height'),10);
			playlistHolder.css('top', -playlistSize+'px');
		}else if(togglePlaylistSide == 'bottom'){
			
		}else if(togglePlaylistSide == 'left'){
			playlistSize = parseInt(playlistHolder.css('width'),10) + 2;
			playlistHolder.css('left', -playlistSize+'px');
		}else if(togglePlaylistSide == 'right'){
			playlistSize = parseInt(playlistHolder.css('width'),10) + 2;
			playlistHolder.css('right', -playlistSize+'px');
		}
		playlistOpened=false;
	}
	
	//************
	
	function initButtons(){
		//buttons
		var buttonArr=[
          componentWrapper.find('.player_play'),
          componentWrapper.find('.player_repeat'),
          componentWrapper.find('.player_volume'),
          componentWrapper.find('.player_playlist'),
          componentWrapper.find('.player_info'),
          componentWrapper.find('.resolution_hd'),
          componentWrapper.find('.resolution_sd'),
          componentWrapper.find('.player_fullscreen')
        ];
		
		var btn;
		var len = buttonArr.length;
		i=0;
		for(i;i<len;i++){
			btn = $(buttonArr[i]);
			btn.css('cursor', 'pointer');
			btn.bind('click', clickControls);
//			if(useRolloversOnButtons){
//				btn.bind('mouseover', overControls);
//				btn.bind('mouseout', outControls);
//			}
		}
		
		//big play
		bigPlay = $(".big_play").show();
		bigPlay.bind('click', togglePlayControl);
		
		//preloader
//		preloader = $("<div/>");
//		img=$(new Image());
//		img.load(function() {
//			
//			preloader.css({
//			   position: 'absolute',
//			   width: this.width + 10+'px',
//			   height: this.height + 10+'px',
//			   top : 50+'%',
//			   left : 50+'%',
//			   marginLeft: -this.width/2 - 5+'px',
//			   marginTop: -this.height/2 - 5+'px',
//			   background: '#111',
//			   borderRadius:5,
//			   display: 'none'
//			});
//			
//			//center img inside div preloader
//			$(this).css({
//			   position: 'absolute',
//			   top : parseInt(preloader.css('height'),10)/2 - this.height/2+'px',
//			   left : parseInt(preloader.css('width'),10)/2 - this.width/2+'px',
//			   display : 'block'
//			})
//			
//			preloader.append(this);
//			mediaPreview.append(preloader);
//			
//		}).attr('src', preloaderUrl);
				
	}
	
	function setPlaylist(id){
		//console.log('setPlaylist');
		
		var pi;
		var i = 0;
		var h;
		var len;
		var btn;
		var hitdiv;
		
		if(lastPlaylist){
			
			//clean previous playlist
			enableActiveItem();
			cleanMedia();
			resetData();
			
			for(i;i<_playlistLength;i++){
				pi = $(playlistArr[i]);
				pi.unbind('click', clickPlaylistItem);
				pi.unbind('mouseover', overPlaylistItem);
				pi.unbind('mouseout', outPlaylistItem);
				pi.removeClass('playlistSelected').addClass('playlistNonSelected');
			}
			//hide last playlist
			lastPlaylist.css('display', 'none');
		}
		
		//get new playlist
		playlist = $(playlist_inner.find("ul[id="+id+"]"));
		playlist.css('display','block');//show current playlist
		lastPlaylist = playlist;
		
		//reset
		playlistArr=[];
		thumbArr=[];
		thumbImgArr=[];
		thumbPreloaderArr=[];
		thumbVideoDivArr = [];
		thumbHitDivArr=[];
		
		gridIntroHappened=false;
		_noAdvanceControls = false;
		previewTransitionOn=false;
		playerTransitionOn=false;
		forcePause = false;
		setPlaylistDefaultState();
		playlistOpened=false;
		
		if(scrollCheckIntervalID) clearInterval(scrollCheckIntervalID);
	
		shareOpened=false;
		infoOpened=false;
		
		defaultVolume =settings.defaultVolume;
		if(defaultVolume<0) defaultVolume=0;
		else if(defaultVolume>1)defaultVolume=1;
		_lastVolume = defaultVolume;

		
		if(playlistType == 'grid'){
			playlistBackward.css('cursor', 'default');
			playlistClose.css('cursor', 'default');
			playlistForward.css('cursor', 'default');
			playlistBackward.css('opacity',playlistControlsOffOpacity);
			playlistClose.css('opacity',playlistControlsOffOpacity);
			playlistForward.css('opacity',playlistControlsOffOpacity);
		}
		
		var thumb;
		playlist.filter(function() {
			playlistArr = $(this).find("li[class='playlistNonSelected']");
			thumb = $(this).find("div[class='playlistThumb']");//div
			thumbArr = thumb;
			thumbImgArr = thumb.find("img[class='thumb']");//img
			thumbPreloaderArr = thumb.find("img[dataTitle='thumbPreloader']");//preloader
			thumbVideoDivArr = thumb.find("div[dataTitle='videoDiv']");//video div
			thumbHitDivArr = thumb.find("div[dataTitle='hitdiv']");//hit div
		});
		//console.log(thumbPreloaderArr.length);
        
        $.each(thumb, function(i, val) {
          $(thumb[i]).before('<span class="count">' + (i + 1) + '.</span>');
//          console.log(i, val, playlistArr[i]);
        });
		
		thumb=$(thumbImgArr[0]);
		thumbWidth = thumb.width(), thumbHeight = thumb.height();
		
		//console.log(thumbWidth, thumbHeight);
//		flashMiniPreview.css('width', thumbWidth+'px');
//		flashMiniPreview.css('height', thumbHeight+'px');
		//flashMiniPreview.css('background', '#ff0000');
		
		//console.log(playlistArr);
		_playlistLength= playlistArr.length;
		//console.log('_playlistLength = ', _playlistLength);
		
		
		
		pi = $(playlistArr[0]);//get size for rollover
		//console.log(pi);
		var w=parseInt(pi.outerWidth(),10);
		var h=parseInt(pi.outerHeight(),10);
		boxWidth = w;
		boxHeight = h;
		//onsole.log(w,h);
		var img, hasSetup = false, preloaderId, videoDiv;
		if(thumbPreloaderArr.length > 0){
			//console.log('......... hasSetup');
			hasSetup = true;
		}
		
		if(playlistOrientation == 'horizontal'){
			var contentWidth=_playlistLength*w+(_playlistLength-1)*parseInt(pi.css('marginRight'),10);
			//console.log(contentWidth);
			playlist.css('width',contentWidth +'px');
			if(scrollPaneApi) scrollPaneApi.reinitialise();
		}
		
		i=0;//reset
		for(i;i<_playlistLength;i++){
			
			pi = $(playlistArr[i]);
			pi.bind('click', clickPlaylistItem);
//			pi.bind('mouseover', overPlaylistItem);
//			pi.bind('mouseout', outPlaylistItem);
			pi.attr('data-id', i);
			
			if(!hasSetup){
			
				//hit 
				hitdiv =$("<div/>");
				thumbHitDivArr[i]=hitdiv;
				hitdiv.css({
				   position: 'absolute',
				   width: w + 'px',
				   height: (h-8) + 'px',
				   top : 0+'px',
				   left : 0+'px',
				   background: '#ad4',
				   zIndex: 200,
				   cursor: 'pointer',
				   opacity: 0
				});
				hitdiv.attr('dataTitle', 'hitdiv');
				
				pi.append(hitdiv);//hit on top
			

			
			}
			
//			thumb=$(thumbImgArr[i]);
			//fade thumbs in
//			thumb.stop().animate({'opacity': 1},  {duration: 500, easing: "easeOutSine"});
			
			//console.log(pi.outerWidth(true), pi.outerHeight(true));
		}
		
		//remove margin on last playlist item
		if(playlistType == 'line' && playlistOrientation == 'vertical'){
			pi.css('marginBottom', 0+'px');
		}else{
			
			 if(_playlistLength <= numberOfRowsInPlaylist * numberOfColumnsInPlaylist) {
				 _noAdvanceControls = true;
				 //hide prev forward playlist btns
				 playlistBackward.css('opacity', 0);
				 playlistForward.css('opacity', 0);
				 playlistBackward.css('cursor', 'default');
				 playlistForward.css('opacity', 'default');
			 }
			 
			pi.css('marginRight', 0+'px');
		}
				
		preventSelect(playlistArr);
		
		counter=settings.activeItem;
		if(counter > _playlistLength-1)counter = _playlistLength-1;
		checkScroll();
		
		if(counter>-1){
			disableActiveItem();
			findMedia();
		}
		
		if(playlistType == 'grid'){
			//intro playlist
			_startIndex = 0;
			_endIndex = _startIndex + numberOfColumnsInPlaylist * numberOfRowsInPlaylist;
			if(_endIndex > _playlistLength) _endIndex = _playlistLength;//restraints
			repositionThumbs();
		}	
	}
	
	function mediaAdvance(){
		enableActiveItem();
		counter++;
		if(counter>_playlistLength-1){
			counter=0;
			videoGalleryPlaylistEnd();
		}
		disableActiveItem();
		findMedia();
	}
	
	function adjustFlashPreview(){
		if(activePlaylistThumb){
			
			//calculate flash video relative position
				
			//var w = parseInt(pi.outerWidth(true),10);
			//var h = parseInt(pi.outerHeight(true),10);
			
			//var x1 = parseInt(pi.css('left'),10);
			//var x2 = parseInt(playlist_inner.css('left'),10);
			//var x3 = parseInt(activePlaylistThumb.css('left'),10);
			var x4 = parseInt(activePlaylistThumb.css('borderLeftWidth'),10);
			var x41 = parseInt(activePlaylistThumb.css('marginLeft'),10);
			var x42 = parseInt(activePlaylistThumb.css('paddingLeft'),10);
			//var x5 = parseInt(scrollPaneApi.getContentPositionX(),10);
			
			var cp_x1 = parseInt(componentPlaylist.css('borderLeftWidth'),10);
			var cp_x2 = parseInt(componentPlaylist.css('marginLeft'),10);
			var cp_x3 = parseInt(componentPlaylist.css('paddingLeft'),10);
			
			//console.log(x41, ', ', x42);
			
			//var y1 = parseInt(pi.css('top'),10);
			//var y2 = parseInt(playlist_inner.css('top'),10);
			//var y3 = parseInt(activePlaylistThumb.css('top'),10);
			var y4 = parseInt(activePlaylistThumb.css('borderTopWidth'),10);
			var y41 = parseInt(activePlaylistThumb.css('marginTop'),10);
			var y42 = parseInt(activePlaylistThumb.css('paddingTop'),10);
			//var y5 = parseInt(scrollPaneApi.getContentPositionY(),10);
			
			var cp_y1 = parseInt(componentPlaylist.css('borderTopWidth'),10);
			var cp_y2 = parseInt(componentPlaylist.css('marginTop'),10);
			var cp_y3 = parseInt(componentPlaylist.css('paddingTop'),10);
			
			//console.log(y41, ', ', y42);
			
			//var x = x1 + x2 + x3 + x4;
			//var y = id * h + y1 + y2 + y3 + y4 - y5;
			
			var t1 = parseInt(activePlaylistThumb.offset().left,10) - parseInt(componentPlaylist.offset().left,10) + x4 + x41 + x42 + cp_x1+cp_x2+cp_x3;
			var t2 = parseInt(activePlaylistThumb.offset().top,10)- parseInt(componentPlaylist.offset().top,10) + y4 + y41 + y42 + cp_y1+cp_y2+cp_y3;
			//console.log(t1, t2);
			
			flashMiniPreview.css('left', t1+'px');
			flashMiniPreview.css('top', t2+'px');
		}
	}
	
	$.videoGallery.flashPreviewVideoStart = function() {
		//hide preloader
		if(activePlaylistPreloader) activePlaylistPreloader.css('display','none');
		
		if(scrollCheckIntervalID) clearInterval(scrollCheckIntervalID);
		scrollCheckIntervalID = setInterval(adjustFlashPreview, scrollCheckInterval);
	}
	
	function previewVideoEndHandler(){
		//console.log('previewVideoEndHandler');
		previewVideoUp2Js.currentTime=0;//rewind
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
			previewVideo.unbind("canplaythrough", previewCanplaythroughHandler);
			previewVideo.unbind("canplay", previewCanplayHandler);
		}
		//hide preloader
		if(activePlaylistPreloader) activePlaylistPreloader.css('display','none');
		//play video
		if(previewVideoUp2Js) previewVideoUp2Js.play();
	}
	
	function cleanPreviewVideo(){
		//console.log('cleanPreviewVideo');
		if(!html5Support){
			if(scrollCheckIntervalID) clearInterval(scrollCheckIntervalID);
			getFlashMovie('flashMiniPreview').pb_dispose();
			//flashMiniPreview.css('display','none');
			flashMiniPreview.css('left',-10000+'px');//fix for safari problem above (display: none)
		}else{
			if(previewVideo){
				previewVideo.unbind("ended", previewVideoEndHandler);
				previewVideo.unbind("canplaythrough", previewCanplaythroughHandler);
				previewVideo.unbind("canplay", previewCanplayHandler);
				previewVideo.find('source').attr('src','');
			}
			//clean video code
			if(activePlaylistVideoDiv) activePlaylistVideoDiv.html('');
		}
		//hide preloader
//		if(activePlaylistPreloader) activePlaylistPreloader.css('display','none');
		//show thumb
//		if(activePlaylistThumbImg) activePlaylistThumbImg.stop().animate({'opacity': 1},  {duration: 500, easing: "easeOutSine"});
	}
	
	function clickPlaylistItem(e){
		if(!componentInited) return;
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		var currentTarget = $(e.currentTarget);
		var id = currentTarget.attr('data-id');
		
		if(id == counter){//active item
			if(playlistType == 'grid'){
				togglePlaylist('off');
			}
			return;
		} 
		
		if(useLivePreview) cleanPreviewVideo();
		
		enableActiveItem();
		counter = id;
		disableActiveItem();
		findMedia();
		
		if(playlistType == 'grid'){
			togglePlaylist('off');
		}else if(innerPlaylist && closePlaylistOnVideoSelect){
			togglePlaylist2();
		}
		
		return false;
	}
	
	function clickPlaylistItem2(){//called from flash preview click in ie7
		if(!componentInited) return;
		//console.log('clickPlaylistItem2');
		
		var id = activePlaylistID;
		
		if(id == counter) return;//active item
		
		if(useLivePreview) cleanPreviewVideo();
		
		enableActiveItem();
		counter = id;
		disableActiveItem();
		findMedia();
		
	}
	
	function enableActiveItem(){
		//console.log('enableActiveItem');
		if(counter!=-1){
			var _item = $(playlistArr[counter]);
			_item.removeClass('playlistSelected').addClass('playlistNonSelected');
			if(playlistType=='line'){
				var hitdiv = thumbHitDivArr[counter];
				if(hitdiv) hitdiv.css('cursor', 'pointer');
			}
			if(playlistType=='grid'){
				var title = _item.find("div[class='playlistTitleNonSelected']");
				if(title) title.removeClass('playlistTitleSelected').addClass('playlistTitleNonSelected');
			}
		}
	}
	
	function disableActiveItem(){
		//console.log('disableActiveItem');
		var _item = $(playlistArr[counter]);
		_item.removeClass('playlistNonSelected').addClass('playlistSelected');
		if(playlistType=='grid'){
			var title = _item.find("div[class='playlistTitleNonSelected']");
			if(title) title.removeClass('playlistTitleNonSelected').addClass('playlistTitleSelected');
		}else{
			var hitdiv = thumbHitDivArr[counter];
			if(hitdiv) hitdiv.css('cursor', 'default');
		}
	}
	
	function clickControls(e){
		if(!componentInited) return;
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		
		var currentTarget = $(e.currentTarget);
		var c=currentTarget.attr('class');
		var img=currentTarget.find('img');
		
		if(currentTarget.hasClass('player_play')){
			togglePlayControl();
//		}else if(c=='player_volume'){
//			
//			if(defaultVolume == 0){//is muted
//				defaultVolume = _lastVolume;//restore last volume
//				if(html5Support) videoUp2Js.muted = false;
//				setVolume();
//				img.attr('src', 'data/icons/volume_on.png');
//			}else{
//				_lastVolume = defaultVolume;//remember last volume
//				if(html5Support) videoUp2Js.muted = true;
//				defaultVolume = 0;//set mute on (volume to 0)
//				setVolume();
//				img.attr('src', 'data/icons/volume_off.png');
//			}
		}else if(currentTarget.hasClass('player_playlist')){
			if(playlistType == 'grid'){
				if(html5Support){
					if(videoInited && !videoUp2Js.paused){
						videoUp2Js.pause();
						forcePause=true;
					}
				}else{
					if(videoInited && getFlashMovie('flashPreview').pb_getMediaPlaying()){
						getFlashMovie('flashPreview').pb_togglePlayback2(false);
						forcePause=true;
					}
				}
				togglePlaylist('on');
			}else{
				togglePlaylist2();
			}
		}else if(currentTarget.hasClass('player_info')){
			toggleInfo();
//		}else if(c=='player_share'){
//			toggleShare();
		}else if(currentTarget.hasClass('player_fullscreen')){
			toggleFullscreen(true);
            currentTarget.toggleClass('fullscreen')
		}
        else if(currentTarget.hasClass('player_repeat')) {
            setProgress(progress_bg.offset().left);
        }
        else if(currentTarget.hasClass('inactive')) {
          currentTarget.toggleClass('active').toggleClass('inactive');
          currentTarget.siblings('.active').toggleClass('active').toggleClass('inactive');
          findMedia();
        }
		
		return false;
	}

//	function overControls(e){
//		if(!componentInited) return;
//		if (!e) var e = window.event;
//		if(e.cancelBubble) e.cancelBubble = true;
//		else if (e.stopPropagation) e.stopPropagation();
//		
//		var currentTarget = $(e.currentTarget);
//        
//        if(currentTarget.hasClass('player_volume')) {
//          
//        }
//        
//		return false;
//	}
//	
//	function outControls(e){
//		return false;
//	}
	
	//***************** 
	
	function loadPreview(){
		//console.log('loadPreview');
		
		mediaPreview.css('display', 'block');
		if(preloader) preloader.css('display','block');

		previewPoster = $(new Image());
		previewPoster.css({
		   position: 'absolute',
		   display: 'block',
		   opacity: 0
		});
		mediaPreview.append(previewPoster);

		var path = mediaPath;
		path+='.jpg';
		var url = path+"?rand=" + (Math.random() * 99999999);
			
		previewPoster.load(function() {
			
			if(preloader) preloader.css('display','none');
			
			resizePreview(previewPoster);
			previewPoster.animate({'opacity': 1},  {duration: 500, easing: "easeOutSine"});
			
			if(bigPlay) bigPlay.css('display','block');
			
		}).attr('src', url);
		
		previewPoster.error(function(e) {
		});	
	}
		
	function findMedia(){
		//console.log('findMedia');
		cleanMedia();
		
		var data=$(playlistArr[counter]);
		mediaPath = data.attr('data-path');
        
        // set quality options
        if(data.attr('data-path-hd')) {
          $('.player_control.resolution_hd').addClass('enabled');
          if($('.player_control.resolution_hd').hasClass('active')) {
            mediaPath = data.attr('data-path-hd');
          }
        }
        else {
          $('.player_control.resolution_hd').removeClass('enabled');
        // defaults
          $('.player_control.resolution_sd').removeClass('inactive').addClass('active');
          $('.player_control.resolution_hd').addClass('inactive').removeClass('active');
        }
        //
			
		mediaWidth=parseInt(data.attr('data-width'),10);
		mediaHeight=parseInt(data.attr('data-height'),10);
		
		if(autoPlay){
			if(html5Support){
				initVideo();
			}else{
				getFlashMovie('flashPreview').pb_play(mediaPath, aspectRatio);
				videoInited=true;
			}
		}else{
			loadPreview();
		}
	}
		
	function cleanMedia(){
		//console.log('cleanMedia');
		
		hideControls();
		hideInfo();
			
		if(html5Support){
			if(video){
				if(dataIntervalID) clearInterval(dataIntervalID);
				
				video.find('source').attr('src','');
				video.unbind("ended", videoEndHandler);
				video.unbind("loadedmetadata", videoMetadata);
				video.unbind("waiting",waitingHandler);
				video.unbind("playing", playingHandler);
				video.unbind("play", playHandler);
				video.unbind("pause", pauseHandler);
				//video.unbind("canplaythrough", canplaythroughHandler);
				//video.unbind("canplay", canplayHandler);
				//video.unbind("volumechange", volumechangeHandler);
				//video.unbind("timeupdate", dataUpdate);
				mediaHolder.html('');
			}
			if(bigPlay) bigPlay.css('display', 'none'); 
			//if(preloader) preloader.css('display', 'none'); 
			if(previewPoster){
				previewPoster.remove();
				previewPoster=null;
			} 
		}else{
			getFlashMovie('flashPreview').pb_dispose();
		}
		
		resetData();
		mediaPlaying=false;
		videoInited=false;//reset
	}
	
	//********** 
	
	function initVideo(){
		//console.log('initVideo');
		var videoCode='';
		if(mp4Support){
			mediaPath+='.mp4';
			if(!isAndroid){
				videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
				videoCode += '<source src="'+mediaPath+'"  type="video/mp4" />';
				videoCode += '</video>';
			}else{
				videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
				videoCode += '<source src="'+mediaPath+'" />';
				videoCode += '</video>';
			}
		}else if(vorbisSupport){
			mediaPath+='.ogv';
			if(!isAndroid){
				videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
				videoCode += '<source src="'+mediaPath+'"  type="video/ogg" />';
				videoCode += '</video>';
			}else{
				videoCode += '<video class="video_cont" width="'+mediaWidth+'" height="'+mediaHeight+'" >';
				videoCode += '<source src="'+mediaPath+'" />';
				videoCode += '</video>';
			}
		}else if(webMsupport){
			mediaPath+='.webm';
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
		
		mediaHolder.css('display','block');
		mediaHolder.html(videoCode);
		
		video = componentWrapper.find('.video_cont');//get player reference
		if(html5Support){
			
			videoUp2Js = video[0];
//            console.log('video', videoUp2Js);
			videoUp2Js.volume = defaultVolume;
			//console.log(video, videoUp2Js);
			video.bind("ended", videoEndHandler);
			video.bind("loadedmetadata", videoMetadata);
			video.bind("waiting",waitingHandler);
			video.bind("playing", playingHandler);
			video.bind("play", playHandler);
			video.bind("pause", pauseHandler);
			//video.bind("canplaythrough", canplaythroughHandler);
			//video.bind("canplay", canplayHandler);
			//video.bind("volumechange", volumechangeHandler);
			//video.bind("timeupdate", dataUpdate);
				
			if(isIOS){
				videoUp2Js.src = mediaPath;
				videoUp2Js.load();
			}
			
			if(isAndroid){
				videoUp2Js.play();
				
				if(bigPlay) bigPlay.css('display', 'none');  
				_imageHolder.stop().animate({ 'opacity':0},  {duration: fadeTime, easing: fadeEase, complete:function(){
					_imageHolder.empty();
				}});
			
				videoInited=true;
			}
		}
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
		componentWrapper.find('.player_play').addClass('player_pause');	
		if(bigPlay) bigPlay.css('display','none');
		mediaPlaying=true;
	}
	
	function pauseHandler(e){
		//console.log('pauseHandler');
		componentWrapper.find('.player_play').removeClass('player_pause');
		if(bigPlay) bigPlay.css('display','block');
		mediaPlaying=false;
	}
	
	function volumechangeHandler(e){
		//console.log('volumechangeHandler');
//		if(videoUp2Js.muted){
//			volume_level.css('height', 0+'px');
//			componentWrapper.find('.player_volume').find('img').attr('src', 'data/icons/volume_off.png');
//		}else{
			volume_level.css('height', defaultVolume*volumeSize+'px');
//			if(defaultVolume>0)componentWrapper.find('.player_volume').find('img').attr('src', 'data/icons/volume_on.png');
//		}
	}
	
	function videoMetadata(e){
		//console.log("videoMetadata: ", videoUp2Js.duration, videoUp2Js.videoWidth, videoUp2Js.videoHeight);
		resizeVideo();
		if(dataIntervalID) clearInterval(dataIntervalID);
		dataIntervalID = setInterval(dataUpdate, dataInterval);
		if(!isAndroid){
			if(autoPlay){
				togglePlayControl();
			}else{
				 if(videoUp2Js.paused){
					videoUp2Js.play();
				 }
			}
		}
		checkInfo();
		if(isIOS && initialAutoplay) autoPlay=true;
		showControls();
	}
	
	function togglePlayControl(){
		//console.log('togglePlayControl');
		if(!videoInited && !autoPlay){
			if(previewPoster) previewPoster.stop().animate({ 'opacity':0},  {duration: 500, easing: 'easeOutSine', complete:function(){
				previewPoster.remove();
				previewPoster=null;
			}});
			if(html5Support){
				initVideo();
			}else{
//              console.log(mediaPath, aspectRatio);
				getFlashMovie('flashPreview').pb_play(mediaPath, aspectRatio);
			}
		 }else{
			if(html5Support){
				  if (videoUp2Js.paused) {
					  videoUp2Js.play();
				  } else {
					  videoUp2Js.pause();
				  }
			}else{
				getFlashMovie('flashPreview').pb_togglePlayback();
			}
		 }
		 videoInited=true;
		 return false;
	}
	
	function dataUpdate(){
		//console.log(formatCurrentTime(videoUp2Js.currentTime), formatDuration(videoUp2Js.duration));
		player_mediaTime.html(formatCurrentTime(videoUp2Js.currentTime)+formatDuration(videoUp2Js.duration));
		
		if(!seekBarDown){
			progress_level.css('width', (videoUp2Js.currentTime / videoUp2Js.duration) * seekBarSize+'px');
			try{
				var buffered = Math.floor(videoUp2Js.buffered.end(0));
			}catch(error){}
			var percent = buffered / Math.floor(videoUp2Js.duration);
			//console.log(buffered);
			if(!isNaN(percent)){//opera has no buffered 
				load_level.css('width', percent * seekBarSize+'px');	
			}else{
				//console.log(videoUp2Js.readyState);
				if(videoUp2Js.readyState == 4){//for opera
					//loadProgress.css('width', getPlayerSize('w'));
				}
			}
		}
	};
	
	function videoEndHandler(){
		//console.log('videoEndHandler');
		if(autoAdvanceToNextVideo){
			mediaAdvance();
		}else{
			videoUp2Js.currentTime=0;
			videoUp2Js.play();
			if(!autoPlay){
				videoUp2Js.pause();
			}
		}
	}
	
	//********** flash	
	
	$.videoGallery.flashVideoPause = function() {
		if(bigPlay) bigPlay.css('display','block');
	}
	
	$.videoGallery.flashVideoResume = function() {
		if(bigPlay) bigPlay.css('display','none');
	}
	
	$.videoGallery.flashVideoEnd = function() {
		mediaAdvance();	
	}
	
	$.videoGallery.flashVideoStart= function() {
		videoInited =true;
		showControls();
		checkInfo();
	}
	
	$.videoGallery.dataUpdateFlash= function(bl,bt,t,d) {
		load_level.css('width', (bl/bt) * seekBarSize+'px');	
		progress_level.css('width', (t/d) * seekBarSize+'px');
		player_mediaTime.html(formatCurrentTime(t)+formatDuration(d));
	}
	
	initButtons();
	if(!html5Support){
		flashPreview.css('display', 'block');
		flashReadyIntervalID = setInterval(checkFlashReady, flashReadyInterval);
	}else{
		flashPreview.remove();
		flashMiniPreview.remove();
		setPlaylist(activePlaylist);
	}

	function checkFlashReady(){
		//console.log('checkFlashReady');
		if(getFlashMovie("flashPreview").setData != undefined){
			if(flashReadyIntervalID) clearInterval(flashReadyIntervalID);
			//console.log(seekBarSize, ', ', controlsSize)
			getFlashMovie('flashPreview').setData(settings, seekBarSize, controlsSize, volumeSize, controlsMediaWidthDiff);//pass data to flash
			//need dimensions before setup?
			//flashMiniPreview.css('width', 10+'px');
			//flashMiniPreview.css('height', 10+'px');

			if(playlistType=='grid'){
				playlistHolder.css('display', 'block');	
				playlistHolder.css('left', -10000+'px');	
			}

			flashMiniPreview.css('display', 'block');
			flashReadyIntervalID = setInterval(checkFlashReady2, flashReadyInterval);
		}
	}
	 
	function checkFlashReady2(){
		//console.log('checkFlashReady2');
		//console.log(getFlashMovie("flashMiniPreview"), getFlashMovie("flashMiniPreview").setData);
		if(getFlashMovie("flashMiniPreview").setData != undefined){
			if(flashReadyIntervalID) clearInterval(flashReadyIntervalID);
			getFlashMovie('flashMiniPreview').setData(settings, ieBelow8);
			flashMiniPreview.css('left',-10000+'px');
			setPlaylist(activePlaylist);
		}
	}
	
	$.videoGallery.toggleFlashPreview = function() {
		//console.log('toggleFlashPreview');
		clickPlaylistItem2();
	}
	
	function getFlashMovie(name) {
		return (navigator.appName.indexOf("Microsoft") != -1) ? window[name] : document[name];
	}	
	
	//***************** helper functions
	
	function overComponent(e) {
		if(!componentInited) return;
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		showControls();
		return false;
	}
	
	function outComponent(e) {
		if(!componentInited) return;
		if (!e) var e = window.event;
		if(e.cancelBubble) e.cancelBubble = true;
		else if (e.stopPropagation) e.stopPropagation();
		hideControls();
		return false;
	}
	
	function checkInfo(){
		//console.log('checkInfo');
		var data = $(playlistArr[counter]);
		//console.log('info = ', data.attr('data-description'));
		if(data.attr('data-description') != undefined){
			var infoData = data.attr('data-description');
			//console.log(infoData);
			
			infoHolder.html(infoData);
			
			//show info btn
//			toggleInfoBtn.css('opacity', 0);
//			toggleInfoBtn.css('display', 'block');
//			toggleInfoBtn.stop().animate({ 'opacity': 1},  {duration: 500, easing: 'easeOutSine'});
			
			if(autoOpenDescription) toggleInfo();
		}
	}
	
	function hideInfo(){
		//console.log('hideInfo');
		infoHolder.css('display','none');
		infoHolder.html('');
//		toggleInfoBtn.stop().animate({ 'opacity': 0},  {duration: 500, easing: 'easeOutSine', complete: function(){
//			toggleInfoBtn.css('display','none');
//		}});
		infoOpened=false;
	}

	function toggleInfo(){
//		console.log('toggleInfo ', infoOpened);
		if(!infoOpened){
			
			var infoPadding=parseInt(infoHolder.css('paddingLeft'),10) + parseInt(infoHolder.css('paddingRight'),10);
			if(componentSize== "normal"){
				infoHolder.css('width', componentMediaWidth-infoPadding+'px');
			}else{
				infoHolder.css('width', getComponentSize('w')-infoPadding+'px');
			}
			//console.log(infoHolder.css('width'));
			
			infoHolder.css('opacity',0);
			infoHolder.css('display','block');
			infoHolder.stop().animate({ 'opacity': 1},  {duration: 500, easing: 'easeOutSine'});
			infoOpened = true;	
		}else{
			infoHolder.stop().animate({ 'opacity': 0},  {duration: 500, easing: 'easeOutSine', complete: function(){
				infoHolder.css('display','none');
			}});
			infoOpened=false;
		}
	}
	
//	function toggleShare(){
//		if(!shareOpened){
//			shareHolder.css('display','block');
//			shareOpened = true;	
//		}else{
//			shareHolder.css('display','none');
//			shareOpened=false;
//		}
//	}
	
	function showControls(){
		if(!videoInited) return;
		//console.log('showControls');
		//if(componentSize=="normal"){
			player_addon.css('display','block');
			if(autoHideControls && shareOpened) shareHolder.css('display','block');
			if(html5Support){
				playerControls.css('display','block');
			}else{
				getFlashMovie('flashPreview').pb_toggleControls(true);
			} 
		//}
	}
	
	function hideControls(){
		//console.log('hideControls');
		//if(componentSize=="normal"){
			if(html5Support){
//				playerControls.css('display','none');
			}else{
				getFlashMovie('flashPreview').pb_toggleControls(false);
			} 
			//if(autoHideControls){
				player_addon.css('display','none');
				if(shareOpened) shareHolder.css('display','none');
			//}
		//}
	}
	
	function resizeComponent(){
		//console.log('resizeComponent');
		
		if(componentSize== "fullscreen"){
			
			_body.css('overflow', 'hidden');
			
			//playlistHolder.css('display', 'none');
			if(!innerPlaylist){
				playlistHolder.css('left', -10000+'px');//safari hack, after flash display none, preview doesnt work anymore
			}
			
			holder.css('width','auto');
			header.css('display','none');
			btnHolder.css('display','none');
			
			componentWrapper.css('width', getComponentSize('w')+'px');
			componentWrapper.css('height', getComponentSize('h')+'px');
			componentWrapper.css('left', 0+'px');
			componentWrapper.css('top', 0+'px');
			componentWrapper.css('marginLeft', 0+'px');
			componentWrapper.css('marginTop', 0+'px');
			
			mediaWrapper.css('width', getComponentSize('w')+'px');
			mediaWrapper.css('height', getComponentSize('h')+'px');
			mediaWrapper.css('left', 0+'px');
			mediaWrapper.css('top', 0+'px');
			
			mediaHolder.css('width', getComponentSize('w')+'px');
			mediaHolder.css('height', getComponentSize('h')+'px');
			mediaHolder.css('left', 0+'px');
			mediaHolder.css('top', 0+'px');
			
			mediaPreview.css('width', getComponentSize('w')+'px');
			mediaPreview.css('height', getComponentSize('h')+'px');
			mediaPreview.css('left', 0+'px');
			mediaPreview.css('top', 0+'px');
			
			if(innerPlaylist){
				var diff;
				if(togglePlaylistSide == 'top' || togglePlaylistSide == 'bottom'){
					diff = parseInt(playlistHolder.css('width'),10) - parseInt(componentPlaylist.css('width'),10);
					playlistHolder.css('width', getComponentSize('w')+'px');
					componentPlaylist.css('width', getComponentSize('w')-diff+'px');
				}else if(togglePlaylistSide == 'left' || togglePlaylistSide == 'right'){
					diff = parseInt(playlistHolder.css('height'),10) - parseInt(componentPlaylist.css('height'),10);
					playlistHolder.css('height', getComponentSize('h') - 105 +'px');
					componentPlaylist.css('height', getComponentSize('h')-diff -105 +'px');
				}
				if(scrollPaneApi) {
                  scrollPaneApi.scrollToX(0);
                  scrollPaneApi.reinitialise();
                }
			}
			
			if(previewPoster) resizePreview(previewPoster);
			
			if(html5Support && video){
				resizeVideo();
			}
			
			playerControls.css('width', getComponentSize('w') - controlsMediaWidthDiff +'px');
			seekBarSize = parseInt(playerControls.css('width'),10) - controlsSeekbarDiff;
			progress_bg.css('width', seekBarSize + 'px');
			seekBar.css('width', seekBarSize+'px');
            
			if(infoOpened){
				var infoPadding=parseInt(infoHolder.css('paddingLeft'),10) + parseInt(infoHolder.css('paddingRight'),10);
				//console.log(infoPadding);
				infoHolder.css('width', getComponentSize('w')-infoPadding+'px');
			}
			playerControls.hover();
		}else{
			
			_body.css('overflow', bodyOverflowOrig);
			
			holder.css('width',holderWidth+'px');
			header.css('display','block');
			btnHolder.css('display','block');

			componentWrapper.css('width', componentWidth+'px');
			componentWrapper.css('height', componentHeight+'px');
		//	componentWrapper.css('left', 50 + '%');
		//	componentWrapper.css('top', 50 + '%');
			componentWrapper.css('marginLeft', 15 + '%');
		//	componentWrapper.css('marginTop', -componentHeight/2+'px');
			
			mediaWrapper.css('width', getComponentSize('w')+'px');
			mediaWrapper.css('height', getComponentSize('h')+'px');
			mediaWrapper.css('left', mediaWrapperOrigLeft+'px');
			mediaWrapper.css('top', mediaWrapperOrigTop+'px');
			
			mediaHolder.css('width', getComponentSize('w')+'px');
			mediaHolder.css('height', getComponentSize('h')+'px');
			mediaHolder.css('left', 0+'px');
			mediaHolder.css('top', 0+'px');
			
			mediaPreview.css('width', getComponentSize+'px');
			mediaPreview.css('height', getComponentSize+'px');
			mediaPreview.css('left', 0+'px');
			mediaPreview.css('top', 0+'px');
			
			if(innerPlaylist){
				var diff;
				if(togglePlaylistSide == 'top' || togglePlaylistSide == 'bottom'){
					diff = parseInt(playlistHolder.css('width'),10) - parseInt(componentPlaylist.css('width'),10);
					playlistHolder.css('width', getComponentSize('w')+'px');
					componentPlaylist.css('width', getComponentSize('w')-diff+'px');
				}else if(togglePlaylistSide == 'left' || togglePlaylistSide == 'right'){
					diff = parseInt(playlistHolder.css('height'),10) - parseInt(componentPlaylist.css('height'),10);
					playlistHolder.css('height', getComponentSize('h') - 105 +'px');
					componentPlaylist.css('height', getComponentSize('h')-diff -105 +'px');
				}
				if(scrollPaneApi) { scrollPaneApi.scrollToX(0); scrollPaneApi.reinitialise(); }
			}
			
			if(previewPoster) resizePreview(previewPoster);
			
			if(html5Support && video){
				resizeVideo();
			}else{
				/*
				flashPreview.css('width', componentMediaWidth + 'px');
				flashPreview.css('height', componentMediaHeight + 'px');	
				getFlashMovie('flashPreview').pb_resize(componentMediaWidth, componentMediaHeight);	
				*/
			}
			
			playerControls.css('width', controlsSizeOrig +'px');
			seekBarSize = seekBarSizeOrig;
			progress_bg.css('width', seekBarSize + 'px');
			seekBar.css('width', seekBarSize+'px');
			
			//playlistHolder.css('display', 'block');
			if(!innerPlaylist) playlistHolder.css('left', origPlaylistHolderLeft+'px');
			
			if(infoOpened){
				var infoPadding=parseInt(infoHolder.css('paddingLeft'),10) + parseInt(infoHolder.css('paddingRight'),10);
				infoHolder.css('width', componentMediaWidth-infoPadding+'px');
			}
			
		}
	}
	
	function resizePreview(img) {
		var o, x, y;
		 
		if(aspectRatio == 0) {//normal media dimensions
			
		}
		else if(aspectRatio == 1) {//fitscreen
			o = retrieveObjectRatio(true, img);
		}
		else if(aspectRatio == 2) {//fullscreen
			o = retrieveObjectRatio(false, img);
		}
		img.css('width', o.width+ 'px');
		img.css('height', o.height+ 'px');
		x = (getComponentSize('w') - o.width) / 2;
		y = (getComponentSize('h') - o.height) / 2;
		img.css('left',x+'px');
		img.css('top',y+'px');
	}
	
	function resizeVideo() {
		var o, x, y;
		 
		if(aspectRatio == 0) {//normal media dimensions
			o=getMediaSize();
		}
		else if(aspectRatio == 1) {//fitscreen
			o = retrieveObjectRatio(true);
		}
		else if(aspectRatio == 2) {//fullscreen
			o = retrieveObjectRatio(false);
		}
		video.css('width', o.width+ 'px');
		video.css('height', o.height+ 'px');
		x = (getComponentSize('w') - o.width) / 2;
		y = (getComponentSize('h') - o.height) / 2;
		video.css('left',x+'px');
		video.css('top',y+'px');
	}
	
	 function retrieveObjectRatio( _fitScreen, obj) {
		 
		var _paddingX=0;
		var _paddingY=0;
	 
		var w = getComponentSize('w');
	 	var h = getComponentSize('h');
		//console.log(w,h);
	 
		var targetWidth, targetHeight, val={};
	 	if(!obj){
			var obj = getMediaSize();
			targetWidth = obj.width;
			targetHeight = obj.height;
		}else{
			targetWidth = obj.width();
			targetHeight = obj.height();
			//console.log(obj.width(), obj.height());
		}
		
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
		var o={};
		//console.log(videoUp2Js.videoWidth, mediaWidth, videoUp2Js.videoHeight, mediaHeight);
		if(!mediaWidth || isNaN(mediaWidth) || !mediaHeight || isNaN(mediaHeight)){
			o.width = videoUp2Js.videoWidth;
			o.height = videoUp2Js.videoHeight;
		}else{
			o.width=mediaWidth;
			o.height=mediaHeight;	
		}
		return o;
	}
	
	function getComponentSize(type) {
		if(type == "w"){//width
			return componentSize == "normal" ? componentMediaWidth : getDocumentWidth();
		}else{//height
			return componentSize == "normal" ? componentMediaHeight : getDocumentHeight();
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
	
	function resetData(){
	  player_mediaTime.html('0:00 / 0:00');
	  progress_level.css('width',0+'px');
	  load_level.css('width',0+'px');
	}		
	
	function stringCounter(i) {
		var s;
		if(i < 9){
			s = "0" + (i + 1);
		}else{
			s = i + 1;
		}
		return s;
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
		return " / " + minutes + ":" + seconds;
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
	
	/**
	 * Creates the grid and returns an array of points with x and y values based on passed parameters.
	 * The leftToRight addition was contributed by Skye Giordano.
	 * 
	 * @param columns An integer representing the number of columns to be created in the grid
	 * @param rows An integer representing the number of rows to be created in the grid
	 * @param xSpacing An integer representing the spacing between columns
	 * @param ySpacing An integer representing the spacing between rows
	 * @param xPadding An integer representing the padding between each column
	 * @param yPadding An integer representing the padding between each row
	 * @param leftToRight An optional boolean that creates the grid from left-to-right or top-to-bottom (default: true)
	 * 
	 * @return Array
	 */

	function createGrid(columns, rows, xSpacing, ySpacing, xPadding, yPadding, xOffset, yOffset, leftToRight) {
		
		var arr = new Array();
		var pointObj;
		var row;
		var col;
		var num = (columns * rows);

		for (var i = 0; i < num; i++) {
			pointObj = new Object();

			if (leftToRight) {
				row = (i % columns);
				col = Math.floor((i / columns));

				pointObj.x = (row * (xSpacing + xPadding)) + xOffset;
				pointObj.y = (col * (ySpacing + yPadding)) + yOffset;

			} else {
				row = (i % rows);
				col = Math.floor((i / rows));

				pointObj.x = (col * (xSpacing +xPadding)) + xOffset;
				pointObj.y = (row * (ySpacing + yPadding)) + yOffset;

			}
			arr.push(pointObj);
		}
		return arr;
	}
	
	//**************** fullscreen
	
	if(useRealFullscreen && fullscreenPossible){//firefox doesnt detect esc from fullscreen
		/*_doc.keyup(function(e) {
			console.log(e.keyCode);
			if (e.keyCode == 27) { //esc key
		  		setFullscreenIcon();
				console.log('esc , ', componentSize);
				if(componentSize== "fullscreen"){
					componentSize="normal";
					resizeComponent();	
				}
			}  
		});*/
	}
	
	function setFullscreenIcon(){
		 if ((document.fullScreenElement && document.fullScreenElement !== null) ||   
			  (!document.mozFullScreen && !document.webkitIsFullScreen)) { 
			    toggleFullscreenSrc.removeClass('in_fullscreen'); 
		  }else{
			   toggleFullscreenSrc.addClass('in_fullscreen'); 
		  }
	}
	
	function fullScreenStatus(){
		return document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen;
	}
	
	if(useRealFullscreen && fullscreenPossible){
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
	
	function toggleFullscreen(btnInitiated){
		fullscreenCount=0;
		
		if(componentSize== "normal"){
			componentSize= "fullscreen";
		}else{
			componentSize="normal";
		}
		
		if(useRealFullscreen){
			
			//!!
			//http://stackoverflow.com/questions/8427413/webkitrequestfullscreen-fails-when-passing-element-allow-keyboard-input-in-safar
			//https://github.com/martinaglv/jQuery-FullScreen/blob/master/fullscreen/jquery.fullscreen.js#L82
					
			if(fullscreenPossible || html5Support){
		   
			  if ((document.fullScreenElement && document.fullScreenElement !== null) ||    // alternative standard method
				  (!document.mozFullScreen && !document.webkitIsFullScreen)) {               // current working methods
				if (document.documentElement.requestFullScreen) {
				  document.documentElement.requestFullScreen();
				} else if (document.documentElement.mozRequestFullScreen) {
				  document.documentElement.mozRequestFullScreen();
				} else if (document.documentElement.webkitRequestFullScreen) {
				  //document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
				  document.documentElement.webkitRequestFullScreen();
				}else{
					//console.log('no fullscreen');
				}
			  } else {
				if (document.cancelFullScreen) {
				  document.cancelFullScreen();
				} else if (document.mozCancelFullScreen) {
				  document.mozCancelFullScreen();
				} else if (document.webkitCancelFullScreen) {
				  document.webkitCancelFullScreen();
				}
			  }
			}
		}
		if(!fullscreenPossible || !useRealFullscreen) {
			resizeComponent();	
		}else if(componentSize=="normal" && btnInitiated){
			resizeComponent();		
		}
	}
	
	function checkFullScreenSupport() {
	   var support=false;
		if (document.documentElement.requestFullScreen) {
		  support=true;
		} else if (document.documentElement.mozRequestFullScreen) {
		   support=true;
		} else if (document.documentElement.webkitRequestFullScreen) {
		   support=true;
		}
		return support;
	  
	}
	
	//*********** RESIZE 
	
	_window.resize(function() {
		 if(!componentInited) return;
		 if(windowResizeIntervalID) clearTimeout(windowResizeIntervalID);
		 windowResizeIntervalID = setTimeout(doneResizing, windowResizeInterval);
	});
	
	function doneResizing(){
		//console.log('doneResizing');
		if(componentSize== "fullscreen"){
			resizeComponent();	
		}
	}
	
	
	
	
	
	
	
	
	
	
	// ******************************** PUBLIC FUNCTIONS **************** //

	$.videoGallery.playMedia = function() {
		if(!componentInited) return;
		if(mediaPlaying) return;
		if(counter==-1) return;
		if(html5Support){
			if(!videoInited && !autoPlay){
				if(previewPoster) previewPoster.stop().animate({ 'opacity':0},  {duration: 500, easing: 'easeOutSine', complete:function(){
					previewPoster.remove();
					previewPoster=null;
				}});
				initVideo();
			}else{
				videoUp2Js.play();
			}
		}else{
			if(!videoInited && !autoPlay){
				if(previewPoster) previewPoster.stop().animate({ 'opacity':0},  {duration: 500, easing: 'easeOutSine', complete:function(){
					previewPoster.remove();
					previewPoster=null;
				}});
				getFlashMovie('flashPreview').pb_play(mediaPath, aspectRatio);
			}else{
				getFlashMovie('flashPreview').pb_togglePlayback2(true);
			}
		}
		videoInited=true;
	}
	
	$.videoGallery.pauseMedia = function() {
		if(!componentInited) return;
		if(counter==-1) return;
		if(!mediaPlaying) return;
		if(html5Support){
			videoUp2Js.pause();
		}else{
			getFlashMovie('flashPreview').pb_togglePlayback2(false);
		}
	}
	
	$.videoGallery.nextMedia = function() {
		if(!componentInited) return;
		if(counter==-1) return;
		
		enableActiveItem();
		counter++;
		if(counter>_playlistLength-1){
			counter=0;
			videoGalleryPlaylistEnd();
		}
		disableActiveItem();
		findMedia();
	}
	
	$.videoGallery.previousMedia = function() {
		if(!componentInited) return;
		if(counter==-1) return;
		
		enableActiveItem();
		counter--;
		if(counter<0)counter=_playlistLength-1;
		disableActiveItem();
		findMedia();
	}
	
	$.videoGallery.loadMedia = function(num) {
		if(!componentInited) return;
		if(num<0)num=0;
		else if(num > _playlistLength-1)num=_playlistLength-1;
		
		enableActiveItem();
		counter=num;
		disableActiveItem();
		findMedia();
		
	}
	
	$.videoGallery.setVolume = function(val) {
		if(!componentInited) return;
		if(val<0) val=0;
		else if(val>1) val=1;
		defaultVolume = val;
		setVolume();
	}
	
	$.videoGallery.inputPlaylist = function(id) {
		if(!componentInited) return;
		setPlaylist(id);
	}
	




	}
	
})(jQuery);





/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){jQuery.browser.mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iPad|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


	