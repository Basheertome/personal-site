function goPresent(thumbnails) {
	$('body').addClass('present');
	if (!($('.centered-btns').length > 0) && $('.slideshow').length > 0) {
		$('.slideshow').waypoint('destroy');
		startSlides($('.slideshow'));
	}

	$('html').css('background-color', '#000');

	if ('ontouchstart' in document.documentElement) {
		var a=document.getElementsByTagName("a");
		for (var i=0;i<a.length;i++) {
		    a[i].onclick=function() {
		        window.location=this.getAttribute("href");
		        return false
		    }
		}

		$.getScript('../assets/js/fastclick.js', function() {
			FastClick.attach(document.body);
		});

		$('body').append('<span class="toptouch"></span><span class="lefttouch"></span><span class="righttouch"></span><span class="bottomtouch"></span><span class="tlcornertouch"></span><span class="trcornertouch"></span>');
		$('.toptouch').click(function(e) {
			$(document).trigger({type: 'keydown', which: 13, keyCode: 38});
		});
		$('.lefttouch').click(function(e) {
			$(document).trigger({type: 'keydown', which: 13, keyCode: 37});
		});
		$('.righttouch').click(function(e) {
			$(document).trigger({type: 'keydown', which: 13, keyCode: 39});
		});
		$('.bottomtouch').click(function(e) {
			$(document).trigger({type: 'keydown', which: 13, keyCode: 40});
		});
		$('.tlcornertouch').click(function(e) {
			$(document).trigger({type: 'keydown', which: 13, keyCode: 13});
		});
		$('.trcornertouch').click(function(e) {
			$(document).trigger({type: 'keydown', which: 13, keyCode: 27});
		});
	}

	$('.next a').attr('href', $('.next a').attr('href') + '#present');
	$('.previous a').attr('href', $('.previous a').attr('href') + '#present');
	$('.thumbnails a').each(function(i, item) {
		$(item).attr('href', $(item).attr('href') + '#present');
	});

	$('body, html').animate({
		scrollTop: 0,
		scrollLeft: 0
	})

	$(window).blur(function() {
		function focusit(){
		    if (document.activeElement) {
		    	document.activeElement.blur();
		    	clearInterval(focusit);
		    }
		}
		setInterval(focusit, 100);
	});

	$(window).bind('touchmove', function(e) {
			e.preventDefault();
	});

	$(window).on('mousewheel DOMMouseScroll', function(e) {
		e.preventDefault();
	});

	if ((navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) || ('ontouchstart' in document.documentElement)) {
		// For Safari and iOS
		$('body.present .page section').css('overflow', 'scroll');
	}

	$(document).keydown(function(e) {
		if ($('section').length > 0) {
			slide = Math.floor(($('body').scrollLeft() + $('html').scrollLeft()) / $(window).width()) - 1;
			if (e.keyCode == 32 || e.keyCode == 39) {
				// Spacebar or Right Arrow
				e.preventDefault();
				if ($('section').length - 1 > slide) {
					$('body, html').animate({scrollLeft: $($('section')[slide + 1]).offset().left});
				}
			}
			if (e.keyCode == 37) {
				// Left Arrow
				e.preventDefault();
				if (slide == 0) {
					$('body, html').animate({scrollLeft: 0});
				} else if (slide > 0) {
					$('body, html').animate({scrollLeft: $($('section')[slide - 1]).offset().left});
				}
			}
			if (e.keyCode == 38) {
				// Up Arrow
				e.preventDefault();
				if ($('body > .previous a').length > 0) {
					$('body > .previous a')[0].click();
				} else {
					window.location = '/#projects-present';
				}
			}
			if (e.keyCode == 40) {
				// Down Arrow
				e.preventDefault();
				if ($('body > .next a').length > 0) {
					$('body > .next a')[0].click();
				} else {
					window.location = '/#projects-present';
				}
			}
			if (e.keyCode == 27) {
				// Escape
				if (window.location.hash.length > 0) {
					window.location = window.location.hash.split('#')[0];
				}
			}
			if (e.keyCode == 13) {
				// Enter
				window.location = '/#projects-present';
			}
		} else {
			if (e.keyCode == 37) {
				// Left Arrow
				if (($('body').scrollLeft() + $('html').scrollLeft()) > 100) {
					$('body, html').animate({scrollLeft: 0});
				}
			}
			if (e.keyCode == 32 || e.keyCode == 39) {
				// Spacebar or Right Arrow
				e.preventDefault();
				$('body, html').animate({scrollLeft: $('.intro').width()});
			}
			if (e.keyCode == 38) {
				// Up Arrow
				e.preventDefault();
				window.location = '/bitsnbobs/#present';
			}
			if (e.keyCode == 40) {
				// Down Arrow
				e.preventDefault();
				window.location = '/hue/#present';
			}
			if (e.keyCode == 27) {
				// Escape
				window.location = '/';
			}
		}
	});

	slide = -1;

	$(window).resize(function() {
		resizeTransform();
	});
	resizeTransform();

	if (thumbnails) {
		$('body, html').animate({scrollLeft: $('.intro').width()});
	}

	if (window.location.hash.split('#')[1] != 'present') {
		window.location.hash = 'present';
	}
}

function resizeTransform() {
	if ($('section').length > 0) {
		if ($('.top').height() > $(window).height()) {
			var margin = $(window).height() - $('.top').height();
			$('.top-image').css({
				'margin-top': margin + 'px'
			});
			$('.top').css({
				'padding-bottom' : 50 + 'px'
			});
		} else {
			$('.top').css('height', '100vh');
		}

		$('section').each(function(i, item) {
			if ($(item).has('.columns').length > 0) {
				var resized = ($(item).width() / $(item).find('.columns').width()) * 0.8;
				$(item).find('article').css({
					'-webkit-transform': 'translateY(-50%) scale(' + resized + ')',
					'-moz-transform': 'translateY(-50%) scale(' + resized + ')',
					'transform': 'translateY(-50%) scale(' + resized + ')'
				});
			}
			if ($(item).has('.video').length > 0) {
				var resized = $(item).width() / 900;
				$(item).find('.description').css({
					'-webkit-transform': 'scale(' + resized + ')',
					'-moz-transform': 'scale(' + resized + ')',
					'transform': 'scale(' + resized + ')'
				});
			}
		});

		if (slide == -1) {
			$('body, html').animate({scrollLeft: 0});
		} else if (slide > -1) {
			$('body, html').animate({scrollLeft: $($('section')[slide]).offset().left});
		}
	} else {
		var bioscale = $(window).width() / 1000;
		$('.firefly, .bio').css({
			'-webkit-transform': 'scale(' + bioscale + ')',
			'-moz-transform': 'scale(' + bioscale + ')',
			'transform': 'scale(' + bioscale + ')'
		});
		var resized = ($(window).height() / $('.wrapper').height()) * 0.9;
		$('.page').css({
			'-webkit-transform': 'translateY(-50%) scale(' + resized + ')',
			'-moz-transform': 'translateY(-50%) scale(' + resized + ')',
			'transform': 'translateY(-50%) scale(' + resized + ')'
		});
	}
}