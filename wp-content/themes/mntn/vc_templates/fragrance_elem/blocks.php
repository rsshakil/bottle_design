<?php
	
	
//Image Block
function image_block( $atts, $content = null ) {
   extract( shortcode_atts( array(
	  'img' => '',
	  'align' => ''
   ), $atts ) );
	
	$img_id = preg_replace( '/[^\d]/', '', $img );
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
	
	$output = "<div class='fr_image_block {$align}'>";
	$output .= "<div class='image_wrap'><img src='{$img_url[0]}' alt='img'/></div>";
	$output .= "<div class='desc_block'>".wpb_js_remove_wpautop($content, true)."</div>";
	$output .= "</div>";
	
   return $output;
}
add_shortcode( 'add_image_block', 'image_block' );

add_action( 'init', 'fr_image_block' );
function fr_image_block() {
   vc_map( array(
	"name" => __("Image Block", "mntn"),
	"description" => "Block with image",
	"base" => "add_image_block",
	"class" => "",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "attach_image",
			"holder" => "div",
			"class" => "",
			"heading" => __("Attach Image", "mntn"),
			"param_name" => "img",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Align Image", "mntn"),
			"param_name" => "align",
			"value" => array("left", "right", "center"),
			"description" => __("", "mntn")
		),
		array(
			"type" => "textarea_html",
			"holder" => "div",
			"class" => "",
			"heading" => __("Content", "mntn"),
			"param_name" => "content",
			"value" => '',
			"description" => __("", "mntn")
		)
      )
   ) );
}
//Image Block

//Image w Text Over
function image_w_text( $atts, $content = null ) {
   extract( shortcode_atts( array(
	  'img' => '',
	  'link' => '',
	  'title' => '',
   ), $atts ) );
	
	$img_id = preg_replace( '/[^\d]/', '', $img );
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
	
	$output = "<div class='fr_image_w_text'>";
	$output .= "<div class='overlay'></div>";
	$output .= "<img src='{$img_url[0]}' alt='img'/>";
	$output .= "<div class='desc_block'><div class='desc_block_inner'><div class='desc_block_inner2'><a href='{$link}' class='fr_button outline middle'>{$title}</a></div></div></div>";
	$output .= "</div>";
	
   return $output;
}
add_shortcode( 'add_image_w_text', 'image_w_text' );

add_action( 'init', 'fr_image_w_text' );
function fr_image_w_text() {
   vc_map( array(
	"name" => __("Image w Text Over", "mntn"),
	"description" => "",
	"base" => "add_image_w_text",
	"class" => "",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "attach_image",
			"holder" => "div",
			"class" => "",
			"heading" => __("Attach Image", "mntn"),
			"param_name" => "img",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Title", "mntn"),
			"param_name" => "title",
			"value" => '',
			"description" => __("Title for block", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("URL", "mntn"),
			"param_name" => "link",
			"value" => '',
			"description" => __("Link for block", "mntn"),
		)
      )
   ) );
}
//Image w Text Over
	
?>