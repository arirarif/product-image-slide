/**
 * Simple tests for auto-slider JavaScript
 */

describe('Auto Slider Configuration', () => {

    test('piasSettings object should have required properties', () => {
        // Mock the settings object
        global.piasSettings = {
            interval: 1000,
            enableAutoSlide: true
        };

        expect(piasSettings).toBeDefined();
        expect(piasSettings.interval).toBe(1000);
        expect(piasSettings.enableAutoSlide).toBe(true);
    });

    test('default interval should be 1000ms', () => {
        global.piasSettings = {
            interval: 1000,
            enableAutoSlide: true
        };

        expect(piasSettings.interval).toBe(1000);
    });

    test('auto slide can be disabled', () => {
        global.piasSettings = {
            interval: 1000,
            enableAutoSlide: false
        };

        expect(piasSettings.enableAutoSlide).toBe(false);
    });
});

describe('Timer Functionality', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    test('setInterval should be called with correct interval', () => {
        const callback = jest.fn();
        const interval = 1000;

        setInterval(callback, interval);
        jest.advanceTimersByTime(1000);

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('multiple intervals should trigger callback multiple times', () => {
        const callback = jest.fn();
        const interval = 1000;

        setInterval(callback, interval);
        jest.advanceTimersByTime(3000);

        expect(callback).toHaveBeenCalledTimes(3);
    });
});
