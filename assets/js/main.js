/*
	Massively by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
	// Cache elements
	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$nav = $('#nav'),
		$main = $('#main'),
		$navPanelToggle, $navPanel, $navPanelInner;

	// Breakpoints for responsive design
	breakpoints({
		default:   ['1681px', null],
		xlarge:    ['1281px', '1680px'],
		large:     ['981px', '1280px'],
		medium:    ['737px', '980px'],
		small:     ['481px', '736px'],
		xsmall:    ['361px', '480px'],
		xxsmall:   [null, '360px']
	});

	// Parallax scrolling effect for background images
	$.fn._parallax = function(intensity = 0.25) {
		var $window = $(window),
			$this = $(this);

		if (!this.length || intensity === 0) return $this;

		if (this.length > 1) {
			this.each(function() { $(this)._parallax(intensity); });
			return $this;
		}

		$this.each(function() {
			var $t = $(this),
				$bg = $('<div class="bg"></div>').appendTo($t);

			var on = function() {
				$bg.removeClass('fixed').css('transform', 'matrix(1,0,0,1,0,0)');
				$window.on('scroll._parallax', function() {
					var pos = parseInt($window.scrollTop()) - parseInt($t.position().top);
					$bg.css('transform', `matrix(1,0,0,1,0,${pos * intensity})`);
				});
			};

			var off = function() {
				$bg.addClass('fixed').css('transform', 'none');
				$window.off('scroll._parallax');
			};

			if (browser.name == 'ie' || browser.name == 'edge' || window.devicePixelRatio > 1 || browser.mobile) off();
			else {
				breakpoints.on('>large', on);
				breakpoints.on('<=large', off);
			}
		});

		$window.off('load._parallax resize._parallax').on('load._parallax resize._parallax', function() {
			$window.trigger('scroll');
		});

		return $(this);
	};

	// Play initial animations on page load
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Scrolly initialization
	$('.scrolly').scrolly();

	// Apply parallax to the wrapper background
	$wrapper._parallax(0.925);

	// Navigation panel toggle and functionality
	$navPanelToggle = $('<a href="#navPanel" id="navPanelToggle">Menu</a>').appendTo($wrapper);

	// Change toggle styling when header scrolls past a point
	$header.scrollex({
		bottom: '5vh',
		enter: function() { $navPanelToggle.removeClass('alt'); },
		leave: function() { $navPanelToggle.addClass('alt'); }
	});

	// Create the navigation panel
	$navPanel = $('<div id="navPanel"><nav></nav><a href="#navPanel" class="close"></a></div>')
		.appendTo($body)
		.panel({
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right',
			target: $body,
			visibleClass: 'is-navPanel-visible'
		});

	$navPanelInner = $navPanel.children('nav');

	// Move nav content based on screen size
	var $navContent = $nav.children();
	breakpoints.on('>medium', function() {
		$navContent.appendTo($nav);
		$nav.find('.icons, .icon').removeClass('alt');
	});
	breakpoints.on('<=medium', function() {
		$navContent.appendTo($navPanelInner);
		$navPanelInner.find('.icons, .icon').addClass('alt');
	});

	// Disable transitions on older versions of WP
	if (browser.os == 'wp' && browser.osVersion < 10) {
		$navPanel.css('transition', 'none');
	}

	// Intro section visibility management
	var $intro = $('#intro');
	if ($intro.length > 0) {
		// Fix flex min-height issue on IE
		if (browser.name == 'ie') {
			$window.on('resize.ie-intro-fix', function() {
				var h = $intro.height();
				$intro.css('height', h > $window.height() ? 'auto' : h);
			}).trigger('resize.ie-intro-fix');
		}

		// Hide intro on scroll for larger screens
		breakpoints.on('>small', function() {
			$main.unscrollex();
			$main.scrollex({
				mode: 'bottom',
				top: '25vh',
				bottom: '-50vh',
				enter: function() { $intro.addClass('hidden'); },
				leave: function() { $intro.removeClass('hidden'); }
			});
		});

		// Hide intro on scroll for smaller screens
		breakpoints.on('<=small', function() {
			$main.unscrollex();
			$main.scrollex({
				mode: 'middle',
				top: '15vh',
				bottom: '-15vh',
				enter: function() { $intro.addClass('hidden'); },
				leave: function() { $intro.removeClass('hidden'); }
			});
		});
	}
})(jQuery);
