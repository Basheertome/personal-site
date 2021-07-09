$(document).ready(function(){	
	if ('ontouchstart' in document.documentElement) {
		$('html').addClass('touch');
	} else {
		hoverx = 8;

		$('.intro h2 span').mouseover(function(event) {
			hoverg = mouseX(event, $(this));
			$('.aboutimage').animate({'opacity': 1}, 75);
		}).mouseleave(function(event) {
			$('.aboutimage').animate({'opacity': 0}, 150);
		});

		$('.intro h2 span').mousemove(function(event) {
			var x = mouseX(event, $(this));

			if (x > hoverg) {
				hoverx -= 1;
				hoverg = x;
			} else if (x < hoverg) {
				hoverx += 1;
				hoverg = x;
			}

			if (hoverx < 0) {
				hoverx = 0;
			} else if (hoverx > 18) {
				hoverx = 18;
			}

			$('.aboutimage').css({'background-position': (hoverx * -1 * $('.aboutimage').width())});
		});

		$(window).resize(function(event) { 
			$('.aboutimage').css({'background-position': (hoverx * -1 * $('.aboutimage').width())});
		});

		$('.aboutimage').css('background-image', 'url("assets/images/me.jpg")');
	}

	$('.gallery').bind('touchend', function(e) {
		e.preventDefault();
		$(this).children().each(function() {
			let index = $(this).css('z-index');
			if (index < 3) {
				index++;
			} else {
				index = 1;
			}
			$(this).css('z-index', index);
		});
	});
});

function mouseX(event, that) {
	return (Math.floor((event.pageX - that.offset().left) / that.width() * 18)) - 1;
}