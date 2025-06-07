document.addEventListener('DOMContentLoaded', () => {
    const minInput = document.getElementById('minValue');
    const maxInput = document.getElementById('maxValue');
    const physical = document.getElementById('physicalValue');
    const physicalDisplay = document.getElementById('physicalDisplay');
    const linearityInput = document.getElementById('linearity');
    const linearityDisplay = document.getElementById('linearityDisplay');
    const mAOutput = document.getElementById('mAOutput');
    const progressBar = document.getElementById('progressBar');
    const canvas = document.getElementById('curve');
    const ctx = canvas.getContext('2d');
    progressBar.max = 16;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function computeCurrent(value, min, max, lin) {
        const span = max - min;
        if (span <= 0) {
            return 4;
        }
        const ratio = (value - min) / span;
        return 4 + Math.pow(ratio, lin) * 16;
    }

    function drawCurve(min, max, lin) {
        const span = max - min;
        if (span <= 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        for (let i = 0; i <= 100; i++) {
            const val = min + (i / 100) * span;
            const mA = computeCurrent(val, min, max, lin);
            const x = (val - min) / span * canvas.width;
            const y = canvas.height - (mA - 4) / 16 * canvas.height;
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.strokeStyle = '#2c3e50';
        ctx.stroke();
    }

    function update() {
        const min = parseFloat(minInput.value);
        const max = parseFloat(maxInput.value);
        const lin = parseFloat(linearityInput.value);
        linearityDisplay.textContent = lin.toFixed(1);

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

        const mA = computeCurrent(value, min, max, lin);
        mAOutput.textContent = mA.toFixed(2) + ' mA';
        progressBar.value = mA - 4;

        drawCurve(min, max, lin);
    }

    minInput.addEventListener('input', update);
    maxInput.addEventListener('input', update);
    physical.addEventListener('input', update);
    linearityInput.addEventListener('input', update);

    update();
});
