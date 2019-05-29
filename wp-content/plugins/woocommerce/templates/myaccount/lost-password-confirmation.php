<?php
/**
 * Lost password confirmation text.
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/myaccount/lost-password-confirmation.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.5.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

wc_print_notice( __( 'パスワード再設定メールが送信されました。', 'woocommerce' ) );
?>

<p><?php echo esc_html( apply_filters( 'woocommerce_lost_password_confirmation_message', __( 'アカウント登録のメールアドレスにパスワード再設定のメールが送信されましたが、受信トレイに表示されるまでに数分かかることがあります。', 'woocommerce' ) ) ); ?></p>
