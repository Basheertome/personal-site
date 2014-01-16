var frameSpace = window.innerHeight / 2.0 - 160;
var breakPoint = 900;

$(document).ready(function(){
	if (window.innerWidth > breakPoint) {
		$('.navigation').css({'padding-bottom': (window.innerHeight - $('.navigation li').height()) / 2});
		curtainCall();
	} else if ($('.navigation').css('padding-bottom') != '0') {
		$('.navigation').css({'padding-bottom': 0});
	}

	$('.navigation li a').hover(function(){
		openCurtain($(this).attr('href').split('/')[1]);
		$('.stage video').css('opacity',1);
	}, function(){
		$('.stage video').css('opacity',0);
		closeCurtain();
		$('.navigation li a').css('opacity', '1');
	});

	$('.filmstrip li a').waypoint(function(direction){
		if (window.innerWidth > breakPoint) {
			stageScroll($(this), $(this).attr('id').split('-')[1], direction);
		}
	}, {
		offset: function(){
			frameSpace;
		}
	});
});

$(window).resize(function(){
	frameSpace = window.innerHeight / 2.0 - 160;

	if (window.innerWidth > breakPoint) {
		$('.navigation').css({'padding-bottom': (window.innerHeight - $('.navigation li').height()) / 2});
	} else if ($('.navigation').css('padding-bottom') != '0') {
		$('.navigation').css({'padding-bottom': 0});
	}
});

$(window).scroll(function() {
	if (window.innerWidth > breakPoint) {
		curtainCall();
	}
});

// $(window).scroll($.debounce(100, function (){
// 	var nextFilm = $('.filmstrip li').filter(function(){return $(this).css('opacity') == '1'});
// 	var gap = nextFilm.offset().top - frameSpace - $(window).scrollTop();

// 	if (window.innerWidth > breakPoint) {
// 		if ($(window).scrollTop() > frameSpace) {
// 		    if (gap < frameSpace + 320) {
// 		    	$('body').animate({
// 		    		scrollTop: nextFilm.offset().top - (window.innerHeight / 2.0) + 160
// 				}, 200);
// 		    } else {
// 		    	$('body').animate({
// 		    		scrollTop: nextFilm.prev().offset().top - (window.innerHeight / 2.0) + 160
// 				}, 200);
// 		    }
// 		}
// 	}
// }));


function curtainCall() {
	var percent = $(window).scrollTop() / frameSpace;
	if ($(window).scrollTop() < frameSpace) {
		if ($('.intro').is(':hidden')) {
			$('.intro').show();
			$('.frame').removeClass('ghost');
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
		$('.frame').addClass('ghost');
		$('.frame').css('height',120);
		$('.frame').css('bottom','calc(50% - ' + 60 + 'px)');
		$('.frame .arrow').css('opacity',1);
	}
}

function closeCurtain() {
	$('.stage video').removeAttr('poster');
	$('.stage source').removeAttr('src');
	$('.stage video').load();
	$('.stage').removeAttr('href');
}

function openCurtain(id) {
	$('.stage video').attr('poster', 'frames/' + id + '.jpg');
	$('.stage source').attr('src', 'films/' + id + '.mp4');
	$('.stage video').load();
	$('.navigation li a').css('opacity', '.2');
	$('.navigation li a[href*="' + id + '"]').css('opacity', '1');
}