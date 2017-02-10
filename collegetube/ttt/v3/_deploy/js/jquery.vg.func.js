


/* API CALLS */

function api_togglePlayback(){
	/* play/stop active media */
	if(player1)player1.togglePlayback(); 
}
function api_nextMedia(){
	/* play next media */
	if(player1)player1.nextMedia(); 
}
function api_previousMedia(){
	/* play previous media */
	if(player1)player1.previousMedia(); 
}
function api_setVolume(val){
	/* set volume (0-1) */
	if(player1)player1.setVolume(val); 
}
function api_togglePlaylist(){
	/* toggle playlist */
	if(player1)player1.togglePlaylist(); 
}
function api_toggleDescription(){
	/* toggle description */
	if(player1)player1.toggleDescription(); 
}
function api_destroyMedia(){
	/* destroy media */
	if(player1)player1.destroyMedia(); 
}
function api_loadMedia(id){
	/* load media/playlist:
	if useDeeplink: 
		pass deeplink url as string (single or two level).
		load playlist example (single level): player1.loadMedia('playlist0'), 
		load media example (two level): player1.loadMedia('playlist1/youtube_single1').
	no Deeplink: 
		for media pass number, counting starts from 0,
		for playlist pass element 'id' attribute. 
		load playlist example: player1.loadMedia('playlist1'), 
		load media example: player1.loadMedia(3) 
		
		Examples:
		- no Deeplink examples:  
		player1.loadMedia(0);//load media 1
		player1.loadMedia(1);//load media 2
		player1.loadMedia(2);//load media 3
		player1.loadMedia(3);//load media 4
		player1.loadMedia(4);//load media 5
		
		- Deeplink examples: 
		player1.loadMedia('playlist1/local2');//load deeplink (two levels)
		player1.loadMedia('playlist1/local4');
		player1.loadMedia('playlist2/youtube_single1');
		player1.loadMedia('playlist2/youtube_single5');
		player1.loadMedia('playlist3/youtube_single6');
		player1.loadMedia('playlist3/youtube_playlist1');
		
		player1.loadMedia('playlist1'); //load deeplink (single level)
		player1.loadMedia('playlist2'); 
		player1.loadMedia('playlist3'); 
		*/
	if(player1)player1.loadMedia(id); 
}
function api_cleanPreviewVideo(){
	/* if useLivePreview = true, call this to clean active preview item if needed */
	if(player1)player1.cleanPreviewVideo(); 
}



/* CALLBACKS */

function videoGallerySetupDone(){
	//console.log('videoGallerySetupDone');
}

function videoGalleryPlaylistEnd(){
	//console.log('videoGalleryPlaylistEnd');
}

function itemTriggered(num){
	//returns number of item clicked (counting starts from zero)
	//console.log('itemTriggered: ', num);
	if(pl_type != 'wall') return false;//trigger only on wall layout
	if(num==3 || num ==6){
		var r = parseInt(num,10)+1;
		//alert used for wall layout
		alert('This is a callback. You have clicked on video number: '+ r + '. You can run your own actions now!');
	}
}



/* COMPONENT INIT */

//player instances
var player1, pl_type, use_dpl;  
jQuery(document).ready(function($) {
	jsReady = true;
	//init component
	pl_type = vplp_settings.playlistType;
	use_dpl = vplp_settings.useDeeplink;
	player1 = $('.componentWrapper').videoGallery(vplp_settings);
	vplp_settings = null;
	
	if($("#lp_playlist").length){
		if(!isMobile && !ieBelow8){
			/*http://www.bulgaria-web-developers.com/projects/javascript/selectbox/*/
			$("#lp_playlist").selectbox({
				onChange: function (val, inst) {
					//console.log(val, inst);
					//append second level since we are using deeplinking (not necessary but we do it anyway to auto load first video)
					if(use_dpl){
						if(val == 'playlist1') val +='/local1';
						else if(val == 'playlist2') val +='/youtube_single1';
						else if(val == 'playlist3') val +='/youtube_playlist1';
					}
					api_loadMedia(val);
				}
			});
		}else{//we want default mobile scroll on selectbox
			$('#lp_playlist').change(function() {
				var val = $(this).val();
				if(use_dpl){
					if(val == 'playlist1') val +='/local1';
					else if(val == 'playlist2') val +='/youtube_single1';
					else if(val == 'playlist3') val +='/youtube_playlist1';
				}
				api_loadMedia(val);
			});
		}
	}

});





