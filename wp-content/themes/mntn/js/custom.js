(function($){

		jQuery.preloadImages = function () {
			if (typeof arguments[arguments.length - 1] == 'function') {
				var callback = arguments[arguments.length - 1];
			} else {
				var callback = false;
			}
			if (typeof arguments[0] == 'object') {
				var images = arguments[0];
				var n = images.length;
			} else {
				var images = arguments;
				var n = images.length - 1;
			}
			var not_loaded = n;
			for (var i = 0; i < n; i++) {
				jQuery(new Image()).attr('src', images[i]).load(function() {
					if (--not_loaded < 1 && typeof callback == 'function') {
						callback();
					}
				});
			}
		}

		var menu_flip_speed = 200,
		recent_work_opacity_speed = 400,
		featured_controllers_opacity_speed = 500,
		featured_bar_animation_speed = 500,
		featured_bar_animation_easing = 'easeOutExpo',
		$mobile_nav_button = $('#mobile_nav'),
		$main_menu = $('ul.nav'),
		$featured_controllers_container = $('#featured-controllers'),
		$featured_control_item = $featured_controllers_container.find('li'),
		container_width = $('#container').innerWidth(),
		$footer_widget = $('.footer-widget'),
		$cloned_nav,
		slider_settings,
		sd_slider_autospeed,
		slider,
		$gallery_slider = $('.post_gallery_slider');
		
		function is_touch_device() {
		  return !!('ontouchstart' in window) // works on most browsers 
			  || !!('onmsgesturechange' in window); // works on ie10
		};
		var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod|Macintosh)/g) ? true : false );
		
		if( $(window).width() > 680 && !is_touch_device() && !iOS){
			$("html").niceScroll({
				zindex: 9999,
				cursoropacitymin: 0.3,
				cursorwidth: 7,
				cursorborder: 0,
				mousescrollstep: 40,
				scrollspeed: 100,
				horizrailenabled: false
			});
		}
		
	// TO TOP BUTTON
	$('#fr_to_top').click(function(){
		$('html, body').animate({scrollTop:0}, 'slow');
	});

	$main_menu.superfish({ 
			delay:       300,                            // one second delay on mouseout 
			animation:   {opacity:'show',height:'show'},  // fade-in and slide-down animation 
			speed:       'fast',                          // faster animation speed 
			autoArrows:  true,                           // disable generation of arrow mark-up 
			dropShadows: false                            // disable drop shadows 
		});
		
		$main_menu.find('>li').hover( function(){
			//$(this).addClass( 'fr_hover' );
			$(this).find(".sub-menu").slideDown();
		}, function(){
			//$(this).removeClass( 'fr_hover' );
			$(this).find(".sub-menu").slideUp();
		});
		
		
		$('.js #main-menu').show();
		
	
	//MOBILE MENU
		$main_menu.clone().attr('id','mobile_menu').removeClass().appendTo( $mobile_nav_button );
		$cloned_nav = $mobile_nav_button.find('> ul');
		$cloned_nav.find('span.menu_slide').remove().end().find('span.main_text').removeClass();
		
		$mobile_nav_button.click( function(){
			if ( $(this).hasClass('closed') ){
				$(this).removeClass( 'closed' ).addClass( 'opened' );
				$cloned_nav.slideDown( 500 );
			} else {
				$(this).removeClass( 'opened' ).addClass( 'closed' );
				$cloned_nav.slideUp( 500 );
			}
			return false;
		} );
		
		$mobile_nav_button.find('a').click( function(event){
			event.stopPropagation();
		} );
		
		$('#mobile_menu li').hover(function(){
			$(this).find('.sub-menu').slideDown( 500 ).css({display: 'block', visibility: 'visible'});
		}, function () {
			$(this).find('.sub-menu').slideUp( 500 );
		});
		//MOBILE MENU
	
	// POST FORMAT GALLERY
	$gallery_slider.flexslider({
		slideshow: true,           
		slideshowSpeed: 7000,
		controlsContainer: ".slider_controls"
	});
	
	$('p:empty').add('div.feautered_box:empty').remove();

     (function($) {
		$.fn.countTo = function(options) {
			// merge the default plugin settings with the custom options
			options = $.extend({}, $.fn.countTo.defaults, options || {});

			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(options.speed / options.refreshInterval),
				increment = (options.to - options.from) / loops;

			return $(this).delay(1000).each(function() {
				var _this = this,
					loopCount = 0,
					value = options.from,
					interval = setInterval(updateTimer, options.refreshInterval);

				function updateTimer() {
					value += increment;
					loopCount++;
					$(_this).html(value.toFixed(options.decimals));

					if (typeof(options.onUpdate) == 'function') {
						options.onUpdate.call(_this, value);
					}

					if (loopCount >= loops) {
						clearInterval(interval);
						value = options.to;

						if (typeof(options.onComplete) == 'function') {
							options.onComplete.call(_this, value);
						}
					}
				}
			});
		};

		$.fn.countTo.defaults = {
			from: 0,  // the number the element should start at
			to: 100,  // the number the element should end at
			speed: 1000,  // how long it should take to count between the target numbers
			refreshInterval: 100,  // how often the element should be updated
			decimals: 0,  // the number of decimal places to show
			onUpdate: null,  // callback method for every time the element is updated,
			onComplete: null,  // callback method for when the element finishes updating
		};
	})(jQuery);
	
	
	$('.home .fucts_counter').appear(function() {
		$('.fucts_counter').each(function(){
			dataperc = $(this).attr('data-perc'),
			$(this).find('.fucts_count').delay(6000).countTo({
			from: 0,
			to: dataperc,
			speed: 2000,
			refreshInterval: 100
			});
		 });
	});
	
	
	 $('.chart').easyPieChart({
		barColor: 'rgba(255,255,255,0.7)',
		trackColor: 'rgba(0,0,0,0.7)',
        scaleColor: false,
		lineWidth: 5,
		size: 80
    });
	
	$('.home #main_header').css('height', $(window).height() );
	
	function OffScroll () {
		var winScrollTop = $(window).scrollTop();
		$(window).bind('scroll',function () {
		  $(window).scrollTop(winScrollTop);
		});
	}	
		
	// HEADER PARALLAX SCROLL	
	function parallaxScroll(){
		var scrolled = $(window).scrollTop();
		$(".home #main_header").css({backgroundPosition: "0 "+(95+(scrolled*.4))+"%" });
		$(".fr_slide_image").css({backgroundPosition: "0 "+(95+(scrolled*.4))+"%" });
	}
	$(window).bind('scroll',function(e){
		parallaxScroll();
	});
	
	$(window).scroll(function() {
		var scroll_position = $(document).scrollTop();
		if(scroll_position > 500) {
			$(".home #menu").addClass("small_header");
		} else {
			$(".home #menu").removeClass("small_header");
		}
	});
	
	$('.parallax').each(function() {
			var $parallaxSection = $(this);
			var parallaxFunc = function(){
				if ($(window).width() >= 768) {
					var offset = $parallaxSection.offset().top;
					var scrollTop = $(window).scrollTop();
					var yPos = -(offset - scrollTop)/2;
					var coords = 'center '+ yPos + 'px';
					$parallaxSection.css( { backgroundPosition: coords});
				} else {
					$parallaxSection.css( {
						backgroundPosition: 'center',
					});
				}
			};
			parallaxFunc(); 
			$(window).scroll(function (){
				parallaxFunc();
			});
		});
	
	// MENU SETTINGS
	   $("#main-menu").find("a").add(".fr_converse .fr_simple_btn").click(function(){
			var elem = $(this).attr("href");
			$('html, body').animate({ scrollTop: $(elem).offset().top - 120 }, 1000);
	   });
         
})(jQuery);