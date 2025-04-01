# University Magazine Frontend

A modern web application built with React and TypeScript for managing university magazine submissions and publications.

## 🚀 Features

- Modern and responsive UI using Mantine UI components
- Document viewing and management
- File upload capabilities with dropzone support
- Form handling and validation
- Data table management with sorting and filtering
- Date handling and calendar features
- Carousel and image galleries
- CSV export functionality
- Secure authentication and authorization
- Real-time notifications
- State management with Zustand
- Data fetching and caching with React Query

## 🛠️ Technologies

### Core

- React 18.3
- TypeScript
- Vite (for build tooling)

### UI Framework and Components

- Mantine Core (v7)
- Mantine Components:
  - Carousel
  - Dates
  - Dropzone
  - Forms
  - Modals
  - Notifications
- Mantine React Table
- Embla Carousel

### State Management & Data Fetching

- Zustand
- TanStack React Query
- Axios

### Form Handling & Validation

- React Hook Form
- Zod

### Utilities

- Day.js (date manipulation)
- UUID
- Crypto-js
- Export-to-CSV

### Development Tools

- ESLint
- PostCSS
- TypeScript ESLint

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file with necessary environment variables

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. For production build:
   ```bash
   pnpm build
   ```

## 🐳 Docker Support

The project includes Docker support for containerized deployment. Build the Docker image using:

```bash
docker build -t university-magazine-frontend .
```

## 📝 Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Create production build
- `pnpm build:force` - Force production build
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

## 🔧 Configuration

The project includes several configuration files:

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration
- `postcss.config.cjs` - PostCSS configuration
- `nginx.conf` - Nginx configuration for production deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
