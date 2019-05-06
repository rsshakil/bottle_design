<?php



require_once('fragrance_elem/social_network.php');
require_once('fragrance_elem/team_members.php');
//require_once('fragrance_elem/call_to_action.php');
//require_once('fragrance_elem/progress_bar.php');
//require_once('fragrance_elem/video_bg.php');
require_once('fragrance_elem/icon_elem.php');
//require_once('fragrance_elem/blocks.php');
require_once('fragrance_elem/pie_charts.php');

//Fragrance Header One Page
function header_one_page( $atts ) {
   extract( shortcode_atts( array(
      'color' => '#212121',
	  'elem_tag' => '',
	  'header' => '',
	  'anchor' => '',
	  'visibility' => '',
	  'text_align' => '',
	  'font_size' => '',
	  'font_weight' => ''
   ), $atts ) );
 
   return "<div class='fr_header_one_page' style='visibility:{$visibility}; text-align:{$text_align};'><{$elem_tag} id='{$anchor}' class='fr_anchor_one_page' style='font-size:{$font_size}px; font-weight:{$font_weight}; color:{$color};'>{$header}</{$elem_tag}></div>";
}
add_shortcode( 'fr_header_one_page_short', 'header_one_page' );

add_action( 'init', 'fr_header_one_page' );
function fr_header_one_page() {
   vc_map( array(
	"name" => __("Header One Page", "mntn"),
	"base" => "fr_header_one_page_short",
	"icon" => "fr_sep",
	"class" => "",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Header", "mntn"),
			"param_name" => "header",
			"value" => '',
			"description" => __("Enter your header", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Anchor", "mntn"),
			"param_name" => "anchor",
			"value" => '',
			"description" => __("Enter anchor. All characters must be lowercase", "mntn"),
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Element tag", "mntn"),
			"param_name" => "elem_tag",
			"value" => array("h1","h2","h3","h4","h5","h6"),
			"description" => __("Select element tag", "mntn"),
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("visibility", "mntn"),
			"param_name" => "visibility",
			"value" => array("visible","hidden"),
			"description" => __("Show or hidden", "mntn"),
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text align", "mntn"),
			"param_name" => "text_align",
			"value" => array("left","right","center","justify"),
			"description" => __("Select text alignment", "mntn"),
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text color", "mntn"),
			"param_name" => "color",
			"value" => '#212121', //Default dark grey color
			"description" => __("Select color for your element", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Font size", "mntn"),
			"param_name" => "font_size",
			"value" => '',
			"description" => __("Enter font size", "mntn"),
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Font weight", "mntn"),
			"param_name" => "font_weight",
			"value" => '',
			"description" => __("Enter font weight. For those fonts that are available", "mntn"),
		),
      )
   ) );
}
//Fragrance Header One Page

//Fragrance Dividers
function dividers( $atts ) {
   extract( shortcode_atts( array(
      'text' => '',
      'btn_text' => '',
      'btn_link' => '',
      'color' => '',
   ), $atts ) );
   
   $output = "<section class='fr_converse {$color}'>";
   $output .= "<div class='sizers clearfix'>";
   $output .= "<div class='two_third'><p>{$text}</p></div>";
   $output .= "<div class='one_third last'><a href='{$btn_link}' class='fr_simple_btn'>{$btn_text}</a></div>";
   $output .= "</div></section>";
   
   return $output;
}
add_shortcode( 'fr_page_dividers', 'dividers' );

add_action( 'init', 'fr_dividers' );
function fr_dividers() {
   vc_map( array(
	"name" => __("Text Dividers", "mntn"),
	"base" => "fr_page_dividers",
	"icon" => "fr_sep",
	"class" => "separator  small",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text", "mntn"),
			"param_name" => "text",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Button text", "mntn"),
			"param_name" => "btn_text",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Button link", "mntn"),
			"param_name" => "btn_link",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Color", "mntn"),
			"param_name" => "color",
			"value" => array("white","gray"),
			"description" => __("", "mntn")
		),
      )
   ) );
}
//Fragrance Dividers

//Fragrance Separators
function sep_small( $atts ) {
   extract( shortcode_atts( array(
      'color' => '#303030',
	  'width' => '25'
   ), $atts ) );
 
   return "<div style='background-color:{$color}; width:{$width}px;' class='separator  small'></div>";
}
add_shortcode( 'separator', 'sep_small' );

add_action( 'init', 'separator_small_center' );
function separator_small_center() {
   vc_map( array(
	"name" => __("Separator small center", "mntn"),
	"base" => "separator",
	"icon" => "fr_sep",
	"class" => "separator  small",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Separator width", "mntn"),
			"param_name" => "width",
			"value" => '25', //Default dark grey color
			"description" => __("Enter width in 'px'", "mntn"),
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Separator color", "mntn"),
			"param_name" => "color",
			"value" => '#303030', //Default dark grey color
			"description" => __("Choose  color")
		)
      )
   ) );
}
//Fragrance Separators

//Fragrance Services Blocks
function service_block1( $atts, $content = null ) {
	extract( shortcode_atts( array(
	  'icon' => 'fa-magic',
	  'style' => '',
	), $atts ) );
	
	$output = "<div class='service services1 {$style} '><i class='fa ". $icon ." fa-2x'></i>";
	$output .= "<div class='service_inner'>".wpb_js_remove_wpautop($content, true);
	$output .= "</div></div> <!-- end .service -->";

   return $output;
}
add_shortcode( 'service1', 'service_block1' );

add_action( 'init', 'service_block_1' );
function service_block_1() {
   vc_map( array(
	"name" => __("Icon block 1", "mntn"),
	"base" => "service1",
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
			"description" => __("Enter name of Awesome Font icon", "mntn")
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
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Style", "mntn"),
			"param_name" => "style",
			"value" => array("background", "bordered"),
			"description" => __("", "mntn")
		),
      )
   ) );
}
//Fragrance Services Blocks

//Fragrance Icon Block 2
function icon_block2( $atts, $content = null ) {
	extract( shortcode_atts( array(
	  'icon' => 'fa-magic',
	  'icon_color' => '#fff',
	  'icon_size' => '',
	  'text' => 'Enter your text',
	  'font_color' => '',
	  'icon_bg' => '',
	  'style' => 'normal',
	  'align' => ''
	), $atts ) );
	
	$output = '';
	$output .= "<div class='icon icon2 {$align} {$style} style='color:{$font_color}'><div class='icon_box'><i class='fa {$icon} {$icon_size} fa-2x' style='color:{$icon_color}; border-color:{$icon_color}; background-color:{$icon_bg};'></i></div><div class='icon_content'>";
	$output .= wpb_js_remove_wpautop($content, true);
	$output .= '</div></div> <!-- end .icon -->';

   return $output;
}
add_shortcode( 'icon2', 'icon_block2' );

add_action( 'init', 'icon_block_2' );
function icon_block_2() {
   vc_map( array(
	"name" => __("Icon block 2", "mntn"),
	"description" => 'Multi-purpose block with an icon, supports 3 different styles',
	"base" => "icon2",
	"icon" => "icon_block_2",
	"class" => "",
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
			"description" => __("Enter name of Awesome Font icon", "mntn")
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Style", "mntn"),
			"param_name" => "style",
			"value" => array("normal", "border" ,"background"),
			"description" => __("", "mntn")
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Alignment", "mntn"),
			"param_name" => "align",
			"value" => array("left", "right", "center"),
			"description" => __("Align icon", "mntn")
		),
		array(
			"type" => "dropdown",
			"holder" => "div",
			"class" => "",
			"heading" => __("Icon Size", "mntn"),
			"param_name" => "icon_size",
			"value" => array("small", "normal", "large"),
			"description" => __("", "mntn")
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Icon color", "mntn"),
			"param_name" => "icon_color",
			"value" => '#fff',
			"description" => __("Choose icon color", "mntn"),
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Icon Background Color", "mntn"),
			"param_name" => "icon_bg",
			//"value" => '#E6AE48',
			"value" => '',
			"description" => __("Choose background color if you use style 'background'", "mntn"),
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Font Color", "mntn"),
			"param_name" => "font_color",
			"value" => '',
			"description" => __("Font Color", "mntn"),
		),
		array(
			"type" => "textarea_html",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text", "mntn"),
			"param_name" => "content",
			"value" => '',
			"description" => __("Enter text of your block", "mntn"),
		)		
      )
   ) );
}
//Fragrance Icon Block 2

//Fragrance Fun Fucts
function fun_fucts( $atts ) {
	extract( shortcode_atts( array(
	  'icon' => '',
	  'count' => 'Enter number of fact',
	  'fucts_name' => 'Enter your fuct name',
	  'font_color' => ''
	), $atts ) );
	
	$output = '';
	$output .= "<div class='fucts_counter' data-perc={$count}>";
	$output .= "<i class='fa {$icon} fa-4x' style='color:{$font_color}'></i><br /><span class='fucts_count highlight' style='color:{$font_color}'>{$count}</span>";
	$output .= "<h6 class='fucts_name' style='color:{$font_color}'>{$fucts_name}</h6>";
	$output .= '</div>';

   return $output;
}
add_shortcode( 'fun_fucts_elem', 'fun_fucts' );

add_action( 'init', 'funfucts' );
function funfucts() {
   vc_map( array(
	"name" => __("Fun fucts", "mntn"),
	"base" => "fun_fucts_elem",
	"icon" => "fr_fuct",
	"class" => "fun_fucts",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Fucts icon", "mntn"),
			"param_name" => "icon",
			"value" => '',
			"description" => __("Paste class of fontasome icon", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Fucts name", "mntn"),
			"param_name" => "fucts_name",
			"value" => '',
			"description" => __("Enter your fuct name", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Number of fact", "mntn"),
			"param_name" => "count",
			"value" => '',
			"description" => __("Enter number of fact", "mntn")
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Font color", "mntn"),
			"param_name" => "font_color",
			"value" => '',
			"description" => __("Choose font color", "mntn")
		)
      )
   ) );
}
//Fragrance Fun Fucts

//Fragrance Fun Fucts2
/*function fun_fucts2( $atts ) {
	extract( shortcode_atts( array(
	  'icon' => '',
	  'count' => 'Enter number of fact',
	  'fucts_name' => 'Enter your fuct name',
	  'bg_color' => '',
	  'bg_img' => '',
	  'icon_color' => '',
	  'font_color' => ''
	), $atts ) );
	
	$img_id = preg_replace( '/[^\d]/', '', $bg_img );
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
	
	$output = '';
	$output .= "<div class='fun_fucts2 fucts_counter' data-perc='{$count}' style='background-image:url({$img_url[0]}); background-color: {$bg_color}'>";
	$output .= "<i class='fa {$icon} fa-2x' style='color:{$icon_color};'></i><br />";
	$output .= "<h6 class='fucts_name' style='color:{$font_color};'>{$fucts_name}</h6><span class='fucts_count highlight' style='color:{$font_color};'>{$count}</span>";
	$output .= '</div>';

   return $output;
}
add_shortcode( 'fun_fucts_elem2', 'fun_fucts2' );

add_action( 'init', 'funfucts2' );
function funfucts2() {
   vc_map( array(
	"name" => __("Fun fucts 2"),
	"description" => ("Fun fucts block 2nd variant"),
	"base" => "fun_fucts_elem2",
	"icon" => "fucts_fn",
	"class" => "fucts2",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Fucts icon"),
			"param_name" => "icon",
			"value" => '',
			"description" => __("Paste class of fontasome icon")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Fucts name"),
			"param_name" => "fucts_name",
			"value" => '',
			"description" => __("Enter your fuct name")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Number of fact"),
			"param_name" => "count",
			"value" => '',
			"description" => __("Enter number of fact")
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Background Color"),
			"param_name" => "bg_color",
			"value" => '',
			"description" => __("Choose Bacground Color of the Block")
		),
		array(
			"type" => "attach_image",
			"holder" => "div",
			"class" => "",
			"heading" => __("Background Image"),
			"param_name" => "bg_img",
			"value" => 'none',
			"description" => __("Choose image for background")
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Icon Color"),
			"param_name" => "icon_color",
			"value" => '#888',
			"description" => __("Choose Color for Icon", "mntn")
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Font Color"),
			"param_name" => "font_color",
			"value" => '#777',
			"description" => __("Choose Font Color of the Block")
		)
      )
   ) );
}*/
//Fragrance Fun Fucts 2


//Fragrance Section Description
function section_description( $atts, $content = null ) {
	extract( shortcode_atts( array(
	  'font_size' => ''
	), $atts ) );
	
	return "<div class='section_description' style='font-size:{$font_size};'>".wpb_js_remove_wpautop($content, true)."</div>";
}
add_shortcode( 'fr_section_description', 'section_description' );

add_action( 'init', 'fr_section_desc' );
function fr_section_desc() {
   vc_map( array(
	"name" => __("Section description", "mntn"),
	"base" => "fr_section_description",
	"icon" => "section_desc",
	"class" => "section_description",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "textarea_html",
			"holder" => "div",
			"class" => "",
			"heading" => __("Section description", "mntn"),
			"param_name" => "content",
			"value" => '',
			"description" => __("Enter section description", "mntn")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Font size", "mntn"),
			"param_name" => "font_size",
			"value" => '19px', //Default
			"description" => __("Enter font size", "mntn")
		)
      )
   ) );
}
//Fragrance Section Description

//Fragrance Bg Block
/*function bg_block( $atts, $content = null ) {
	extract( shortcode_atts( array(
	  'img' => '',
	  'height' => ''
	), $atts ) );
	
	$img_id = preg_replace( '/[^\d]/', '', $img );
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
	
	return "<div class='fr_bg_block' style='background-image:url({$img_url[0]}); height:{$height}px;'>".wpb_js_remove_wpautop($content, true)."</div>";
}
add_shortcode( 'fr_bg_block', 'bg_block' );

add_action( 'init', 'fr_bg' );
function fr_bg() {
   vc_map( array(
	"name" => __("Background block"),
	"base" => "fr_bg_block",
	"class" => "fr_bg_block",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "attach_image",
			"holder" => "div",
			"class" => "",
			"heading" => __("Choose image for background"),
			"param_name" => "img",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "textarea_html",
			"holder" => "div",
			"class" => "",
			"heading" => __("Description"),
			"param_name" => "content",
			"value" => '',
			"description" => __("Here you can enter your own text or leave it blank")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Block height"),
			"param_name" => "height",
			"value" => '',
			"description" => __("Enter block height")
		)		
      )
   ) );
}*/
//Fragrance Bg Block

// Fragrance Bordered Buttons
/*function bordered_buttons( $atts ) {
	extract( shortcode_atts( array(
	  'url' => '',
	  'text_on_the_btn' => '',
	  'color' => ''
	), $atts ) );
	
	return "<a class='fr_bordered_buttons fr_simple_btn' href='{$url}' style='color:{$color}; border-color:{$color};'>{$text_on_the_btn}</a>";
}
add_shortcode( 'fr_bordered_buttons', 'bordered_buttons' );

add_action( 'init', 'fr_border_btn' );
function fr_border_btn() {
   vc_map( array(
	"name" => __("Bordered Button"),
	"base" => "fr_bordered_buttons",
	"class" => "fr_bordered_buttons",
	"category" => __('Fragrance Element', 'mntn'),
	'admin_enqueue_js' => '',
	'admin_enqueue_css' => '',
	"params" => array(
		 array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("URL (Link)"),
			"param_name" => "url",
			"value" => '',
			"description" => __("Button link.")
		),
		array(
			"type" => "textfield",
			"holder" => "div",
			"class" => "",
			"heading" => __("Text on the button"),
			"param_name" => "text_on_the_btn",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
			"type" => "colorpicker",
			"holder" => "div",
			"class" => "",
			"heading" => __("Color"),
			"param_name" => "color",
			"value" => '',
			"description" => __("Border button color.")
		)		
      )
   ) );
}*/
// Fragrance Bordered Buttons

// Fragrance Person Block
function author_quote( $atts, $content = null ) {
    extract( shortcode_atts( array(
		'img' => ''
    ), $atts ) );
	
	$img_id = preg_replace( '/[^\d]/', '', $img );
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
	
    return "<div class='fr_person_block clearfix'><div class='avatar'><img src='{$img_url[0]}' alt='img'/></div><div class='fr_author_quote'>".wpb_js_remove_wpautop($content, true)."</div></div>";
}
add_shortcode( 'fr_author_quote', 'author_quote' );

add_action( 'init', 'fr_widget_quote' );
function fr_widget_quote() {
   vc_map( array(
    "name" => __("Person block 1", "mntn"),
    "base" => "fr_author_quote",
    "class" => "fr_author_quote",
    "category" => __('Fragrance Element', 'mntn'),
    'admin_enqueue_js' => '',
    'admin_enqueue_css' => '',
    "params" => array(
        array(
			"type" => "attach_image",
			"holder" => "div",
			"class" => "",
			"heading" => __("Choose image", "mntn"),
			"param_name" => "img",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
            "type" => "textarea_html",
            "holder" => "div",
            "class" => "",
            "heading" => __("Quote", "mntn"),
            "param_name" => "content",
            "value" => '',
            "description" => __("", "mntn")
        )
      )
   ) );
}
// Fragrance Person Block

// Fragrance Testimonials
function testimonials( $atts, $content = null ) {
    extract( shortcode_atts( array(
		'img' => '',
		'testimonial' => '',
		'author_name' => '',
		'author_site_name' => '',
		'author_site_url' => ''
    ), $atts ) );
	
	$img_id = preg_replace( '/[^\d]/', '', $img );
	$img_url = wp_get_attachment_image_src( $img_id, 'full' );
	
	$output = "<div class='fr_testimonials'><img src='{$img_url[0]}' alt='img'/><div class='separator  small' style='background-color:#303030; width:25px; margin-bottom:20px;'></div>";
	$output .= "<div>".wpb_js_remove_wpautop($content, true)."</div>";
	$output .="<p class='meta'><span>{$author_name}</span><a href='{$author_site_url}'><br />{$author_site_name}</a></p></div>";
	
    return $output;
}
add_shortcode( 'fr_testimonials', 'testimonials' );

add_action( 'init', 'fr_testimonials_block' );
function fr_testimonials_block() {
   vc_map( array(
    "name" => __("Testimonials", "mntn"),
    "base" => "fr_testimonials",
    "class" => "fr_testimonials",
    "category" => __('Fragrance Element', 'mntn'),
    'admin_enqueue_js' => '',
    'admin_enqueue_css' => '',
    "params" => array(
        array(
			"type" => "attach_image",
			"holder" => "div",
			"class" => "",
			"heading" => __("Testimonial Person Photo", "mntn"),
			"param_name" => "img",
			"value" => '',
			"description" => __("", "mntn")
		),
		array(
            "type" => "textarea_html",
            "holder" => "div",
            "class" => "",
            "heading" => __("Testimonial", "mntn"),
            "param_name" => "content",
            "value" => '',
            "description" => __("", "mntn")
        ),
		array(
            "type" => "textfield",
            "holder" => "div",
            "class" => "",
            "heading" => __("Testimonial Person Name", "mntn"),
            "param_name" => "author_name",
            "value" => '',
            "description" => __("", "mntn")
        ),
		array(
            "type" => "textfield",
            "holder" => "div",
            "class" => "",
            "heading" => __("Testimonial Person Site Name", "mntn"),
            "param_name" => "author_site_name",
            "value" => '',
            "description" => __("", "mntn")
        ),
		array(
            "type" => "textfield",
            "holder" => "div",
            "class" => "",
            "heading" => __("Testimonial Person Site URL", "mntn"),
            "param_name" => "author_site_url",
            "value" => '',
            "description" => __("", "mntn")
        )
      )
   ) );
}
// Fragrance Testimonials
