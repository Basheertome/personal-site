$(window).scroll(function() {
	var speed = 5;
	percent = Math.round($(window).scrollTop() / (($(document).height()-$(window).height())/7)*speed) * 94;
	offset = percent - (Math.floor(percent/846) * 846);
	$('.horse').css({'background-position': 'center -' + offset + 'px'});
});