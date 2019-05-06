<?php 
/*
Template Name: Full Width Page
*/
?>
<?php get_header(); ?>

<div id="content" class="clearfix fullwidth">
	<div id="blog_wrapper" class="sizers clearfix fr_cols">
		<div id="left_area" class="fr_col1">
			<div id="blog_page" class="responsive">
		
				<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>				
				<article class="entry post clearfix" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				
						<h1 class="main_title"><?php the_title(); ?></h1>
						<p class="meta"> <?php the_author_posts_link(); ?><?php esc_html_e(' :: in'); ?> <?php the_time('F j, Y'); ?> <?php esc_html_e(' :: in'); ?> <?php the_category(', ') ?> :: <?php comments_popup_link(esc_html__('0 comments','Fragrance'), esc_html__('1 comment','Fragrance'), '% '.esc_html__('comments','Fragrance')); ?></p>
							<div class="post-content clearfix">
							<?php if ( has_post_thumbnail() ) { ?>
								<div class="featured_box">
									<?php
										$size = 'blog-thumb';
										the_post_thumbnail($size);
									?>
								</div> <!-- end .featured_box -->
							<?php } ?>
							
							<?php the_content(); ?>
							<p><?php edit_post_link( __( 'Edit', 'mntn' ), '<span class="edit-link">', '</span>' ); ?></p>
						</div>
					</article><!-- end of article -->
			
			<?php endwhile; // end of the loop. ?>

			</div> <!-- end #blog_page -->
		</div> <!-- end #left_area -->
	</div> <!-- end #blog_wrapper -->
</div> <!-- end #content -->
	
<?php get_footer(); ?>