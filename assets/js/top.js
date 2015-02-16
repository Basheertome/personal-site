$.getScript('http://a.vimeocdn.com/js/froogaloop2.min.js');

$(document).ready(function(){
	if ('ontouchstart' in document.documentElement) {
		$('.video .poster').hide();
		startSlides($('.slideshow'));
	} else {
	    $('.slideshow').waypoint(function() {
			startSlides($(this));
		}, {
			triggerOnce: 'true',
			offset: 'bottom-in-view'
		});
	}

	$('.page').fitVids();
	$('.video .poster').each(function(){
		var that = $(this);
		$(this).next().find('iframe').load(function(){
			var thisVideo = $f($(this)[0]);
			thisVideo.addEvent('ready', function(){
				thisVideo.addEvent('finish', function() {
					that.fadeIn();
				});
			});
		})
	});

	$('.video .poster').click(function(){
		$(this).fadeOut();
		thisVideo = $f($(this).next().find('iframe')[0]);
		if ($(this).next().find('iframe').attr('id') == 'ytplayer') {
			player.playVideo();
		} else {
			thisVideo.api('play');
		}
	});

	$('.header h1 a').hover(function(){
		$(this).html('<span>←</span> Project List');
		$(window).on('keydown', function(e) {
			if (e.keyCode == 27) {
				// Escape
				e.preventDefault();
				goPresent();
			}
		});
	}, function() {
		$(this).html('Basheer Tome');
		$(window).off('keydown');
	});

	if (window.location.hash.split('#')[1] == 'present') {
		goPresent();
	}
});

function startSlides(that) {
	if ($('.slideshow').length > 0) {
		that.responsiveSlides({
			speed: 500,
			pager: true,
			nav: true,
			pause: true,
			pauseControls: true,
			maxwidth: 900,
			namespace: "centered-btns"
		});
	}
}