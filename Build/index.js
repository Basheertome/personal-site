var colorWheel = ['#F68C1F', '#55C0A5', '#EF4D4D', '#4d4846', '#93C84A', '#896749', '#514099', '#3C92CF', '#888888', 'transparent'];
var frameSpace = window.innerHeight / 2.0 - 160;
var currentFilm = '';
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
			stageCue($('.navigation li a[href*="' + id + '"]'));
		}
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
				$('body').css('background',colorWheel[$(this).parent().index()-1] + ' no-repeat 55% center');
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

function stageCue(member) {
	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		$(~navigator.userAgent.indexOf('Firefox') ? 'html' : 'body').animate({
			scrollTop: member.offset().top - (window.innerHeight / 2.0) - 60 + member.height() + 2
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

	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		$('.navigation').css({'padding-bottom': (window.innerHeight - $('.navigation li').height()) / 2.0});
	} else if ($('.navigation').css('padding-bottom') != '20px') {
		$('.navigation').css({'padding-bottom': '20px'});
	}
}

function frameScroll(that, id, direction) {
	if ((window.innerWidth > wbreakPoint) && (window.innerHeight > vbreakPoint) && !('ontouchstart' in document.documentElement)) {
		currentFilm = that.attr('href');
		$('.stage').css('background',colorWheel[$('.navigation li a[href*="' + id + '"]').parent().index()-1]);
		if (id == 'archive') {
			if (direction == 'down') {
				$('.photo span').css('opacity', '1');
				$('.photo').css({'-webkit-animation':'none',
								 '-moz-animation':'none',
								 'animation':'none'});
			} else {
				$('.photo span').css('opacity', '0');
				$('.photo').css({'-webkit-animation':'hover 8s ease-out infinite',
								 '-moz-animation':'hover 8s ease-out infinite',
								 'animation':'hover 8s ease-out infinite'});
			}
		}
	}
}

function closeCurtain() {
	$('.navigation li a').css('opacity', '1');
	$('.navigation li a span:last-child').css('opacity', '.6');
}

function openCurtain(that) {
	$('.navigation li a').css('opacity', '.7');
	that.children('span:last-child').css('opacity', '1');
	that.css('opacity', '1');
}