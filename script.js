// theme toggle + localStorage (applies across pages)
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function applyTheme(theme){
  html.setAttribute('data-theme', theme);
  themeToggle && (themeToggle.textContent = theme === 'dark' ? '🌗' : '🌞');
  localStorage.setItem('site-theme', theme);
}

const saved = localStorage.getItem('site-theme');
if (saved) applyTheme(saved);
else applyTheme('dark');

themeToggle && themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Contact mail fallback (mail client)
const contactForm = document.getElementById('contactForm');
const mailtoBtn = document.getElementById('mailtoBtn');

if (mailtoBtn) {
  mailtoBtn.addEventListener('click', () => {
    const form = contactForm;
    const name = form.querySelector('input[name="name"]').value || 'No name';
    const email = form.querySelector('input[name="email"]').value || 'no-reply@example.com';
    const message = form.querySelector('textarea[name="message"]').value || '(no message)';
    const subject = encodeURIComponent(`Contact from site — ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
  });
}

// On submit: if Formspree placeholder still present, open mail client instead
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const action = contactForm.getAttribute('action') || '';
    if (action.includes('YOUR_ID_HERE')) {
      e.preventDefault();
      const ok = confirm('Formspree ID not set. Open your mail client to send the message?');
      if (ok) {
        document.getElementById('mailtoBtn').click();
      }
    } else {
      // allow submit to Formspree or any configured endpoint.
      // Optional: you can show a "Sending..." UI here.
    }
  });
}
