<?php

//Pie Charts
function pie_charts( $atts ) {
   extract( shortcode_atts( array(
	  'value' => '',
      'skill_name' => '',
	  'color' => ''
   ), $atts ) );
 
   return "<div class='chart_wrap' style='color:{$color};'><div class='chart' data-percent='{$value}'>{$value}%</div><h5>{$skill_name}</h5></div>";
}
add_shortcode( 'add_pie_charts', 'pie_charts' );

add_action( 'init', 'fr_pie_charts' );
function fr_pie_charts() {
   vc_map( array(
	"name" => __("FR Pie Charts", "mntn"),
	"base" => "add_pie_charts",
	"class" => "separator  small",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Data Percent", "mntn"),
			"param_name" => "value",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Skill name", "mntn"),
			"param_name" => "skill_name",
			"value" => '',
			"description" => __("Enter skill's name", "mntn"),
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text color", "mntn"),
			"param_name" => "color",
			"value" => '#212121',
			"description" => __("Select color for your element", "mntn"),
		),
      )
   ) );
}


//Pie Charts


?>