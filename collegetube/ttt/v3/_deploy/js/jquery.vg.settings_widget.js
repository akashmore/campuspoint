/* FLASH EMBED PART */

var jsReady = false;//flash vars

var flashvars = {},params = {},attributes = {};
attributes.id = "flashMain";
params.quality = "high";
params.scale = "noscale";
params.salign = "tl";
params.wmode = "transparent";
params.bgcolor = "#111111";
params.devicefont = "false";
params.allowfullscreen = "true";
params.allowscriptaccess = "always";
swfobject.embedSWF("preview.swf", "flashMain", "100%", "100%", "9.0.0", "expressInstall.swf", flashvars, params, attributes);

var flashvars2 = {},params2 = {},attributes2 = {};
attributes2.id = "flashPreview";
params2.quality = "high";
params2.scale = "noscale";
params2.salign = "tl";
params2.wmode = "transparent";
params2.bgcolor = "#111111";
params2.devicefont = "false";
params2.allowfullscreen = "true";
params2.allowscriptaccess = "always";
swfobject.embedSWF("preview2.swf", "flashPreview", "100%", "100%", "9.0.0", "expressInstall.swf", flashvars2, params2, attributes2);

//******** functions called from flash
function isReady() {return jsReady;}
/*main flash callbacks*/
function flashVideoEnd() {player1.flashVideoEnd(); }
function flashVideoStart() {player1.flashVideoStart(); }
function flashVideoPause() {player1.flashVideoPause(); }
function flashVideoResume() {player1.flashVideoResume();}
function dataUpdateFlash(bl,bt,t,d) {player1.dataUpdateFlash(bl,bt,t,d);}
/*preview flash callbacks*/
function flashPreviewVideoStart() {player1.flashPreviewVideoStart(); }

/* END FLASH EMBED PART */



/* SETTINGS */

var vplp_settings = {
	
	/* playlistHolder: dom elements which holds list of playlists */
	playlistHolder: '.playlistData',
	
	/* useDeeplink: true, false */
	useDeeplink:true,
	/*activePlaylist: Active playlist to start with. If no deeplink is used, enter element 'id' attribute, or if deeplink is used enter deeplink string like 'playlist1'.  */
	activePlaylist:'playlist1',
	/*activeItem: Active video to start with. If no deeplink is used, enter number, -1 = no video loaded, 0 = first video, 1 = second video etc, or if deeplink is used enter deeplink string like 'video01'.  */
	activeItem:'local1',
	
	/* GENERAL SETTINGS */
	/*autoHideControls: auto hide player controls on mouse out: true/false. Defaults to false on mobile. */
	autoHideControls:false,
	/*defaultVolume: 0-1 */
	defaultVolume:0.5,
	/*autoPlay: true/false (defaults to false on mobile)*/
	autoPlay:true,
	/*randomPlay: true/false */
	randomPlay:false,
	/* loopingOn: on playlist end rewind to beginning (last item in playlist) */
	loopingOn: true,
	/*autoAdvanceToNextVideo: true/false (use this to loop video) */
	autoAdvanceToNextVideo:true,
	/*autoOpenDescription: true/false  */
	autoOpenDescription:false,
	/*useLivePreview: true/false (if true, you need small videos for preview for local videos, otherwise thumbnails). Defaults to false on mobile. */
	useLivePreview:false,
	/*useWebmVideoFormat: true/false (Browser support for html5 video requires minimum of 2 video formats to cover all browsers, mp4 and ogv being preffered. Use web video format instead of a ogv.) */
	useWebmVideoFormat:false,
	/*aspectRatio: video aspect ratio (0 = original, 1 = fit inside, 2 = fit outside). */
	aspectRatio: 2,
	
	/*closePlaylistOnVideoSelect: true/false (close playlist when video is selected) */
	closePlaylistOnVideoSelect:false,
	/*playlistOrientation: vertical/horizontal  */
	playlistOrientation:'vertical',
	/*playlistHidden: true/false (leaves css display none on 'playlistHolder' element) */
	playlistHidden:true,
	/*playlistType: list/wall  */
	playlistType:'list',
	/*scrollType: scroll/buttons  */
	scrollType:'buttons',
	/* outputPlaylistData: console.log out playlist data */
	outputPlaylistData:false,
	
	/* YOUTUBE SETTINGS */
	/*autoMakePlaylistThumb: true/false (auto make thumb for each video) */
	autoMakePlaylistThumb:true,
	/*autoMakePlaylistInfo: true/false (auto make title and description for each video) */
	autoMakePlaylistInfo:true,
	/* useYoutubeHighestQuality: true/false (use highest available quality for youtube video, if false, then it set to default)  */
	useYoutubeHighestQuality:false,
	
	/*flashPreview: id of the flash preview movie (for playlist) */
	flashPreview:'#flashPreview',
	/*flashMain: id of the flash main movie (for video) */
	flashMain:'#flashMain',
	
	/*previewPath: folder replacement path for the preview data */
	previewPath:'/preview/',
	/*wallPath: folder replacement path for the wall data */
	wallPath:'/wall/'
};


