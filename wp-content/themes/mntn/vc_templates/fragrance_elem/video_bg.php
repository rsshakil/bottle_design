<?php

//Video Pop-up
function video_pop_up( $atts, $content = null ) {
   extract( shortcode_atts( array(
      'video_url' => '',
      'bg_img' => '',
      'width' => '',
      'height' => '',
   ), $atts ) );
   
	$img_id = preg_replace( '/[^\d]/', '', $bg_img );
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
	
	$output = "<div class='fr_video_popup' style='background-image:url({$img_url[0]}); width:{$width}; height:{$height};'>";
	$output .= "<div class='fr_video_pop_up_inner'><a class='fr_video_popup_btn mfp-iframe' href='{$video_url}'><i class='fa fa-play fa-1x'></i></a>";
	$output .= wpb_js_remove_wpautop($content, true);
	$output .= "</div></div>";
	
   return $output;
}
add_shortcode( 'video_pop_up_elem', 'video_pop_up' );

add_action( 'init', 'fr_video_pop_up' );
function fr_video_pop_up() {
   vc_map( array(
	"name" => __("Video Pop-Up", "mntn"),,
	"description" => "Video from youtuve or vimeo in pop-up window",
	"base" => "video_pop_up_elem",
	"icon" => "video_pop_up",
	"class" => "",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Video URL", "mntn"),
			"param_name" => "video_url",
			"value" => '', 
			"description" => __("Enter video URL", "mntn"),
		),
		array(
			"type" => "textarea_html",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text", "mntn"),
			"param_name" => "content",
			"value" => 'Pressing the play button will open a pop-up a video player', 
			"description" => __("Enter your text", "mntn"),
		),
		array(
			"type" => "attach_image",
			"holder" => "div",
			"class" => "",
			"heading" => __("Background Image", "mntn"),
			"param_name" => "bg_img",
			"value" => 'none',
			"description" => __("Choose image for background", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Width", "mntn"),
			"param_name" => "width",
			"value" => '', 
			"description" => __("By default width 100%. You can set width in % and px", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Height", "mntn"),
			"param_name" => "height",
			"value" => '', 
			"description" => __("You can set height in px", "mntn"),
		),
      )
   ) );
}
//Video Pop-up
?>