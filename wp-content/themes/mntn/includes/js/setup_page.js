jQuery(document).ready(function() {	
	var $settings_select = jQuery('select#page_template'),
		$settings_block = jQuery('#fragrance_settings');
		$masonry = jQuery('#masonry_blog');
		
	$settings_select.on('change',function(){
		var this_value = jQuery(this).val();
		$settings_block.find('.inside > div').css('display','none');
		
		switch ( this_value ) {
			case 'page-blog.php':
				$settings_block.find('.blog_page').css('display','block')
				break;
			case 'page-blog-masonry.php':
				$settings_block.find('.masonry_blog_page').css('display','block')
				break;
			case 'page-gallery.php':
				$settings_block.find('.gallery_page').css('display','block')
				break;
			case 'page-portfolio.php':
				$settings_block.find('.portfolio_gallery').css('display','block')
				break;
			case 'page-contact.php':
				$settings_block.find('.contact_page').css('display','block')
				break;
			default:
                $settings_block.find('.info').css('display','block');
		}
	});
	
	$settings_select.trigger('change');
});