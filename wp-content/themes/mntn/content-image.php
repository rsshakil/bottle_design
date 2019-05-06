<?php
/*The template for displaying posts in the Image post format.*/

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
		
		<p class="meta"> <?php the_author_posts_link(); ?><?php esc_html_e(' :: in', 'mntn'); ?> <?php the_time('F j, Y'); ?> <?php esc_html_e(' :: in', 'mntn'); ?> <?php the_category(', ') ?> :: <?php comments_popup_link(esc_html__('0 comments','Fragrance'), esc_html__('1 comment','Fragrance'), '% '.esc_html__('comments','Fragrance')); ?></p>
	</header><!-- .entry-header -->

	<div class="post-content clearfix">
		<div class="featured_box">
			<?php
				$size = 'blog-thumb';
				if ( has_post_thumbnail() ) { the_post_thumbnail($size); }
			?>
		</div> 	<!-- end .featured_box -->
		<div class="entry_content">
			<p><?php the_excerpt(); ?></p>
			<span><?php the_tags('Tags: ',' > '); ?></span>
		</div> <!-- end .entry_content -->
		
	</div> <!-- end of .post-content -->
		<a href="<?php the_permalink(); ?>" class="readmore fr_simple_btn"><?php esc_html_e('Read More', 'fragrance'); ?></a>
	</article> 	<!-- end .post-->
</article><!-- #post -->
