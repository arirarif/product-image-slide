/**
 * Product Image Auto Slider
 * Automatically slides through WooCommerce product gallery images
 */

(function($) {
    'use strict';

    let autoSlideTimer = null;
    let currentIndex = 0;
    let isHovering = false;

    function startAutoSlide() {
        if (typeof piasSettings === 'undefined' || !piasSettings.enableAutoSlide) {
            return;
        }

        const slideInterval = piasSettings.interval || 1000;

        // Find gallery thumbnails (WooCommerce standard structure)
        const $thumbnails = $('.woocommerce-product-gallery__wrapper .woocommerce-product-gallery__trigger').parent().find('.woocommerce-product-gallery__image a');

        if ($thumbnails.length <= 1) {
            return;
        }

        // Clear any existing timer
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
        }

        // Start sliding
        autoSlideTimer = setInterval(function() {
            if (!isHovering) {
                currentIndex = (currentIndex + 1) % $thumbnails.length;
                $thumbnails.eq(currentIndex).trigger('click');
            }
        }, slideInterval);

        // Pause on hover
        $('.woocommerce-product-gallery').on('mouseenter', function() {
            isHovering = true;
        }).on('mouseleave', function() {
            isHovering = false;
        });
    }

    // Wait for WooCommerce gallery to initialize
    $(document).ready(function() {
        // Try multiple methods to catch gallery initialization

        // Method 1: Wait for WooCommerce event
        $(document.body).on('wc-product-gallery-after-init', function() {
            setTimeout(startAutoSlide, 500);
        });

        // Method 2: Poll for gallery readiness
        let attempts = 0;
        const maxAttempts = 20;

        function checkGallery() {
            const $gallery = $('.woocommerce-product-gallery__image');

            if ($gallery.length > 1) {
                startAutoSlide();
            } else if (attempts < maxAttempts) {
                attempts++;
                setTimeout(checkGallery, 200);
            }
        }

        setTimeout(checkGallery, 500);
    });

})(jQuery);
