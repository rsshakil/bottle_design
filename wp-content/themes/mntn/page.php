<?php get_header(); 
$classes = array('entry', 'post', 'clearfix'); 
?>
<div id="content" class="clearfix custom_page">

	<?php if ( !is_front_page() ) { ?>
	<div class="page_header parallax">
		<?php
			$size = 'full';
			 the_post_thumbnail($size); 
		?>
		<div class="title_holder">
			<h1 class="page_title"><?php wp_title("",true); ?></h1>
			<?php get_template_part('includes/breadcrumbs', 'page'); ?>
		</div>
	</div> 	<!-- end .page_header -->
	<?php } ?>

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div class="<?php if(!is_front_page()) echo 'content_inner sizers' ?> ">
			<article class="entry post clearfix" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<div class="post-content clearfix">
					<?php
						$categories = get_the_category();
						$separator = ' ';
						$output = '';
						if($categories){
							foreach($categories as $category) {
								$output .= '<a href="'.get_category_link( $category->term_id ).'" title="' . esc_attr( sprintf( __( "View all posts in %s", "mntn" ), $category->name ) ) . '">'.$category->cat_name.'</a>'.$separator;
							}
						echo trim($output, $separator);
						}
					?>
					<?php the_content(); ?>
					<!--<p><?php edit_post_link( __( 'Edit', 'mntn' ), '<span class="edit-link">', '</span>' ); ?></p> -->
				</div>
			</article><!-- end of article -->
		</div><!-- end of .content_inner -->
		<?php endwhile; ?>
		<?php endif; wp_reset_postdata(); ?>
		
</div> <!-- end #content -->
<?php get_footer(); ?>