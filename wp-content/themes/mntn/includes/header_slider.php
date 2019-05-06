<?php 
	global $more; 
	$post_id = '';
	$home_slider_class = '';
	if ( 'on' == get_option('FR_SLIDER_AUTO') ) $home_slider_class .= ' slider_auto slider_speed_' . get_option('FR_SLIDER_AUTOSPEED');
	if ( 'slide' == get_option('FR_SLIDER_TRANSITION') ) $home_slider_class .= ' slider_effect_slide';
?>
<div id="header_featured" class="flexslider<?php echo $home_slider_class; ?>">
	<ul class="slides">
	<?php
		global $wp_embed, $fr_ids;
		
		$fr_ids = array();
		$arr = array();
		$i=1;
		
		$home_slider_cat = get_option('HOME_SLIDER_CATEGORY');
		$home_slider_num = get_option('HOME_SLIDES_COUNT');
		
		query_posts("showposts=$home_slider_num&cat=".fr_get_catId($home_slider_cat));
		
		while (have_posts()) : the_post();
		
			$title = get_the_title();
			$description = excerpt(25);
	?>
			<li class="slide fr_slide_image">
				<div class="slide_wrap">
					<?php 
						$home_slider_description = '<h2 class="title"><a href="' . get_permalink() . '">' . $title . '</a></h2>'
							. '<p>' . $description . '</p>';
					?>
						<div class="featured_box">
							<a href="<?php get_permalink(); ?>">							
								<?php if ( has_post_thumbnail() ) { the_post_thumbnail( 1200, 675 ); } ?>
							</a>
							<div class="fr_image_description">
								<div class="fr_inner_description">
									<?php echo $home_slider_description; ?>
								</div> <!-- end .inner_description -->
							</div>
						</div> <!-- end .featured_box -->
				</div> <!-- end .slide_wrap -->
			</li>
	<?php
		endwhile; wp_reset_query();	
	?>
	</ul>

	<a id="left-arrow" href="#"><?php esc_html_e('Previous','Fragrance'); ?></a>
	<a id="right-arrow" href="#"><?php esc_html_e('Next','Fragrance'); ?></a>
</div>	<!-- end #header_featured -->	