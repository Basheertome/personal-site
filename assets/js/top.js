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
		that = $(this);
		$(this).next().find('iframe').load(function(){
			thisVideo = $f($(this)[0]);
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