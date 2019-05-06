<?php get_header(); 
$classes = array('entry', 'post', 'clearfix'); 
?>
<div id="content" class="clearfix">
	<div id="blog_wrapper" class="sizers clearfix fr_cols">
		<div id="left_area" class="fr_col1">
		
			<div id="blog_page" class="responsive">
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				
					<?php get_template_part( 'content', get_post_format() ); ?>
					
					
			<?php endwhile; ?>
			
			<?php else : ?>
			
			<div class="fr_no_result"> Sorry, no posts matched your criteria.<br />
				<?php get_search_form(); ?>
			</div>
   
			<?php endif; wp_reset_query(); ?>
				
				<?php wp_link_pages(); ?>
				
				<?php comments_template(); ?> 
				
				<div class="page-nav clearfix">
					<?php get_template_part('includes/navigation'); ?>
				</div> <!-- end .entry -->
				
			</div> <!-- end #blog_page -->
			
		</div> <!-- end #left_area -->
		
		<?php get_sidebar(); ?>
		
	</div> <!-- end #blog_wrapper -->
</div> <!-- end #content -->
<?php get_footer(); ?>