$(document).ready(function(){
	$('.scroll').delay(5000).animate({opacity: 1}, 700);

	$('.filmstrip').css({'margin-top': window.innerHeight / 2.0 - 30});
	$('.filmstrip span').css({'height': window.innerHeight / 2.0 - 160});
	$(window).resize(function(){
		$('.filmstrip').css({'margin-top': window.innerHeight / 2.0 - 30});
		$('.filmstrip span').css({'height': window.innerHeight / 2.0 - 160});
	});

	$('.filmstrip li').waypoint(function(direction){
		stageScroll($(this).attr('id'), direction);
	}, { offset: function(){return window.innerHeight / 2 - 160}});

	$('.photo').css('opacity',1 - $(window).scrollTop() / 100.0);
	$(window).scroll(function() {
		$('.photo').css('opacity',1 - $(window).scrollTop() / 100.0);
	});
});

function stageScroll(id, direction) {
	if ((id == "intro") && (direction == "down")) {
		$('#intro').css('z-index','1');
		$('.nav-positioner').css('z-index','2');
		$('.navigation li a').css('opacity', '.2');
		$('.stage-positioner').css('cursor', 'pointer');
		$('.scroll').hide();
		$('.meta').show();
	} else if ((id == "intro") && (direction == "up")) {
		$('#intro').css('z-index','3');
		$('.nav-positioner').css('z-index','0');
		$('.navigation li a').css('opacity', '.2');
		$('.stage-positioner').css('cursor', 'default');
		$('.stage video').hide();
		$('.meta').hide();
	} else if (direction == "down") {
		if ($('.stage source').attr('src') != 'films/' + id.split('-')[1] + '.mp4') {
			$('.stage video').attr('poster', 'frames/' + id.split('-')[1] + '.jpg');
			$('.stage source').attr('src', 'films/' + id.split('-')[1] + '.mp4');
			$('.meta .title').html(id.split('-')[1]);
			$('.meta .description').html($('#' + id + ' img').attr('alt'));
			$('.stage video').load().show();
		} else if ($('.stage video').is(":hidden")) {
			$('.stage video').load().show();
		}
		$('.navigation li a').css('opacity', '.2');
		$('#nav-' + id.split('-')[1] + ' a').css('opacity', '1');
	} else if (direction == "up") {
		if ($('.stage source').attr('src') != 'films/' + id.split('-')[1] + '.mp4') {
			$('.stage video').attr('poster', 'frames/' + id.split('-')[1] + '.jpg');
			$('.stage source').attr('src', 'films/' + id.split('-')[1] + '.mp4');
			$('.meta .title').html(id.split('-')[1]);
			$('.meta .description').html($('#' + id + ' img').attr('alt'));
			$('.stage video').load().show();
		}
		$('.navigation li a').css('opacity', '.2');
		$('#nav-' + id.split('-')[1] + ' a').css('opacity', '1');
	}
}