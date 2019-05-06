<?php

//Team  Members
function team_members( $atts ) {
   extract( shortcode_atts( array(
      'img' => '',
	  'color' => '',
	  'name' => '',
	  'post' => '',
	  'info' => ''
   ), $atts ) );
	
	$img_id = preg_replace( '/[^\d]/', '', $img );
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
	
	$output = "<div class='team_member' style='color:{$color}'>";
	$output .= "<img src='{$img_url[0]}' alt='img'/>";
	$output .= "<h4 style='color:{$color}'>{$name}</h4>";
	$output .= "<p class='team_post'>{$post}</p>";
	$output .= "<p class='team_info'>{$info}</p></div>";
	
   return $output;
}
add_shortcode( 'team_members_block', 'team_members' );

add_action( 'init', 'fr_team_members' );
function fr_team_members() {
   vc_map( array(
	"name" => __("Team", "mntn"),
	"description" => "Team member block",
	"base" => "team_members_block",
	"icon" => "team",
	"class" => "",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "attach_image",
			"holder" => "div",
			"class" => "",
			"heading" => __("Photo team member", "mntn"),
			"param_name" => "img",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Name team member", "mntn"),
			"param_name" => "name",
			"value" => '', 
			"description" => __("", "mntn")
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text color", "mntn"),
			"param_name" => "color",
			"value" => '#fff', //Default color
			"description" => __("Choose  color", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Post team member", "mntn"),
			"param_name" => "post",
			"value" => '', 
			"description" => __("", "mntn")
		),
		array(
			"type" => "textarea",
			"holder" => "div",
			"class" => "",
			"heading" => __("Additional information", "mntn"),
			"param_name" => "info",
			"value" => '', 
			"description" => __("", "mntn")
		),
      )
   ) );
}
//Team  Members

//Team  Members Image
/*function team_members_img( $atts ) {
   extract( shortcode_atts( array(
      'img' => '',
	  'name' => '',
	  'post' => '',
   ), $atts ) );
	
	$img_id = preg_replace( '/[^\d]/', '', $img );
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
	
	$output = "<div class='team_member_img'><div class='team_member_img_overlay'></div><div class='team_img' style='background-image: url({$img_url[0]});'></div> ";
	$output .= "<h4>{$name}</h4>";
	$output .= "<p class='team_post'>{$post}</p>";
	$output .= "</div>";
	
   return $output;
}
add_shortcode( 'team_members_block_img', 'team_members_img' );

add_action( 'init', 'fr_team_members_img' );
function fr_team_members_img() {
   vc_map( array(
	"name" => __("Team"),
	"description" => "Team member block (Image)",
	"base" => "team_members_block_img",
	"icon" => "team_image",
	"class" => "",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "attach_image",
			"holder" => "div",
			"class" => "",
			"heading" => __("Photo team member"),
			"param_name" => "img",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Name team member"),
			"param_name" => "name",
			"value" => '', 
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Post team member"),
			"param_name" => "post",
			"value" => '', 
			"description" => __("", "mntn")
		),
      )
   ) );
}*/
//Team  Members Image

//Team  Members 2
/*function team_members_t( $atts ) {
   extract( shortcode_atts( array(
      'img' => '',
	  'name' => '',
	  'post' => '',
	  'orientation' => '',
   ), $atts ) );
	
	$img_id = preg_replace( '/[^\d]/', '', $img );
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
	
	$output = "<div class='team_member_t clearfix {$orientation}'>";
	$output .= "<img src='{$img_url[0]}' alt='img'/>";
	$output .= "<h4>{$name}</h4>";
	$output .= "<p class='team_post'>{$post}</p>";
	$output .= "</div>";
	
   return $output;
}
add_shortcode( 'team_members_block_t', 'team_members_t' );

add_action( 'init', 'fr_team_members_t' );
function fr_team_members_t() {
   vc_map( array(
	"name" => __("Team (Third Variant)"),
	"description" => "Team member block (Third Variant, Round Avatar)",
	"base" => "team_members_block_t",
	"icon" => "team_image",
	"class" => "",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "attach_image",
			"holder" => "div",
			"class" => "",
			"heading" => __("Photo team member"),
			"param_name" => "img",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Name team member"),
			"param_name" => "name",
			"value" => '', 
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Post team member"),
			"param_name" => "post",
			"value" => '', 
			"description" => __("", "mntn")
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Orientation"),
			"param_name" => "orientation",
			"value" => array("vertical","horizontal"), 
			"description" => __("", "mntn")
		),
      )
   ) );
}*/
//Team  Members 2

?>