<?php

//Fragrance Progress Bar
function progress_bar( $atts ) {
   extract( shortcode_atts( array(
	  'name' => '',
      'value' => '',
	  'bar_color' => '',
	  'text_color' => ''
   ), $atts ) );
   
   $ouput = "<div class='skills_wrap' style='color:{$text_color};' >";
   $ouput .= "<span class='current'>{$name}</span>";
   $ouput .= "<span class='data'>{$value}%</span>";
   $ouput .= "<div class='upload' data-width='{$value}' style='background-color:{$bar_color};'>";
   $ouput .= "</div></div>";
	
   return $ouput;
}
add_shortcode( 'fr_progress_bar', 'progress_bar' );

add_action( 'init', 'fr_progress_bar_elem' );
function fr_progress_bar_elem() {
   vc_map( array(
	"name" => __("Fr Progress Bar", "mntn"),
	"description" => "Animated Progress Bar from Fragrance with additional settings",
	"base" => "fr_progress_bar",
	"icon" => "fr_progress_bar",
	"class" => "",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Name of skill", "mntn"),
			"param_name" => "name",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Value of skill", "mntn"),
			"param_name" => "value",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Background color of Bar", "mntn"),
			"param_name" => "bar_color",
			"value" => '',
			"description" => __("Choose  color", "mntn"),
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text color", "mntn"),
			"param_name" => "text_color",
			"value" => '',
			"description" => __("Choose  color", "mntn"),
		)
      )
   ) );
}

?>