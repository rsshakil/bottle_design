				<div id="footer">
				
					<?php if( !is_front_page() ){ ?>
					<a href="#" id="fr_to_top"><i class="fa fa-3x fa-angle-double-up"></i></a>
					<?php } ?>
				
				<?php if ( 'on' == get_option('FR_CALL_TO_ACTION') ) { ?>
					<div id="footer-widgets" class="clearfix">
					
						<?php
							$footer_sidebars = array('footer-area-1','footer-area-2','footer-area-3','footer-area-4');
							if ( is_active_sidebar( $footer_sidebars[0] ) || is_active_sidebar( $footer_sidebars[1] ) || is_active_sidebar( $footer_sidebars[2] ) || is_active_sidebar( $footer_sidebars[3] ) ) {
								foreach ( $footer_sidebars as $key => $footer_sidebar ){
									if ( is_active_sidebar( $footer_sidebar ) ) {
										echo '<div class="footer-widget' . (  3 == $key ? ' last' : '' ) . '">';
										dynamic_sidebar( $footer_sidebar );
										echo '</div>';
									}
								}
							}
						?>
			
						<div id="action_area" class="clearfix">
							<div class="one_half">
								<h4><?php echo esc_html(get_option('FR_CALL_TO_ACTION_TEXT')); ?></h4>
								<p><?php echo esc_html(get_option('FR_CALL_TO_ACTION_TEXT_SMALL')); ?></p>
							</div>
							<a href="<?php echo esc_html(get_option('FR_CALL_TO_ACTION_LINK_ADDRESS')); ?>" class="fr_simple_btn"><?php echo esc_html(get_option('FR_CALL_TO_ACTION_BUTTON_NAME')); ?></a>
						</div><!--end of #action_area -->
					</div>
				<?php } ?>
					<p id="copyright"><?php echo esc_html(get_option('FR_FOOTER_TEXT')); ?></p>
				</div> <!-- end #footer -->
			</div> <!-- end #content -->
		</div> <!-- end #wrapper -->
		
		
	</div> <!-- end #container -->

	<?php wp_footer(); ?>
</body>
</html>