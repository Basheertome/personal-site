var clocks = [];

$(document).ready(function(){

	var currentDate = new Date();

	var chiDate  = new Date("September 22, 2014 20:00:00");
	var chiDiff = chiDate.getTime() / 1000 - currentDate.getTime() / 1000;
	clocks.push($('.chi').FlipClock(chiDiff, {
		clockFace: 'DailyCounter',
		countdown: true,
		showSeconds: false
	}));

	var committeeDate  = new Date("October 1, 2014 08:00:00");
	var committeeDiff = committeeDate.getTime() / 1000 - currentDate.getTime() / 1000;
	clocks.push($('.committee').FlipClock(committeeDiff, {
		clockFace: 'DailyCounter',
		countdown: true,
		showSeconds: false
	}));

	var sponsorDate  = new Date("October 21, 2014 08:00:00");
	var sponsorDiff = sponsorDate.getTime() / 1000 - currentDate.getTime() / 1000;
	clocks.push($('.sponsor').FlipClock(sponsorDiff, {
		clockFace: 'DailyCounter',
		countdown: true,
		showSeconds: false
	}));

	var proposaldraftDate  = new Date("November 6, 2014 08:00:00");
	var proposaldraftDiff = proposaldraftDate.getTime() / 1000 - currentDate.getTime() / 1000;
	clocks.push($('.proposaldraft').FlipClock(proposaldraftDiff, {
		clockFace: 'DailyCounter',
		countdown: true,
		showSeconds: false
	}));

	var critDate  = new Date("November 17, 2014 08:00:00");
	var critDiff = critDate.getTime() / 1000 - currentDate.getTime() / 1000;
	clocks.push($('.crit').FlipClock(critDiff, {
		clockFace: 'DailyCounter',
		countdown: true,
		showSeconds: false
	}));

	var proposalfinalDate  = new Date("December 11, 2014 08:00:00");
	var proposalfinalDiff = proposalfinalDate.getTime() / 1000 - currentDate.getTime() / 1000;
	clocks.push($('.proposalfinal').FlipClock(proposalfinalDiff, {
		clockFace: 'DailyCounter',
		countdown: true,
		showSeconds: false
	}));

});