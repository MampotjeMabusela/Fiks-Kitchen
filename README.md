# Fiks Kitchen — Website

A premium African catering marketing website built with vanilla HTML, CSS, and JavaScript.

## Quick Start

1. Open `index.html` in your browser, or serve locally:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

2. Visit `http://localhost:8080`

## Contact Form (WhatsApp)

The contact form sends enquiries directly to WhatsApp — no backend or EmailJS required.

When a visitor submits the form, their details are formatted into a message and WhatsApp opens with everything pre-filled. They tap **Send** to deliver the enquiry to **+27 83 558 7660**.

The WhatsApp number is configured in `script.js`:

```javascript
const WHATSAPP_NUMBER = '27835587660';
```

To change the number, update this constant and the `wa.me` links in `index.html`.

## WhatsApp Links

- Floating WhatsApp button: `https://wa.me/27835587660`
- Contact section CTA: same number with pre-filled message
- Form submit: opens WhatsApp with full enquiry details

The display number is **+27 83 558 7660** (`27835587660` in `wa.me` links — no spaces or `+`).

## File Structure

```
fiks-kitchen/
├── index.html    — Full website (HTML + inline SVGs)
├── style.css     — All styles and design tokens
├── script.js     — Navigation, tabs, form, animations
└── README.md     — This file
```

## Customisation

- **Colors & fonts:** Edit CSS custom properties in `:root` at the top of `style.css`.
- **Menu dishes:** Update dish cards in the `#menu` section of `index.html`.
- **Contact details:** Update phone, email, and location in the `#contact` section.

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). Uses CSS Grid, Flexbox, IntersectionObserver, and smooth scroll.

---

*Built with love for Fiks Kitchen — where every event gets the Fiks Touch.*
