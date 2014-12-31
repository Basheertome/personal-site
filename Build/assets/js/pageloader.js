/**
 *
 * @author	Benoit Asselin <contact(at)ab-d(dot)fr>
 * @version	javascript.js, 2012/12/31
 *
 */

var characters = ['&#x2B16;', '&#x2B18;', '&#x2B17;', '&#x2B19;'];

var colors = {
	index: ['#EF4D4D', '#3C92CF', '#93C84A', '#F68C1F', '#55C0A5', '#2242FF', '#514099'],
	about: ['#e6e6e6', '#e7e7e7', '#f9f9f9', '#f6f6f6', '#f5f5f5', '#9b9b9b', '#a0a0a0'],
	resume: ['#d1d1d1', '#d2d2d2', '#e9e9e9', '#e5e5e5', '#e3e3e3', '#8b8b8b', '#909090'],
	hue: ['#c86d0f', '#c76f14', '#ed9b45', '#f68c1f', '#dd8e3d', '#814201', '#7b460e'],
	cardinal: ['#f74b4b', '#f24e4e', '#ff8686', '#ff7979', '#f37979', '#e20d0d', '#b52323'],
	chroma: ['#ef4d4d', '#eb5151', '#ff8686', '#ff7979', '#f37878', '#d31313', '#a62929'],
	instinct: ['#23aa88', '#29a989', '#5bd0b3', '#33d5ac', '#55c0a5', '#037155', '#0d6f56'],
	fuse: ['#63a010', '#66a017', '#93c84a', '#82c820', '#88b844', '#3b6501', '#3e6606'],
	glass: ['#ffffff', '#eb5a4f', '#77736c', '#4d4946', '#47b7e6'],
	visualization: ['#816ae4', '#826be1', '#ac9afa', '#a38ff5', '#9f8cef', '#5134cb', '#514099'],
	fabrication: ['#fffb7e', '#fffb83', '#fffec3', '#fffd9c', '#fffebe', '#ece278', '#ece37d'],
	electronics: ['#3792d2', '#3c92cf', '#6cbbf4', '#57b5f8', '#63ade2', '#0562a4', '#1a5e8f'],
	screen: ['#6077ff', '#6277fa', '#97a6ff', '#8a9bff', '#8797f9', '#2242ff', '#3248cb'],
	archive: ['#6d5743', '#6e5846', '#8c7969', '#8a6e55', '#817061', '#473322', '#453528']
};

(function($) {

	/**
	 * Loader de page
	 */

	$.pageLoader = function() {
		// Selection des images en src="
		var $elements = $('body').find('img[src]');
		// Selection des images en background-image
		$('body [style]').each(function() {
			var src = $(this).css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
			if(src && src != 'none') {
				$elements = $elements.add($('<img src="' + src + '"/>'));
			}
		});
		
		var $chargement = $('.loading');
		var $chargementInfos = $('.loading-infos');
		var elementsCharges = 0;
		var dureeMs = 1000;
		
		function animateStep(now, fx) {
			$chargementInfos.text(parseInt(now)+'%');
		}
		
		function chargementEnCours() {
			var pourcentage = 0;
			if($elements.length) {
				pourcentage = parseInt((elementsCharges / $elements.length) * 100);
			}
			
			// Affichage du pourcentage
			$chargementInfos
				.stop() // stop les anciennes animations
				.animate({width:pourcentage + '%'}, dureeMs);
			$chargement
				.stop() // stop les anciennes animations
				.animate({pourcentage:pourcentage}, {
					duration: dureeMs,
					step: animateStep
				});
		}
		
		function chargementTermine() {
			var pourcentage = 100;
			
			// Affichage du pourcentage
			$chargementInfos
				.stop() // stop les anciennes animations
				.animate({width:pourcentage + '%'}, (dureeMs / 2));
			$chargement
				.stop() // stop les anciennes animations
				.animate({pourcentage:pourcentage}, {
					duration: (dureeMs / 2),
					step: animateStep
				})
				// Disparition du chargement et affichage de la page
				.css({opacity: 1})
				.animate({opacity: 0}, function() {
					// La page est prete
					$chargement.css({display:'none'});
					$('#container')
						.css({
							opacity: 0,
							visibility:'visible'
						})
						.animate({opacity:1});
				});
			
		}
		
		// La page contient des elements permettant d'afficher une barre de progression
		if($elements.length) {
			chargementEnCours();
			
			$elements.load(function() {
				$(this).off('load');
				elementsCharges++;
				chargementEnCours();
			});
		}
		
		$(window).load(function() {
			// La page est integralement chargee
			chargementTermine();
		});

		if (window.location.href.split('/')[3].length > 0 && window.location.hash.split('#')[1] === undefined) {
			loop = setInterval(function() {
				$('.loader').html(characters[Math.floor(Math.random() * characters.length)]).css('color', colors[window.location.href.split('/')[3]][Math.floor(Math.random() * colors[window.location.href.split('/')[3]].length)]);
			}, 50);
		} else {
			loop = setInterval(function() {
				$('.loader').html(characters[Math.floor(Math.random() * characters.length)]).css('color', colors.index[Math.floor(Math.random() * colors.index.length)]);
			}, 50);
		}
		
	};
	
})(jQuery);
