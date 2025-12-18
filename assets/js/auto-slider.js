/**
 * Product Image Auto Slider
 * Automatically slides through WooCommerce product gallery images
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        // Check if settings are available
        if (typeof piasSettings === 'undefined' || !piasSettings.enableAutoSlide) {
            return;
        }

        let slideInterval = piasSettings.interval || 1000;
        let autoSlideTimer = null;

        /**
         * Start auto sliding for WooCommerce gallery
         */
        function startAutoSlide() {
            // Check if product gallery exists
            const $gallery = $('.woocommerce-product-gallery');

            if ($gallery.length === 0) {
                return;
            }

            // Method 1: FlexSlider (default WooCommerce gallery)
            if ($gallery.find('.flex-control-nav').length > 0) {
                startFlexSliderAutoSlide($gallery);
            }
            // Method 2: Thumbnail-based gallery
            else if ($gallery.find('.woocommerce-product-gallery__image').length > 1) {
                startThumbnailAutoSlide($gallery);
            }
        }

        /**
         * Auto slide for FlexSlider-based galleries
         */
        function startFlexSliderAutoSlide($gallery) {
            const $thumbnails = $gallery.find('.flex-control-nav li');

            if ($thumbnails.length <= 1) {
                return;
            }

            let currentIndex = 0;

            autoSlideTimer = setInterval(function() {
                currentIndex = (currentIndex + 1) % $thumbnails.length;
                $thumbnails.eq(currentIndex).find('a').trigger('click');
            }, slideInterval);

            // Pause on hover
            $gallery.on('mouseenter', function() {
                if (autoSlideTimer) {
                    clearInterval(autoSlideTimer);
                }
            });

            // Resume on mouse leave
            $gallery.on('mouseleave', function() {
                startFlexSliderAutoSlide($gallery);
            });
        }

        /**
         * Auto slide for thumbnail-based galleries
         */
        function startThumbnailAutoSlide($gallery) {
            const $images = $gallery.find('.woocommerce-product-gallery__image');

            if ($images.length <= 1) {
                return;
            }

            let currentIndex = 0;

            autoSlideTimer = setInterval(function() {
                // Hide current image
                $images.eq(currentIndex).removeClass('pias-active');

                // Move to next image
                currentIndex = (currentIndex + 1) % $images.length;

                // Show next image
                $images.eq(currentIndex).addClass('pias-active');
            }, slideInterval);

            // Set first image as active
            $images.eq(0).addClass('pias-active');

            // Pause on hover
            $gallery.on('mouseenter', function() {
                if (autoSlideTimer) {
                    clearInterval(autoSlideTimer);
                }
            });

            // Resume on mouse leave
            $gallery.on('mouseleave', function() {
                startThumbnailAutoSlide($gallery);
            });
        }

        /**
         * Handle WooCommerce's image gallery initialization
         * WooCommerce initializes the gallery after page load
         */
        let initAttempts = 0;
        const maxAttempts = 10;

        function tryInitAutoSlide() {
            const $gallery = $('.woocommerce-product-gallery');

            if ($gallery.length > 0 && $gallery.find('.woocommerce-product-gallery__image').length > 0) {
                // Gallery is ready, start auto slide
                startAutoSlide();
            } else if (initAttempts < maxAttempts) {
                // Try again after a short delay
                initAttempts++;
                setTimeout(tryInitAutoSlide, 200);
            }
        }

        // Start initialization attempts
        tryInitAutoSlide();

        // Also listen for WooCommerce gallery initialization event
        $(document.body).on('wc-product-gallery-after-init', function() {
            startAutoSlide();
        });
    });

})(jQuery);
