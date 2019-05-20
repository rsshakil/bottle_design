<?php

if ( ! function_exists( 'setup_theme' ) ){
	function setup_theme(){
	
		global $fr_themename, $fr_shortname;
		$fr_themename = 'mntn';
		$fr_shortname = 'mntn';
		
		add_theme_support( 'automatic-feed-links' );
		
		add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list' ) );
		
		add_theme_support( 'post-formats', array(
			'gallery', 'image', 'quote', 'video'
		) );
		
		require_once(TEMPLATEPATH . '/includes/ext/layout.php');
	}
}
add_action( 'after_setup_theme', 'setup_theme' );


if ( ! isset( $content_width ) )
	$content_width = 600;
	
/*** Register Menus ***/
register_nav_menu( 'primary', __( 'Primary Menu', 'mntn' ) );

add_filter('wp_title', 'filter_pagetitle');
function filter_pagetitle($title) {
    //check if its a blog post
    if (!is_single())
        return $title;

    //if you get here then its a blog post so change the title
    global $wp_query;
    if (isset($wp_query->post->post_title)){
        return $wp_query->post->post_title;
    }

    //if wordpress can't find the title return the default
    return $title;
}

/*** Excerpt Settings ***/
function new_excerpt_length($length) {  
    return 50;  
} 
add_filter('excerpt_length', 'new_excerpt_length'); 

function new_excerpt_more($more) {  
    return '...';  
}  
add_filter('excerpt_more', 'new_excerpt_more');  

function excerpt($limit) {
  $excerpt = explode(' ', get_the_excerpt(), $limit);
  if (count($excerpt)>=$limit) {
    array_pop($excerpt);
    $excerpt = implode(" ",$excerpt).'...';
  } else {
    $excerpt = implode(" ",$excerpt);
  }
  $excerpt = preg_replace('`[[^]]*]`','',$excerpt);
  return $excerpt;
}

function content($limit) {
  $content = explode(' ', get_the_content(), $limit);
  if (count($content)>=$limit) {
    array_pop($content);
    $content = implode(" ",$content).'...';
  } else {
    $content = implode(" ",$content);
  }
  $content = preg_replace('/[.+]/','', $content);
  $content = apply_filters('the_content', $content);
  $content = str_replace(']]>', ']]&gt;', $content);
  return $content;
}
	
/*** Thumbnail Settings ***/	
add_theme_support( 'post-thumbnails' );
set_post_thumbnail_size( 300, 300, true );
if ( function_exists( 'add_image_size' ) ) {  
	add_image_size( 'portfolio-thumb', 240, 170, true );
	add_image_size( 'blog-thumb', 960, 530, true );
}
 
//Pagination
add_action( 'numbered_in_page_links', 'numbered_in_page_links', 10, 1 );

/**
 * Modification of wp_link_pages() with an extra element to highlight the current page.
 *
 * @param  array $args
 * @return void
 */
function numbered_in_page_links( $args = array () )
{
    $defaults = array(
        'before'      => '<p class="pagination">' . __('Pages:', 'mntn')
    ,   'after'       => '</p>'
    ,   'link_before' => ''
    ,   'link_after'  => ''
    ,   'pagelink'    => '%'
    ,   'echo'        => 1
        // element for the current page
    ,   'highlight'   => 'span class="current"'
    );

    $r = wp_parse_args( $args, $defaults );
    $r = apply_filters( 'wp_link_pages_args', $r );
    extract( $r, EXTR_SKIP );

    global $page, $numpages, $multipage, $more, $pagenow;

    if ( ! $multipage ){
        return;
    }

    $output = $before;

    for ( $i = 1; $i < ( $numpages + 1 ); $i++ ){
        $j       = str_replace( '%', $i, $pagelink );
        $output .= ' ';

        if ( $i != $page || ( ! $more && 1 == $page ) ) {
            $output .= _wp_link_page( $i ) . "{$link_before}{$j}{$link_after}</a>";
        }else{   // highlight the current page
            // not sure if we need $link_before and $link_after
            $output .= "<$highlight>{$link_before}{$j}{$link_after}</$highlight>";
        }
    }

    print $output . $after;
} 


/*** Register Sidebars ***/
add_action( 'widgets_init', 'fr_sidebars' );
function fr_sidebars() {	
	register_sidebar( array(
		'name' => __( 'Sidebar', 'mntn' ),
		'id' => 'sidebar',
		'description'   => 'Left sidebar in blog page',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget' => '</div> <!-- end .widget -->',
		'before_title' => '<h4 class="widget_title">',
		'after_title' => '</h4>',
	) );


	register_sidebar( array(
		'name' => __( 'Footer Area #1', 'mntn' ),
		'id' => 'footer-area-1',
		'description'   => 'First widget area in footer',
		'before_widget' => '<div id="%1$s" class="f_widget %2$s">',
		'after_widget' => '</div> <!-- end .f_widget -->',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	) );
	
	register_sidebar( array(
		'name' => __( 'Footer Area #2', 'mntn') ,
		'id' => 'footer-area-2',
		'description'   => 'Seconf widget area in footer',
		'before_widget' => '<div id="%1$s" class="f_widget %2$s">',
		'after_widget' => '</div> <!-- end .f_widget -->',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	) );
	
	register_sidebar( array(
		'name' => __( 'Footer Area #3', 'mntn' ),
		'id' => 'footer-area-3',
		'description'   => 'Third widget area in footer',
		'before_widget' => '<div id="%1$s" class="f_widget %2$s">',
		'after_widget' => '</div> <!-- end .f_widget -->',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	) );
	
	register_sidebar( array(
		'name' => __( 'Footer Area #4', 'mntn' ),
		'id' => 'footer-area-4',
		'description'   => 'Fourth widget area in footer',
		'before_widget' => '<div id="%1$s" class="f_widget %2$s">',
		'after_widget' => '</div> <!-- end .f_widget -->',
		'before_title' => '<h4 class="widgettitle">',
		'after_title' => '</h4>',
	) );
}

/**
 * Include the TGM_Plugin_Activation class.
 */
require_once('plugin/plugin-activation.php');
add_action( 'tgmpa_register', 'fr_register_js_composer_plugins' );

function fr_register_js_composer_plugins() {
    /**
     * Array of plugin arrays. Required keys are name and slug.
     * If the source is NOT from the .org repo, then source is also required.
     */
    $plugins = array(
        // This is an example of how to include a plugin pre-packaged with a theme
        array(
            'name'			=> 'WPBakery Visual Composer', // The plugin name
            'slug'			=> 'js_composer', // The plugin slug (typically the folder name)
            'source'			=> get_stylesheet_directory() . '/plugin/js_composer.zip', // The plugin source
            'required'			=> true, // If false, the plugin is only 'recommended' instead of required
            'version'			=> '3.7', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation'		=> false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation'	=> false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url'		=> '', // If set, overrides default API URL and points to an external URL
        ),
		array(
            'name'			=> 'Fragrance Theme Extensions', // The plugin name
            'slug'			=> 'fr_theme_ext', // The plugin slug (typically the folder name)
            'source'			=> get_stylesheet_directory() . '/plugin/fr_theme_ext.zip', // The plugin source
            'required'			=> true, // If false, the plugin is only 'recommended' instead of required
            'version'			=> '1.0.0', // E.g. 1.0.0. If set, the active plugin must be this version or higher, otherwise a notice is presented
            'force_activation'		=> false, // If true, plugin is activated upon theme activation and cannot be deactivated until theme switch
            'force_deactivation'	=> false, // If true, plugin is deactivated upon theme switch, useful for theme-specific plugins
            'external_url'		=> '', // If set, overrides default API URL and points to an external URL
        )
    );
 
    // Change this to your theme text domain, used for internationalising strings
    $theme_text_domain = 'mntn';
 
    /**
     * Array of configuration settings. Amend each line as needed.
     * If you want the default strings to be available under your own theme domain,
     * leave the strings uncommented.
     * Some of the strings are added into a sprintf, so see the comments at the
     * end of each line for what each argument will be.
     */
    $config = array(
        'domain'       		=> 'tgmpa',    // Text domain - likely want to be the same as your theme.
        'default_path'		=> '', // Default absolute path to pre-packaged plugins
        'parent_menu_slug'	=> 'themes.php', // Default parent menu slug
        'parent_url_slug'	=> 'themes.php', // Default parent URL slug
        'menu'			=> 'install-required-plugins', // Menu slug
        'has_notices'		=> true, // Show admin notices or not
        'is_automatic'		=> false, // Automatically activate plugins after installation or not
        'message'		=> '', // Message to output right before the plugins table
        'strings'		=> array(
            'page_title'			=> __( 'Install Required Plugins', 'tgmpa' ),
            'menu_title'			=> __( 'Install Plugins', 'tgmpa' ),
            'installing'			=> __( 'Installing Plugin: %s', 'tgmpa' ), // %1$s = plugin name
            'oops'				=> __( 'Something went wrong with the plugin API.', 'tgmpa' ),
            'notice_can_install_required'     => _n_noop(
				'This theme requires the following plugin: %1$s.',
				'This theme requires the following plugins: %1$s.',
				'tgmpa'
			),
            'notice_can_install_recommended'	=> _n_noop( 
				'This theme recommends the following plugin: %1$s', 
				'This theme recommends the following plugins: %1$s', 
				'tgmpa' 
			), // %1$s = plugin name(s)
            'notice_cannot_install'		=> _n_noop( 'Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'tgmpa'  ), // %1$s = plugin name(s)
            'notice_can_activate_required'	=> _n_noop( 'The following required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.', 'tgmpa' ), // %1$s = plugin name(s)
            'notice_can_activate_recommended'	=> _n_noop( 'The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'tgmpa' ), // %1$s = plugin name(s)
            'notice_cannot_activate'		=> _n_noop( 'Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'tgmpa' ), // %1$s = plugin name(s)
            'notice_ask_to_update'		=> _n_noop( 'The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.', 'tgmpa' ), // %1$s = plugin name(s)
            'notice_cannot_update'		=> _n_noop( 'Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'tgmpa' ), // %1$s = plugin name(s)
            'install_link'			=> _n_noop( 'Begin installing plugin', 'Begin installing plugins', 'tgmpa' ),
            'activate_link'			=> _n_noop( 'Activate installed plugin', 'Activate installed plugins', 'tgmpa' ),
            'return'				=> __( 'Return to Required Plugins Installer', 'tgmpa' ),
            'plugin_activated'			=> __( 'Plugin activated successfully.', 'tgmpa'),
            'complete'				=> __( 'All plugins installed and activated successfully. %s', 'tgmpa'), // %1$s = dashboard link
            'nag_type'				=> 'updated' // Determines admin notice type - can only be 'updated' or 'error'
        )
    );
    tgmpa( $plugins, $config );
}

/**
 * Force Visual Composer to initialize as "built into the theme". This will hide certain tabs under the Settings->Visual Composer page
 */
add_action( 'vc_before_init', 'fr_vcSetAsTheme' );
function fr_vcSetAsTheme() {
    vc_set_as_theme();
	require_once('vc_templates/fragrance_elem.php');
}

/*** Bg functions ***/
add_action( 'wp_head', 'fr_set_sections_bg' );
function fr_set_sections_bg(){
	
	$fr_header_bg_url = '';
	$FR_HEADER_BG_COLOR = '';
	if ( get_option('FR_HEADER_BG_IMAGE') !== '' ) { $fr_header_bg_url = get_option('FR_HEADER_BG_IMAGE'); }
	if ( get_option('FR_HEADER_BG_COLOR') !== '' ) { $FR_HEADER_BG_COLOR = get_option('FR_HEADER_BG_COLOR'); }
	
	$FR_COLOR_SCHEME = '';
	if ( get_option('FR_COLOR_SCHEME') !== '' ) { $FR_COLOR_SCHEME = get_option('FR_COLOR_SCHEME'); }
		
	$style = '';
	$style .= '<style type="text/css">';
	if ( $fr_header_bg_url <> '' ) $style .= '#main_header { background-image: url(' . esc_attr($fr_header_bg_url) . ') !important; }';
	if ( $FR_HEADER_BG_COLOR <> '' ) $style .= '#main_header { background-color: #' . esc_attr($FR_HEADER_BG_COLOR) . ' !important; }';
	
	if ( $FR_COLOR_SCHEME <> '' ) $style .= '.fr_color_btn, .service i.fa, .service a.readmore, span.post-meta, .upload{ background-color: #' . esc_attr($FR_COLOR_SCHEME) . '; } a, #reply-title a, #menu .nav a:hover, h3.section_name span, .service a.readmore, .blog-post a.readmore, .features_list li i, .fr_converse span, .fucts_counter i, .blog .vc_gitem-post-data-source-post_date p, .vc_gitem-post-data-source-post_date p, .fr_testimonials p.meta a, .current_page_ancestor a{ color: #' . esc_attr($FR_COLOR_SCHEME) . '; } .features_list li i{ border-color: #' . esc_attr($FR_COLOR_SCHEME) . '; } ';
	$style .= '</style>';
	
	if ($fr_header_bg_url <> '' || $FR_HEADER_BG_COLOR <> '' || $FR_COLOR_SCHEME <>'') echo $style;
}

add_action( 'wp_head', 'set_font_color' );
function set_font_color(){

	$header_font_color = '';
	if ( get_option('FR_HEADER_FONT_COLOR') !== '' ) { $header_font_color = get_option('FR_HEADER_FONT_COLOR'); }
	
	$call_to_action_font_color = '';
	if ( get_option('FR_CALL_TO_ACTION_FONT_COLOR') !== '' ) { $call_to_action_font_color = get_option('FR_CALL_TO_ACTION_FONT_COLOR'); }
	
	$footer_font_color = '';
	if ( get_option('FR_FOOTER_FONT_COLOR') !== '' ) { $footer_font_color = get_option('FR_FOOTER_FONT_COLOR'); }
	

	$font_color = '';
	$font_color .= '<style type="text/css">';
	
	if ( $header_font_color <> '' ) $font_color .= 'h1#slogan, #description, .home #main_header a, #menu .nav a, #logo_wrapper #purchase { color: #' . esc_attr($header_font_color) . '; } #menu .nav a:hover, #logo_wrapper #purchase{ border-color: #' . esc_attr($header_font_color) . '; }';
	
	if ( $call_to_action_font_color <> '' ) $font_color .= '#action_area, #action_area h4, .action_button { color: #' . esc_attr($call_to_action_font_color) . '; } .action_button{ border-color: #' . esc_attr($call_to_action_font_color) . '; }';
	
	if ( $footer_font_color <> '' ) $font_color .= 'p#copyright { color: #' . esc_attr($footer_font_color) . '; }';
	
	$font_color .= '</style>';
	
	if ($header_font_color <> '' || $footer_font_color <> '') echo $font_color;
}


/*** Scripts Load ***/
function load_fragrance_scripts(){
	if ( !is_admin() ){
		$template_dir = get_template_directory_uri();
		
		wp_enqueue_style( 'fragrance_style', get_stylesheet_uri() );
		
		wp_enqueue_style( 'font-awesome', $template_dir . '/css/font-awesome.min.css', array(), '1.0', 'screen' );
		wp_enqueue_style( 'easy-pie-chart', $template_dir . '/css/jquery.easy-pie-chart.css', array(), '1.0', 'screen' );
		wp_enqueue_script('superfish', $template_dir . '/js/superfish.js', array('jquery'), '1.0', true);
		wp_enqueue_script('easing', $template_dir . '/js/jquery.easing.1.3.js', array('jquery'), '1.0', true);
		wp_enqueue_script('flexslider', $template_dir . '/js/jquery.flexslider-min.js', array('jquery'), '1.0', true);
		wp_enqueue_script('appear', $template_dir . '/js/jQuery.appear.js', array('jquery'), '1.0', true);
		wp_enqueue_script('easypiechart', $template_dir . '/js/easypiechart.js', array('jquery'), '', true);
		wp_enqueue_script('canvas', $template_dir . '/js/canvas.js', array('jquery'), '', true);
		wp_enqueue_script('niceScroll', $template_dir . '/js/niceScroll.js', array('jquery'), '', true);
				
		wp_enqueue_script('custom_script', $template_dir . '/js/custom.js', array('jquery'), '1.0', true);
		
		wp_enqueue_style( 'composer_style', $template_dir . '/css/composer_style.css', array(), '1.0', 'screen' );
		
		$fr_header_choose = get_option('FR_HEADER_LAYOUT');
		if ( 'on' == get_option('FR_HEADER_SECTION') ){
			if ( $fr_header_choose == 'Video Background' ){ 
				wp_enqueue_script('YTPlayer', $template_dir . '/js/jquery.mb.YTPlayer.js', array('jquery'), '1.0', true);
				wp_enqueue_script('video_header', $template_dir . '/js/header_video.js', array('jquery'), '1.0', true);
				wp_enqueue_style( 'video_header', $template_dir . '/css/headerWithVideo.css', array(), '1.8', 'screen' );
			}
			if ( $fr_header_choose == 'Fullscreen Slider' ){ 
				wp_enqueue_script('header_with_slider', $template_dir . '/js/headerWithSlider.js', array('jquery'), '1.0', true);
				wp_enqueue_style( 'header_with_slider', $template_dir . '/css/headerWithSlider.css', array(), '1.0', 'screen' );
			}
		} 
		
		// browser styles
		$user_agent = $_SERVER["HTTP_USER_AGENT"];
		  if (strpos($user_agent, "Chrome") !== false){
			wp_enqueue_style( 'fr_chrome_style', $template_dir . '/css/fr_chrome_style.css', array(), '1.0', 'screen' );
		  } 
		  elseif (strpos($user_agent, "Safari") !== false){
			wp_enqueue_style( 'fr_safari_style', $template_dir . '/css/fr_safari_style.css', array(), '1.0', 'screen' );
		  }
		
		if( is_page_template( 'page-blog-masonry.php' ) ){
			wp_enqueue_script( 'gridalicious', $template_dir . '/js/gridalicious.js', array('jquery'), '1.0', true);
			wp_enqueue_script( 'gr', $template_dir . '/js/gr.js', array('jquery'), '1.0', true);
		}
		
	}
	if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' );
}
add_action( 'wp_enqueue_scripts', 'load_fragrance_scripts' );

// ADMIN
function fr_admin_script() {
	$control_panel_script_folder = get_template_directory_uri() . '/fragrance_options/js';
	wp_enqueue_script('jquery-ui-tabs');
	wp_enqueue_script('jquery-form');
	wp_enqueue_script('control_panel_functions_init',$control_panel_script_folder . '/functions-init.js');
	wp_localize_script( 'control_panel_functions_init', 'controlPanelSettings', array(
		'clearpath' => get_template_directory_uri() . '/fragrance_options/images/empty.png',
		'c_p_saving_message' => esc_html__( 'Saving...', 'mntn' ),
		'c_p_options_saved_message' => esc_html__( 'Options Saved.', 'mntn' ),
		'c_p_nonce' => wp_create_nonce('c_p_nonce')
	));
	wp_enqueue_script('c_p_colorpicker',$control_panel_script_folder . '/colorpicker.js');
	wp_enqueue_script('c_p_eye',$control_panel_script_folder . '/eye.js');
}
	
add_action( 'admin_enqueue_scripts', 'fr_admin_script' );

function load_fr_admin_style() {
	wp_register_style( 'fr_wp_admin_css', get_template_directory_uri() . '/fragrance_options/css/fragrance_options.css', false, '1.0.0' );
	wp_enqueue_style( 'fr_wp_admin_css' );
}
add_action( 'admin_enqueue_scripts', 'load_fr_admin_style' );

function fr_elem_style(){
	wp_register_style( 'fr_elem_style', get_template_directory_uri() . '/vc_templates/fr_elem_style/fr_elem_style.css', array(), '1.0.', 'screen' );
	wp_enqueue_style( 'fr_elem_style' );
}
add_action('admin_enqueue_scripts','fr_elem_style');

function media_upload()  {
	wp_enqueue_script('media-upload');
	wp_enqueue_script('thickbox');
	wp_register_script('image_upload', get_template_directory_uri().'/fragrance_options/js/image_uploader.js', array('jquery','media-upload','thickbox'));
	wp_enqueue_script('image_upload');
}
add_action( 'admin_enqueue_scripts', 'media_upload' );	
 
function media_upload_styles() {
	wp_enqueue_style('thickbox');
}
add_action( 'admin_enqueue_scripts', 'media_upload_styles' );

add_filter( 'manage_edit-shop_order_columns', 'bbloomer_add_new_order_admin_list_column' );
 
function bbloomer_add_new_order_admin_list_column( $columns ) {
    $columns['product_name'] = 'Product Name';
    return $columns;
}
 
add_action( 'manage_shop_order_posts_custom_column', 'bbloomer_add_new_order_admin_list_column_content' );
 
function bbloomer_add_new_order_admin_list_column_content( $column ) {
   
    global $post;
 
    if ( 'product_name' === $column ) {
 
        $order = wc_get_order( $post->ID );
		$prod_names = array();
		foreach($order->get_items() as $item) {
			$prod_names[] = $item['name'];
		}
        echo implode(",", $prod_names );
        //echo $order->get_billing_country();
      
    }
}	
