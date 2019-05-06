/* <![CDATA[ */
	var clearpath = controlPanelSettings.clearpath,
		c_p_saving_message = controlPanelSettings.c_p_saving_message,
		c_p_options_saved_message = controlPanelSettings.c_p_options_saved_message,
		windowWidth = jQuery(window).width(),
		windowHeight = jQuery(window).height();

	jQuery(document).ready(function(){
		jQuery('#control-panel-inside,#control-panel-inside > div').tabs({ fx: { opacity: 'toggle', duration:'fast' }, selected: 0 });
		
		jQuery(".defaults-button").click(function() {
			jQuery("body").css( 'overflow' , 'hidden' );
			//alert(jQuery(window).width());
			jQuery("<div class='BG'>").css({width: windowWidth, height: windowHeight, backgroundColor: 'rgba(0,0,0,0.7)', position: 'fixed', zIndex: 10, top: 0, left: 0}).appendTo(jQuery('body'));;
			//$(body).
			jQuery(".defaults-hover").animate({opacity: "show",  zIndex: 100}, "fast");
		});
		jQuery(".no").click(function() {
			jQuery(".defaults-hover").animate({opacity: "hide"}, "fast");
			jQuery("body").css( 'overflow' , 'visible' );
			jQuery(".BG").remove();
		});
		
		
		var $save_message = jQuery("#settings_ajax_saving");
					
		jQuery('input.save_settings').click(function($){
			var options_fromform = jQuery('#main_options_form').formSerialize(),
				add_nonce = '&_ajax_nonce='+controlPanelSettings.c_p_nonce;
			
			options_fromform += add_nonce;
			
			var save_button=jQuery(this);
			jQuery.ajax({
			   type: "POST",
			   url: ajaxurl,
			   data: options_fromform,
			   beforeSend: function ( xhr ){
					$save_message.children("img").css("display","block");
					$save_message.children("span").css("margin","6px 0px 0px 30px").html( c_p_saving_message );
					$save_message.fadeIn('fast');
			   },
			   success: function(response){
					$save_message.children("img").css("display","none");
					$save_message.children("span").css("margin","0px").html( c_p_options_saved_message );
					
					save_button.blur();
					
					setTimeout(function(){
						$save_message.fadeOut("slow");
					},500);
			   }
			});

			return false;
		});	
	});
/* ]]> */