$(document).ready(function(){
	if ('ontouchstart' in document.documentElement) {
		$('html').addClass('touch');
	}
	$(window).scroll(function(event) { 
		percent = 1 - (($(window).scrollTop() / $('.intro').height()*2));
		$('.intro').css({'opacity': percent});
	});
});