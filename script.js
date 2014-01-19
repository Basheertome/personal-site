var colorWheel = ['#F68C1F', '#55C0A5', '#EF4D4D', '#333', '#93C84A', '#F7E261', '#3C92CF', '#514099', '#888888', 'transparent'];
var frameSpace = window.innerHeight / 2.0 - 160;
var currentFilm = '';
var wbreakPoint = 900;
var vbreakPoint = 500;

$(document).ready(function(){
	if ('ontouchstart' in document.documentElement) {
		$('html').addClass('touch');
	}
	if (window.location.hash.split('#')[1]) {
		var id = window.location.hash.split('#')[1];
		window.location.replace("#");  
		if (typeof window.history.replaceState == 'function') {
		  history.replaceState({}, '', window.location.href.slice(0, -1));
		}
		stageCue($('.navigation li a[href*="' + id + '"]'));
	}
	
	laughTrack();

	$('.scroll').click(function(){
		$(this).hide();
		stageCue($('.navigation li a[href*="hue"]'));
    });

	$('.navigation li a').hover(function(){
		openCurtain($(this));
		if (!((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement))) {
			if ($(this).parent().is(':last-child')) {
				$('body').css('background','#333333 no-repeat 55% center');
			} else {
				$('body').css('background',colorWheel[$(this).parent().index()] + ' no-repeat 55% center');
			}
		}
	}, function(){
		closeCurtain();
		$('body').css('background','rgba(0,0,0,.3)');
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
		if (currentFilm != '') {
			var thisFilm = $('.navigation li a[href*="' + currentFilm + '"]');
			var prevFilm = thisFilm.parent().prev().children();
			var nextFilm = thisFilm.parent().next().children();
			var gap = $(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').scrollTop() - (thisFilm.offset().top - (window.innerHeight / 2.0) - 52 + thisFilm.height());

			if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
				if (Math.abs(gap) <= thisFilm.height() / 2.0) {
					$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
						scrollTop: (gap - $(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').scrollTop()) * -1
					}, 100);
					if (currentFilm != '') {
						if (currentFilm != thisFilm.attr('href')) {
							currentFilm = thisFilm.attr('href');
						}
					}
					$('.stage').css('background',colorWheel[thisFilm.parent().index()]);
				} else if (gap < 0) {
					if (prevFilm.attr('href') !== undefined) {
						$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
							scrollTop: prevFilm.offset().top - (window.innerHeight / 2.0) - 60 + prevFilm.height()
						}, 100);
						if (currentFilm != '') {
							if (currentFilm != prevFilm.attr('href')) {
								currentFilm = prevFilm.attr('href');
							}
						}
						$('.stage').css('background',colorWheel[prevFilm.parent().index()]);
					}
				} else if (gap > 0) {
					if (nextFilm.attr('href') !== undefined) {
						$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
							scrollTop: nextFilm.offset().top - (window.innerHeight / 2.0) - 60 + nextFilm.height()
						}, 100);
						if (currentFilm != '') {
							if (currentFilm != nextFilm.attr('href')) {
								currentFilm = nextFilm.attr('href');
							}
						}
						$('.stage').css('background',colorWheel[nextFilm.parent().index()]);
					}
				}
			}
		} else if ($(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').scrollTop() - ($('.navigation li a[href*="hue"]').offset().top - (window.innerHeight / 2.0) - 60 + $('.navigation li a[href*="hue"]').height()) >= -1 * $('.navigation li a[href*="hue"]').height() / 2.0 && $(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').scrollTop() - ($('.navigation li a[href*="hue"]').offset().top - (window.innerHeight / 2.0) - 60 + $('.navigation li a[href*="hue"]').height()) < 0) {
			$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
				scrollTop: $('.navigation li a[href*="hue"]').offset().top - (window.innerHeight / 2.0) - 60 + $('.navigation li a[href*="hue"]').height()
			}, 100);
			currentFilm = $('.navigation li a[href*="hue"]').attr('href');
		}
	}
}));

function stageCue(member) {
	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
			scrollTop: member.offset().top - (window.innerHeight / 2.0) - 60 + member.height() - 1
		}, 100);
	}
}

function curtainCall() {
	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		var percentage = $(window).scrollTop() / frameSpace;

		if ($(window).scrollTop() < frameSpace) {
			if ($('.intro').is(':hidden')) {
				$('.intro, .frame').show();
				closeCurtain();
			}
			if (currentFilm != '') {
				currentFilm = '';
				$('.stage').css('background','transparent');
			}
			if (percentage > 0) {
				$('.frame').css('opacity',1 - percentage);
			} else {
				$('.frame').css('opacity',1);
			}
		} else if ($('.intro').is(':visible')) {
			$('.intro, .scroll, .frame').hide();
		}
	}
}

function laughTrack() {
	if ($('.navigation').css('-webkit-column-count') > 1) {
		if ($('.header h1').height() * 2 + $('.header ul').height() + 20 + ($('.navigation').height() / 2.0) < window.innerHeight) {
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

	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && 'ontouchstart' in document.documentElement && $('.navigation').css('padding-bottom') != '20px') {
		$('.navigation').css({'padding-bottom': '20px'});
	}
}

function frameScroll(that, id, direction) {
	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		if (id == 'hue' && direction == 'up') {
			currentFilm = '';
			$('.stage').css('background','transparent');
		} else {
			currentFilm = that.attr('href');
			$('.stage').css('background',colorWheel[$('.navigation li a[href*="' + id + '"]').parent().index()]);
		}
		if (id == 'visualization') {
			if (direction == 'down') {
				$('.photo').css('background-image','url("wood.jpg")');
			} else {
				$('.photo').css('background-image','url("background.jpg")');
			}
		}
	}
}

function closeCurtain() {
	$('.navigation li a').css('opacity', '1');
	$('.navigation li a span:last-child').css('opacity', '.6');
}

function openCurtain(that) {
	$('.navigation li a').css('opacity', '.35');
	that.children('span:last-child').css('opacity', '1');
	that.css('opacity', '1');
}