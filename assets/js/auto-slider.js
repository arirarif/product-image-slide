/**
 * Product Image Auto Slider - Simple version for Woodmart
 */

(function($) {
    'use strict';

    $(window).on('load', function() {
        if (typeof piasSettings === 'undefined' || !piasSettings.enableAutoSlide) {
            return;
        }

        const interval = piasSettings.interval || 1000;
        let currentIndex = 0;
        let isPaused = false;

        // Wait a bit for gallery to fully load
        setTimeout(function() {
            // Find thumbnails - try multiple selectors for different themes
            let $thumbs = $('.woocommerce-product-gallery ol.flex-control-thumbs li img');

            if ($thumbs.length === 0) {
                $thumbs = $('.product-images .product-image-gallery img');
            }

            if ($thumbs.length === 0) {
                $thumbs = $('.woocommerce-product-gallery__wrapper .woocommerce-product-gallery__image img');
            }

            if ($thumbs.length <= 1) {
                return;
            }

            // Start auto sliding
            setInterval(function() {
                if (!isPaused) {
                    currentIndex = (currentIndex + 1) % $thumbs.length;
                    $thumbs.eq(currentIndex).trigger('click');
                }
            }, interval);

            // Pause on hover
            $('.woocommerce-product-gallery, .product-images').hover(
                function() { isPaused = true; },
                function() { isPaused = false; }
            );
        }, 1000);
    });

})(jQuery);
