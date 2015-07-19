$(document).ready(function(){

	if (window.location.hash.split('#')[1] == 'projects') {
		window.location.replace("#");  
		if (typeof window.history.replaceState == 'function') {
		  history.replaceState({}, '', window.location.href.slice(0, -1));
		}
		$(window).scrollTop($('.intro').height()-100);
	}

    $('.arrow').click(function() {
    	$('body, html').animate({scrollTop: $('.intro').height()-100});
    });

    $('audio')[0].addEventListener('playing', function() {
    	$('.mute').fadeIn();
    });
    $('.mute').click(function() {
    	var audiostate = $('audio')[0].muted;
    	if (audiostate == true) {
    		$('audio')[0].muted = false;
    		for (var i=0; i<20; i++) {
    			$('.mute').animate({'background-position-x': -912+i*48 + 'px'}, 0).delay(30);
    		}
    	} else {
    		$('audio')[0].muted = true;
    		for (var i=0; i<20; i++) {
    			$('.mute').animate({'background-position-x': i*-48 + 'px'}, 0).delay(30);
    		}
    	}
    });

	$('.intro').animate({'opacity': 1}, 1000);

	if ('ontouchstart' in document.documentElement) {
		$('html').addClass('touch');
	}

	$(window).scroll(function(event) { 
		percent = 1 - (($(window).scrollTop() / $('.intro').height()*2));
		if (percent >= 1) {
			$('.intro').css({'opacity': 1});
		} else if (percent >= 0) {
			$('.intro').css({'opacity': percent});
		} else { $('.intro').css({'opacity': 0}); }
	});

	hoverx = new Array($('.thumbnails').find('a').length);
	for (var i=0; i<hoverx.length; i++) {
		hoverx[i] = [$('.thumbnails').find('a').eq(i).attr('href'), 8];
	}

	$('.thumbnails a .thumbimage').mouseover(function(event) {
		hoverg = mouseX(event, $(this));
	});

	$('.thumbnails a .thumbimage').mousemove(function(event) {
		var name = $(this).parent().attr('href');
		var x = mouseX(event, $(this));

		if (x > hoverg) {
			hoverxi(name, hoverxo(name) + 1);
			hoverg = x;
		} else if (x < hoverg) {
			hoverxi(name, hoverxo(name) - 1);
			hoverg = x;
		}

		if (hoverxo(name) < 0) {
			hoverxi(name,  0);
		} else if (hoverxo(name) > 18) {
			hoverxi(name, 18);
		}

		$(this).css({'background-position': (hoverxo(name) * -300)});
	});

	$('.header h1 a').hover(function(){
		$(window).on('keydown', function(e) {
			if (e.keyCode == 27) {
				// Escape
				e.preventDefault();
				goPresent();
			}
		});
	}, function() {
		$(window).off('keydown');
	});

	if (window.location.hash.split('#')[1] == 'present') {
		goPresent();
	} else if (window.location.hash.split('#')[1] == 'projects-present') {
		goPresent('projects');
	}

});

function mouseX(event, that) {
	return (Math.floor((event.pageX - that.offset().left) / 300 * 18)) - 1;
}

function hoverxo(id) {
	for (i = 0; i < hoverx.length; i++) {
		if (hoverx[i][0] === id) {
			return hoverx[i][1];
		}
	}
}

function hoverxi(id, number) {
	for (i = 0; i < hoverx.length; i++) {
		if (hoverx[i][0] === id) {
			hoverx[i][1] = number;
			return number;
		}
	}
	return null;
}