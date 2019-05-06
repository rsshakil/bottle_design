<?php
	if ( is_home() ) {
		$paged = get_query_var( 'page' ) ? get_query_var( 'page' ) : get_query_var( 'paged' );
		
		$args = array(
			'showposts' => (int) get_option('fragrance_homepage_posts'),
			'paged' => $paged,
			'category__not_in' => (array) get_option('fragrance_exlcats_recent'),
		);
		query_posts( apply_filters( 'sd_home_args', $args ) );
	}
?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	<article class="entry post clearfix">
		
		<span class="post-meta"><?php echo get_the_time( 'D' ); ?><span><?php echo get_the_time( 'd' ); ?></span></span>
		
		<h1 class="main_title"><span><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></span></h1>
		<p class="meta"> <?php the_author_posts_link(); ?><?php esc_html_e(' :: in', 'mntn'); ?> <?php the_time('F j, Y'); ?> <?php esc_html_e(' :: in', 'mntn'); ?> <?php the_category(', ') ?> :: <?php comments_popup_link(esc_html__('0 comments','mntn'), esc_html__('1 comment','mntn'), '% '.esc_html__('comments','mntn')); ?></p>

		<div class="post-content clearfix">
				<div class="featured_box">
					<?php
						$size = 'blog-thumb';
						if ( has_post_thumbnail() ) { the_post_thumbnail($size); }
					?>
				</div> 	<!-- end .featured_box -->
			
			<div class="entry_content">
				<p><?php echo wp_trim_words( get_the_content(), 50 ); ?></p>
			</div> <!-- end .entry_content -->
		</div>
		<a href="<?php the_permalink(); ?>" class="readmore"><?php esc_html_e('Read More', 'mntn'); ?></a>
	</article> 	<!-- end .post-->
<?php
endwhile;
	if (function_exists('wp_pagenavi')) { wp_pagenavi(); }
	else { get_template_part('includes/navigation','entry'); }
else:
	get_template_part('includes/no-results','entry');
endif;
 ?>