(function($){

	'use strict';

	/* ---------------------------------------------- /*
	 * Load
	/* ---------------------------------------------- */

	$(window).on('load', function(){
		$('.loader').fadeOut();
		$('.page-loader').delay(350).fadeOut('slow');
	});

  $(document).ready(function() {

		/* ---------------------------------------------- /*
		 * Initialize Scripts for sectioned pages
		/* ---------------------------------------------- */

	var moduleBanner  = $('#banner'),
			slider        = $('#slides'),
			navbar        = $('.navbar-custom'),
			filters       = $('#filters'),
			itemsgrid     = $('#items-grid'),
			modules       = $('.module-banner, .module, .module-small'),
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
			buildModuleBanner();
			hoverDropdown(windowWidth, mobileTest);
		});

		$(window).scroll(function() {
			navbarAnimation(navbar, moduleBanner);
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
		 * Nav Overlay & Transparent Module
		/* ---------------------------------------------- */

		if (navbar.next().hasClass('bg-dark') || navbar.next().hasClass('bg-dark-30') || navbar.next().hasClass('bg-dark-60') || navbar.next().hasClass('bg-dark-30')) {
					navbar.addClass('navbar-dark');
				} else {
					navbar.removeClass('navbar-dark');
				}
			});

      function buildModuleBanner() {
			if (moduleBanner.length > 0) {
				if (moduleBanner.hasClass('module-full-height')) {
					moduleBanner.height($(window).height());
				} else {
					moduleBanner.height($(window).height() * 0.85);
				}
			}
		}

		function navbarCheck() {
			if (navbar.length > 0 && navbar.hasClass('navbar-transparent')) {
				navbatTrans = true;
			} else {
				navbatTrans = false;
			}
		}

		function navbarAnimation(navbar, moduleBanner) {
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

    .preventDefault();
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

  })(jQuery);
