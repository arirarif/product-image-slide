<?php
/**
 * Simple tests for Product Image Auto Slider plugin
 */

use PHPUnit\Framework\TestCase;

class PluginTest extends TestCase {

    protected $plugin;

    public function setUp(): void {
        parent::setUp();

        // Load the plugin file
        require_once dirname(dirname(__DIR__)) . '/product-image-auto-slider.php';
        $this->plugin = new Product_Image_Auto_Slider();
    }

    /**
     * Test that plugin class exists
     */
    public function test_plugin_class_exists() {
        $this->assertTrue(
            class_exists('Product_Image_Auto_Slider'),
            'Product_Image_Auto_Slider class should exist'
        );
    }

    /**
     * Test that plugin instance can be created
     */
    public function test_plugin_instantiation() {
        $this->assertInstanceOf(
            'Product_Image_Auto_Slider',
            $this->plugin,
            'Should create an instance of Product_Image_Auto_Slider'
        );
    }

    /**
     * Test that required methods exist
     */
    public function test_required_methods_exist() {
        $this->assertTrue(
            method_exists($this->plugin, 'check_woocommerce'),
            'check_woocommerce method should exist'
        );

        $this->assertTrue(
            method_exists($this->plugin, 'enqueue_assets'),
            'enqueue_assets method should exist'
        );

        $this->assertTrue(
            method_exists($this->plugin, 'woocommerce_missing_notice'),
            'woocommerce_missing_notice method should exist'
        );
    }

    /**
     * Test that constants are defined
     */
    public function test_constants_defined() {
        $this->assertTrue(
            defined('PIAS_VERSION'),
            'PIAS_VERSION constant should be defined'
        );

        $this->assertTrue(
            defined('PIAS_PLUGIN_DIR'),
            'PIAS_PLUGIN_DIR constant should be defined'
        );

        $this->assertTrue(
            defined('PIAS_PLUGIN_URL'),
            'PIAS_PLUGIN_URL constant should be defined'
        );
    }

    /**
     * Test plugin version
     */
    public function test_plugin_version() {
        $this->assertEquals(
            '1.0.0',
            PIAS_VERSION,
            'Plugin version should be 1.0.0'
        );
    }
}
