<?php
/**
 * Plugin Name: Product Image Auto Slider
 * Plugin URI: https://github.com/arirarif/product-image-slide
 * Description: Automatically slides WooCommerce product gallery images on single product pages.
 * Version: 1.0.0
 * Author: AriRarif
 * Author URI: https://github.com/arirarif
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: product-image-auto-slider
 * Requires at least: 5.0
 * Requires PHP: 7.0
 * WC requires at least: 3.0
 * WC tested up to: 8.0
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('PIAS_VERSION', '1.0.0');
define('PIAS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('PIAS_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main Plugin Class
 */
class Product_Image_Auto_Slider {

    /**
     * Constructor
     */
    public function __construct() {
        // Check if WooCommerce is active
        add_action('plugins_loaded', array($this, 'check_woocommerce'));

        // Enqueue scripts and styles
        add_action('wp_enqueue_scripts', array($this, 'enqueue_assets'));
    }

    /**
     * Check if WooCommerce is active
     */
    public function check_woocommerce() {
        if (!class_exists('WooCommerce')) {
            add_action('admin_notices', array($this, 'woocommerce_missing_notice'));
            return;
        }
    }

    /**
     * WooCommerce missing notice
     */
    public function woocommerce_missing_notice() {
        ?>
        <div class="notice notice-error">
            <p><?php _e('Product Image Auto Slider requires WooCommerce to be installed and active.', 'product-image-auto-slider'); ?></p>
        </div>
        <?php
    }

    /**
     * Enqueue scripts and styles
     */
    public function enqueue_assets() {
        // Only load on single product pages
        if (!is_product()) {
            return;
        }

        // Enqueue JavaScript
        wp_enqueue_script(
            'pias-auto-slider',
            PIAS_PLUGIN_URL . 'assets/js/auto-slider.js',
            array('jquery'),
            PIAS_VERSION,
            true
        );

        // Pass settings to JavaScript
        wp_localize_script('pias-auto-slider', 'piasSettings', array(
            'interval' => apply_filters('pias_slide_interval', 1000), // 1 second default
            'enableAutoSlide' => apply_filters('pias_enable_auto_slide', true)
        ));

        // Enqueue CSS
        wp_enqueue_style(
            'pias-auto-slider',
            PIAS_PLUGIN_URL . 'assets/css/auto-slider.css',
            array(),
            PIAS_VERSION
        );
    }
}

// Initialize the plugin
new Product_Image_Auto_Slider();
