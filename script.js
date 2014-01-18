var colorWheel = ['#F68C1F', '#55C0A5', '#EF4D4D', '#93C84A', '#F7E261', '#3C92CF', '#514099', '#E83791', '#888888', '#333333'];
var frameSpace = window.innerHeight / 2.0 - 160;
var wbreakPoint = 900;
var vbreakPoint = 500;
var frameOver = false;

$(document).ready(function(){
	if ('ontouchstart' in document.documentElement) {
		$('html').addClass('touch');
	}

	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		$('.scroll').click(function(){
			$(this).hide();
			$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
				scrollTop: $('.navigation li a[href*="hue"]').offset().top - (window.innerHeight / 2.0) - 60 + $('.navigation li a[href*="hue"]').height() + 5
			}, 100);
	    });
	}

	laughTrack();

	$('.navigation li a, .frame').hover(function(){
		if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
			frameOver = true;
			if ($(window).scrollTop() < frameSpace) {
				$('.frame').removeAttr('href');
			}
			if ($(this).attr('href')) {
				openCurtain($(this).attr('href').split('/')[1]);
			}
		} else {
			$('.navigation li a').css('opacity','.5');
			$(this).css('opacity','1');
			$('body').css('background',colorWheel[$(this).parent().index()] + ' no-repeat 55% center');
		}
	}, function(){
		if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
			frameOver = false;
			closeCurtain();
		} else {
			$('.navigation li a').css('opacity','1');
			$('body').css('background','rgba(0,0,0,.3)');
		}
	});

	$('.navigation li a').waypoint(function(direction){
		frameScroll($(this), $(this).attr('href').split('/')[1], direction);
	}, {
		offset: function(){
			return frameSpace + 220 - $(this).height();
		}
	});

	$.html5Loader({
		filesToLoad: 'loader.json',
		onBeforeLoad: function(){},
		onComplete: function(){},
		onElementLoaded: function(obj, elm){},
		onUpdate: function(percentage){}
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
	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		if ($('.frame').attr('href')) {
			var thisFilm = $('.navigation li a[href*="' + $('.frame').attr('href') + '"]');
			var prevFilm = thisFilm.parent().prev().children();
			var nextFilm = thisFilm.parent().next().children();
			var gap = $(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').scrollTop() - (thisFilm.offset().top - (window.innerHeight / 2.0) - 52 + thisFilm.height());

			if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
				if (Math.abs(gap) <= thisFilm.height() / 2.0) {
					$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
						scrollTop: (gap - $(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').scrollTop()) * -1
					}, 100);
					$('.frame').attr('href',thisFilm.attr('href'));
					if ($('.frame').attr('href') == '/photography') {
						$('.frame').attr('target','_blank');
					} else {
						$('.frame').removeAttr('target');
					}
					$('.stage').css('background',colorWheel[thisFilm.parent().index()]);
				} else if (gap < 0) {
					if (prevFilm.attr('href') !== undefined) {
						$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
							scrollTop: prevFilm.offset().top - (window.innerHeight / 2.0) - 60 + prevFilm.height()
						}, 100);
						$('.frame').attr('href',prevFilm.attr('href'));
						if ($('.frame').attr('href') == '/photography') {
							$('.frame').attr('target','_blank');
						} else {
							$('.frame').removeAttr('target');
						}
						$('.stage').css('background',colorWheel[prevFilm.parent().index()]);
					}
				} else if (gap > 0) {
					if (nextFilm.attr('href') !== undefined) {
						$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
							scrollTop: nextFilm.offset().top - (window.innerHeight / 2.0) - 60 + nextFilm.height()
						}, 100);
						$('.frame').attr('href',nextFilm.attr('href'));
						if ($('.frame').attr('href') == '/photography') {
							$('.frame').attr('target','_blank');
						} else {
							$('.frame').removeAttr('target');
						}
						$('.stage').css('background',colorWheel[nextFilm.parent().index()]);
					}
				}
				if (frameOver) {
					openCurtain(thisFilm.attr('href').split('/')[1]);
				}
			}
		} else if ($(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').scrollTop() - ($('.navigation li a[href*="hue"]').offset().top - (window.innerHeight / 2.0) - 60 + $('.navigation li a[href*="hue"]').height()) >= -1 * $('.navigation li a[href*="hue"]').height() / 2.0 && $(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').scrollTop() - ($('.navigation li a[href*="hue"]').offset().top - (window.innerHeight / 2.0) - 60 + $('.navigation li a[href*="hue"]').height()) < 0) {
			$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
				scrollTop: $('.navigation li a[href*="hue"]').offset().top - (window.innerHeight / 2.0) - 60 + $('.navigation li a[href*="hue"]').height()
			}, 100);
			$('.frame').attr('href',$('.navigation li a[href*="hue"]').attr('href'));
			if ($('.frame').attr('href') == '/photography') {
				$('.frame').attr('target','_blank');
			} else {
				$('.frame').removeAttr('target');
			}
		}
	}
}));


function curtainCall() {
	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
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
			$('.intro, .scroll').hide();
			$('.frame').css('height',120);
			$('.frame').css('bottom','calc(50% - ' + 60 + 'px)');
			$('.frame .arrow').css('opacity',1);
		}
	}
}

function laughTrack() {
	if ($('.navigation').css('-webkit-column-count') > 1) {
		if ($('.header h1').height() * 2 + $('.header ul').height() + 20 + ($('.navigation').height() / 2) < window.innerHeight) {
			$('html').css('height', '100%');
		} else {
			$('html').css('height', 'auto');
		}
	} else {
		if ($('.header h1').height() * 2 + $('.header ul').height() + 20 + $('.navigation').height() < window.innerHeight) {
			$('html').css('height', '100%');
		} else {
			$('html').css('height', 'auto');
		}
	}

	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
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
	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		if (id == 'hue' && direction == 'up') {
			$('.frame').removeAttr('href');
			$('.stage').css('background','transparent');
		} else {
			$('.frame').attr('href',that.attr('href'));
			$('.stage').css('background',colorWheel[$('.navigation li a[href*="' + id + '"]').parent().index()]);
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
		$(this).css('opacity', '.5');
		$(this).dequeue();
	});

	$('.navigation li a').css('opacity', '.2');
	$('.navigation li a[href*="' + id + '"]').css('opacity', '1');
}