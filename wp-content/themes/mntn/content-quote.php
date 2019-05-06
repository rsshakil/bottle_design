<?php
/*The template for displaying posts in the Quote post format.*/
$classes = array('entry', 'post', 'clearfix');
global $more;
?>

<article id="post-<?php the_ID(); ?>" <?php post_class($classes); ?>>
	<div class="fr_quote_meta">
		<span class="post-meta"><?php echo get_the_time( 'D' ); ?><span><?php echo get_the_time( 'd' ); ?></span></span>
		<span class="fr_post_type"></span>
	</div>
	<div class="post-content">
		<?php 
			$more = 0;
			the_content('Read More');
		?>
	</div> <!-- end of .post-content -->
</article><!-- #post -->
