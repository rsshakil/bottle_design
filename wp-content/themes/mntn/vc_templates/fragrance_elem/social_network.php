<?php

//Social Network
function social_networks( $atts ) {
   extract( shortcode_atts( array(
	  'icon' => '',
	  'style' => '',
      'size' => '',
	  'link' => ''
   ), $atts ) );
 
   return "<a href='{$link}' alt='social'><i class='fa fa-{$icon} fr_social {$style} {$size}'></i></a>";
}
add_shortcode( 'social_networks_btn', 'social_networks' );

add_action( 'init', 'fr_social_networks' );
function fr_social_networks() {
   vc_map( array(
	"name" => __("Social Networks", "mntn"),
	"base" => "social_networks_btn",
	"icon" => "social",
	"class" => "",
	"category" => __('Social', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Icon", "mntn"),
			"param_name" => "icon",
			"value" => array("","facebook","twitter","google-plus", "pinterest", "linkedin","flickr","foursquare","github","instagram","skype","vk","tumblr","xing","youtube","dribbble","dropbox"),
			"description" => __("Icon of network", "mntn"),
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Size", "mntn"),
			"param_name" => "size",
			"value" => array("small", "medium", "large"),
			"description" => __("Size of button", "mntn"),
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Style", "mntn"),
			"param_name" => "style",
			"value" => array("color", "gray", "black"),
			"description" => __("Choose style between color and gray", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Link", "mntn"),
			"param_name" => "link",
			"value" => '', //Default dark grey color
			"description" => __("Link (URL)", "mntn"),
		)
      )
   ) );
}
//Social Network

//Social Network Extended
function social_networks_ext( $atts ) {
   extract( shortcode_atts( array(
	  'icon' => '',
	  'font_color' => '',
	  'followers' => '',
	  'link' => ''
   ), $atts ) );
	
	$output = "<a href='{$link}' alt='social' class='social_ext'>";
	$output .= "<div class='social_ext_wrap'>";
	$output .= "<i class='fa fa-{$icon} fr_social'></i>";
	$output .= "<div class='social_ext_inner'><p style='color:{$font_color};'>{$followers}</p></span><span>Followers</span></div>";
	$output .= "</div></a>";
	
   return $output;
}
add_shortcode( 'social_networks_ext_btn', 'social_networks_ext' );

add_action( 'init', 'fr_social_networks_ext' );
function fr_social_networks_ext() {
   vc_map( array(
	"name" => __("Social Networks Extended", "mntn"),
	"base" => "social_networks_ext_btn",
	"icon" => "social_ext",
	"class" => "",
	"category" => __('Social', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Icon", "mntn"),
			"param_name" => "icon",
			"value" => array("","facebook","twitter","google-plus", "pinterest", "linkedin","flickr","foursquare","github","instagram","skype","vk","tumblr","xing","youtube","dribbble","dropbox"),
			"description" => __("Icon of network", "mntn"),
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Font color", "mntn"),
			"param_name" => "font_color",
			"value" => '#fff', //Default dark grey color
			"description" => __("Choose  color", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("number of followers", "mntn"),
			"param_name" => "followers",
			"value" => '', //Default dark grey color
			"description" => __("number of followers", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Link", "mntn"),
			"param_name" => "link",
			"value" => '', //Default dark grey color
			"description" => __("Link (URL)", "mntn"),
		)
      )
   ) );
}
//Social Network Extended

//Social Network Extended Large
function social_networks_ext_large( $atts, $content = null ) {
   extract( shortcode_atts( array(
	  'icon' => '',
	  'link' => '',
	  'text_on_btn' => ''
   ), $atts ) );
	
	$output = "<div class='social_ext_large {$icon}'>";
	$output .= "<div class='social_ext_wrap clearfix'>";
	$output .= "<div class='info_left'>";
	$output .= "<div class='social_text'>".wpb_js_remove_wpautop($content, true)."</div>";
	$output .= "<div class='soc_link_wrap'><i class=' fa fa-chevron-right fa-1x fa-border'></i><a href='{$link}' alt='social'>{$text_on_btn}</a></div>";
	$output .= "</div>";
	$output .= "<i class='fa fa-{$icon} fr_social'></i>";
	$output .= "</div></div>";
	
   return $output;
}
add_shortcode( 'social_networks_ext_large_btn', 'social_networks_ext_large' );

add_action( 'init', 'fr_social_networks_ext_large' );
function fr_social_networks_ext_large() {
   vc_map( array(
	"name" => __("Social Networks Extended Large", "mntn"),
	"base" => "social_networks_ext_large_btn",
	"icon" => "social_lrg",
	"class" => "",
	"category" => __('Social', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Icon", "mntn"),
			"param_name" => "icon",
			"value" => array("","facebook","twitter","google-plus", "pinterest", "linkedin","flickr","foursquare","github","instagram","skype","vk","tumblr","xing","youtube","dribbble","dropbox"),
			"description" => __("Icon of network", "mntn"),
		),
		array(
			"type" => "textarea_html",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text", "mntn"),
			"param_name" => "content",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Link", "mntn"),
			"param_name" => "link",
			"value" => '', //Default dark grey color
			"description" => __("Link (URL)", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text on Button", "mntn"),
			"param_name" => "text_on_btn",
			"value" => 'Join now',
			"description" => __("Text on Button", "mntn"),
		)
      )
   ) );
}
//Social Network Extended Large

//Social Network Text
function social_networks_text( $atts ) {
   extract( shortcode_atts( array(
	  'soc_network' => '',
	  'link' => ''
   ), $atts ) );
 
   return "<a class='soc_network_text' href='{$link}' alt='social'><span>{$soc_network}</span><span>{$soc_network}</span></a>";
}
add_shortcode( 'social_networks_text_btn', 'social_networks_text' );

add_action( 'init', 'fr_social_networks_text' );
function fr_social_networks_text() {
   vc_map( array(
	"name" => __("Social Networks Text", "mntn"),
	"base" => "social_networks_text_btn",
	"class" => "",
	"category" => __('Social', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Name of social network", "mntn"),
			"param_name" => "soc_network",
			"value" => '',
			"description" => __("Name of social network", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Link", "mntn"),
			"param_name" => "link",
			"value" => '', //Default dark grey color
			"description" => __("Link (URL)", "mntn"),
		)
      )
   ) );
}
//Social Network Text
?>