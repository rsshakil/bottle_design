<?php
/*
Plugin Name: Fragrance Theme Extensions
Plugin URI: 
Description: Custom functions for Fragrance Themes
Version: 1.0.0
Author: Fragrance
Author URI: fragrancetheme.com
*/

 
add_action('init','inc_shortcodes');
	function inc_shortcodes(){
		require_once('shortcodes/shortcodes.php');
}

function fr_my_gallery_shortcode($attr) {
    $post = get_post();

static $instance = 0;
$instance++;

if ( ! empty( $attr['ids'] ) ) {
    // 'ids' is explicitly ordered, unless you specify otherwise.
    if ( empty( $attr['orderby'] ) )
        $attr['orderby'] = 'post__in';
    $attr['include'] = $attr['ids'];
}


// Custom Gallery Output
// Allow plugins/themes to override the default gallery template.
$output = apply_filters('post_gallery', '', $attr);
if ( $output != '' )
    return $output;

// We're trusting author input, so let's at least make sure it looks like a valid orderby statement
if ( isset( $attr['orderby'] ) ) {
    $attr['orderby'] = sanitize_sql_orderby( $attr['orderby'] );
    if ( !$attr['orderby'] )
        unset( $attr['orderby'] );
}

extract(shortcode_atts(array(
    'order'      => 'ASC',
    'orderby'    => 'menu_order ID',
    'id'         => $post->ID,
    'itemtag'    => 'li',
    'icontag'    => '',
    'columns'    => 3,
    'size'       => 'blog-thumb',
    'include'    => '',
    'exclude'    => ''
), $attr));

$id = intval($id);
if ( 'RAND' == $order )
    $orderby = 'none';

if ( !empty($include) ) {
    $_attachments = get_posts( array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );

    $attachments = array();
    foreach ( $_attachments as $key => $val ) {
        $attachments[$val->ID] = $_attachments[$key];
    }
} elseif ( !empty($exclude) ) {
    $attachments = get_children( array('post_parent' => $id, 'exclude' => $exclude, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
} else {
    $attachments = get_children( array('post_parent' => $id, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby) );
}

if ( empty($attachments) )
    return '';

if ( is_feed() ) {
    $output = "\n";
    foreach ( $attachments as $att_id => $attachment )
        $output .= wp_get_attachment_link($att_id, $size, true) . "\n";
    return $output;
}

$itemtag = tag_escape($itemtag);
$icontag = tag_escape($icontag);

$columns = intval($columns);
$itemwidth = $columns > 0 ? floor(100/$columns) : 100;
$float = is_rtl() ? 'right' : 'left';

$selector = "gallery-{$instance}";

$gallery_style = $gallery_div = '';
if ( apply_filters( 'use_default_gallery_style', true ) )
$size_class = sanitize_html_class( $size );
$gallery_div = "<div class='featured_box'><div id='$selector' class='gallery galleryid-{$id} post_gallery_slider flexslider'><ul class='slides'>";
$output = apply_filters( 'gallery_style', $gallery_style . "\n\t\t" . $gallery_div );

$i = 0;
foreach ( $attachments as $id => $attachment ) {
    $link = isset($attr['link']) && 'file' == $attr['link'] ? wp_get_attachment_link($id, $size, false, false) : wp_get_attachment_link($id, $size, true, false);
    $link = str_replace('<a', '<a rel="lightbox" href=' .wp_get_attachment_url( $attachment->ID ). '',$link);

    $output .= "<{$itemtag}>";
    $output .=  $link;
    $output .= "</{$itemtag}>";
}
$output .= "</ul></div></div>\n";

return $output;
}
// Custom Gallery Output
add_shortcode('gallery', 'fr_my_gallery_shortcode'); 
?>