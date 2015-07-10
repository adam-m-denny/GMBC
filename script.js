var audio_files;

$(document).ready(function(){
	
	/*$(document).on('scroll', function(){
		var scrollPos = $(window).scrollTop();
		$('#background').css({'-webkit-transform' : 'translateY(' + scrollPos / 2 + 'deg)'});
		console.log("scroll");
	});*/

	$.ajax({
		url: "getAudio.php",
		method: "GET",
		dataType: "json",
		success: function(data){
			audio_files = data;
			for(var i = 2; i < audio_files.length; ++i){
				$('#audio_data').prepend("<audio preload='none'><source src='audio/" + audio_files[i] + "' type='audio/mp3' /></audio>");
				console.log("audio data inserted");
			}
			audio_handler();
		}	
	});
});
var playing = false;
function audio_handler(){
	audio = document.getElementsByTagName('audio');
	console.log(audio);
	var i = 0;
	document.getElementById('audio_download').innerHTML = "<a href='"+audio[i].currentSrc+"'></a>";
	$('#play_button').click(function(){
		var start = audio[i].currentSrc.indexOf('o/');
		var end = audio[i].currentSrc.indexOf('.mp3');
		start = start + 2;
		var title = audio[i].currentSrc.substring(start, end).replace(/%20/g, ' ');
		document.getElementById('audio_title').innerHTML = title;
		console.log(i);
		if(!playing){
			audio[i].play();
			//document.getElementById('audio_title').innerHTML += " LOADING...";
			audio[i].oncanplay = function(){
				console.log('canplay');
				//document.getElementById('audio_title').innerHTML = title;
			}
			playing = true;
			document.getElementById('play_button').style.background = "url(pause.png)";
			document.getElementById('audio_download').innerHTML = "<a href='"+audio[i].currentSrc+"'></a>";
			console.log(playing);
		} else {
			audio[i].pause();
			playing = false;
			document.getElementById('play_button').style.background = "url(play.png)";
			console.log(playing);
		}
	});
	if(audio[i].ended){
		++i;
		audio[i].play();
	}
	$('#next').click(function(){
		if(i < audio.length - 1){
			audio[i].pause();
			++i;
			audio[i].play();
			document.getElementById('audio_download').innerHTML = "<a href='"+audio[i].currentSrc+"'></a>";
			var start = audio[i].currentSrc.indexOf('o/');
			var end = audio[i].currentSrc.indexOf('.mp3');
			start = start + 2;
			document.getElementById('audio_title').innerHTML = audio[i].currentSrc.substring(start, end).replace(/%20/g, ' ');
			console.log(i);
		}
	});
	$('#prev').click(function(){
		if(i > 0){
			audio[i].pause();
			--i;
			audio[i].play();
			document.getElementById('audio_download').innerHTML = "<a href='"+audio[i].currentSrc+"'></a>";
			var start = audio[i].currentSrc.indexOf('o/');
			var end = audio[i].currentSrc.indexOf('.mp3');
			start = start + 2;
			document.getElementById('audio_title').innerHTML = audio[i].currentSrc.substring(start, end).replace(/%20/g, ' ');
			console.log(i);
		}
	});
}

var start = null;
var scrollToVisit = false;
var scrollToListen = false;
var scrollToCalendar = false;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  update();
  window.requestAnimationFrame(step);

}

window.requestAnimationFrame(step);
var scrollCurrent = $(window).scrollTop();
var visitPos;
var listenPos;
var calendarPos;

$(document).ready(function(){
	visitPos = $('#visit').offset().top;
	listenPos = $('#listen').offset().top;
	calendarPos = $('#calendar').offset().top;
});

function update(){
	scrollCurrent = $(window).scrollTop();
	if(scrollToVisit){
		var distance = scrollCurrent - (visitPos - ($(window).height() / 3));
		$(window).scrollTop(scrollCurrent - distance * 0.1);
		if(Math.abs(distance) < 10){
			scrollToVisit = false;
		}
	}
	if(scrollToListen){
		var distance = scrollCurrent - (listenPos - ($(window).height() / 3));
		$(window).scrollTop(scrollCurrent - distance * 0.1);
		if(Math.abs(distance) < 10){
			scrollToListen = false;
		}
	}
	if(scrollToCalendar){
		var distance = scrollCurrent - (calendarPos - 40);
		console.log(distance);
		$(window).scrollTop(scrollCurrent - distance * 0.1);
		if(Math.abs(distance) < 10){
			scrollToCalendar = false;
		}
	}
}

function visit(){
	scrollToVisit = true;
}

function listen(){
	scrollToListen = true;
}

function calendar(){
	scrollToCalendar = true;
}

function canPlay(){
}