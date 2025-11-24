# One Universe - React Application

A modern, futuristic React application featuring beautiful permission and guidance screens with a trustworthy, clear design.

## Features

- **Permission Screen**: Elegant permission request interface with:
  - Glassmorphism design
  - Animated background effects
  - Trust indicators (Encryption, Privacy, GDPR)
  - Smooth hover interactions

- **Guidance Screen**: Interactive onboarding experience with:
  - Step-by-step tour
  - Progress indicators
  - Feature highlights
  - Animated particles and effects

## Design Philosophy

- **Trustworthy**: Clear privacy indicators and transparent permission requests
- **Futuristic**: Modern gradients, glassmorphism, and smooth animations
- **Clear**: Intuitive navigation and easy-to-understand content

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
one-universe/
├── src/
│   ├── components/
│   │   ├── PermissionScreen.jsx
│   │   ├── PermissionScreen.css
│   │   ├── GuidanceScreen.jsx
│   │   └── GuidanceScreen.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **CSS3**: Custom styling with modern features (gradients, animations, backdrop-filter)

## Customization

The design uses CSS variables defined in `src/index.css` for easy theming:

- `--primary-gradient`: Main gradient colors
- `--dark-bg`: Background color
- `--accent-blue`: Primary accent color
- `--accent-purple`: Secondary accent color

Modify these variables to customize the color scheme.

## License

MIT

