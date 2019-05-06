<?php


/********* Theme Options Fragrance v.1.0 ************/


/* Save/Reset actions | Adds theme options to WP-Admin menu */
add_action('admin_menu', 'add_control_panel');
function add_control_panel() {
    global $fr_themename, $fr_shortname, $fr_options;
	$control_panel = basename(__FILE__);
	
	if ( isset( $_GET['page'] ) && $_GET['page'] == $control_panel && isset( $_POST['action'] ) ) {
		c_p_save_data( 'js_disabled' ); //saves data when javascript is disabled
	}
	
	$core_page = add_theme_page( esc_html__( 'Theme Options', 'mntn' ),  esc_html__( 'Theme Options', 'mntn' ), 'switch_themes', basename(__FILE__), 'build_control_panel' );
}
/* --------------------------------------------- */

/* Displays control-panel */
if ( ! function_exists( 'build_control_panel' ) ){
	function build_control_panel() {

		global $fr_themename, $fr_shortname, $fr_options;
		
		if ( isset($_GET['saved']) ) {
			if ( $_GET['saved'] ) echo '<div id="message" class="updated fade"><p><strong>' . esc_html( 'mntn' ) . ' ' . esc_html__( 'settings saved.', 'mntn' ) . '</strong></p></div>';
		}
		if ( isset($_GET['reset']) ) {
			if ( $_GET['reset'] ) echo '<div id="message" class="updated fade"><p><strong>' . esc_html( 'mntn' ) . ' ' . esc_html__( 'settings reset.', 'mntn' ) . '</strong></p></div>';
		}
	?>

		<div id="wrapper">
		  <div id="control-panel-wrap">
			<form method="post" id="main_options_form" enctype="multipart/form-data">
				<div id="control-panel-wrapper">
					<div id="control-panel">
						<div id="control-panel-header">
							<img src="<?php echo get_template_directory_uri() ?>/fragrance_options/images/logo.png" alt="control-panel" class="pngfix" id="control-panel-logo" />
							<input name="save" type="submit" value="<?php esc_html_e( 'Save settings', 'mntn' ); ?>" class="save_settings" />
						</div>
						<div id="control-panel-inside-wrap">
							<div id="control-panel-inside">
								
								<?php 
									global $fr_mainTabs;
									$fr_mainTabs = apply_filters( 'fr_mainTabs', $fr_mainTabs );
								?>
								<ul id="control-panel-mainmenu">
									<?php if(in_array('general',$fr_mainTabs)) { ?>
										<li><a href="#wrap-general"><span><img src="<?php echo get_template_directory_uri() ?>/fragrance_options/images/general-icon.png" class="pngfix" alt="" /></span><?php esc_html_e( 'General Options', 'mntn' ); ?></a></li>
									<?php }; ?>
									<?php if(in_array('head',$fr_mainTabs)) { ?>
										<li><a href="#wrap-head"><span><img src="<?php echo get_template_directory_uri() ?>/fragrance_options/images/head-icon.png" class="pngfix" alt="" /></span><?php esc_html_e( 'Header', 'mntn' ); ?></a></li>
									<?php }; ?>
									<?php if(in_array('home-slider',$fr_mainTabs)) { ?>
										<li><a href="#wrap-home-slider"><span><img src="<?php echo get_template_directory_uri() ?>/fragrance_options/images/header_slider.png" class="pngfix" alt="" /></span><?php esc_html_e( 'Header with Slider', 'mntn' ); ?></a></li>
									<?php }; ?>
									<?php if(in_array('home-video',$fr_mainTabs)) { ?>
										<li><a href="#wrap-video"><span><img src="<?php echo get_template_directory_uri() ?>/fragrance_options/images/video.png" class="pngfix" alt="" /></span><?php esc_html_e( 'Header with Video', 'mntn' ); ?></a></li>
									<?php }; ?>
									<?php if(in_array('footer',$fr_mainTabs)) { ?>
										<li><a href="#wrap-footer"><span><img src="<?php echo get_template_directory_uri() ?>/fragrance_options/images/footer-icon.png" class="pngfix" alt="" /></span><?php esc_html_e( 'Area and Footer', 'mntn' ); ?></a></li>
									<?php }; ?>
									<?php if(in_array('tools',$fr_mainTabs)) { ?>
										<li><a href="#wrap-tools"><span><img src="<?php echo get_template_directory_uri() ?>/fragrance_options/images/tools-icon.png" class="pngfix" alt="" /></span><?php esc_html_e( 'Advanced Tools', 'mntn' ); ?></a></li>
									<?php }; ?>
									<?php do_action( 'render_fr_mainTabs',$fr_mainTabs ); ?>
								</ul><!-- end control-panel-mainmenu -->

		<?php 
			foreach ($fr_options as $value) {
				if ( in_array( $value['type'], array( 'text', 'textlimit', 'textarea', 'select', 'checkboxes', 'different_checkboxes', 'colorpicker', 'textcolorpopup', 'upload' ) ) ) { ?>
					<div class="block_settings clearfix">
						<div class="setting_name">
							<h3><?php echo esc_html( $value['name'] ); ?></h3>
							<div class="field-desc">
								<p><?php echo $value['desc']; ?></p>
							</div> <!-- end box-desc-content div -->
						</div> <!-- end div setting_name -->
						
						<div class="setting_box">
				
							<?php if ( 'text' == $value['type'] ) { 
									$c_p_input_value = '';
									$c_p_input_value = ( '' != get_option( $value['id'] ) ) ? get_option( $value['id'] ) : $value['std'];
									$c_p_input_value = stripslashes( $c_p_input_value );
								?>
								
								<input name="<?php echo esc_attr( $value['id'] ); ?>" id="<?php echo esc_attr( $value['id'] ); ?>" type="<?php echo esc_attr( $value['type'] ); ?>" value="<?php echo esc_attr( $c_p_input_value ); ?>" />
								
							<?php } elseif ( 'textlimit' == $value['type'] ) { 
									$c_p_input_value = '';
									$c_p_input_value = ( '' != get_option( $value['id'] ) ) ? get_option( $value['id'] ) : $value['std'];
									$c_p_input_value = stripslashes( $c_p_input_value );
								?>
							
								<input name="<?php echo esc_attr( $value['id'] ); ?>" id="<?php echo esc_attr( $value['id'] ); ?>" type="text" maxlength="<?php echo esc_attr( $value['max'] ); ?>" size="<?php echo esc_attr( $value['max'] ); ?>" value="<?php echo esc_attr( $c_p_input_value ); ?>" />
								
							<?php } elseif ( 'colorpicker' == $value['type'] ) { ?>
							
								<div id="colorpickerHolder"></div>
								
							<?php } elseif ( 'textcolorpopup' == $value['type'] ) {
									$c_p_input_value = '';
									$c_p_input_value = ( '' != get_option( $value['id'] ) ) ? get_option( $value['id'] ) : $value['std']; 
								?>
								
								<input name="<?php echo esc_attr( $value['id'] ); ?>" id="<?php echo esc_attr( $value['id'] ); ?>" class="colorpopup" type="text" value="<?php echo esc_attr( $c_p_input_value ); ?>" />
								
							<?php } elseif ( 'textarea' == $value['type'] ) { ?>
								
								<?php
									$c_p_textarea_value = '';
									$c_p_textarea_value = ( '' != get_option( $value['id'] ) ) ? get_option( $value['id'] ) : $value['std'];
									$c_p_textarea_value = trim( $c_p_textarea_value );
								?>
								
								<textarea name="<?php echo esc_attr( $value['id'] ); ?>" id="<?php echo esc_attr( $value['id'] ); ?>"><?php echo esc_textarea( $c_p_textarea_value ); ?></textarea>
								
							<?php } elseif ( 'upload' == $value['type'] ) { ?>
									
								<input id="<?php echo esc_attr( $value['id'] ); ?>" class="uploadfield" type="text" size="90" name="<?php echo esc_attr( $value['id'] ); ?>" value="<?php echo esc_url( get_option($value['id']) ); ?>" />
								<div class="upload_buttons">
									<span class="upload_image_reset"><?php esc_html_e( 'Reset', 'mntn' ); ?></span>
									<input class="upload_image_button" type="button" value="<?php esc_attr_e( 'Upload Image', 'mntn' ); ?>" />
								</div>
								
								<div class="clear"></div>
											
							<?php } elseif ( 'select' == $value['type'] ) { ?>
							
								<select name="<?php echo esc_attr( $value['id'] ); ?>" id="<?php echo esc_attr( $value['id'] ); ?>">
									<?php foreach ( $value['options'] as $option_key=>$option ) { ?>
										<?php 
											$c_p_select_active = '';
											$sd_use_option_values = isset( $value['sd_array_for'] ) && 'pages' == $value['sd_array_for'] ? true : false;
											
											$sd_option_db_value = get_option($value['id']);
											
											if ( ( $sd_use_option_values && is_numeric( $sd_option_db_value ) && ( $sd_option_db_value == $option_key ) ) || ( stripslashes( $sd_option_db_value ) == trim( stripslashes( $option ) ) ) || ( ! $sd_option_db_value && isset( $value['std'] ) && stripslashes( $option ) == stripslashes( $value['std'] ) ) )
												$c_p_select_active = ' selected="selected"';
										?>
										<option<?php if ( $sd_use_option_values ) echo ' value="' . esc_attr( $option_key ) . '"'; ?> <?php echo $c_p_select_active; ?>><?php echo esc_html( trim( $option ) ); ?></option>
									<?php } ?>
								</select>
								
							<?php } elseif ( 'checkboxes' == $value['type'] ) {
							
								if ( empty( $value['options'] ) ) {
									esc_html_e( "You don't have pages", 'mntn' );
								} else {
									$i = 1;
									$className = 'inputs';
									if ( isset( $value['excludeDefault'] ) && $value['excludeDefault'] == 'true' ) $className .= ' different';
									
									foreach ( $value['options'] as $option ){
										$checked = "";
										$class_name_last = 0 == $i % 3 ? ' last' : '';
										
										if ( get_option( $value['id'] ) ) {
											if ( in_array( $option, get_option( $value['id'] ) ) ) $checked = "checked=\"checked\"";
										}
										
										$c_p_checkboxes_label = $value['id'] . '-' . $option;
										$c_p_checkboxes_value = ( 'pages' == $value['usefor'] ) ? fr_get_pagename( $option ) : fr_get_categname( $option );
										?>
										
										<p class="<?php echo esc_attr( $className . $class_name_last ); ?>">
											<input type="checkbox" class="usual-checkbox" name="<?php echo esc_attr( $value['id'] ); ?>[]" id="<?php echo esc_attr( $c_p_checkboxes_label ); ?>" value="<?php echo esc_attr( $option ); ?>" <?php echo esc_html( $checked ); ?> />
											
											<label for="<?php echo esc_attr( $c_p_checkboxes_label ); ?>"><?php echo esc_html( $c_p_checkboxes_value ); ?></label>
										</p>
										
										<?php if ( $i%3 == 0 ) echo('<br class="clearfix"/>'); ?>
										<?php $i++; 
									}
								} ?>
								<br class="clearfix"/>
								
							<?php } elseif ( 'different_checkboxes' == $value['type'] ){
							
								foreach ( $value['options'] as $option ){
									$checked = '';
									if ( get_option( $value['id']) !== false ) {
										if ( in_array( $option, get_option( $value['id'] ) ) ) $checked = "checked=\"checked\"";
									} elseif ( isset( $value['std'] ) ) {
										if ( in_array($option, $value['std']) ) $checked = "checked=\"checked\"";
									} ?>
									
									<p class="<?php echo esc_attr( 'postinfo-' . $option ); ?>">
										<input type="checkbox" class="usual-checkbox" name="<?php echo esc_attr( $value['id'] ); ?>[]" id="<?php echo esc_attr( $value['id'] . '-' . $option ); ?>" value="<?php echo esc_attr( $option ); ?>" <?php echo esc_html( $checked ); ?> />
									</p>
								<?php } ?>
								<br class="clearfix"/>
								
							<?php } ?>
				
						</div> <!-- end setting_box div -->
					</div> <!-- end block_settings div -->
					
				<?php } elseif ( 'checkbox' == $value['type'] || 'checkbox2' == $value['type'] ) { ?>
					
					<div class="<?php echo esc_attr( 'block_settings clear social' . $sd_box_class ); ?>">
						<div class="setting_name"><h3><?php echo esc_html( $value['name'] ); ?></h3>
							<div class="field-desc">
								<p><?php echo $value['desc']; ?></p>
							</div> <!-- end box-desc-content div -->
						</div> <!-- end div setting_name -->
						<div class="setting_box">
							<?php 
								$checked = '';
								if ( '' != get_option( $value['id'] ) ) {
									if ( 'on' == get_option( $value['id'] ) ) { $checked = 'checked="checked"'; }
									else { $checked = ''; }
								}
								elseif ( 'on' == $value['std'] ) { $checked = 'checked="checked"'; }
							?>
							<input type="checkbox" class="checkbox ios-switch" name="<?php echo esc_attr( $value['id'] ); ?>" id="<?php echo esc_attr( $value['id'] );?>" <?php echo $checked; ?> />
							<div class="switch"></div>
						</div> <!-- end setting_box div -->
					</div> <!-- end block_settings-small div -->
					
				<?php } elseif ( 'support' == $value['type'] ) { ?>
						
					<div class="inner-content">
						<?php include( get_template_directory('template_directory') ."/includes/functions/" . $value['name'] . ".php" ); ?>
					</div>
						
				<?php } elseif ( 'contenttab-wrapstart' == $value['type'] || 'subcontent-start' == $value['type'] ) { ?>
					
					<?php $c_p_innertab_class = 'contenttab-wrapstart' == $value['type'] ? 'content-div' : 'tab-content'; ?>
					
					<div id="<?php echo esc_attr( $value['name'] ); ?>" class="<?php echo esc_attr( $c_p_innertab_class ); ?>">
					
				<?php } elseif ( 'contenttab-wrapend' == $value['type'] || 'subcontent-end' == $value['type'] ) { ?>

					</div> <!-- end <?php echo esc_html( $value['name'] ); ?> div -->
						
				<?php } elseif ( 'subnavtab-start' == $value['type'] ) { ?>

					<ul class="idTabs">
						
				<?php } elseif ( 'subnavtab-end' == $value['type'] ) { ?>

					</ul>
						
				<?php } elseif ( 'subnav-tab' == $value['type'] ) { ?>

					<li><a href="#<?php echo esc_attr( $value['name'] ); ?>"><span class="pngfix"><?php echo esc_html( $value['desc'] ); ?></span></a></li>
						
				<?php } elseif ($value['type'] == "clearfix") { ?>
						
					<div class="clearfix"></div>

				<?php } elseif ($value['type'] == "hint") { ?>
				
					<div class="hint"><p class="big-size"><?php echo esc_html( $value['desc'] ); ?><p></div>
					
				<?php } ?>

			<?php } //end foreach ($fr_options as $value) ?>
				
							</div> <!-- end control-panel-inside div -->
						</div> <!-- end control-panel-inside-wrap div -->
					</div> <!-- end control-panel div -->
				</div> <!-- end control-panel-wrapper div -->
				
				<div id="save_block">
					<?php wp_nonce_field( 'c_p_nonce' ); ?>
					<input name="save" type="submit" value="<?php esc_html_e( 'Save settings', 'mntn' ); ?>" class="save_settings" />
					<input type="hidden" name="action" value="save_c_p" />
				
					<input type="button" value="Reset to default" class="defaults-button" alt="no" /> 
				</div><!-- end save_block div -->
				
			</form>
			 
			<div style="clear: both;"></div>
			<div style="position: relative;">
			<!--Pop-up window-->
				<div class="defaults-hover">
					<?php _e( 'This will return all settings to their default values. <strong>Do you really want cancel all changes?', 'mntn' ); ?></strong>
					<div class="clearfix"></div>
					<form method="post">
						<?php wp_nonce_field( 'c_p_nojs_reset', '_wpnonce_reset' ); ?>
						<input name="reset" type="submit" value="<?php esc_html_e( 'Reset', 'mntn' ); ?>" id="reset_settings" />
						<input type="button" value="<?php esc_html_e( 'No', 'mntn' ); ?>" class="no" alt="no" />
						<input type="hidden" name="action" value="reset" />
					</form>
				</div> 
			</div>

			</div> <!-- end panel-wrap div -->
		</div> <!-- end wrapper div -->
			
		<div id="settings_ajax_saving">
			<img src="<?php echo esc_url( get_template_directory_uri() . '/fragrance_options/images/saver.gif' ); ?>" alt="loading" id="loading" width="100" />
			<span><?php esc_html_e( 'Saving...', 'mntn' ); ?></span>
		</div>
			
	<?php
	}
}
/* --------------------------------------------- */

add_action('wp_ajax_save_c_p', 'c_p_save_callback');
function c_p_save_callback() {
    check_ajax_referer( 'c_p_nonce' );
	c_p_save_data( 'ajax' );

	die();
}

if ( ! function_exists( 'c_p_save_data' ) ){
	function c_p_save_data( $source ){
		global $fr_options;
		
		if ( !current_user_can('switch_themes') )
			die('-1');
		
		$control_panel = basename(__FILE__);
		
		if ( isset($_POST['action']) ) {
			if ( 'save_c_p' == $_POST['action'] ) {
				if ( 'ajax' != $source ) check_admin_referer( 'c_p_nonce' );
				
				foreach ($fr_options as $value) {
					if( isset( $value['id'] ) ) { 
						if( isset( $_POST[ $value['id'] ] ) ) {
							if ( in_array( $value['type'], array('text','textlimit','select','textcolorpopup','checkbox','checkbox2') ) ) 
								update_option( $value['id'], stripslashes( wp_kses_post( $_POST[$value['id']] ) ) );
							elseif ( 'upload' == $value['type'] )
								update_option( $value['id'], stripslashes( esc_url_raw( $_POST[$value['id']] ) ) );
							elseif ( 'textarea' == $value['type'] )
								update_option( $value['id'], stripslashes( $_POST[$value['id']] ) );
							elseif ( in_array( $value['type'], array('checkboxes','different_checkboxes') ) )
								update_option( $value['id'], stripslashes_deep( array_map('wp_kses_post', $_POST[$value['id']]) ) );
						}
						else {
							if ( in_array( $value['type'], array('checkbox','checkbox2') ) ) update_option( $value['id'] , 'false' );
							elseif ( 'different_checkboxes' == $value['type'] ) {
								update_option( $value['id'] , array() );
							}
							else delete_option( $value['id'] );
						}
					}
				}
				
				if ( 'js_disabled' == $source ) header("Location: themes.php?page=$control_panel&saved=true");
				die('1');
				
			} else if( 'reset' == $_POST['action'] ) {
				check_admin_referer( 'c_p_nojs_reset', '_wpnonce_reset' );
				
				foreach ($fr_options as $value) {
					if ( isset($value['id']) ) {
						delete_option( $value['id'] );
						if ( isset($value['std']) ) update_option( $value['id'], $value['std'] );
					}
				}
				
				header("Location: themes.php?page=$control_panel&reset=true");
				die('1');
			}
		}
	}
}
?>