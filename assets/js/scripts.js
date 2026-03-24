document.addEventListener('DOMContentLoaded', function() {
	'use strict';
    console.log('DICOM Vision: DOMContentLoaded fired.');
	/*-----------------------------------------------------------------------------------*/
	/*	STICKY HEADER
	/*-----------------------------------------------------------------------------------*/
    if(document.getElementById("search-input")){
           console.log('DICOM Vision: Initializing SimpleJekyllSearch...');
    		var sjs = SimpleJekyllSearch({
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        json: '/search.json'
     });
     console.log('DICOM Vision: SimpleJekyllSearch initialized.');
    }


	
	if (document.querySelector(".navbar")) {
		var options = {
			offset: 350,
			offsetSide: 'top',
			classes: {
				clone: 'banner--clone fixed',
				stick: 'banner--stick',
				unstick: 'banner--unstick'
			},
			onStick: function() {
				// $($.SmartMenus.Bootstrap.init); // Skip SmartMenus if possible, or refactor later
			},
			onUnstick: function() {
                const searchMenu = document.querySelector('.search-dropdown .dropdown-menu');
                if (searchMenu && typeof bootstrap !== 'undefined') {
                    const collapse = bootstrap.Collapse.getInstance(searchMenu);
                    if (collapse) collapse.hide();
                }
			}
		};
		var banner = new Headhesive('.navbar', options);
	}
	/*-----------------------------------------------------------------------------------*/
	/*	REGISTERED MARK POSITIONING
	/*-----------------------------------------------------------------------------------*/
	const logoMarks = document.querySelectorAll('.logo-with-mark');
	const updateLogoMark = (wrap) => {
		const img = wrap.querySelector('img');
		if (!img) return;
		const rect = img.getBoundingClientRect();
		if (!rect.height) return;
		const markSize = Math.max(8, Math.round(rect.height * 0.22));
		wrap.style.setProperty('--logo-mark-size', `${markSize}px`);
	};
	const updateAllLogoMarks = () => {
		logoMarks.forEach(updateLogoMark);
	};
	if (logoMarks.length) {
		logoMarks.forEach((wrap) => {
			const img = wrap.querySelector('img');
			if (!img) return;
			if (img.complete) {
				updateLogoMark(wrap);
			} else {
				img.addEventListener('load', () => updateLogoMark(wrap), { once: true });
			}
		});
		window.addEventListener('resize', updateAllLogoMarks);
	}
	/*-----------------------------------------------------------------------------------*/
	/*	HEADER BUTTONS
	/*-----------------------------------------------------------------------------------*/
	const header_search = document.querySelector('.search-dropdown .dropdown-menu');
	const header_cart = document.querySelector('.cart-dropdown .dropdown-menu');
	const navbar_search_toggle = document.querySelector('.search-dropdown .collapse-toggle');
	const navbar_search_close = document.querySelector(".search-dropdown .dropdown-menu .dropdown-close");

    // Consolidated Navigation Toggles (works with sticky clones)
    const toggleOffcanvas = (target, trigger) => {
        if (!target) return;
        const isOpen = target.classList.toggle('open');
        if (trigger) trigger.classList.toggle('active', isOpen);
    };

    document.addEventListener('click', function(e) {
        const navToggle = e.target.closest('[data-bs-toggle="offcanvas-nav"]');
        if (navToggle) {
            e.preventDefault();
            const navRoot = navToggle.closest('.navbar') || document;
            const navTarget = navRoot.querySelector('.offcanvas-nav') || document.querySelector('.offcanvas-nav');
            toggleOffcanvas(navTarget, navToggle);
            if (header_search && typeof bootstrap !== 'undefined') {
                const bsCollapse = bootstrap.Collapse.getInstance(header_search);
                if (bsCollapse) bsCollapse.hide();
            }
            return;
        }

        const navClose = e.target.closest('.offcanvas-nav-close');
        if (navClose) {
            const navRoot = navClose.closest('.navbar') || document;
            const navTarget = navRoot.querySelector('.offcanvas-nav') || document.querySelector('.offcanvas-nav');
            if (navTarget) navTarget.classList.remove('open');
            const navBtn = navRoot.querySelector('.hamburger.animate');
            if (navBtn) navBtn.classList.remove('active');
            return;
        }

        const infoToggle = e.target.closest('[data-bs-toggle="offcanvas-info"]');
        if (infoToggle) {
            e.preventDefault();
            const infoTarget = document.querySelector('.offcanvas-info');
            if (infoTarget) infoTarget.classList.toggle('open');
            if (header_search && typeof bootstrap !== 'undefined') {
                const bsCollapse = bootstrap.Collapse.getInstance(header_search);
                if (bsCollapse) bsCollapse.hide();
            }
            return;
        }

        const infoClose = e.target.closest('.offcanvas-info-close');
        if (infoClose) {
            const infoTarget = document.querySelector('.offcanvas-info');
            if (infoTarget) infoTarget.classList.remove('open');
            return;
        }

        if (e.target.closest('.offcanvas-nav') || e.target.closest('.offcanvas-info')) {
            return;
        }

		if (header_search && typeof bootstrap !== 'undefined') {
            const bsCollapse = bootstrap.Collapse.getInstance(header_search);
            if (bsCollapse) bsCollapse.hide();
        }
		document.querySelectorAll('.offcanvas-nav.open').forEach((el) => el.classList.remove('open'));
		const infoTarget = document.querySelector('.offcanvas-info.open');
        if (infoTarget) infoTarget.classList.remove('open');
		document.querySelectorAll('.hamburger.animate.active').forEach((el) => el.classList.remove('active'));
	});
    
    document.querySelectorAll('.onepage .navbar li a').forEach(link => {
        link.addEventListener('click', function() {
            if (navbar_offcanvas) navbar_offcanvas.classList.remove('open');
            if (header_hamburger) header_hamburger.classList.remove('active');
        });
    });
	/*-----------------------------------------------------------------------------------*/
	/*	ONEPAGE NAV LINKS
	/*-----------------------------------------------------------------------------------*/
	document.querySelectorAll('.onepage .navbar ul.navbar-nav a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) { e.preventDefault(); });
    });
	/*-----------------------------------------------------------------------------------*/
	/*	ONEPAGE SMOOTH SCROLL
	/*-----------------------------------------------------------------------------------*/
    (function() {
        setTimeout(function() {
            if (window.location.hash) {
                window.scrollTo(0, 0);
                const targetId = window.location.hash.slice(1);
                const target = document.getElementById(targetId);
                if (target) {
                    smoothScrollTo(target);
                }
            }
        }, 1);

        document.querySelectorAll('a.scroll[href*="#"]:not([href="#"])').forEach(link => {
            link.addEventListener('click', function(e) {
                if (window.location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && window.location.hostname === this.hostname) {
                    const targetId = this.hash.slice(1);
                    const target = document.getElementById(targetId) || document.getElementsByName(targetId)[0];
                    if (target) {
                        e.preventDefault();
                        smoothScrollTo(target);
                    }
                }
            });
        });

        function smoothScrollTo(target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    })();
    console.log('DICOM Vision: Smooth Scroll initialized.');
	/*-----------------------------------------------------------------------------------*/
	/*	BACKGROUND IMAGE
	/*-----------------------------------------------------------------------------------*/
	document.querySelectorAll(".bg-image").forEach(function(el) {
		var bg = 'url(' + el.getAttribute("data-image-src") + ')';
		el.style.backgroundImage = bg;
	});
	/*-----------------------------------------------------------------------------------*/
	/*	IMAGE ICON HOVER
	/*-----------------------------------------------------------------------------------*/
	document.querySelectorAll('.overlay:not(.caption) > a, .overlay:not(.caption) > span, .overlay.caption-overlay > a, .overlay.caption-overlay > span').forEach(function(el) {
        var span = document.createElement('span');
        span.className = 'bg';
        el.prepend(span);
    });
	/*-----------------------------------------------------------------------------------*/
	/*	ISOTOPE GRID
	/*-----------------------------------------------------------------------------------*/
	function enableIsotope() {
      console.log('DICOM Vision: Starting Isotope initialization...');
	  // for each container
	  $('.grid').each( function( i, gridContainer ) {
	    var $gridContainer = $( gridContainer );
	    // init isotope for container
	    var $grid = $gridContainer.find('.isotope').imagesLoaded( function() {
	      $grid.isotope({
	        itemSelector: '.item',
	        layoutMode: 'masonry',
	        percentPosition: true,
	        masonry: {
	            columnWidth: $grid.width() / 12
	        },
			transitionDuration: '0.7s'
	      })
	    });
			$(window).resize(function() {
				$grid.isotope({
					masonry: {
						columnWidth: $grid.width() / 12
					}
				});
			});
			$(window).on("load", function() {
				$grid.isotope({
					masonry: {
						columnWidth: $grid.width() / 12
					}
				});
			});
	    // initi filters for container
	    $gridContainer.find('.isotope-filter').on( 'click', '.button', function() {
	      var filterValue = $( this ).attr('data-filter');
	      $grid.isotope({ filter: filterValue });
	    });
	  });
	    
	  $('.isotope-filter').each( function( i, buttonGroup ) {
	    var $buttonGroup = $( buttonGroup );
	    $buttonGroup.on( 'click', '.button', function() {
	      $buttonGroup.find('.active').removeClass('active');
	      $( this ).addClass('active');
	    });
	  });
	
	};
	enableIsotope();
    console.log('DICOM Vision: Isotope check complete.');
	/*-----------------------------------------------------------------------------------*/
	/*	OWL CAROUSEL
	/*-----------------------------------------------------------------------------------*/
	$('.basic-slider').each(function() {
		var $bslider = $(this);
		$bslider.owlCarousel({
			items: 1,
			nav: false,
			dots: true,
			dotsEach: true,
			autoHeight: true,
			loop: true,
			margin: $bslider.data("margin")
		});
	});
	$('.carousel').each(function() {
		var $carousel = $(this);
		$carousel.owlCarousel({
			autoHeight: false,
			nav: false,
			dots: $carousel.data("dots"),
			dotsEach: true,
			loop: $carousel.data("loop"),
			margin: $carousel.data("margin"),
			autoplay: $carousel.data("autoplay"),
			autoplayTimeout: $carousel.data("autoplay-timeout"),
			responsive: $carousel.data("responsive")
		});
	});
    console.log('DICOM Vision: Carousel initialization check complete.');
	/*-----------------------------------------------------------------------------------*/
	/*	OWL SLIDER WITH THUMBNAILS
	/*-----------------------------------------------------------------------------------*/
	var $owlmain = $(".owl-slider-main");
	var $owlnav = $(".owl-slider-nav");
	//var totalslides = 10;
	var syncedSecondary = true;
	$owlmain
		.owlCarousel({
			items: 1,
			nav: false,
			margin: 10,
			autoplay: false,
			dots: false,
			loop: true,
			responsiveRefreshRate: 200
		})
		.on("changed.owl.carousel", syncPosition);
	$owlnav
		.on("initialized.owl.carousel", function() {
			$owlnav
				.find(".owl-item")
				.eq(0)
				.addClass("current");
		})
		.owlCarousel({
			items: 3,
			margin: 10,
			dots: false,
			nav: false,
			smartSpeed: 200,
			slideSpeed: 500,
			slideBy: 3,
			responsiveRefreshRate: 100
		})
		.on("changed.owl.carousel", syncPosition2);
	function syncPosition(el) {
		//if loop is set to false, then you have to uncomment the next line
		//var current = el.item.index;
		//to disable loop, comment this block
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - el.item.count / 2 - 0.5);
		if (current < 0) {
			current = count;
		}
		if (current > count) {
			current = 0;
		}
		//to this
		$owlnav
			.find(".owl-item")
			.removeClass("current")
			.eq(current)
			.addClass("current");
		var onscreen = $owlnav.find(".owl-item.active").length - 1;
		var start = $owlnav
			.find(".owl-item.active")
			.first()
			.index();
		var end = $owlnav
			.find(".owl-item.active")
			.last()
			.index();
		if (current > end) {
			$owlnav.data("owl.carousel").to(current, 100, true);
		}
		if (current < start) {
			$owlnav.data("owl.carousel").to(current - onscreen, 100, true);
		}
	}
	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			$owlmain.data("owl.carousel").to(number, 100, true);
		}
	}
	$owlnav.on("click", ".owl-item", function(e) {
		e.preventDefault();
		var number = $(this).index();
		$owlmain.data("owl.carousel").to(number, 300, true);
	});
	/*-----------------------------------------------------------------------------------*/
	/*	LIGHTGALLERY
	/*-----------------------------------------------------------------------------------*/
	function enablelightGallery() {
		var $lg = $('.light-gallery-wrapper');
		$lg.lightGallery({
			thumbnail: false,
			selector: '.lightbox',
			mode: 'lg-fade',
			download: false,
			autoplayControls: false,
			zoom: false,
			fullScreen: false,
			videoMaxWidth: '1000px',
			loop: false,
			hash: false,
			mousewheel: true,
			videojs: true,
			share: false
		});
	}
	enablelightGallery();
	/*-----------------------------------------------------------------------------------*/
	/*	SLIDER REVOLUTION
	/*-----------------------------------------------------------------------------------*/
	/*
	$('#slider').revolution({
		// ... standard config
	});
	// ... (other sliders omitted for brevity in comment)
	$('#slider16').revolution({
		// ... standard config
	});
	*/
	/*-----------------------------------------------------------------------------------*/
	/*	PLYR
	/*-----------------------------------------------------------------------------------*/
	const players = Plyr.setup('.player');
    console.log('DICOM Vision: Plyr setup complete.');
	/*-----------------------------------------------------------------------------------*/
	/*	CIRCLE INFO BOX
	/*-----------------------------------------------------------------------------------*/
	$("#dial1").s8CircleInfoBox({
		autoSlide: false,
		action: "mouseover"
	});
	$("#dial2").s8CircleInfoBox({
		autoSlide: false,
		action: "mouseover"
	});
    console.log('DICOM Vision: Circle Info Box check complete.');
	/*-----------------------------------------------------------------------------------*/
	/*	PROGRESSBAR
	/*-----------------------------------------------------------------------------------*/
	var $pline = $('.progressbar.line');
	var $pcircle = $('.progressbar.circle');
	$pline.each(function(i) {
		var line = new ProgressBar.Line(this, {
			strokeWidth: 3,
			trailWidth: 3,
			duration: 3000,
			easing: 'easeInOut',
			text: {
				style: {
					color: 'inherit',
					position: 'absolute',
					right: '0',
					top: '-30px',
					padding: 0,
					margin: 0,
					transform: null
				},
				autoStyleContainer: false
			},
			step: function(state, line, attachment) {
				line.setText(Math.round(line.value() * 100) + ' %');
			}
		});
		var value = ($(this).attr('data-value') / 100);
		$pline.waypoint(function() {
			line.animate(value);
		}, {
			offset: "100%"
		})
	});
	$pcircle.each(function(i) {
		var circle = new ProgressBar.SemiCircle(this, {
			strokeWidth: 5,
			trailWidth: 5,
			duration: 2000,
			easing: 'easeInOut',
			step: function(state, circle, attachment) {
				circle.setText(Math.round(circle.value() * 100));
			}
		});
		var value = ($(this).attr('data-value') / 100);
		$pcircle.waypoint(function() {
			circle.animate(value);
		}, {
			offset: "100%"
		})
	});
    console.log('DICOM Vision: Progressbar check complete.');
	/*-----------------------------------------------------------------------------------*/
	/*	COUNTER UP
	/*-----------------------------------------------------------------------------------*/
    if (typeof jQuery !== 'undefined' && $.fn.counterUp) {
        try {
            $('.counter .value').counterUp({
                delay: 50,
                time: 1000
            });
            console.log('DICOM Vision: CounterUp initialized.');
        } catch (e) {
            console.error('DICOM Vision: CounterUp initialization failed:', e);
        }
    } else {
        console.warn('DICOM Vision: CounterUp plugin not found or jQuery missing.');
    }
    console.log('DICOM Vision: CounterUp check complete.');
	/*-----------------------------------------------------------------------------------*/
	/*	COUNTDOWN
	/*-----------------------------------------------------------------------------------*/
    if (typeof jQuery !== 'undefined' && $.fn.countdown) {
        try {
            $(".countdown").countdown();
            console.log('DICOM Vision: Countdown initialized.');
        } catch (e) {
            console.error('DICOM Vision: Countdown initialization failed:', e);
        }
    } else {
        console.warn('DICOM Vision: Countdown plugin not found or jQuery missing.');
    }
    console.log('DICOM Vision: Countdown check complete.');
	/*-----------------------------------------------------------------------------------*/
	/*	AOS
	/*-----------------------------------------------------------------------------------*/
    console.log('DICOM Vision: Initializing AOS...');
    if (typeof AOS !== 'undefined') {
        AOS.init({
            easing: 'ease-in-out-sine',
            duration: 800,
            once: true
        });
        console.log('DICOM Vision: AOS initialized.');
        // Force a refresh after a short delay to ensure visibility
        setTimeout(function() {
            AOS.refresh();
            console.log('DICOM Vision: AOS refreshed.');
        }, 500);
    } else {
        console.error('DICOM Vision: AOS library not found!');
    }
	/*-----------------------------------------------------------------------------------*/
	/*	TOOLTIP & POPOVER
	/*-----------------------------------------------------------------------------------*/
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('.has-tooltip, [data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });

        var popoverTriggerList = [].slice.call(document.querySelectorAll('.has-popover, [data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new bootstrap.Popover(popoverTriggerEl);
        });
    }
	/*-----------------------------------------------------------------------------------*/
	/*	VIDEO WRAPPER
	/*-----------------------------------------------------------------------------------*/
    // backgroundVideo is a jQuery plugin. Skipping for now.
	/*-----------------------------------------------------------------------------------*/
	/*	CONTACT FORM
	/*-----------------------------------------------------------------------------------*/
	function enableContactForm() {
        const contactForm = document.getElementById('contact-form');
		if (contactForm && typeof validator !== 'undefined') {
            // validator is likely a jQuery plugin too.
        }
	}
	enableContactForm();
	/*-----------------------------------------------------------------------------------*/
	/*	MODAL
	/*-----------------------------------------------------------------------------------*/
    if (typeof bootstrap !== 'undefined') {
        setTimeout(function() {
            const modalEl = document.querySelector(".modal-popup");
            if (modalEl) {
                const modal = new bootstrap.Modal(modalEl);
                modal.show();
            }
        }, 200);

        const modal03 = document.getElementById('modal-03');
        if (modal03) {
            modal03.addEventListener('shown.bs.modal', function() {
                enableContactForm();
            });
        }
    }
	/*-----------------------------------------------------------------------------------*/
	/*	PAGE LOADING
	/*-----------------------------------------------------------------------------------*/
    const pageLoading = document.querySelector('.page-loading');
    if (pageLoading) {
        setTimeout(() => {
            pageLoading.style.transition = 'opacity 0.6s ease';
            pageLoading.style.opacity = '0';
            setTimeout(() => pageLoading.style.display = 'none', 600);
        }, 350);
    }
	/*-----------------------------------------------------------------------------------*/
	/*	IMAGE WRAPPER MOBILE
	/*-----------------------------------------------------------------------------------*/
	if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)) {
		document.querySelectorAll('.image-wrapper').forEach(el => el.classList.add('mobile'));
	}
	/*-----------------------------------------------------------------------------------*/
	/*	PRICING
	/*-----------------------------------------------------------------------------------*/
    document.querySelectorAll('.pricing-wrapper').forEach(function(container) {
        container.querySelectorAll(".pricing-switcher").forEach(switcher => {
            switcher.addEventListener('click', function() {
                switcher.classList.toggle('pricing-switcher-active');
                container.querySelectorAll(".price").forEach(price => {
                    price.classList.remove('price-hidden');
                    price.classList.toggle('price-show');
                    price.classList.toggle('price-hide');
                });
            });
        });
    });

    // NOTE: Isotope, Owl Carousel, Progressbar (waypoint based), CounterUp, and Countdown 
    // were jQuery dependent in this theme and are skipped or need replacement libs.

});
