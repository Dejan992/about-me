# Dejan Rajkovic - Portfolio

A modern, responsive portfolio website showcasing Senior MLOps Engineer expertise.

## Features

- **Modern Design**: Clean, dark theme with a green accent (`#008000`) and smooth animations
- **Fully Responsive**: Optimized for all screen sizes (desktop, tablet, mobile)
- **Interactive Elements**: 
  - Typing animation for role titles
  - Smooth scroll navigation
  - Hover effects on cards and projects
- **No Emojis**: All UI icons are outline SVGs for a more professional, consistent look
- **Sections**:
  - Hero with animated code window
  - About with 8+ years experience badge
  - Skills grid (MLOps, Cloud, Containers, IaC, Programming, Security)
  - Certifications & Awards
  - Featured Projects list
  - Contact form with social links

## Content

### Certifications
- AWS Certified Security - Specialty
- Microsoft AI Practitioner

### Awards
- Snyk DevSecOps Leadership Award (2022)

### Featured Projects
- AI Gateway
- ML Pipeline Orchestration
- AWS Account Vending Machine
- EKS Cluster Management
- Model Monitoring Platform
- AWS Cost Analyzer
- Platform Security Infrastructure

## Quick Start

### Run Locally

1. Navigate to the portfolio directory:
   ```bash
   cd /Users/drajkovic/Desktop/projects/portfolio
   ```

2. Start a local server (choose one):

   **Python 3:**
   ```bash
   python3 -m http.server 8080
   ```

3. Open your browser and visit:
   ```
   http://localhost:8080
   ```

## Customization

### Personal Information
Edit `index.html` to update:
- Name and title
- About section text
- Skills and technologies
- Certifications and awards
- Project descriptions
- Contact information and social links

### Styling
Modify `styles.css` CSS variables in `:root` to change:
- Colors (primary, secondary, accent)
- Background colors
- Gradients
- Fonts

### Icons (SVG)
This site uses an inline SVG sprite in `index.html` (near the top of `<body>`).
To change icons, update the `<symbol>` definitions and/or the `<use href="#icon-name"/>` references throughout the markup.

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid, animations
- **JavaScript** - Vanilla JS for interactivity
- **Google Fonts** - Inter font family

## Hosting Options (Cheap/Free)

1. **GitHub Pages** - Free, custom domain support
2. **Netlify** - Free tier, auto-deploy from Git
3. **Vercel** - Free tier, great for static sites
4. **Cloudflare Pages** - Free tier, global CDN

## Contact

- Email: dan.rajkovic@icloud.com
- LinkedIn: [/in/dejan-rajkovic](https://linkedin.com/in/dejan-rajkovic)
- GitHub: [@Dejan992](https://github.com/Dejan992)

## License

MIT License - Feel free to customize and use!
