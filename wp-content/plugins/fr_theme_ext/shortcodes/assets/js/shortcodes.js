// sd_switcher plugin v1.1
(function($)
{
	$.fn.sd_shortcodes_switcher = function(options)
	{
		var defaults =
		{
		   slides: '>div',
		   activeClass: 'active',
		   linksNav: '',
		   findParent: true, //use parent elements to define active states
		   lengthElement: 'li', //parent element, used only if findParent is set to true
		   useArrows: false,
		   arrowLeft: 'a#prev-arrow',
		   arrowRight: 'a#next-arrow',
		   auto: false,
		   autoSpeed: 5000,
		   slidePadding: '',
		   pauseOnHover: true,
		   fx: 'fade',
		   sliderType: ''
		};

		var options = $.extend(defaults, options);

		return this.each(function(){
							
			var slidesContainer = jQuery(this).parent().css('position','relative'),
				$slides = jQuery(this).css({'overflow':'hidden','position':'relative'}),
				$slide = $slides.find(options.slides).css({'opacity':'1','position':'absolute','top':'0px','left':'0px','display':'none'}),
				slidesNum = $slide.length,
				zIndex = slidesNum,
				currentPosition = 1,
				slideHeight = 0,
				$activeSlide,
				$nextSlide,
				$sd_learn_more_button = $slides.find('.accordion .accordion_head');

			if (options.sliderType === 'images'){
				$slide.css({'display':'block'});
				if (options.fx === 'fade') $slide.filter(':not(:first)').css({'display':'none'});
			}
			
			$slide.filter(':first').css({'display':'block'}).addClass('tabs_slide_active');
			
			if (options.slidePadding != '') $slide.css('padding',options.slidePadding);
			
			$slide.each(function(){
				jQuery(this).css('z-index',zIndex).addClass('clearfix');
				if (options.fx === 'slide') zIndex--;
			});
			
			slideHeight = $slide.filter(':first').innerHeight();
			
			slidesContainer.find('.accordion').not('.state_open').find('.accordion_inner').css({'display':'none','visibility': 'visible'});
			
			sd_change_container_height( slideHeight, 400 );
							
			var slideWidth = $slide.width(),
				slideOuterWidth = $slide.outerWidth();
	
			$slide.filter(':first').css('opacity','1');
			
			
			if (options.linksNav != '') {
				var linkSwitcher = jQuery(options.linksNav);
				
				var linkSwitcherTab = '';
				if (options.findParent) linkSwitcherTab = linkSwitcher.parent();
				else linkSwitcherTab = linkSwitcher;
				
				if (!linkSwitcherTab.filter('.active').length) linkSwitcherTab.filter(':first').addClass('active');
								
				linkSwitcher.click(function(){
					
					var targetElement;

					if (options.findParent) targetElement = jQuery(this).parent();
					else targetElement = jQuery(this);
					
					var orderNum = targetElement.prevAll(options.lengthElement).length+1;
					
					if (orderNum > currentPosition) gotoSlide(orderNum, 1);
					else gotoSlide(orderNum, -1); 
					
					return false;
				});
			}
			
			
			if (options.useArrows) {
				var $right_arrow = jQuery(options.arrowRight),
					$left_arrow = jQuery(options.arrowLeft);
									
				$right_arrow.click(function(){				
					if (currentPosition === slidesNum) 
						gotoSlide(1,1);
					else 
						gotoSlide(currentPosition+1),1;
					
					if (options.linksNav != '') changeTab();
											
					return false;
				});
				
				$left_arrow.click(function(){
					if (currentPosition === 1)
						gotoSlide(slidesNum,-1);
					else 
						gotoSlide(currentPosition-1,-1);
					
					if (options.linksNav != '') changeTab();
					
					return false;
				});
				
			}
			
			$sd_learn_more_button.click( function(){
				var $this_slide = jQuery(this).closest('.tabs-slidecontent');
				
				if ( $(this).hasClass('open') ) 
					$(this).removeClass('open');
				else 
					$(this).addClass('open');
				
				$(this).parent('.accordion').find('.accordion_inner').animate({ opacity: 'toggle', height: 'toggle' }, 300, function(){
					sd_change_container_height( $this_slide.innerHeight(), 50 );
				});
			} );
			
			function sd_change_container_height( new_height, speed ){
				$slides.css('width', 'auto');
				
				//check left tabs container height
				if ( slidesContainer.hasClass('tabs-left') ) {
					var leftTabsHeight = slidesContainer.find('ul.tabs-control').innerHeight();
					if ( leftTabsHeight > new_height ) new_height = leftTabsHeight;
				}
			
				if ( jQuery.browser.msie ) {
					//else $slides.css('height', new_height+40);
					$slides.css('height', new_height);
				} else {
					$slides.animate( { 'height' : new_height }, speed );
				}
			}
			
			function changeTab(){
				if (linkSwitcherTab != '') {
					linkSwitcherTab.siblings().removeClass('active');
					linkSwitcherTab.filter(':eq('+(currentPosition-1)+')').addClass('active');
				}
			}
			
			function gotoSlide(slideNumber,dir){
				if ($slide.filter(':animated').length) return;
			
				$slide.css('opacity','0');
																	
				$activeSlide = $slide.filter(':eq('+(currentPosition-1)+')').css('opacity','1');
								
				if (currentPosition === slideNumber) return;
				
				$activeSlide.removeClass('tabs_slide_active');
								
				$nextSlide = $slide.filter(':eq('+(slideNumber-1)+')').css('opacity','1').addClass('tabs_slide_active');
								
				if ((currentPosition > slideNumber || currentPosition === 1) && (dir === -1)) {
					if (options.fx === 'slide') slideBack(500);
					if (options.fx === 'fade') slideFade(500);
				} else {
					if (options.fx === 'slide') slideForward(500);
					if (options.fx === 'fade') slideFade(500);
				}
				
				currentPosition = $nextSlide.prevAll().length + 1;
				
				if (options.linksNav != '') changeTab();
									
				return false;
			}
			
			
			if (options.auto) {
				auto_rotate();
				var pauseSlider = false;
			}
			
			if (options.pauseOnHover) { 				
				slidesContainer.hover(function(){
					pauseSlider = true;
				},function(){
					pauseSlider = false;
				});
			}
			
			function auto_rotate(){
				
				interval_shortcodes = setInterval(function(){
					if (!pauseSlider) { 
						if (currentPosition === slidesNum) 
							gotoSlide(1,1);
						else 
							gotoSlide(currentPosition+1,1);
						
						if (options.linksNav != '') changeTab();
					}
				},options.autoSpeed);
			}
			
			function slideFade(speed){					
				$activeSlide.css({zIndex: slidesNum}).fadeOut(400, function(){
					if ( options.sliderType !== 'images' ){
						$activeSlide.css('opacity',0);
						$nextSlide.css({zIndex: (slidesNum+1), 'display':'block'}).fadeIn(400);
					}
				});
				if ( options.sliderType === 'images' ) $nextSlide.css({zIndex: (slidesNum+1), 'display' : 'none'}).fadeIn(400);
				sd_change_container_height( $nextSlide.innerHeight(), 500 );
			}
			
			function slideForward(speed){
				$nextSlide.css('left',slideOuterWidth+'px');
				
				if (options.sliderType === 'images'){
					$activeSlide.animate({left: '-'+slideOuterWidth},speed);
				} else {
					$activeSlide.animate({left: '-'+slideOuterWidth,opacity:0},speed);
					$nextSlide.css('display','block');
				}
				 
				$nextSlide.animate({left: 0,opacity:1},speed);
				sd_change_container_height( $nextSlide.innerHeight(), speed );
			}

			function slideBack(speed){
				$nextSlide.css('left','-'+slideOuterWidth+'px');
				
				if (options.sliderType === 'images'){
					$activeSlide.animate({left: slideOuterWidth},speed);
				} else {
					$activeSlide.animate({left: slideOuterWidth,opacity:0},speed);
					$nextSlide.css('display','block');
				}

				$nextSlide.animate({left: 0,opacity:1},speed);
				sd_change_container_height( $nextSlide.innerHeight(), speed );
			}
			
		});
	} 
})(jQuery);
// end sd_switcher plugin v2
	
/////// Shortcodes Javascript ///////
jQuery(document).ready(function($){

	$('<span class="close_box">').appendTo($('.info_boxes'));
	$('.close_box').click(function(){
		$(this).parent('.info_boxes').fadeOut(300);
	});
			
	$sd_tooltip = $('.tooltip');
	$sd_tooltip.live('mouseover mouseout', function(event){
		if (event.type == 'mouseover') {
			$(this).find('.tooltip_inner').animate({ opacity: 'show', bottom: '25px' }, 300);
		} else {
			$(this).find('.tooltip_inner').animate({ opacity: 'hide', bottom: '35px' }, 300);
		}
	});
	// learn more
	$sd_learn_more = $('.accordion .accordion_head');
	$sd_learn_more.live('click', function() {
		if ( $(this).closest('.tabs-slidecontent').length ) return;
	
		if ( $(this).hasClass('open') ) 
			$(this).removeClass('open');
		else 
			$(this).addClass('open');
		
		$(this).parent('.accordion').find('.accordion_inner').animate({ opacity: 'toggle', height: 'toggle' }, 300, function(){
			var sd_hidden_div_height,
				$sd_hidden_tabs = $(this).find('.tabs-content');
			
			if ( $sd_hidden_tabs.length ){
				sd_hidden_div_height = $sd_hidden_tabs.find('>div:visible').innerHeight();
				$sd_hidden_tabs.css( 'minHeight', sd_hidden_div_height );
			}
		});
	});
	
	$('.accordion').not('.state_open').find('.accordion_inner').css( { 'visibility' : 'visible', 'display' : 'none' } );
	
	var $sd_shortcodes_tabs = $('.tabs-container, top_tabs, .tabs-left');
	$sd_shortcodes_tabs.each(function(i){
		var shortcodes_tab_class = $(this).attr('class'),
			shortcodes_tab_autospeed_class_value = /sliderauto_speed_(\d+)/g,
			shortcodes_tab_autospeed = shortcodes_tab_autospeed_class_value.exec( shortcodes_tab_class ),
			sd_shortcodes_tab_auto_class_value = /sliderauto_(\w+)/g,
			sd_shortcodes_tab_auto = sd_shortcodes_tab_auto_class_value.exec( shortcodes_tab_class ),
			sd_shortcodes_tab_type_class_value = /slidertype_(\w+)/g,
			shortcodes_tab_type = sd_shortcodes_tab_type_class_value.exec( shortcodes_tab_class ),
			sd_shortcodes_tab_fx_class_value = /sliderfx_(\w+)/g,
			sd_shortcodes_tab_fx = sd_shortcodes_tab_fx_class_value.exec( shortcodes_tab_class ),
			sd_shortcodes_tab_apply_to_element = '.tabs-content',
			sd_shortcodes_tab_settings = {};
			
		sd_shortcodes_tab_settings.linksNav = $(this).find('.tabs-control li a');
		sd_shortcodes_tab_settings.findParent = true;
		sd_shortcodes_tab_settings.fx = sd_shortcodes_tab_fx[1];
		sd_shortcodes_tab_settings.auto = 'false' === sd_shortcodes_tab_auto[1] ? false : true;
		sd_shortcodes_tab_settings.autoSpeed = shortcodes_tab_autospeed[1];

		if ( 'top_tabs' === shortcodes_tab_type[1] ) {
			sd_shortcodes_tab_settings.slidePadding = '20px 25px 15px';
		}
		
		$(this).find(sd_shortcodes_tab_apply_to_element).sd_shortcodes_switcher( sd_shortcodes_tab_settings );
	});
});