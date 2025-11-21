# InstaDrive Frontend

Frontend application for InstaDrive - A SaaS platform that automatically schedules and posts videos from Google Drive to Instagram.

## Features

- 🎨 Modern, responsive UI with glassmorphism design
- 🔐 Email-based authentication
- 📊 Dashboard with stats and activity
- 📁 Google Drive file browser
- 📅 Visual scheduling interface
- ⚙️ Settings for OAuth connections

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure API Endpoint

The frontend is configured to proxy API requests to `http://localhost:3000` in development (see `vite.config.ts`).

For production, update the proxy target or set `VITE_API_URL` environment variable.

### 3. Start Development Server

```bash
npm run dev
```

Frontend will start at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

## Deployment to Netlify

### 1. Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 2. Environment Variables

Set in Netlify dashboard:
- `VITE_API_URL` - Your backend URL (e.g., `https://your-backend.vercel.app`)

### 3. Deploy

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

Or connect your GitHub repository to Netlify for automatic deployments.

## Project Structure

```
frontend/
├── src/
│   ├── layouts/
│   │   └── DashboardLayout.tsx    # Main dashboard layout with sidebar
│   ├── pages/
│   │   ├── Landing.tsx            # Landing page
│   │   ├── Login.tsx              # Login page
│   │   ├── Dashboard.tsx          # Dashboard overview
│   │   ├── Drive.tsx              # Google Drive files
│   │   ├── Scheduler.tsx          # Scheduling interface
│   │   └── Settings.tsx           # Account settings
│   ├── lib/
│   │   └── api.ts                 # API client and helpers
│   ├── App.tsx                    # Route configuration
│   ├── index.css                  # Global styles
│   └── main.tsx                   # App entry point
├── public/                        # Static assets
├── index.html                     # HTML template
└── vite.config.ts                 # Vite configuration
```

## Available Routes

- `/` - Landing page
- `/login` - Login page
- `/dashboard` - Dashboard overview
- `/dashboard/drive` - Google Drive files
- `/dashboard/schedule` - Scheduling interface
- `/dashboard/settings` - Settings and OAuth connections

## Development Tips

- The app uses CSS variables for theming (see `index.css`)
- All API calls go through the `api.ts` helper
- Authentication state is managed via cookies (set by backend)

## License

MIT
