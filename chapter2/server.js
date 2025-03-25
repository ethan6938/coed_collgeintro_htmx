import express from 'express';

const app = express();

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/calculate', (req, res) => {
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);
    const bmi = weight / (height * height);
    const roundedBmi = bmi.toFixed(2);

    let category = '';
    let tagClass = '';
    let emoji = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        tagClass = 'underweight';
        emoji = '🥶';
    } else if (bmi < 24.9) {
        category = 'Normal';
        tagClass = 'normal';
        emoji = '💪';
    } else if (bmi < 29.9) {
        category = 'Overweight';
        tagClass = 'overweight';
        emoji = '🍔';
    } else {
        category = 'Obese';
        tagClass = 'obese';
        emoji = '⚠️';
    }

    res.send(`
        <div class="show">
            <p>Your BMI is <strong>${roundedBmi}</strong> ${emoji}</p>
            <div class="bmi-badge ${tagClass}">${category}</div>
        </div>
    `);
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});