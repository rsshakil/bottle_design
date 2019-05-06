<header id="main_header">
<?php do_action('header_top'); ?>
	
<?php if( is_front_page() ){ 
	get_template_part( 'includes/header_slider' );
} ?>
</header> <!-- end #main-header -->