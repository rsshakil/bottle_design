<?php 

if (function_exists('add_post_type_support')) add_post_type_support( 'page', 'excerpt' );
add_theme_support( 'automatic-feed-links' );

add_action('init','inclusion_extensions');
function inclusion_extensions(){
	require_once(TEMPLATEPATH . '/includes/add_page_settings.php'); 
}

if ( ! function_exists( 'fr_options_stored_in_one_row' ) ){
	function fr_options_stored_in_one_row(){
		global $fr_store_options_in_one_row;
		
		return isset( $fr_store_options_in_one_row ) ? (bool) $fr_store_options_in_one_row : false; 
	}
}

if ( ! function_exists( 'fr_get_theme_option' ) ){
	function fr_get_theme_option( $option_name, $default_value = '' ){
		global $fr_theme_options, $shortname;

		if ( fr_options_stored_in_one_row() ){
			$fr_theme_options_name = $shortname;
			
			if ( ! isset( $fr_theme_options ) ) $fr_theme_options = get_option( $fr_theme_options_name );
			$option_value = isset ( $fr_theme_options[$option_name] ) ? $fr_theme_options[$option_name] : false;
		} else {
			$option_value = get_option( $option_name );
		}
		
		if ( !$option_value && '' != $default_value ) $option_value = $default_value;
		
		return $option_value;
	}
}

if ( ! function_exists( 'fr_update_theme_option' ) ){
	function fr_update_theme_option( $option_name, $new_value ){
		global $fr_theme_options, $shortname;
		
		if ( fr_options_stored_in_one_row() ){
			$fr_theme_options_name =  $shortname;
			
			if ( ! isset( $fr_theme_options ) ) $fr_theme_options = get_option( $fr_theme_options_name );
			$fr_theme_options[$option_name] = $new_value;
			
			$option_name = $fr_theme_options_name;
			$new_value = $fr_theme_options;
		}
		
		update_option( $option_name, $new_value );
	}
}

if ( ! function_exists( 'fr_delete_theme_option' ) ){
	function fr_delete_theme_option( $option_name ){
		global $fr_theme_options, $shortname;
		
		if ( fr_options_stored_in_one_row() ){
			$fr_theme_options_name =  $shortname;
			
			if ( ! isset( $fr_theme_options ) ) $fr_theme_options = get_option( $fr_theme_options_name );
			
			unset( $fr_theme_options[$option_name] );
			update_option( $fr_theme_options_name, $fr_theme_options );
		} else {
			delete_option( $option_name );
		}
	}
}

add_filter('body_class','fr_browser_body_class');
function fr_browser_body_class($classes) {
	global $fr_is_lynx, $fr_is_gecko, $fr_is_IE, $fr_is_opera, $fr_is_NS4, $fr_is_safari, $fr_is_chrome, $fr_is_iphone;

	if($fr_is_lynx) $classes[] = 'lynx';
	elseif($fr_is_gecko) $classes[] = 'gecko';
	elseif($fr_is_opera) $classes[] = 'opera';
	elseif($fr_is_NS4) $classes[] = 'ns4';
	elseif($fr_is_safari) $classes[] = 'safari';
	elseif($fr_is_chrome) $classes[] = 'chrome';
	elseif($fr_is_IE) $classes[] = 'ie';
	else $classes[] = 'unknown';

	if($fr_is_iphone) $classes[] = 'iphone';
	return $classes;
			
}



/*** EXCERPT FROM TITLE ***/
if ( ! function_exists( 'fr_excerpt_title' ) ){
	function fr_excerpt_title($amount,$echo=true,$post='') {
		if ( $post == '' ) $excerpt = get_the_title(); 
		else $excerpt = $post->post_title; 
		if ( strlen($excerpt) <= $amount ) $echo_out = ''; else $echo_out = '...';
		$excerpt = mb_substr( $excerpt, 0, $amount, 'UTF-8' );
		if ($echo) {
			echo $excerpt;
			echo $echo_out;
		}
		else { return ($excerpt . $echo_out); }
	}
}

if ( ! function_exists( 'fr_in_subcat' ) ){
	function fr_in_subcat($blogcat,$current_cat='') {
		$in_subcategory = false;
		
		if (cat_is_ancestor_of($blogcat,$current_cat) || $blogcat == $current_cat) $in_subcategory = true;
			
		return $in_subcategory;
	}
}


/*** GETS PAGE NAME BY IT'S ID ***/
if ( ! function_exists( 'fr_get_pagename' ) ){
	function fr_get_pagename( $page_id )
	{
		$page_object = get_page( $page_id );
		
		return apply_filters( 'the_title', $page_object->post_title, $page_id );
	}
}

/*** GETS CATEGORY NAME BY IT'S ID ***/
if ( ! function_exists( 'fr_get_categname' ) ){
	function fr_get_categname( $cat_id )
	{
		return get_cat_name( $cat_id );
	}
}

/*** GETS CATEGORY ID BY IT'S NAME ***/
if ( ! function_exists( 'fr_get_catId' ) ){
	function fr_get_catId($cat_name)
	{
		$cat_name_id = get_cat_ID( html_entity_decode( $cat_name, ENT_QUOTES ) );
		return $cat_name_id;
	}
}

/*** GETS PAGE ID BY IT'S NAME ***/
if ( ! function_exists( 'fr_get_pageId' ) ){
	function fr_get_pageId( $page_name )
	{
		global $wpdb;
		
		if ( is_numeric( $page_name ) ) return $page_name;
		
		$page_name = html_entity_decode( $page_name, ENT_QUOTES );
		$page = get_page_by_title( $page_name );

		return $page->ID;
	}
}

add_action('wp_head','fr_add_favicon');
function fr_add_favicon(){
	global $shortname;
	
	$fr_faviconUrl = get_option('FR_FAVICON');
	if ($fr_faviconUrl <> '') echo('<link rel="shortcut icon" href="'.esc_url( $fr_faviconUrl ).'" />');
}

add_action( 'wp_head', 'fr_google_analytics' );
function fr_google_analytics() {
	echo  get_option('FR_GOOGLE_ANALYTICS') ;
}

/*** meta keywords ***/
function fr_meta_keywords() {
	echo '<meta name="keywords" content="'.esc_attr( get_option('FR_META_KEYWORDS') ).'" />';
}

?>