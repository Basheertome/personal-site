$.getScript('http://www.youtube.com/player_api', function() {
	var player;

	function onYouTubePlayerAPIReady() {
		player = new YT.Player('ytplayer');
	}
});