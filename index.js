$(document).ready(function(){
	$('.horse').hover(function() {
		$('.horse').css({'background-position': 'center -' + 188 + 'px'});
	}, function() {
		horse_scroll();
	});
});

$(window).scroll(function() {
	horse_scroll();
});

function horse_scroll() {
	var speed = 5;
	percent = Math.round($(window).scrollTop() / (($(document).height()-$(window).height())/7)*speed) * 94;
	offset = percent - (Math.floor(percent/846) * 846);
	$('.horse').css({'background-position': 'center -' + offset + 'px'});
}