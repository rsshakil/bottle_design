<?php

//Fragrance Call to Action
function call_to_act( $atts, $content = null ) {
   extract( shortcode_atts( array(
	  'content_text' => '',
	  'btn_text' => '',
	  'btn_link' => '',
	  'bg' => '',
      'color' => '#303030',
	  'btn_bg' => '',
	  'btn_font_color' => ''
   ), $atts ) );
   
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
 
	$output = "<div class='fr_call_to_action clearfix'>";
	$output .= "<div class='fr_call_to_action_inner' style='background-color:{$bg};'>".wpb_js_remove_wpautop($content, true)."</div>";
	$output .= "<a href={$btn_link} class='fr_call_to_action_btn' style='background-color:{$btn_bg};'>{$btn_text}</a>";
	$output .= "</div><!-- end of .fr_call_to_action -->";
	
   return $output;
}
add_shortcode( 'call_to_act_btn', 'call_to_act' );

add_action( 'init', 'fr_call_to_act_btn' );
function fr_call_to_act_btn() {
   vc_map( array(
	"name" => __("Fragrance Call to Action Button", "mntn"),
	"base" => "call_to_act_btn",
	"icon" => "fr_call_to_action",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "textarea_html",
			"holder" => "div",
			"class" => "",
			"heading" => __("Call to Action Text", "mntn"),
			"param_name" => "content",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Call to Action Button Text", "mntn"),
			"param_name" => "btn_text",
			"value" => '',
			"description" => __("Enter text for button", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Call to Action Button Link", "mntn"),
			"param_name" => "btn_link",
			"value" => '',
			"description" => __("Enter link for button", "mntn"),
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Background Color", "mntn"),
			"param_name" => "bg",
			"value" => '#303030',
			"description" => __("Choose  color", "mntn"),
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Background Color of Button", "mntn"),
			"param_name" => "btn_bg",
			"value" => '#303030',
			"description" => __("Choose  color", "mntn"),
		)
      )
   ) );
}
//Fragrance Call to Action

?>