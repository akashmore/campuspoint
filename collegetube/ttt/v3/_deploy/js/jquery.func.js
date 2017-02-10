
/* DEFAULTS */

var audio = document.createElement('audio'), mp3Support, oggSupport, html5Support=false;
if (audio.canPlayType) {
	html5Support=true;
	mp3Support = !!audio.canPlayType && "" != audio.canPlayType('audio/mpeg');
	oggSupport = !!audio.canPlayType && "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
}



var isMobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));
var isIOS=false, agent = navigator.userAgent;
var isAndroid = agent.indexOf("Android") > -1;
var isiPhoneIpod = agent.indexOf('iPhone') > -1 || agent.indexOf('iPod') > -1;
var isiPad = agent.indexOf('iPad') > -1;
if(agent.indexOf('iPhone') > -1 || agent.indexOf('iPod') > -1 || agent.indexOf('iPad') > -1) {
	 isIOS=true;
}
var mobile_type;
if (agent.indexOf('iPhone') > -1 || agent.indexOf('iPod') > -1 || agent.indexOf('iPad') > -1) {
	if(agent.indexOf('iPhone') > -1)mobile_type = 'iPhone';
	else if(agent.indexOf('iPod') > -1)mobile_type = 'iPod';
	else if(agent.indexOf('iPad') > -1)mobile_type = 'iPad';
}

/*
window.onorientationchange = detectOrientation;
function detectOrientation(){
	if(typeof window.onorientationchange != 'undefined'){
		//alert(window.orientation);
		if ( orientation == 0 ) {
			ipadOrientation='portrait';
			//Do Something In Portrait Mode
			// alert('Portrait 0');
		}
		else if ( orientation == 90 ) {
			ipadOrientation='landscape';
			 //Do Something In Landscape Mode
			 //alert('Landscape 90 The screen is turned to the left.');
		}
		else if ( orientation == -90 ) {
			ipadOrientation='landscape';
			 //Do Something In Landscape Mode
			 //alert('Landscape -90 The screen is turned to the right.');
		}
		else if ( orientation == 180 ) {
			ipadOrientation='portrait';
			 //Do Something In Portrait Mode
			 //alert('Portrait 180 Upside down portrait.');
		}
	}
}
*/


//http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var isChrome = !isSafari && testCSS('WebkitTransform');
var isOpera = !!(window.opera && window.opera.version);
function testCSS(prop) {
	return prop in document.documentElement.style;
}


var isIE = false, ieBelow9 = false, ieBelow8 = false;
var ie_check = getInternetExplorerVersion();
if (ie_check != -1){
	isIE = true;
	if(ie_check < 9)ieBelow9 = true;
	if(ie_check < 8)ieBelow8 = true;
} 


function getInternetExplorerVersion(){
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
	var ua = navigator.userAgent;
	var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if (re.exec(ua) != null)
	  rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
	var ua = navigator.userAgent;
	var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
	if (re.exec(ua) != null)
	  rv = parseFloat( RegExp.$1 );
  }
  return rv;
}

/* END DEFAULTS */
