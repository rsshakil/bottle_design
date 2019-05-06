<?php 
/*
Template Name: Blog Page Masonry
*/
?>


<?php 
$fragrance_page_setup = array();
$fragrance_page_setup = maybe_unserialize( get_post_meta($post->ID,'fragrance_page_setup',true) );

$fragrance_fullwidth_page = isset( $fragrance_page_setup['fragrance_fullwidth_page'] ) ? (bool) $fragrance_page_setup['fragrance_fullwidth_page'] : false;

$blog_cats = isset( $fragrance_page_setup['fragrance_blog_categories'] ) ? (array) $fragrance_page_setup['fragrance_blog_categories'] : array();


$fragrance_blog_posts_num = isset( $fragrance_page_setup['fragrance_blog_posts_num'] ) ? (int) $fragrance_page_setup['fragrance_blog_posts_num'] : 5;
?>

<?php get_header(); ?>

<div id="content" class="clearfix  fullwidth masonry">
	<div id="blog_wrapper" class="sizers clearfix fr_cols">
	<div id="left_area">

		<?php get_template_part('loop', 'page'); ?>
		
		<div id="blog_page" class="responsive">
			<?php $cat_query = ''; 
			if ( !empty($blog_cats) ) $cat_query = '&cat=' . implode(",", $blog_cats);
			else echo '<!-- blog category is not selected -->'; ?>
			<?php 
				$page_paged = is_front_page() ? get_query_var( 'page' ) : get_query_var( 'paged' );
			?>
			<?php query_posts("showposts=$fragrance_blog_posts_num&paged=" . $page_paged . $cat_query); ?>
			
			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
				<?php get_template_part( 'content', get_post_format() ); ?>
			<?php endwhile; ?>
			
				
		</div> <!-- end #blog_page -->
		<div class="page-nav clearfix">
			<?php if(function_exists('wp_pagenavi')) { wp_pagenavi(); }
			else { ?>
				 <?php get_template_part('includes/navigation'); ?>
			<?php } ?>
		</div> <!-- end .entry -->
			<?php else : ?>
				<?php get_template_part('includes/no-results'); ?>
			<?php endif; wp_reset_query(); ?>
			
	</div> <!-- end #left_area -->
	</div> <!-- end #blog_wrapper -->
</div> <!-- end #content -->
	
<?php get_footer(); ?>