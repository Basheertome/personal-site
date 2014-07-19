var colorWheel = ['#F68C1F', '#55C0A5', '#EF4D4D', '#4d4846', '#93C84A', '#896749', '#514099', '#3C92CF', '#888888', 'transparent'];

$(window).scroll(function() {
	percent = Math.round($(window).scrollTop() / (($(document).height()-$(window).height())/7)*1.5) * 94;
	offset = percent - (Math.floor(percent/846) * 846);
	$('.horse').css({'background-position': 'center -' + offset + 'px'});
});