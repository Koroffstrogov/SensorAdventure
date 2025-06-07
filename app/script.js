document.addEventListener('DOMContentLoaded', () => {
    const minInput = document.getElementById('minValue');
    const maxInput = document.getElementById('maxValue');
    const physical = document.getElementById('physicalValue');
    const physicalDisplay = document.getElementById('physicalDisplay');
    const mAOutput = document.getElementById('mAOutput');
    const progressBar = document.getElementById('progressBar');
    progressBar.max = 16;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function update() {
        const min = parseFloat(minInput.value);
        const max = parseFloat(maxInput.value);

        // synchronize slider range with numeric inputs
        physical.min = minInput.value;
        physical.max = maxInput.value;

        // clamp current value to new range
        let value = parseFloat(physical.value);
        if (!Number.isNaN(value)) {
            value = clamp(value, min, max);
            physical.value = value;
        } else {
            value = min;
            physical.value = min;
        }

        physicalDisplay.textContent = value;

        const span = max - min;
        let mA = 4;
        if (span > 0) {
            const ratio = (value - min) / span;
            mA = 4 + ratio * 16;
        }
        mAOutput.textContent = mA.toFixed(2) + ' mA';
        progressBar.value = mA - 4;
    }

    minInput.addEventListener('input', update);
    maxInput.addEventListener('input', update);
    physical.addEventListener('input', update);

    update();
});
