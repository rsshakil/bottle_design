(function($){
	var $header_featured = $('#header_featured'),
		$flexnav = $('#header_featured .flex-direction-nav');
	
	$('#header_featured .slide').css({ 'width': $(window).width() , 'height': $(window).height() });
	
	$('#header_featured .fr_slide_image').each(function(i){
			$(this).css('backgroundImage', 'url('+$(this).find('img').attr('src')+')');
			$(this).find('img').remove();
		});
	
	//$header_featured.flexslider({
	//	slideshow: false, 			// set true for autoplay
		//slideshowSpeed: 7000,		//uncommented for autoplay
	//});
	
	if ( $header_featured.length ){
			slider_settings = {
				slideshow: false,
				start: function(slider) {
					slider = slider;
				}
			};

			if ( $header_featured.hasClass('slider_auto') ) {
				var slider_autospeed_class_value = /slider_speed_(\d+)/g;
				
				slider_settings.slideshow = true;
				
				slider_autospeed = slider_autospeed_class_value.exec( $header_featured.attr('class') );
				
				slider_settings.slideshowSpeed = slider_autospeed[1];
			}
			
			if ( $header_featured.hasClass('slider_effect_slide') ){
				slider_settings.animation = 'slide';
			}
			
			slider_settings.pauseOnHover = true;
			
			$header_featured.flexslider( slider_settings );
		}
	$("#header_featured").find('#left-arrow').click( function(){
			$('#header_featured .flex-direction-nav').find('a.flex-prev').trigger('click');
			return false;
		});
	
	$("#header_featured").find('#right-arrow').click( function(){
		$('#header_featured .flex-direction-nav').find('a.flex-next').trigger('click');
		return false;
	});
		
})(jQuery);

