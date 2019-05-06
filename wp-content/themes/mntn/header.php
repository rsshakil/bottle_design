<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<?php fr_meta_keywords(); ?>
	<meta name="viewport" content="width=device-width" />
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<title><?php wp_title(); ?></title>
	
	<?php
		function mntn_fr_fonts() {
			$protocol = is_ssl() ? 'https' : 'http';
			wp_enqueue_style( 'mntn-muli', "$protocol://fonts.googleapis.com/css?family=Muli:300,400" );
			wp_enqueue_style( 'mntn-font-awesome', "$protocol://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" );
		}
		add_action( 'wp_enqueue_scripts', 'mntn_fr_fonts' );
	?>
	
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	
	<script type="text/javascript">
		document.documentElement.className = 'js';
	</script>
	
	<?php require_once(TEMPLATEPATH . '/fragrance_options/variables.php');  ?>
		
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div id="container">
		<div id="wrapper">
		<!--MENU-->
			<div id="menu" class="clearfix <?php if( !is_front_page() ){ echo "small_header"; } ?>">
				<a href="#" id="mobile_nav" class="closed">Navigation Menu</a>
				
				<nav id="main-menu">
					<a href="<?php echo esc_url( home_url() ); ?>">
						<?php $small_logo = (get_option('FR_SITE_LOGO_SMALL') <> '') ? esc_attr(get_option('FR_SITE_LOGO_SMALL')) : get_template_directory_uri() . '/images/logo.png'; ?>
						<img src="<?php echo $small_logo; ?>" alt="logo" id="logo"/>
					</a> <!-- Small logo in menu -->
							
						<?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav', 'fallback_cb' => false ) ); ?>
					
				</nav>
			</div> <!-- end #menu -->
			<!--MENU-->
			
	<!--HEADER SECTION-->
	<?php $fr_header_choose = get_option('FR_HEADER_LAYOUT');
		if ( 'on' == get_option('FR_HEADER_SECTION') ){
			if ( $fr_header_choose == 'Fullscreen Image' ){ 
				get_template_part( 'fr_headers/fr_header_image' );
			}elseif ( $fr_header_choose == 'Fullscreen Slider' ){
				get_template_part( 'fr_headers/fr_header_slider' );
			}else{
				get_template_part( 'fr_headers/fr_header_video' );
			}
		} 
	?>
	<!--HEADER SECTION-->		