<?php
/**
 * My Account Dashboard
 *
 * Shows the first intro screen on the account dashboard.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/dashboard.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce/Templates
 * @version     2.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>

<p><?php
	/* translators: 1: user display name 2: logout url */
	printf(
		__( 'ようこそ %1$s (様ではない場合はログアウトしてください %1$s? <a href="%2$s">Log out</a>)', 'woocommerce' ),
		'<strong>' . esc_html( $current_user->display_name ) . '様</strong>',
		esc_url( wc_logout_url( wc_get_page_permalink( 'myaccount' ) ) )
	);
?></p>
<div class="clearfix"></div>
<div class="row list-design-saved" id="wpajaxdisplay">

</div>
<div class="clearfix"></div>
<!--<p><?php
	printf(
		__( 'From your account dashboard you can view your <a href="%1$s">recent orders</a>, manage your <a href="%2$s">shipping and billing addresses</a>, and <a href="%3$s">edit your password and account details</a>.', 'woocommerce' ),
		esc_url( wc_get_endpoint_url( 'orders' ) ),
		esc_url( wc_get_endpoint_url( 'edit-address' ) ),
		esc_url( wc_get_endpoint_url( 'edit-account' ) )
	);
?></p>-->

<script type="text/javascript" >
jQuery(document).ready(function($) {
		var page = 0;
		var datas = {};
		datas.page=page;
		var data = {
            url: '<?php echo esc_url( home_url() ).'/design-your-own/'; ?>',
            design_url: '<?php echo esc_url( home_url() ).'/design-your-own/'; ?>',
            img_url: '<?php echo esc_url( home_url() ).'/tshirtecommerce/'; ?>',
            datas: datas
        };
        $.post('<?php echo esc_url( home_url() ); ?>/tshirtecommerce/ajax.php?type=userDesign_myaccount', data, function(response) {
           // alert('Got this from the server: ' + response);
           $('#wpajaxdisplay').html(response);      
        });
});

</script>
<style>
.list-design-saved .design-box {
    height: 200px;
    overflow: hidden;
	float:left;
	width:310px;
}
.design-action-remove {
    display: none;
}
.design-box {
    padding: 4px;
    position: relative;
}
.list-design-saved .design-box a {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background-color: #f1f1f1;
    text-align: center;
    border: 1px solid #ddd;
    border-radius: 3px;
}
.design-action.design-action-remove {
    background-color: #f1f1f1;
    border: 1px solid #ccc;
    border-radius: 4px 0 0;
    height: 22px;
    padding-left: 2px;
    top: 4px;
    width: 20px;
    left: 4px;
}

.design-box .design-action {
    cursor: pointer;
    position: absolute;
}
.list-design-saved .design-box a img.img-responsive.img-thumbnail {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;
    border: 0;
    margin: 0;
    padding: 0;
    border-radius: 0;
}
</style>

<?php
	/**
	 * My Account dashboard.
	 *
	 * @since 2.6.0
	 */
	do_action( 'woocommerce_account_dashboard' );

	/**
	 * Deprecated woocommerce_before_my_account action.
	 *
	 * @deprecated 2.6.0
	 */
	do_action( 'woocommerce_before_my_account' );

	/**
	 * Deprecated woocommerce_after_my_account action.
	 *
	 * @deprecated 2.6.0
	 */
	do_action( 'woocommerce_after_my_account' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */
