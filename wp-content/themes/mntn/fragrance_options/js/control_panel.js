jQuery(document).ready(function(){
	$example_color = jQuery('#control_panel_wrap a.control_panel_color_setting');
	$example_color.click(function(){
		var option_value = jQuery(this).attr('title'),
			theme_folder = control_panel.theme_folder;
		
		if ( jQuery(this).hasClass('control_panel_bg_image') ) {
			var texture_url = theme_folder + '/images/control_panel/body-' + option_value + '.png';
			jQuery('body').css( { 'backgroundImage': 'url(' + texture_url + ')', 'backgroundRepeat' : 'repeat' } );
			jQuery.cookie('BG_TEXTURE', texture_url);
		} else {
			if ( jQuery('body').css('backgroundImage').search('control_panel') !== -1 )
				jQuery('.post_meta').css( 'backgroundColor', '#' + option_value );
			else 
				jQuery('body').css( 'backgroundColor', option_value );
				jQuery('body').css( 'backgroundColor', option_value );
			jQuery.cookie('BG_COLOR', option_value);
		}
		
		return false;
	});

	jQuery('#control_panel_background').ColorPicker({
		onShow: function (colpkr) {
			jQuery(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			jQuery(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			jQuery('body').css('backgroundColor', '#' + hex);
		}
	});

	var $control_panel = jQuery('#control_panel_wrap'),
		$control_close = jQuery('#control_panel_close');

	$control_close.click(function(){
		if ( jQuery(this).hasClass('control-open') ) {
			$control_panel.animate( { left: 0 } );
			jQuery(this).removeClass('control-open');
			jQuery.cookie('fragrance_control_panel_open', 0);
		} else {
			$control_panel.animate( { left: -200 } );
			jQuery(this).addClass('control-open');
			jQuery.cookie('fragrance_control_panel_open', 1);
		}
		return false;
	});

	if ( jQuery.cookie('fragrance_control_panel_open') == 1 ) { 
		$control_panel.animate( { left: -200 } );
		$control_close.addClass('control-open');
	}
});