<?php

add_action( 'admin_enqueue_scripts', 'meta_page' );
function meta_page( $hook_suffix ) {
	if ( in_array($hook_suffix, array('post.php','post-new.php')) ) {
		wp_enqueue_script('setup_page', get_template_directory_uri().'/includes/js/setup_page.js', array('jquery'), true);
	}
}

add_action("admin_init", "fragrance_meta");
function fragrance_meta(){
	global $fr_themename;
	add_meta_box("fragrance_settings", "Page Setup", "fragrance_settings", "page", "side");
}

if ( ! function_exists( 'fragrance_settings' ) ){
	function fragrance_settings($callback_args) {
		global $post, $fr_themename;
		$temp_array = array();

		$temp_array = maybe_unserialize(get_post_meta($post->ID,'fragrance_page_setup',true));
		
		$fragrance_fullwidth_page = isset( $temp_array['fragrance_fullwidth_page'] ) ? (bool) $temp_array['fragrance_fullwidth_page'] : false;
		
		$fragrance_blog_type = isset( $temp_array['fragrance_blog_type'] ) ? (int) $temp_array['fragrance_blog_type'] : 1;
		$fragrance_blog_categories = isset( $temp_array['fragrance_blog_categories'] ) ? (array) $temp_array['fragrance_blog_categories'] : array();
		$fragrance_blog_posts_num = isset( $temp_array['fragrance_blog_posts_num'] ) ? (int) $temp_array['fragrance_blog_posts_num'] : 5;
		
		$fragrance_images_categories = isset( $temp_array['fragrance_images_categories'] ) ? (array) $temp_array['fragrance_images_categories'] : array();
		$fragrance_images_posts_num = isset( $temp_array['fragrance_images_posts_num'] ) ? (int) $temp_array['fragrance_images_posts_num'] : 5;
		
		$fragrance_email_admin = isset( $temp_array['fragrance_email_admin'] ) ? esc_attr( $temp_array['fragrance_email_admin'] ) : '';
		$fragrance_map_coord_lat = isset( $temp_array['fragrance_map_coord_lat'] ) ? esc_attr( $temp_array['fragrance_map_coord_lat'] ) : '';
		$fragrance_map_coord_lng = isset( $temp_array['fragrance_map_coord_lng'] ) ? esc_attr( $temp_array['fragrance_map_coord_lng'] ) : '';
		
		?>
		
		<?php wp_nonce_field( 'fragrance_page_nonce', '_wpnonce_save' ); ?>
		
		<!-- Blog Settings -->	
		<div style="margin: 10px 0 10px 5px; display: none;" class="blog_page portfolio_gallery contact_page ">
			<label class="selectit" for="fragrance_fullwidth_page">
				<input type="checkbox" name="fragrance_fullwidth_page" id="fragrance_fullwidth_page" value=""<?php checked( $fragrance_fullwidth_page ); ?> /> <?php esc_html_e( 'Set the fullwidth page', 'mntn' ); ?></label><br/>
		</div>
		
		<div style="margin: 13px 0 11px 4px; display: none;" class="blog_page">
			<label for="fragrance_blog_posts_num" style="font-weight: bold;"> <?php echo 'Number of posts per page' ; ?> </label>
			<input type="text" class="small-text" value="<?php echo esc_attr( $fragrance_blog_posts_num ); ?>" id="fragrance_blog_posts_num" name="fragrance_blog_posts_num" size="2" />
		</div>
		
		<div style="margin: 10px 0 10px 5px; display: none;" class="blog_page">
			<h4><?php echo 'Choose a blog categories'; ?></h4>
			<?php $categories_array = get_categories('hide_empty=0');
			$site_cats = array();
			foreach ($categories_array as $categs) {
				$checked = '';
				
				if (!empty($fragrance_blog_categories)) {
					if (in_array($categs->cat_ID, $fragrance_blog_categories)) $checked = "checked=\"checked\"";
				} ?>
				
				<label style="padding-bottom: 5px; display: block;" for="<?php echo esc_attr( 'fragrance_blog_categories-' . $categs->cat_ID ); ?>">
					<input type="checkbox" name="fragrance_blog_categories[]" id="<?php echo esc_attr( 'fragrance_blog_categories-' . $categs->cat_ID ); ?>" value="<?php echo esc_attr($categs->cat_ID); ?>" <?php echo $checked; ?> />
					<?php echo esc_html( $categs->cat_name ); ?>
				</label>							
			<?php } ?>
		</div>
		<!-- Blog Settings -->
		
		<!-- Masonry Blog Settings -->
		<div style="margin: 13px 0 11px 4px; display: none;" class="masonry_blog_page">
			<label for="fragrance_blog_posts_num" style="font-weight: bold;"> <?php echo 'Number of posts per page' ; ?> </label>
			<input type="text" class="small-text" value="<?php echo esc_attr( $fragrance_blog_posts_num ); ?>" id="fragrance_blog_posts_num" name="fragrance_blog_posts_num" size="2" />
		</div>
		
		<div style="margin: 10px 0 10px 5px; display: none;" class="masonry_blog_page">
			<h4><?php echo 'Choose a blog categories'; ?></h4>
			<?php $categories_array = get_categories('hide_empty=0');
			$site_cats = array();
			foreach ($categories_array as $categs) {
				$checked = '';
				
				if (!empty($fragrance_blog_categories)) {
					if (in_array($categs->cat_ID, $fragrance_blog_categories)) $checked = "checked=\"checked\"";
				} ?>
				
				<label style="padding-bottom: 5px; display: block;" for="<?php echo esc_attr( 'fragrance_blog_categories-' . $categs->cat_ID ); ?>">
					<input type="checkbox" name="fragrance_blog_categories[]" id="<?php echo esc_attr( 'fragrance_blog_categories-' . $categs->cat_ID ); ?>" value="<?php echo esc_attr($categs->cat_ID); ?>" <?php echo $checked; ?> />
					<?php echo esc_html( $categs->cat_name ); ?>
				</label>							
			<?php } ?>
		</div>
		<!-- Masonry Blog Settings -->
		
		<!-- Portfolio/Gallery Settings -->
		
		<div style="margin: 13px 0 11px 4px; display: none;" class="portfolio_gallery gallery_page">
			<label for="fragrance_images_posts_num" style="font-weight: bold;"> <?php echo 'Number of posts per page' ; ?> </label>
			<input type="text" class="small-text" value="<?php echo esc_attr( $fragrance_images_posts_num ); ?>" id="fragrance_images_posts_num" name="fragrance_images_posts_num" size="2" />
		</div>
		
		<div style="margin: 13px 0 11px 4px; display: none;" class="portfolio_gallery gallery_page">
			<h4><?php echo 'Choose page categories'; ?></h4>
					
			<?php $cats_array = get_categories('hide_empty=0');
			$site_cats = array();
			foreach ($cats_array as $categs) {
				$checked = '';
				
				if (!empty($fragrance_images_categories)) {
					if (in_array($categs->cat_ID, $fragrance_images_categories)) $checked = "checked=\"checked\"";
				} ?>
				
				<label style="padding-bottom: 5px; display: block;" for="<?php echo 'fragrance_images_categories-',$categs->cat_ID; ?>">
					<input type="checkbox" name="fragrance_images_categories[]" id="<?php echo esc_attr( 'fragrance_images_categories-' . $categs->cat_ID ); ?>" value="<?php echo esc_attr( $categs->cat_ID ); ?>" <?php echo $checked; ?> />
					<?php echo esc_html( $categs->cat_name ); ?>
				</label>							
			<?php } ?>
		</div>
		
		<!-- Portfolio/Gallery Settings -->
		
		<!-- Contact Settings -->
		
		<div style="margin: 13px 0 11px 4px; display: none;" class="contact_page">
			<label for="fragrance_email_admin"><strong><?php esc_html_e( 'Email To:', 'mntn' ); ?></strong></label>
			<input type="text" value="<?php echo esc_attr( $fragrance_email_admin ); ?>" id="fragrance_email_admin" name="fragrance_email_admin" size="20" />
		</div>
		
		<div style="margin: 13px 0 11px 4px; display: none;" class="contact_page">
			<h4><?php echo 'Set map coordinates'; ?></h4>
			<label for="fragrance_map_coord_lat"><strong><?php esc_html_e( 'Set latitude:', 'mntn' ); ?></strong></label>
			<input type="text" value="<?php echo esc_attr( $fragrance_map_coord_lat ); ?>" id="fragrance_map_coord_lat" name="fragrance_map_coord_lat" size="20" />
		</div>
		
		<div style="margin: 13px 0 11px 4px; display: none;" class="contact_page">
			<label for="fragrance_map_coord_lng"><strong><?php esc_html_e( 'Set longitude:', 'mntn' ); ?></strong></label>
			<input type="text" value="<?php echo esc_attr( $fragrance_map_coord_lng ); ?>" id="fragrance_map_coord_lng" name="fragrance_map_coord_lng" size="20" />
		</div>
		
		<!-- Contact Settings -->
<?php }
}

add_action( 'save_post', 'fragrance_save_data', 10, 2 );
function fragrance_save_data( $post_id, $post ){
	global $pagenow;
	if ( 'post.php' != $pagenow ) return $post_id;

	if ( 'page' != $post->post_type )
		return $post_id;
			
	if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) 
		return $post_id;
		
	if ( 'page' == $_POST['post_type'] ) {  
		if ( !current_user_can( 'edit_page', $post_id ) )  
		  return $post_id;  
	  } else {  
		if ( !current_user_can( 'edit_post', $post_id ) )  
		  return $post_id;  
	  } 
	
	if ( ! isset( $_POST['_wpnonce_save'] ) || ! wp_verify_nonce( $_POST['_wpnonce_save'], 'fragrance_page_nonce' ) )
        return $post_id;

	if ( !isset( $_POST["page_template"] ) )
		return $post_id;
		
	if ( !in_array( $_POST["page_template"], array('page-blog.php', 'page-blog-masonry.php', 'page-portfolio.php', 'page-gallery.php', 'page-search.php', 'page-contact.php' ) ) )
		return $post_id;
		
	$temp_array = array();
	
	$temp_array['fragrance_fullwidth_page'] = isset( $_POST["fragrance_fullwidth_page"] ) ? 1 : 0;
	
	if ( 'page-blog.php' == $_POST["page_template"] ) {
		if (isset($_POST["fragrance_blog_categories"])) $temp_array['fragrance_blog_categories'] = (array) $_POST["fragrance_blog_categories"];
		if (isset($_POST["fragrance_blog_posts_num"])) $temp_array['fragrance_blog_posts_num'] = (int) $_POST["fragrance_blog_posts_num"];
	}
	
	if ( 'page-blog-masonry.php' == $_POST["page_template"] ) {
		if (isset($_POST["fragrance_blog_categories"])) $temp_array['fragrance_blog_categories'] = (array) $_POST["fragrance_blog_categories"];
		if (isset($_POST["fragrance_blog_posts_num"])) $temp_array['fragrance_blog_posts_num'] = (int) $_POST["fragrance_blog_posts_num"];
	}
	
	if ( 'page-portfolio.php' == $_POST["page_template"] ) {
		if (isset($_POST["fragrance_images_categories"])) $temp_array['fragrance_images_categories'] = (array) $_POST["fragrance_images_categories"];
		if (isset($_POST["fragrance_images_posts_num"])) $temp_array['fragrance_images_posts_num'] = (int) $_POST["fragrance_images_posts_num"];
	}
	
	if ( 'page-gallery.php' == $_POST["page_template"] ) {
		if (isset($_POST["fragrance_images_categories"])) $temp_array['fragrance_images_categories'] = (array) $_POST["fragrance_images_categories"];
		if (isset($_POST["fragrance_images_posts_num"])) $temp_array['fragrance_images_posts_num'] = (int) $_POST["fragrance_images_posts_num"];
	}
	
	if ( 'page-contact.php' == $_POST["page_template"] ) {
		if (isset($_POST["fragrance_email_admin"])) $temp_array['fragrance_email_admin'] = sanitize_email( $_POST["fragrance_email_admin"] );
		if (isset($_POST["fragrance_map_coord_lat"])) $temp_array['fragrance_map_coord_lat'] = $_POST["fragrance_map_coord_lat"];
		if (isset($_POST["fragrance_map_coord_lng"])) $temp_array['fragrance_map_coord_lng'] =  $_POST["fragrance_map_coord_lng"];
	}
	
	update_post_meta( $post_id, "fragrance_page_setup", $temp_array );
	
	}
?>