<?php 

/********* Fragrance Shortcodes 1.0 ************/

define('FRAGRANCE_SHORTCODES', '1.0');

$plugins_url = plugins_url('style.css', __FILE__);
function register_style() {
	// Регистрация стилей для плагина:
	wp_register_style( 'fragrance_shortcodes_styles', plugins_url( 'assets/css/shortcodes.css', __FILE__ ), array(), '20131003', 'all' ); 
	wp_register_script( 'fragrance_shortcodes_scripts', plugins_url( 'assets/js/shortcodes.js', __FILE__ ), array(), '20131003', 'all' ); 
	//Достаем зарегистрированные стили 
	wp_enqueue_style( 'fragrance_shortcodes_styles' );
	wp_enqueue_script( 'fragrance_shortcodes_scripts' );
} 
add_action( 'wp_enqueue_scripts', 'register_style' );


function service_icon($attr){
	echo '<i class="fa '.$attr["icon"].' fa-4x service1"></i>';
}
add_shortcode('icon1','service_icon');


function add_simple_buttons(){ 
    wp_print_scripts( 'quicktags' );
	$output = "<script type='text/javascript'>\n
	/* <![CDATA[ */ \n";
	
	$buttons = array();
	
	$buttons[] = array('name' => 'raw',
					'options' => array(
						'display_name' => 'raw',
						'open_tag' => '\n[raw]',
						'close_tag' => '[/raw]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'one_half',
					'options' => array(
						'display_name' => '1/2',
						'open_tag' => '\n[one_half]',
						'close_tag' => '[/one_half]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'one_half_last',
					'options' => array(
						'display_name' => '1/2 last',
						'open_tag' => '\n[one_half_last]',
						'close_tag' => '[/one_half_last]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'one_third',
					'options' => array(
						'display_name' => '1/3',
						'open_tag' => '\n[one_third]',
						'close_tag' => '[/one_third]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'one_third_last',
					'options' => array(
						'display_name' => '1/3 last',
						'open_tag' => '\n[one_third_last]',
						'close_tag' => '[/one_third_last]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'one_fourth',
					'options' => array(
						'display_name' => '1/4',
						'open_tag' => '\n[one_fourth]',
						'close_tag' => '[/one_fourth]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'one_fourth_last',
					'options' => array(
						'display_name' => '1/4 last',
						'open_tag' => '\n[one_fourth_last]',
						'close_tag' => '[/one_fourth_last]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'two_third',
					'options' => array(
						'display_name' => '2/3',
						'open_tag' => '\n[two_third]',
						'close_tag' => '[/two_third]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'two_third_last',
					'options' => array(
						'display_name' => '2/3 last',
						'open_tag' => '\n[two_third_last]',
						'close_tag' => '[/two_third_last]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'three_fourth',
					'options' => array(
						'display_name' => '3/4',
						'open_tag' => '\n[three_fourth]',
						'close_tag' => '[/three_fourth]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'three_fourth_last',
					'options' => array(
						'display_name' => '3/4 last',
						'open_tag' => '\n[three_fourth_last]',
						'close_tag' => '[/three_fourth_last]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'box',
					'options' => array(
						'display_name' => 'box',
						'open_tag' => '\n[box type="inform"]',
						'close_tag' => '[/box]\n',
						'key' => ''
					));
	$buttons[] = array('name' => 'tooltip',
					'options' => array(
						'display_name' => 'tooltip',
						'open_tag' => '[tooltip text="Tooltip Text"]',
						'close_tag' => '[/tooltip]',
						'key' => ''
					));
	$buttons[] = array('name' => 'content_accordion',
					'options' => array(
						'display_name' => 'content_accordion',
						'open_tag' => '\n[content_accordion caption="Click here to learn more"]',
						'close_tag' => '[/content_accordion]\n',
						'key' => ''
					));	
	$buttons[] = array('name' => 'button',
					'options' => array(
						'display_name' => 'button',
						'open_tag' => '\n[button link="#"]',
						'close_tag' => '[/button]\n',
						'key' => ''
					));
	
					
					
	for ($i=0; $i <= (count($buttons)-1); $i++) {
		$output .= "edButtons[edButtons.length] = new edButton('ed_{$buttons[$i]['name']}'
			,'{$buttons[$i]['options']['display_name']}'
			,'{$buttons[$i]['options']['open_tag']}'
			,'{$buttons[$i]['options']['close_tag']}'
			,'{$buttons[$i]['options']['key']}'
		); \n";
	}
	
	$output .= "\n /* ]]> */ \n
	</script>";
	echo $output;
}


add_shortcode('box', 'info_boxes');
function info_boxes($atts, $content = null) {
	extract(shortcode_atts(array(
				"type" => 'inform',
				"id" => '',
				"class" => ''
			), $atts));
	$content = content_inspection($content);
	
	$id = ($id <> '') ? " id='" . esc_attr( $id ) . "'" : '';
	$class = ($class <> '') ? esc_attr( ' ' . $class ) : '';
			
	$output = "<div{$id} class='info_boxes{$class} info_{$type}'>
					<div class='info_box_inner'>";
	$output .= do_shortcode($content);
	$output .= "</div></div>";
	
	return $output;
}

add_shortcode('tooltip', 'create_tooltip');
function create_tooltip($atts, $content = null) {
	global $themename;
	
	extract(shortcode_atts(array(
				"text" => esc_html__( 'Add a Tooltip Text', $themename ),
				"id" => '',
				"class" => ''
			), $atts));

	$content = content_inspection($content);
	
	$id = ($id <> '') ? " id='" . esc_attr( $id ) . "'" : '';
	$class = ($class <> '') ? esc_attr( ' ' . $class ) : '';
				
	$output = "<span{$id} class='tooltip{$class}'>{$content}<span class='tooltip_inner'>{$text}</span></span>";
	
	return $output;
}

add_shortcode('content_accordion', 'accordion');
function accordion($atts, $content = null) {
	global $themename;
	
	extract(shortcode_atts(array(
				"caption" => __( 'Click here to open content', $themename ),
				"state" => 'close',
				"id" => '',
				"class" => ''
			), $atts));

	$content = content_inspection($content);
	
	$id = ($id <> '') ? " id='" . esc_attr( $id ) . "'" : '';
	$class = ($class <> '') ? esc_attr( ' ' . $class ) : '';
	
	$divClass = ($state == 'close') ? 'accordion' : 'accordion state_open';
	$hClass = ($state == 'close') ? 'accordion_head' : 'accordion_head open';
	$divClass .= ' clearfix';
	
	$output = "<div{$id} class='{$divClass}{$class}'>
					<h3 class='{$hClass}'><span>" . esc_html( $caption ) . "</span></h3>
					<div class='accordion_inner'>{$content}</div>
				</div>";
	
	return $output;
}

add_shortcode('button', 'create_buttons');
function create_buttons($atts, $content = null) {
	extract(shortcode_atts(array(
				"link" => "#",
				"color" => "blue",
				"type" => "small",
				"newwindow" => "no",
				"id" => '',
				"class" => '',
				"br" => 'no'
			), $atts));
	
	$output = '';
	$target = ($newwindow == 'yes') ? ' target="_blank"' : '';
	
	$content = content_inspection($content);
	
	$id = ($id <> '') ? " id='" . esc_attr( $id ) . "'" : '';
	$class = ($class <> '') ? esc_attr( ' ' . $class ) : '';
	
	if ($type == 'small')
		$output .= "<a{$id} href='{$link}' class='small-button small{$color}{$class}'{$target}>{$content}</a>";
	
	if ($type == 'big')
		$output .= "<a{$id} href='{$link}' class='big-button big{$color}{$class}'{$target}>{$content}</a>";
	
	if ( $br == 'yes' ) $output .= '<br class="clear"/>';
		
	return $output;
}


add_shortcode('tabs', 'create_tabs');
function create_tabs($atts, $content = null) {
	extract(shortcode_atts(array(
				"fx" => 'fade',
				"auto" => 'no',
				"autospeed" => '5000',
				"id" => '1',
				"slidertype" => 'top tabs',
				"class" => ''
			), $atts));
	
	$i = rand(0, 1000);
	
	$auto = ( $auto == 'no' ) ? 'false' : 'true';
	
	$content = content_inspection($content);
	
	$class = ($class <> '') ? " {$class}" : '';
	
	$class .= " sliderfx_{$fx}" . " sliderauto_{$auto}" . " sliderauto_speed_{$autospeed}";
	
	if ($slidertype == 'top tabs') {
		$class .= ' slidertype_top_tabs';
		$output = "
			<div class='" . esc_attr( "tabs-container{$class}" ) ."' id='tabs-container{$i}'>
				{$content}
			</div> <!-- .tabs-container -->";
	} elseif ($slidertype == 'left tabs') {
		$class .= ' slidertype_left_tabs';
		$output = "
			<div class='" . esc_attr( "tabs-left{$class}" ) . "' id='tabs-left{$i}'>
				{$content}
			</div> <!-- .tabs-left -->";
	}
		
	return $output;
}

add_shortcode('tabcontainer', 'tabcontainer');
function tabcontainer($atts, $content = null) {
	$content = content_inspection($content);
	
	$output = "
		<ul class='tabs-control clearfix'>
			{$content}
		</ul> <!-- .tabs-control -->";
		
	return $output;
}

add_shortcode('tabtext', 'create_tabtext');
function create_tabtext($atts, $content = null) {	
	extract(shortcode_atts(array(
		"id" => '',
		"class" => ''
	), $atts));
		
	$content = content_inspection($content);
	
	$id = ($id <> '') ? " id='" . esc_attr( $id ) . "'" : '';
	$class = ($class <> '') ? esc_attr( ' ' . $class ) : '';
			
	$output = "
		<li{$id}{$class}><a href='#'>
			{$content}
		</a></li>";
		
	return $output;
}

add_shortcode('tabcontent', 'create_tabcontent');
function create_tabcontent($atts, $content = null) {
	extract(shortcode_atts(array(
		"id" => '',
		"class" => ''
	), $atts));
	
	$content = content_inspection($content);
	
	$id = ($id <> '') ? " id='" . esc_attr( $id ) . "'" : '';
	$class = ($class <> '') ? esc_attr( ' ' . $class ) : '';
	
	$output = "
		<div{$id} class='tabs-content{$class}'>
			{$content}
		</div>";
	
	return $output;
}

add_shortcode('tab', 'create_tab');
function create_tab($atts, $content = null) {
	extract(shortcode_atts(array(
		"id" => '',
		"class" => ''
	), $atts));
	
	$content = content_inspection($content);
	
	$id = ($id <> '') ? " id='" . esc_attr( $id ) . "'" : '';
	$class = ($class <> '') ? esc_attr( ' ' . $class ) : '';
	
	$output = "
		<div{$id} class='tabs-slidecontent{$class}'>
			{$content}
		</div>";
		
	return $output;
}


add_shortcode('pricing_table', 'create_pricing_table');
function create_pricing_table($atts, $content = null) {
	
	$content = content_inspection($content);
	
	$output = "
		<div class='pricing clearfix'>
			{$content}
		</div> <!-- end .pricing -->";
		
	return $output;
}

add_shortcode('pricing', 'create_pricing');
function create_pricing($atts, $content = null) {
	extract(shortcode_atts(array(
		"price" => '19.99',
		"title" => "professional",
		"desc" => "",
		"url" => "#",
		"window" => "",
		"moretext" => 'sign up',
		"type" => "small",
		"currency" => "$"
	), $atts));

	$content = content_inspection($content);
	
	$separator_sign = ( strpos($price, '.') !== false ) ? '.' : ',';
	$price_array = explode($separator_sign, $price);
	$link_target = ( $window == 'new' ) ? ' target="_blank"' : '';
	$type = ( $type == 'big' ) ? ' pricing-big' : '';
			
	$output = "
		<div class='pricing-table{$type}'>
			<div class='pricing-heading'>
				<h2 class='pricing-title'>{$title}</h2>
				<p>{$desc}</p>
			</div> <!-- end .pricing-heading -->

			<div class='pricing-content'>
                <div class='pricing-tcontent'>
                    <ul class='pricing'>
                        {$content}
                    </ul>
                    <span class='price'><span class='dollar-sign'>{$currency}</span>{$price_array[0]}<sup>{$price_array[1]}</sup></span>
                </div> <!-- end .pricing-tcontent -->
			</div> <!-- end .pricing-content -->
			<a href='" . esc_url( $url ) . "' class='join-button'{$link_target}>{$moretext}</a>
		</div> <!-- end .pricing-table -->";
		
	return $output;
}

add_shortcode('feature', 'pricing_characteristic');
function pricing_characteristic($atts, $content = null) {
	extract(shortcode_atts(array(
		"checkmark" => 'normal'
	), $atts));

	$content = content_inspection($content);
	$class = ( $checkmark == 'no' ) ? ' class="x-mark"' : '';
	
	$output = "<li{$class}><span>{$content}</span></li>";
	
	return $output;
}


add_shortcode('one_half', 'content_columns');
add_shortcode('one_half_last', 'content_columns');
add_shortcode('one_third', 'content_columns');
add_shortcode('one_third_last', 'content_columns');
add_shortcode('one_fourth', 'content_columns');
add_shortcode('one_fourth_last', 'content_columns');
add_shortcode('two_third', 'content_columns');
add_shortcode('two_third_last', 'content_columns');
add_shortcode('three_fourth', 'content_columns');
add_shortcode('three_fourth_last', 'content_columns');
function content_columns($atts, $content = null, $name='') {
	extract(shortcode_atts(array(
		"id" => '',
		"class" => ''
	), $atts));
	
	$content = content_inspection($content);
	
	$id = ($id <> '') ? " id='" . esc_attr( $id ) . "'" : '';
	$class = ($class <> '') ? esc_attr( ' ' . $class ) : '';
	
	$pos = strpos($name,'_last');	

	if($pos !== false)
		$name = str_replace('_last',' last',$name);
	
	$output = "<div{$id} class='{$name}{$class}'>
					{$content}
				</div>";
	if($pos !== false) 
		$output .= "<div class='clear'></div>";
	
	return $output;
}

if ( ! function_exists( 'delete_htmltags' ) ){
	function delete_htmltags($content,$paragraph_tag=false,$br_tag=false){	
		#$content = preg_replace('#<\/p>(\s)*<p>$|^<\/p>(\s)*<p>#', '', trim($content));
		$content = preg_replace('#^<\/p>|^<br \/>|<p>$#', '', $content);
		
		$content = preg_replace('#<br \/>#', '', $content);
		
		if ( $paragraph_tag ) $content = preg_replace('#<p>|</p>#', '', $content);
			
		return trim($content);
	}
}

if ( ! function_exists( 'content_inspection' ) ){
	function content_inspection($content,$paragraph_tag=false,$br_tag=false){
		return delete_htmltags( do_shortcode(shortcode_unautop($content)), $paragraph_tag, $br_tag );
	}
}
	
add_action('admin_init', 'init_shortcodes');
function init_shortcodes(){
	if ( current_user_can( 'edit_posts' ) && current_user_can( 'edit_pages' ) ) {
		if ( in_array(basename($_SERVER['PHP_SELF']), array('post-new.php', 'page-new.php', 'post.php', 'page.php') ) ) {
			add_filter('mce_buttons', 'filter_mce_button');
			add_filter('mce_external_plugins', 'filter_mce_plugin');
			add_action('admin_head','add_simple_buttons');
			add_action('edit_form_advanced', 'advanced_buttons');
			add_action('edit_page_form', 'advanced_buttons');
		}
	}
}

function filter_mce_button($buttons) {
	array_push( $buttons, '|', 'accordion_button', 'info_box', 'create_buttons', 'create_tabs', 'sd_author' );

	return $buttons;
}

function filter_mce_plugin($plugins) {	
	$plugins['quicktags'] = plugins_url('/assets/js/editor_plugin.js', __FILE__) ;
	
	return $plugins;
}

function advanced_buttons(){
	global $themename; ?>
	<script type="text/javascript">
		var defaultSettings = {},
			outputOptions = '',
			selected ='',
			content = '';
		
		defaultSettings['content_accordion'] = {
			caption: {
				name: '<?php esc_html_e( 'Caption', $themename ); ?>',
				defaultvalue: '<?php esc_html_e( 'Caption goes here', $themename ); ?>',
				description: '<?php esc_html_e( 'Caption title goes here', $themename ); ?>',
				type: 'text'
			},
			state: {
				name: '<?php esc_html_e( 'State', $themename ); ?>',
				defaultvalue: 'close',
				description: '<?php esc_html_e( 'Select between expanded and closed state', $themename ); ?>',
				type: 'select',
				options: 'open|close'
			},
			content: {
				name: '<?php esc_html_e( 'Content', $themename ); ?>',
				defaultvalue: '<?php esc_html_e( 'Content goes here', $themename ); ?>',
				description: '<?php esc_html_e( 'Content text or html', $themename ); ?>',
				type: 'textarea'
			}
		};
		
		defaultSettings['box'] = {
			type: {
				name: '<?php esc_html_e( 'Type', $themename ); ?>',
				defaultvalue: 'inform',
				description: '<?php esc_html_e( 'Type of the box', $themename ); ?>',
				type: 'select',
				options: 'inform|warning|download|bio'
			},
			content: {
				name: '<?php esc_html_e( 'Content', $themename ); ?>',
				defaultvalue: '<?php esc_html_e( 'Content goes here', $themename ); ?>',
				description: '<?php esc_html_e( 'Content text or html', $themename ); ?>',
				type: 'textarea'
			}
		};
		
		defaultSettings['button'] = {
			link: {
				name: '<?php esc_html_e( 'Link', $themename ); ?>',
				defaultvalue: '#',
				description: '<?php esc_html_e( 'URL', $themename ); ?>',
				type: 'text'
			},
			type: {
				name: '<?php esc_html_e( 'Type', $themename ); ?>',
				defaultvalue: 'small',
				description: '<?php esc_html_e( 'Choose button type', $themename ); ?>',
				type: 'select',
				options: 'small|big'
			},
			color: {
				name: '<?php esc_html_e( 'Color', $themename ); ?>',
				defaultvalue: 'blue',
				description: '<?php esc_html_e( 'Choose button color', $themename ); ?>',
				type: 'select',
				options: 'blue|lightblue|teal|silver|black|pink|purple|orange|green|red'
			},
			content: {
				name: '<?php esc_html_e( 'Content', $themename ); ?>',
				defaultvalue: '<?php esc_html_e( 'Button text', $themename ); ?>',
				description: '<?php esc_html_e( 'Content text or html', $themename ); ?>',
				type: 'textarea'
			},
			newwindow: {
				name: '<?php esc_html_e( 'Open link in new window', $themename ); ?>',
				defaultvalue: 'no',
				description: '<?php esc_html_e( 'Select yes if the link should be opened in a new window', $themename ); ?>',
				type: 'select',
				options: 'yes|no'
			}
		};
		
		defaultSettings['tabs'] = {
			slidertype: {
				name: '<?php esc_html_e( 'Slider Type', $themename ); ?>',
				defaultvalue: 'fade',
				description: '<?php esc_html_e( 'Select Slider Type here', $themename ); ?>',
				type: 'select',
				options: 'top tabs|left tabs'
			},
			auto: {
				name: '<?php esc_html_e( 'Auto', $themename ); ?>',
				defaultvalue: 'no',
				description: '<?php esc_html_e( 'Choose yes if you want for automatic slider animation', $themename ); ?>',
				type: 'select',
				options: 'no|yes'
			},
			autospeed: {
				name: '<?php esc_html_e( 'Auto Speed', $themename ); ?>',
				defaultvalue: '5000',
				description: '<?php esc_html_e( 'Automattic slider speed (works only if Auto is set to yes)', $themename ); ?>',
				type: 'text'
			},
			tabtext: {
				name: '<?php esc_html_e( 'Tab Text', $themename ); ?>',
				defaultvalue: '',
				description: '',
				type: 'text',
				clone: 'cloned'
			},
			tabcontent: {
				name: '<?php esc_html_e( 'Tab Content', $themename ); ?>',
				defaultvalue: '<?php esc_html_e( 'Content goes here', $themename ); ?>',
				description: '<?php esc_html_e( ' ', $themename ); ?>',
				type: 'textarea',
				clone: 'cloned'
			}
		}
		
		function CustomButtonClick(tag){
			
			var index = tag;
			
				for (var index2 in defaultSettings[index]) {
					if (defaultSettings[index][index2]['clone'] === 'cloned')
						outputOptions += '<tr class="cloned">\n';
					else if (index === 'button' && index2 === 'icon')
						outputOptions += '<tr class="hidden">\n';
					else
						outputOptions += '<tr>\n';
					outputOptions += '<th><label for="sd-' + index2 + '">'+ defaultSettings[index][index2]['name'] +'</label></th>\n';
					outputOptions += '<td>';
					
					if (defaultSettings[index][index2]['type'] === 'select') {
						var optionsArray = defaultSettings[index][index2]['options'].split('|');
						
						outputOptions += '\n<select name="sd-'+index2+'" id="sd-'+index2+'">\n';
						
						for (var index3 in optionsArray) {
							selected = (optionsArray[index3] === defaultSettings[index][index2]['defaultvalue']) ? ' selected="selected"' : '';
							outputOptions += '<option value="'+optionsArray[index3]+'"'+ selected +'>'+optionsArray[index3]+'</option>\n';
						}
						
						outputOptions += '</select>\n';
					}
					
					if (defaultSettings[index][index2]['type'] === 'text') {
						cloned = '';
						if (defaultSettings[index][index2]['clone'] === 'cloned') cloned = "[]";
						outputOptions += '\n<input type="text" name="sd-'+index2+cloned+'" id="sd-'+index2+'" value="'+defaultSettings[index][index2]['defaultvalue']+'" />\n';
					}
					
					if (defaultSettings[index][index2]['type'] === 'textarea') {
						cloned = '';
						if (defaultSettings[index][index2]['clone'] === 'cloned') cloned = "[]";
						outputOptions += '<textarea name="sd-'+index2+cloned+'" id="sd-'+index2+'" cols="40" rows="10">'+defaultSettings[index][index2]['defaultvalue']+'</textarea>';
					}
					
					outputOptions += '\n<br/><small>'+ defaultSettings[index][index2]['description'] +'</small>';
					outputOptions += '\n</td>';
					
				}
			
		
			var width = jQuery(window).width(),
				tbHeight = jQuery(window).height(),
				tbWidth = ( 720 < width ) ? 720 : width;
			
			tbWidth = tbWidth - 80;
			tbHeight = tbHeight - 84;

			var tbOptions = "<div id='shortcodes_div'><form id='shortcodes'><table id='shortcodes_table' class='form-table sd-"+ tag +"'>";
			tbOptions += outputOptions;
			tbOptions += '</table>\n<p class="submit">\n<input type="button" id="shortcodes-submit" class="button-primary" value="Ok" name="submit" /></p>\n</form></div>';
			
			var form = jQuery(tbOptions);
			
			var table = form.find('table');
			form.appendTo('body').hide();
			
			
			if (tag === 'tabs') {
				$moreTabs = jQuery('<p><a href="#" id="add_more_tabs"><?php esc_html_e( '+ Add One More Tab', $themename ); ?></a></p>').appendTo('form#shortcodes tbody');
				$moreTabsLink = jQuery('a#add_more_tabs');
				
				$moreTabsLink.bind('click',function() {
					var clonedElements = jQuery('form#shortcodes .cloned');
										
					newElements = clonedElements.slice(0,2).clone();
								
					var cloneNumber = clonedElements.length,
						labelNum = cloneNumber / 2;
					
					newElements.each(function(index){
						if ( index === 0 ) jQuery(this).css({'border-top':'1px solid #eeeeee'});
						
						var label = jQuery(this).find('label').attr('for'),
							newLabel = label + labelNum;
					
						jQuery(this).find('label').attr('for',newLabel);
						jQuery(this).find('input, textarea').attr('id',newLabel);
					});
					
					newElements.appendTo('form#shortcodes tbody');
					$moreTabs.appendTo('form#shortcodes tbody');
					return false;
				});		
			}
			
			
			form.find('#shortcodes-submit').click(function(){
							
				var shortcode = '['+tag;
								
				for( var index in defaultSettings[tag]) {
					var value = table.find('#sd-' + index).val();
					if (index === 'content') { 
						content = value;
						continue;
					}
					
					if (defaultSettings[tag][index]['clone'] !== undefined) {
						content = 'cloned';
						continue;
					} 
					
					if ( value !== defaultSettings[tag][index]['defaultvalue'] )
						shortcode += ' ' + index + '="' + value + '"';
						
				}
				
				var $sd_slidertype = jQuery('#sd-slidertype').val();
				
				shortcode += '] ' + "\n";
				
				if (content != '') {
					
					if (tag === 'tabs') {
					
						var $sd_form = jQuery('form#shortcodes'),
							tabsOutput = '',
							$sd_slidertype = jQuery('#sd-slidertype').val();
						
						if ($sd_slidertype === 'images') {
							prefix = 'image';
							dimensions = ' width="' + jQuery('#sd-imagewidth').val() + '"'+' height="' + jQuery('#sd-imageheight').val() + '"';
						} else {
							prefix = '';
							dimensions = '';
						}
						
						tabsOutput += '['+prefix+'tabcontainer]\n';
						$sd_form.find("input[name='sd-tabtext[]']").each(function(){
							tabsOutput += '['+prefix+'tabtext]'+jQuery(this).val()+'[/'+prefix+'tabtext]\n';
						});
						tabsOutput += '[/'+prefix+'tabcontainer]\n';						
						
						if ($sd_slidertype === 'simple' || $sd_slidertype === 'images') tabsOutput = '';
						
						if ($sd_slidertype != 'simple' && $sd_slidertype != 'images') tabsOutput += '[tabcontent]\n';
						$sd_form.find("textarea[name='sd-tabcontent[]']").each(function(){
							tabsOutput += '['+prefix+'tab'+dimensions+']'+jQuery(this).val()+'[/'+prefix+'tab]'+"\n";
						});
						
						if ($sd_slidertype != 'simple' && $sd_slidertype != 'images') tabsOutput += '[/tabcontent]\n';
						
						content = tabsOutput;
					}
				
					shortcode += content;
					shortcode += '[/'+tag+'] ' + "\n";
				}

				tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode + ' ');
				
				tb_remove();
			});
			
			tb_show( tag + ' Shortcode', '#TB_inline?width=' + tbWidth + '&height=' + tbHeight + '&inlineId=shortcodes_div' );
			jQuery('#shortcodes_div').remove();
			outputOptions = '';
		}
		
		jQuery(document).ready(function(){
			var buttonTypeField = jQuery('table.sd-button select#sd-type');
						
			buttonTypeField.live('change',function() {
				var optionsSmallButton = ['blue','lightblue','teal','silver','black','pink','purple','orange','green','red'],
					optionsBigButton = ['blue','purple','orange','green','red','teal'],
					options = '';
				
				if (jQuery(this).val() === 'big') {
					for (var i = 0; i < optionsBigButton.length; i++) {
						options += '<option value="' + optionsBigButton[i] + '">' + optionsBigButton[i] + '</option>';
					}
					
					if (jQuery('select#sd-color').parents('tr.hidden').length) jQuery('select#sd-color').parents('tr').removeClass('hidden');
				}
				
				if (jQuery(this).val() === 'small') {
					for (var i = 0; i < optionsSmallButton.length; i++) {
						options += '<option value="' + optionsSmallButton[i] + '">' + optionsSmallButton[i] + '</option>';
					}
					if (jQuery('select#sd-color').parents('tr.hidden').length) jQuery('select#sd-color').parents('tr').removeClass('hidden');
				}
				
				if (options !== '') jQuery(this).parents('tbody').find('select#sd-color').html(options);
			});
			
			var tabTypeField = jQuery('table.sd-tabs select#sd-slidertype');
			tabTypeField.live('change',function() {
				if (jQuery(this).val() === 'images') {
					if (!jQuery('.sd-tabs #sd-imagewidth').length) { 
						$heightImage = jQuery('<tr><th><label for="sd-imageheight"><?php esc_html_e( 'Image Height', $themename ); ?></label></th><td><input type="text" value="" id="sd-imageheight" name="sd-imageheight"><br><small></small></td></tr>').prependTo('form#shortcodes tbody');
						$widthImage = jQuery('<tr><th><label for="sd-imagewidth"><?php esc_html_e( 'Image Width', $themename ); ?></label></th><td><input type="text" value="" id="sd-imagewidth" name="sd-imagewidth"><br><small></small></td></tr>').prependTo('form#shortcodes tbody');
					}
					
					if (typeof $heightImage != 'undefined') $heightImage.show();
					if (typeof $widthImage != 'undefined') $widthImage.show();
					
					jQuery('input[name^="sd-tabtext"]').parents('tr.cloned').hide(); //hide tab text
				} else {
					if (typeof $heightImage != 'undefined') $heightImage.hide();
					if (typeof $widthImage != 'undefined') $widthImage.hide();
					
					if(jQuery(this).val() != 'simple') jQuery('input[name^="sd-tabtext"]').parents('tr.cloned:hidden').show(); //show tab text
					else jQuery('input[name^="sd-tabtext"]').parents('tr.cloned').hide();
				}
			});
		});
	</script>
<?php } ?>