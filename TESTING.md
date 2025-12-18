# Testing Guide

Simple guide to run tests for the Product Image Auto Slider plugin.

## PHP Tests (PHPUnit)

### Installation
```bash
composer install
```

### Run Tests
```bash
# Run all PHP tests
composer test

# Or use phpunit directly
./vendor/bin/phpunit
```

### What's Tested
- Plugin class exists
- Plugin can be instantiated
- Required methods exist
- Constants are defined correctly
- Plugin version is correct

## JavaScript Tests (Jest)

### Installation
```bash
npm install
```

### Run Tests
```bash
# Run all JS tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

### What's Tested
- Settings object configuration
- Timer functionality
- Interval behavior

## Quick Test

If you don't want to install dependencies, you can do a quick manual test:

1. Upload plugin to WordPress
2. Activate the plugin
3. Visit any WooCommerce product page with multiple images
4. Images should auto-slide every 1 second
5. Hover over images - sliding should pause
6. Move mouse away - sliding should resume

## Test Checklist

- [ ] Plugin activates without errors
- [ ] No PHP warnings/errors in logs
- [ ] Images slide automatically on product pages
- [ ] Sliding pauses on hover
- [ ] Sliding resumes when hover ends
- [ ] Works on different browsers
- [ ] Works on mobile devices

## Troubleshooting

**Tests fail to run?**
- Make sure you ran `composer install` or `npm install`
- Check PHP version (needs 7.0+)
- Check Node.js version (needs 14+)

**Plugin doesn't work in WordPress?**
- Make sure WooCommerce is installed and active
- Check browser console for JavaScript errors
- Verify product has multiple gallery images
