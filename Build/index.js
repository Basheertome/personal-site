var wbreakPoint = 900;
var vbreakPoint = 500;

$(document).ready(function(){
	if ('ontouchstart' in document.documentElement) {
		$('html').addClass('touch');
	}

	if (window.location.hash.split('#')[1] != undefined) {
		var id = window.location.hash.split('#')[1];
		window.location.replace("#");  
		if (typeof window.history.replaceState == 'function') {
		  history.replaceState({}, '', window.location.href.slice(0, -1));
		}
		if ($('.navigation li a[href*="' + id + '"]').offset() != undefined) {
			cueLights();
		}
	}

	curtainCall();

	$('.navigation li a').mousemove($.throttle(100, function (e){
		var parentOffset = $(this).parent().offset();
		var dx = .02 * $(this).innerWidth();
		var dy = .02 * $(this).innerHeight();
		var x = ((e.pageX - parentOffset.left - ($(this).innerWidth() / 2)) / $(this).innerWidth()) * dx;
		var y = ((e.pageY - parentOffset.top - ($(this).innerHeight() / 2)) / $(this).innerHeight()) * dy;
		$(this).children('.bw, .color').animate({'top' : -y + 'px',
											 'left': -x + 'px'}, 100);
	}));

	$('.scroll').click(function(){
		cueLights();
    });
});

function cueLights() {
	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
			scrollTop: window.innerHeight - 80
		}, 200);
	}
}

$(window).resize($.throttle(100, function(){ curtainCall(); }));
$(window).scroll($.throttle(100, function(){ curtainCall(); }));
function curtainCall() {
	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		var percentage = $(window).scrollTop() / window.innerHeight;
		if (percentage < 0) {
			if ($('.frame').css('opacity') != 1) {
				$('.frame').animate({'opacity': 1}, 100);
			}
		} else if (percentage > .5) {
			if ($('.frame').css('opacity') != 0) {
				$('.frame').animate({'opacity': 0}, 100);
			}
		} else {
			$('.frame').animate({'opacity': 1 - (percentage*2)}, 100);
		}

		if (percentage < .5) {
			if ($('.navigation li .bw').css('opacity') != 1) {
				$('.navigation li .bw').animate({'opacity': 1}, 100);
			}
		} else if (percentage > .75) {
			if ($('.navigation li .bw').css('opacity') != 0) {
				$('.navigation li .bw').animate({'opacity': 0}, 100);
			}
		} else {
			$('.navigation li .bw').animate({'opacity': 2 - (percentage*2)}, 100);
		}
	} else {
		if ($('.frame').css('opacity') != 1) {
			$('.frame').animate({'opacity': 1}, 100);
		}
		if ($('.navigation li .bw').css('opacity') != 0) {
			$('.navigation li .bw').animate({'opacity': 0}, 100);
		}
	}
}