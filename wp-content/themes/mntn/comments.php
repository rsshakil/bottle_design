<?php
/* The template for displaying Comments */
if ( post_password_required() )
	return;
?>

<div id="comment-wrap" class="comments-area">

	<?php if ( have_comments() ) : ?>
		<h2 class="comments-title">
			<?php comments_number(esc_html__('0 Visitor Comments','mntn'), esc_html__('1 Visitor Comment','mntn'), '% '.esc_html__('Visitor Comments','mntn') );?>
		</h2>

		<ol class="comment-list">
			<?php
				wp_list_comments( array(
					'style'       => 'ol',
					'short_ping'  => true,
					'avatar_size' => 74,
				) );
			?>
		</ol><!-- .comment-list -->

		<?php
			if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) :
		?>
		<nav class="navigation comment-navigation" role="navigation">
			<h1 class="screen-reader-text section-heading"><?php _e( 'Comment navigation', 'mntn' ); ?></h1>
			<div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'mntn' ) ); ?></div>
			<div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'mntn' ) ); ?></div>
		</nav><!-- .comment-navigation -->
		<?php endif; // Check for comment navigation ?>

		<?php if ( ! comments_open() && get_comments_number() ) : ?>
		<p class="no-comments"><?php _e( 'Comments are closed.' , 'mntn' ); ?></p>
		<?php endif; ?>

	<?php endif; // have_comments() ?>
	
	<?php
		$form_args = array(
		  'title_reply'       => __( 'Post a Reply', 'mntn' ),
		  'cancel_reply_link' => __( 'Cancel Reply', 'mntn' ),
		  'label_submit'      => __( 'Submit Comment', 'mntn' ),
		)		
	?>
	
	<?php comment_form($form_args); ?>

</div><!-- #comments -->