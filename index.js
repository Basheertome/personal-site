$(document).ready(function(){
	
	$('.intro').animate({'opacity': 1}, 1000);

	if ('ontouchstart' in document.documentElement) {
		$('html').addClass('touch');
	} else {
		hoverx = 8;

		$('.bio h2 span').mouseover(function(event) {
			hoverg = mouseX(event, $(this));
			$('.aboutimage').animate({'opacity': 1}, 75);
		}).mouseleave(function(event) {
			$('.aboutimage').animate({'opacity': 0}, 150);
		});

		$('.bio h2 span').mousemove(function(event) {
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

	if (window.location.hash.split('#')[1] == 'daydream') {
		toggleDaydream()
	}

	$('#daydream').click(function(event) {
		event.preventDefault();
		toggleDaydream();
	});

	if (window.location.hash.split('#')[1] == 'pixelbuds') {
		togglePixelbuds()
	}

	$('#pixelbuds').click(function(event) {
		event.preventDefault();
		togglePixelbuds();
	});

});

function toggleDaydream() {
	var daydreamState = !$('.daydream').is(':hidden');

	$('.gallery div').each(function(i){
		$(this).hide();
	});

	if (daydreamState) {
		$('body').removeClass('gvisible');
	} else {
		$('.daydream').css("display","block");
		$('body').addClass('gvisible');
	}
	$('html, body').animate({scrollTop: "+=200"});
}

function togglePixelbuds() {
	var pixelbudsState = !$('.pixelbuds').is(':hidden');

	$('.gallery div').each(function(i){
		$(this).hide();
	});

	if (pixelbudsState) {
		$('body').removeClass('gvisible');
	} else {
		$('.pixelbuds').css("display","block");
		$('body').addClass('gvisible');
	}
	$('html, body').animate({scrollTop: "+=200"});
}

function mouseX(event, that) {
	return (Math.floor((event.pageX - that.offset().left) / that.width() * 18)) - 1;
}