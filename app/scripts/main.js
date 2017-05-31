(function($){

	'use strict';

	/* ---------------------------------------------- /*
	 * Preloader -- Need To Add
	/* ---------------------------------------------- */

	$(window).on('load', function(){
		$('.loader').fadeOut();
		$('.page-loader').delay(350).fadeOut('slow');
	});

	$(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Initialization general scripts for all pages
		/* ---------------------------------------------- */

		var moduleHero  = $('#hero'),
			navbar      = $('.navbar-custom'),
			filters     = $('#filters'),
			itemsgrid   = $('#items-grid'),
			modules     = $('.module-hero, .module, .module-small'),
			windowWidth = Math.max($(window).width(), window.innerWidth),
			navbatTrans,
			mobileTest;

		/* ---------------------------------------------- /*
		 * Mobile detect
		/* ---------------------------------------------- */

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobileTest = true;
		} else {
			mobileTest = false;
		}

		navbarCheck(navbar);

		$(window).resize(function() {
			var windowWidth = Math.max($(window).width(), window.innerWidth);
			buildModuleHero();
			hoverDropdown(windowWidth, mobileTest);
		});

		$(window).scroll(function() {
			navbarAnimation(navbar, moduleHero);
		}).scroll();

		/* ---------------------------------------------- /*
		 * Setting background of modules
		/* ---------------------------------------------- */

		modules.each(function() {
			if ($(this).attr('data-background')) {
				$(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
			}
		});

		/* ---------------------------------------------- /*
		 * Check first module overlay/ Slider overlay
		/* ---------------------------------------------- */

		if (navbar.next().hasClass('bg-dark') || navbar.next().hasClass('bg-dark-30') || navbar.next().hasClass('bg-dark-60') || navbar.next().hasClass('bg-dark-30')) {
					navbar.addClass('navbar-dark');
				} else {
					navbar.removeClass('navbar-dark');
				}

				var currentslide = $('#slides').superslides('current');

				var slidesContainer = [];
				$('.slides-container li').each(function () {
					slidesContainer.push($(this));
				});

				if (currentslide === 0) {
					if (slidesContainer[currentslide].hasClass('bg-dark') || slidesContainer[currentslide].hasClass('bg-dark-30') || slidesContainer[currentslide].hasClass('bg-dark-60') || slidesContainer[currentslide].hasClass('bg-dark-90')) {
						navbar.addClass('navbar-dark');
					} else {
						navbar.removeClass('navbar-dark');
					}
				}

				$(document).on('animated.slides', function() {
					currentslide = $('#slides').superslides('current');
					if (slidesContainer[currentslide].hasClass('bg-dark') || slidesContainer[currentslide].hasClass('bg-dark-30') || slidesContainer[currentslide].hasClass('bg-dark-60') || slidesContainer[currentslide].hasClass('bg-dark-90')) {
						navbar.addClass('navbar-dark');
					} else {
						navbar.removeClass('navbar-dark');
					}
				});

		/* ---------------------------------------------- /*
		 * Full height module
		/* ---------------------------------------------- */

		function buildModuleHero() {
			if (moduleHero.length > 0) {
				if (moduleHero.hasClass('module-full-height')) {
					moduleHero.height($(window).height());
				} else {
					moduleHero.height($(window).height() * 0.85);
				}
			}
		}
		/* ---------------------------------------------- /*
		 * Transparent navbar animation
		/* ---------------------------------------------- */

		function navbarCheck() {
			if (navbar.length > 0 && navbar.hasClass('navbar-transparent')) {
				navbatTrans = true;
			} else {
				navbatTrans = false;
			}
		}

		function navbarAnimation(navbar, moduleHero) {
			var topScroll = $(window).scrollTop();
			if (navbar.length > 0 && navbatTrans !== false) {
				if (topScroll >= 5) {
					navbar.removeClass('navbar-transparent');
				} else {
					navbar.addClass('navbar-transparent');
				}
			}
		}

		/* ---------------------------------------------- /*
		 * Navbar submenu
		/* ---------------------------------------------- */

		$(window).on('resize', function() {

			var width = Math.max($(window).width(), window.innerWidth);

			if (width > 767) {
				$('.navbar-custom .navbar-nav > li.dropdown').hover(function() {
					var menuLeftOffset  = $('.dropdown-menu', $(this)).offset().left;
					var
						maxWidth1    = 0,
						maxWidth2    = 0,
						menuLevelOne = $(this).children('.dropdown-menu'),
						menuLevelTwo = $('.dropdown-menu', menuLevelOne),
						menuLevelOneWidth,
						menuLevelTwoWidth;

					menuLevelOne.each(function() {
						if ($(this).width() > maxWidth1) {
							menuLevelOneWidth = $(this).width();
						}
					});

					menuLevelTwo.each(function() {
						if ($(this).width() > maxWidth2) {
							menuLevelTwoWidth = $(this).width();
						}
					});

					if (typeof menuLevelTwoWidth === 'undefined') {
						menuLevelTwoWidth = 0;
					}

					if (width - menuLeftOffset - menuLevelOneWidth < menuLevelOneWidth + 20) {
						$(this).children('.dropdown-menu').addClass('leftauto');

						if (menuLevelTwo.length > 0) {
							if (width - menuLeftOffset - menuLevelOneWidth < menuLevelTwoWidth + 20) {
								menuLevelTwo.addClass('left-side');
							} else {
								menuLevelTwo.removeClass('left-side');
							}
						}
					} else {
						$(this).children('.dropdown-menu').removeClass('leftauto');
					}
				});
			}
		}).resize();

		/* ---------------------------------------------- /*
		 * Navbar hover dropdown on desktop
		/* ---------------------------------------------- */

		function hoverDropdown(width, mobileTest) {
			if ((width > 767) && (mobileTest !== true)) {
				$('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').removeClass('open');
				var delay = 0;
				var setTimeoutConst;
				$('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').hover(function() {
					var $this = $(this);
					setTimeoutConst = setTimeout(function() {
						$this.addClass('open');
						$this.find('.dropdown-toggle').addClass('disabled');
					}, delay);
				},
				function() {
					clearTimeout(setTimeoutConst);
					$(this).removeClass('open');
					$(this).find('.dropdown-toggle').removeClass('disabled');
				});
			} else {
				$('.navbar-custom .navbar-nav > li.dropdown, .navbar-custom li.dropdown > ul > li.dropdown').unbind('mouseenter mouseleave');
				$('.navbar-custom [data-toggle=dropdown]').not('.binded').addClass('binded').on('click', function(event) {
					event.preventDefault();
					event.stopPropagation();
					$(this).parent().siblings().removeClass('open');
					$(this).parent().siblings().find('[data-toggle=dropdown]').parent().removeClass('open');
					$(this).parent().toggleClass('open');
				});
			}
		}

		/* ---------------------------------------------- /*
		 * Portfolio
		/* ---------------------------------------------- */

		var itemsgrid_mode = 'packery';

		$('a', filters).on('click', function() {
			var selector = $(this).attr('data-filter');

			$('.current', filters).removeClass('current');
			$(this).addClass('current');
			itemsgrid.isotope({
				filter: selector
			});

			return false;
		});

		$(window).on('resize', function() {

			var windowWidth    = Math.max($(window).width(), window.innerWidth),
				itemWidht      = $('.gridsize').width(),
				itemHeight     = Math.floor(itemWidht * 0.95),
				itemTallHeight = itemHeight * 2;

			if (windowWidth > 500) {
				$('.portfolio-item', itemsgrid).each(function() {
					if ($(this).hasClass('tall')) {
						$(this).css({
							height : itemTallHeight
						});

					} else {
						$(this).css({
							height : itemHeight
						});
					}
				});
			} else {
				$('.portfolio-item', itemsgrid).each(function() {
					if ($(this).hasClass('tall')) {
						$(this).css({
							height : itemTallHeight
						});
					} else {
						$(this).css({
							height : itemHeight
						});
					}
				});
			}

			itemsgrid.imagesLoaded(function() {
				itemsgrid.isotope({
					layoutMode: itemsgrid_mode,
					itemSelector: '.portfolio-item',
					transitionDuration: '0.3s',
					packery: {
						columnWidth: '.gridsize',
					},
				});
			});

		}).resize();

		/* ---------------------------------------------- /*
		 * WOW Animation
		/* ---------------------------------------------- */

		var wow = new WOW({
			mobile: false
		});

		wow.init();

		/* ---------------------------------------------- /*
		 * Scroll Animation
		/* ---------------------------------------------- */

		$('.section-scroll').bind('click', function(e) {
			var anchor = $(this);

			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);

			e.preventDefault();
		});

		/* ---------------------------------------------- /*
		 * Scroll top
		/* ---------------------------------------------- */

		$(window).scroll(function() {
			if ($(this).scrollTop() > 100) {
				$('.back-top').fadeIn();
			} else {
				$('.back-top').fadeOut();
			}
		});

		$('a[href="#goUp"]').click(function() {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			return false;
		});

	});

})(jQuery);
