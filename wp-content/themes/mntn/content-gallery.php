<?php

/* The template for displaying posts in the Gallery post format. */

$classes = array('entry', 'post', 'clearfix');
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($classes); ?>>
	<header class="entry-header">
		<span class="post-meta"><?php echo get_the_time( 'D' ); ?><span><?php echo get_the_time( 'd' ); ?></span></span>
		<span class="fr_post_type"></span>
		
		<?php if ( is_single() ) : ?>
		<h1 class="entry-title"><?php the_title(); ?></h1>
		<?php else : ?>
		<h2 class="main_title">
			<a href="<?php the_permalink(); ?>" rel="bookmark"><?php the_title(); ?></a>
		</h2>
		<?php endif; // is_single() ?>
		<p class="meta"> <?php the_author_posts_link(); ?><?php esc_html_e(' :: in', 'mntn'); ?> <?php the_time('F j, Y'); ?> <?php esc_html_e(' :: in', 'mntn'); ?> <?php the_category(', ') ?> :: <?php comments_popup_link(esc_html__('0 comments','mntn'), esc_html__('1 comment','mntn'), '% '.esc_html__('comments','mntn')); ?></p>
	</header><!-- .entry-header -->

	<div class="post-content">
		
		<?php if ( is_single() ) : ?>
			<?php the_content( __( 'Read more', 'mntn' ) ); ?>
			<?php wp_link_pages( array( 'before' => '<div class="page-links"><span class="page-links-title">' . __( 'Pages:', 'mntn' ) . '</span>', 'after' => '</div>', 'link_before' => '<span>', 'link_after' => '</span>' ) ); ?>
		<?php else : ?>
			<div class="featured_box">
				<div class="post_gallery_slider flexslider">
					<ul class="slides">
					<?php  $gallery = get_post_gallery_images( $post );
							foreach( $gallery as $image ) {
								echo '<li class="slide"><img src="'. $image .'" /></li>';	
							 }
					?> 
					</ul>
					<ul class="slider_controls"></ul>
				</div>
			</div><!-- end of .featured_box -->
		<?php the_excerpt(); ?>
		<span><?php the_tags('Tags: ',' > '); ?></span>
		<a href="<?php the_permalink(); ?>" class="readmore fr_simple_btn"><?php esc_html_e('Read More', 'mntn'); ?></a>
		<?php endif; // is_single() ?>
		
	</div> <!-- end of .post-content -->
</article><!-- #post -->
