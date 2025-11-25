// theme toggle + localStorage
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme){
  html.setAttribute('data-theme', theme);
  // update icon
  themeToggle.textContent = theme === 'dark' ? '🌗' : '🌞';
  localStorage.setItem('site-theme', theme);
}

const saved = localStorage.getItem('site-theme');
if (saved) applyTheme(saved);
else {
  // default: dark
  applyTheme('dark');
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// contact form fallback: open mail client if formspree not configured
const contactForm = document.getElementById('contactForm');
const mailtoBtn = document.getElementById('mailtoBtn');

mailtoBtn.addEventListener('click', () => {
  // gather fields
  const name = contactForm.querySelector('input[name="name"]').value || 'No name';
  const email = contactForm.querySelector('input[name="email"]').value || 'no-reply@example.com';
  const message = contactForm.querySelector('textarea[name="message"]').value || '(no message)';
  const subject = encodeURIComponent(`Contact from site — ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

  window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
});

// optional: intercept submit and show a tiny confirmation (if Formspree ID not set it will still try)
contactForm.addEventListener('submit', (e) => {
  // If user didn't replace the placeholder Formspree ID, show a short alert and allow fallback
  if (contactForm.getAttribute('action').includes('YOUR_ID_HERE')) {
    e.preventDefault();
    const go = confirm('Formspree ID is not set. Open your mail client to send the message instead?');
    if (go) mailtoBtn.click();
  } else {
    // allow submission to Formspree (or any configured endpoint)
    // optionally you can show a "sending..." UI here
  }
});
