var frameSpace = window.innerHeight / 2.0 - 160;
var breakPoint = 900;
var frameOver = false;

$(document).ready(function(){
	laughTrack();

	$('.navigation li a, .frame').hover(function(){
		if (window.innerWidth > breakPoint) {
			frameOver = true;
			if ($(window).scrollTop() < frameSpace) {
				$('.frame').removeAttr('href');
			}
			if ($(this).attr('href')) {
				openCurtain($(this).attr('href').split('/')[1]);
			}
		} else {
			$('.navigation li a').css('opacity','.2');
			$(this).css('opacity','1');
		}
	}, function(){
		if (window.innerWidth > breakPoint) {
			frameOver = false;
			closeCurtain();
		} else {
			$('.navigation li a').css('opacity','1');
		}
	});

	$('.navigation li a').waypoint(function(direction){
		frameScroll($(this), $(this).attr('href').split('/')[1], direction);
	}, {
		offset: function(){
			return frameSpace + 220 - $(this).height();
		}
	});
});

$(window).resize(function(){
	frameSpace = window.innerHeight / 2.0 - 160;

	laughTrack();

	curtainCall();
});

$(window).scroll(function() {
	curtainCall();
});

$(window).scroll($.debounce(100, function (){
	if (window.innerWidth > breakPoint) {
		if ($('.frame').attr('href')) {
			var thisFilm = $('.navigation li a[href*="' + $('.frame').attr('href') + '"]');
			var prevFilm = thisFilm.parent().prev().children();
			var nextFilm = thisFilm.parent().next().children();
			var gap = $('body').scrollTop() - (thisFilm.offset().top - (window.innerHeight / 2.0) - 60 + thisFilm.height());

			if (window.innerWidth > breakPoint) {
				if (Math.abs(gap) <= thisFilm.height() / 2.0) {
					$('body').animate({
						scrollTop: (gap - $('body').scrollTop()) * -1
					}, 100);
					$('.frame').attr('href',thisFilm.attr('href'));
				} else if (gap < 0) {
					if (prevFilm.attr('href') !== undefined) {
						$('body').animate({
							scrollTop: prevFilm.offset().top - (window.innerHeight / 2.0) - 60 + prevFilm.height()
						}, 100);
						$('.frame').attr('href',prevFilm.attr('href'));
					}
				} else if (gap > 0) {
					if (nextFilm.attr('href') !== undefined) {
						$('body').animate({
							scrollTop: nextFilm.offset().top - (window.innerHeight / 2.0) - 60 + nextFilm.height()
						}, 100);
						$('.frame').attr('href',nextFilm.attr('href'));
					}
				}
				if (frameOver) {
					openCurtain(thisFilm.attr('href').split('/')[1]);
				}
			}
		} else if ($('body').scrollTop() - ($('.navigation li a[href*="hue"]').offset().top - (window.innerHeight / 2.0) - 60 + $('.navigation li a[href*="hue"]').height()) >= -1 * $('.navigation li a[href*="hue"]').height() / 2.0 && $('body').scrollTop() - ($('.navigation li a[href*="hue"]').offset().top - (window.innerHeight / 2.0) - 60 + $('.navigation li a[href*="hue"]').height()) < 0) {
			$('body').animate({
				scrollTop: $('.navigation li a[href*="hue"]').offset().top - (window.innerHeight / 2.0) - 60 + $('.navigation li a[href*="hue"]').height()
			}, 100);
			$('.frame').attr('href',$('.navigation li a[href*="hue"]').attr('href'));
		}
	}
}));


function curtainCall() {
	if (window.innerWidth > breakPoint) {
		var percent = $(window).scrollTop() / frameSpace;

		if ($(window).scrollTop() < frameSpace) {
			if ($('.intro').is(':hidden')) {
				$('.intro').show();
				$('.frame .arrow').css('opacity',0);
				closeCurtain();
			}
			if (percent > 0) {
				$('.intro').css('opacity',1 - percent);
				$('.frame').css('height',320-200*percent);
				$('.frame').css('bottom','calc(50% - 160px + ' + 100*percent + 'px)');
			} else {
				$('.intro').css('opacity',1);
				$('.frame').css('height',320);
				$('.frame').css('bottom','calc(50% - ' + 160 + 'px)');
			}
		} else if ($('.intro').is(':visible')) {
			$('.intro').hide();
			$('.frame').css('height',120);
			$('.frame').css('bottom','calc(50% - ' + 60 + 'px)');
			$('.frame .arrow').css('opacity',1);
		}
	}
}

function laughTrack() {
	if (window.innerWidth > breakPoint) {
		$('.navigation').css({'padding-bottom': (window.innerHeight - $('.navigation li').height()) / 2});
		if ($('.stage video').width() < window.innerWidth) {
			$('.stage video').removeAttr('height');
			$('.stage video').attr('width','100%');
			$('.stage video').css('left',0);
		} else {
			$('.stage video').removeAttr('width');
			$('.stage video').attr('height','100%');
			$('.stage video').css('left',-1 * ($('.stage video').width()-window.innerWidth));
		}
		curtainCall();
	} else if ($('.navigation').css('padding-bottom') != '20px') {
		$('.navigation').css({'padding-bottom': '20px'});
	}
}

function frameScroll(that, id, direction) {
	if (window.innerWidth > breakPoint) {
		if (id == 'hue' && direction == 'up') {
			$('.frame').removeAttr('href');
		} else {
			$('.frame').attr('href',that.attr('href'));
		}
	}
}

function closeCurtain() {
	$('.stage video').css('opacity',0);
	$('.stage video').removeAttr('poster');
	$('.stage source').removeAttr('src');
	$('.stage video').load();
	$('.stage').removeAttr('href');
	$('.stage video').css('opacity',0);

	$('.navigation li a').css('opacity', '1');
}

function openCurtain(id) {
	$('.stage video').attr('poster', 'frames/' + id + '.jpg');
	$('.stage source').attr('src', 'films/' + id + '.mp4');
	$('.stage video').load();
	$('.stage video').delay(50).queue(function(){
		$(this).css('opacity', '1');
		$(this).dequeue();
	});

	$('.navigation li a').css('opacity', '.2');
	$('.navigation li a[href*="' + id + '"]').css('opacity', '1');
}