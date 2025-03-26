import express from 'express';
import escapeHtml from 'escape-html';

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/email', (req, res) => {
  const submittedEmail = escapeHtml(req.body.email || '');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValid = emailRegex.test(submittedEmail);

  const alert = isValid
    ? `<div class="fade-in neon-valid p-2 mt-2 rounded">
         <i class="bi bi-check-circle me-1"></i> That email is <strong>valid</strong>.
       </div>`
    : `<div class="fade-in neon-invalid p-2 mt-2 rounded">
         <i class="bi bi-exclamation-octagon me-1"></i> Please enter a <strong>valid</strong> email.
       </div>`;

  res.send(`
    <div class="mb-3" hx-post="/email" hx-trigger="keyup changed delay:400ms" hx-target="this" hx-swap="outerHTML">
      <label class="form-label">Email address</label>
      <input
        type="email"
        class="form-control"
        name="email"
        value="${submittedEmail}"
        placeholder="neon@example.com"
      >
      ${alert}
    </div>
  `);
});

app.listen(3000, () => {
  console.log('⚡ Neon server running at http://localhost:3000');
});
