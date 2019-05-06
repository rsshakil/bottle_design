<?php

require_once(TEMPLATEPATH . '/includes/ext/custom_functions.php'); 

	require_once(TEMPLATEPATH . '/fragrance_options/options_fragrance.php');

	require_once(TEMPLATEPATH . '/fragrance_options/features.php'); 
	
	require_once(TEMPLATEPATH . '/includes/ext/layout.php'); 


add_action( 'wp_head', 'set_font_properties' );
function set_font_properties(){
	$font_style = '';
	$font_family = '';
	
	//if ( isset( $_COOKIE['mntn_HEADER_FONT'] ) && get_option('SHOW_CONTROL_PANEL') == 'on' ) $header_font =  $_COOKIE['mntn_HEADER_FONT'];
	//else {
		$header_font = get_option('mntn_HEADER_FONT');
	//}
	
	if ( $header_font == 'Oswald' || $header_font == 'Oswald' ) $header_font = '';
	
	if ( $header_font <> '' ) {
		$header_font_id = strtolower( str_replace( '+', '_', $header_font ) );
		$header_font_id = str_replace( ' ', '_', $header_font_id );
		
		if ( $header_font <> '' ) { 
			$font_style .= "<link id='" . esc_attr($header_font_id) . "' href='" . esc_url( "http://fonts.googleapis.com/css?family=" . $header_font ) . "' rel='stylesheet' type='text/css' />";
			$font_family = "font-family: '" . esc_html(str_replace( '+', ' ', $header_font )) . "', Arial, sans-serif !important; ";
		}
		
		$font_style .= "<style type='text/css'>h1, h2, h3, h4, h5, h6, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a, .home blockquote p,#quote, span.fn, .widget_recent_entries ul li a, .entry a.readmore, #contact_submit, #contact_reset,.reply-container a, #commentform input#submit, .more-link { ". $font_family .  " }</style>";
		
		echo $font_style;
	}
	
	$font_style = '';
	$font_family = '';
	
	//if ( isset( $_COOKIE['mntn_BODY_FONT'] ) || get_option('SHOW_CONTROL_PANEL') == 'on' ) $body_font =  $_COOKIE['mntn_BODY_FONT'];
	//else {
		$body_font = get_option('mntn_BODY_FONT');
	//}
	
	if ( $body_font == 'Lato' ) $body_font = '';
	
	if ( $body_font <> '' ) {
		$body_font_id = strtolower( str_replace( '+', '_', $body_font ) );
		$body_font_id = str_replace( ' ', '_', $body_font_id );
		
		if ( $body_font <> '' ) { 
			$font_style .= "<link id='" . esc_attr($body_font_id) . "' href='" . esc_url( "http://fonts.googleapis.com/css?family=" . $body_font ) . "' rel='stylesheet' type='text/css' />";
			$font_family = "font-family: '" . esc_html(str_replace( '+', ' ', $body_font )) . "', Arial, sans-serif !important; ";
		}
		
		$font_style .= "<style type='text/css'>body, #contact p input, #contact p textarea, #menu .nav a, p, input, textarea { ". $font_family .  " }</style>";
		
		echo $font_style;
	}
}
?>