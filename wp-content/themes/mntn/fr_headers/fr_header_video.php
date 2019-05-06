<header id="main_header">
	<?php do_action('header_top'); ?>
	


<?php if( is_front_page() ){ ?>
	<div id="fr_header_featured_video" >
		<div class="featured_box flexslider">
			
			<!--VIDEO-->
			<div class="fr_bg_video">
				<a class="player" data-property="{videoURL:'<?php echo esc_html(get_option('FR_HEADER_VIDEO_URL')); ?>',containment:'.fr_bg_video',autoPlay:true, showControls: false, mute:true,startAt:0,opacity:1}"></a>
			</div>
			<!--VIDEO-->
			
			<!--TEXT SLIDER-->
			<?php get_template_part( 'includes/header_text_slider' ); ?>
			<!--TEXT SLIDER-->
			
		</div> <!-- end .featured_box -->
	</div>	<!-- end #header_featured -->
<?php } ?>
</header> <!-- end #main-header -->