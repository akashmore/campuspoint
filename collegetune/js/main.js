var audio;
//hide pause button
$('#pause').hide();

//initialise
initAudio($('#playlist li:first-child'));

//initialiser function

function initAudio(element){
	
		var song = element.attr('song');
		//var title=element.text();
		var cover=element.attr('cover');
		//var artist=element.attr('artist');
		
		
		//create audio object
		audio=new Audio('media/'+song);
		
		if(!audio.currentTime){
			
			$('#duration').html('0.00');
		}
		
		//$('#audio-player .title').text(title);
		//$('#audio-player .artist').text(artist);
				
		//insert cover$
		$('img.cover').attr('src','img/covers/'+cover);
		
		$('#playlist li').removeClass('active');
		element.addClass('active');

}
//play songs on click
$('#one').click(function(){
	
	audio.pause();
	
	var	next=$('#playlist li:first-child');
	
	$('#play').hide();
	$('#pause').show();
	initAudio(next);
	audio.play();
		$('#duration').fadeIn(400);
	showDuration();
	
	
});
$('#two').click(function(){
	
	audio.pause();
	
	var	next=$('#playlist li:nth-child(2)');
	
	$('#play').hide();
	$('#pause').show();
	initAudio(next);
	audio.play();
		$('#duration').fadeIn(400);
	showDuration();
	
	
});

$('#three').click(function(){
	
	audio.pause();
	
	var	next=$('#playlist li:nth-child(3)');
	
	$('#play').hide();
	$('#pause').show();
	initAudio(next);
	audio.play();
		$('#duration').fadeIn(400);
	showDuration();
	
	
});

$('#four').click(function(){
	
	audio.pause();
	
	var	next=$('#playlist li:nth-child(4)');
	
	$('#play').hide();
	$('#pause').show();
	initAudio(next);
	audio.play();
		$('#duration').fadeIn(400);
	showDuration();
	
	
});

$('#five').click(function(){
	
	audio.pause();
	
	var	next=$('#playlist li:nth-child(5)');
	
	$('#play').hide();
	$('#pause').show();
	initAudio(next);
	audio.play();
		$('#duration').fadeIn(400);
	showDuration();
	
	
});

$('#six').click(function(){
	
	audio.pause();
	
	var	next=$('#playlist li:nth-child(6)');
	
	$('#play').hide();
	$('#pause').show();
	initAudio(next);
	audio.play();
		$('#duration').fadeIn(400);
	showDuration();
	
	
});


$('#seven').click(function(){
	
	audio.pause();
	
	var	next=$('#playlist li:nth-child(7)');
	
	$('#play').hide();
	$('#pause').show();
	initAudio(next);
	audio.play();
		$('#duration').fadeIn(400);
	showDuration();
	
	
});

$('#eight').click(function(){
	
	audio.pause();
	
	var	next=$('#playlist li:nth-child(8)');
	
	$('#play').hide();
	$('#pause').show();
	initAudio(next);
	audio.play();
		$('#duration').fadeIn(400);
	showDuration();
	
	
});





//play button
$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
	
	
});



//pause button
$('#pause').click(function(){
	
	audio.pause();
	$('#pause').hide();
	$('#play').show();
	
});

//stop function
$('#stop').click(function(){
	audio.pause();
	audio.currentTime=0;
	$('#pause').hide();
	$('#play').show();
	$('duration').fadeOut(400);
	
});

//next button
$('#next').click(function(){
	audio.pause();
	var next=$('#playlist li.active').next();
	if(next.length==0){
		next=$('#playlist li:first-child');
	}
	$('#play').hide();
	$('#pause').show();
	initAudio(next);
	audio.play();
		$('#duration').fadeIn(400);
	showDuration();
});

//prev button

$('#prev').click(function(){
	audio.pause();
	var prev=$('#playlist li.active').prev();
	if(prev.length==0){
		prev=$('#playlist li:last-child');
	}
	$('#play').hide();
	$('#pause').show();
	initAudio(prev);
		$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});

//volume controls
$('#volume').change(function(){
		audio.volume=parseFloat(this.value/10);
});
$('#progress').click(function(){
//	var value=0;
			//if(audio.currentTime>0){
			audio.play=parseFloat(this.value/10);
			
	//	}
		//		$('#progress').css('width',value+'%');
	
});


//time duration
function showDuration(){
	
	$(audio).bind('timeupdate',function(){
		//get hours and minutes
		var s=parseInt(audio.currentTime % 60);
		var m=parseInt(audio.currentTime /60) % 60;
		//add 0 if less than 10
		if(s < 10){
			s='0'+s;
			
		}
		$('#duration').html(m+'.'+s);
		var value=0;
		if(audio.currentTime>0){
			value=Math.floor((100 / audio.duration)*audio.currentTime);
			
		}
		$('#progress').css('width',value+'%');
	});
}
