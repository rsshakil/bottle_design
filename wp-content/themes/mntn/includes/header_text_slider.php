<?php 
	global $more; 
	$post_id = '';
?>
	<ul class="slides">
	<?php
		global $wp_embed, $fr_ids;
		
		$fr_ids = array();
		$arr = array();
		$i=1;
		
		$home_slider_cat = get_option('VIDEO_SLIDER_CATEGORY');
		$home_slider_num = get_option('VIDEO_SLIDES_COUNT');
		
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