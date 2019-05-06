<?php

//Fragrance Icon Block
function icon_block( $atts, $content = null ) {
	extract( shortcode_atts( array(
	  'icon' => 'fa-magic',
	  'block_bg' => ''
	), $atts ) );
	
	$output = "<div class='icon_block' style='background-color:{$block_bg};'>";
	$output .= "<div class='icon_block_inner'><i class='fa ". $icon ." fa-2x'></i>".wpb_js_remove_wpautop($content, true);
	$output .= "</div></div> <!-- end .icon_block -->";

   return $output;
}
add_shortcode( 'icon_block_elem', 'icon_block' );

add_action( 'init', 'fr_icon_block' );
function fr_icon_block() {
   vc_map( array(
	"name" => __("Icon block w Hover Effect", "mntn"),
	"description" => __("Icon block w Hover Effect", "mntn"),
	"base" => "icon_block_elem",
	"icon" => "icon_block_1",
	"class" => "separator  small",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Icon", "mntn"),
			"param_name" => "icon",
			"value" => 'fa-magic',
			"description" => __("Enter name of Awesome Font icon", "mntn"),
		),
		array(
			"type" => "textarea_html",
			"holder" => "div",
			"class" => "",
			"heading" => __("Content", "mntn"),
			"param_name" => "content",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Block Background Color", "mntn"),
			"param_name" => "block_bg",
			//"value" => '#E6AE48',
			"value" => '',
			"description" => __("Choose background color", "mntn"),
		),
      )
   ) );
}
//Fragrance Icon Block

?>