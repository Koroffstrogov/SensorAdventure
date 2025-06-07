document.addEventListener('DOMContentLoaded', () => {
    const minInput = document.getElementById('minValue');
    const maxInput = document.getElementById('maxValue');
    const physical = document.getElementById('physicalValue');
    const physicalDisplay = document.getElementById('physicalDisplay');
    const mAOutput = document.getElementById('mAOutput');
    const progressBar = document.getElementById('progressBar');

    function update() {
        const min = parseFloat(minInput.value);
        const max = parseFloat(maxInput.value);
        const value = parseFloat(physical.value);

        physicalDisplay.textContent = value;

        const span = max - min;
        let mA = 4;
        if (span > 0) {
            const clamped = Math.min(Math.max(value, min), max);
            const ratio = (clamped - min) / span;
            mA = 4 + ratio * 16;
        }
        mAOutput.textContent = mA.toFixed(2) + ' mA';
        progressBar.value = mA;
    }

    minInput.addEventListener('input', update);
    maxInput.addEventListener('input', update);
    physical.addEventListener('input', update);

    update();
});
