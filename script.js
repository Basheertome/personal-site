var frameSpace = window.innerHeight / 2.0 - 160;
var breakPoint = 900;
var frameOver = false;

$(document).ready(function(){
	if (window.innerWidth > breakPoint) {
		$('.navigation').css({'padding-bottom': (window.innerHeight - $('.navigation li').height()) / 2});
		curtainCall();
	} else if ($('.navigation').css('padding-bottom') != '0') {
		$('.navigation').css({'padding-bottom': 0});
	}

	$('.navigation li a, .frame').hover(function(){
		frameOver = true;
		openCurtain($(this).attr('href').split('/')[1]);
		$('.stage video').css('opacity',1);
	}, function(){
		frameOver = false;
		$('.stage video').css('opacity',0);
		closeCurtain();
		$('.navigation li a').css('opacity', '1');
	});

	$('.navigation li a').waypoint(function(direction){
		if (window.innerWidth > breakPoint) {
			$('.frame').attr('href',$(this).attr('href'));
		}
	}, {
		offset: function(){
			return frameSpace + 220 - $(this).height();
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

$(window).scroll($.debounce(100, function (){
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
			console.log(prevFilm.attr('href'));
			$('body').animate({
				scrollTop: prevFilm.offset().top - (window.innerHeight / 2.0) - 60 + prevFilm.height()
			}, 100);
			$('.frame').attr('href',prevFilm.attr('href'));
		} else if (gap > 0) {
			console.log(nextFilm.attr('href'));
			$('body').animate({
				scrollTop: nextFilm.offset().top - (window.innerHeight / 2.0) - 60 + nextFilm.height()
			}, 100);
			$('.frame').attr('href',nextFilm.attr('href'));
		}
		if (frameOver) {
			openCurtain(thisFilm.attr('href').split('/')[1]);
			$('.stage video').css('opacity',1);
		}
	}
}));


function curtainCall() {
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