<header id="main_header">
	<?php do_action('header_top'); ?>

<?php if( is_front_page() ){ ?>
	<div id="head_wrap">
		<div class="sizers clearfix">
			<div id="logo_wrapper">
				<h1><a href="<?php the_permalink(); ?>" rel="bookmark"><?php echo esc_html(get_option('FR_HEADER_SECTION_SLOGAN')); ?></a></h1>
				<p id="description"><?php echo esc_html(get_option('FR_HEADER_SECTION_DESC')); ?></p><br />
				<?php $header_button = get_option('FR_HEADER_SECTION_LINK_TEXT');
					if( $header_button <> '' ){
				?>
				<a href="<?php echo esc_html(get_option('FR_HEADER_SECTION_LINK_ADDRESS')); ?>" id="purchase"><?php echo esc_html( $header_button ); ?></a>
				<?php } ?>
			</div>
		</div> <!-- end of .sizers -->
	</div> <!-- end of .head_wrap -->
<?php } ?>
</header> <!-- end #main-header -->