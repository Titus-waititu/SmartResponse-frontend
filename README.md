# 🚨 SmartResponse - Frontend

A modern, Next.js-based frontend for the Smart Accident Report System with AI-powered accident analysis and emergency dispatch.

## 📖 Overview

SmartResponse Frontend is a comprehensive web application built with Next.js, TypeScript, TanStack Router, TanStack Forms, and TanStack Table. It provides an intuitive interface for accident reporting, real-time severity analysis, and emergency service coordination.

### 🌟 Key Features

- **TanStack Router Integration**: Client-side routing with type-safe navigation
- **TanStack Forms**: Powerful form management with built-in validation
- **TanStack Table**: Advanced data tables with sorting, filtering, and pagination
- **AI-Powered Reporting**: Upload accident images for automatic severity analysis
- **Real-time Updates**: Live notifications and status updates
- **Secure Authentication**: JWT-based auth with OAuth2 (Google) support
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **State Management**: Zustand for global state with persistence

## 🏗️ Tech Stack

- **Framework**: Next.js 15.1.6
- **Language**: TypeScript
- **Routing**: TanStack Router
- **Forms**: TanStack Forms
- **Tables**: TanStack Table
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Formatting**: date-fns

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager
- Backend API running (see API repository)

### Installation

1. **Clone and navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3001`

## 📁 Project Structure

```
frontend/
├── app/                          # Next.js app directory
│   ├── auth/                     # Authentication pages
│   │   ├── signin/               # Sign in page
│   │   └── signup/               # Sign up page
│   ├── dashboard/                # Dashboard page
│   ├── accidents/                # Accident management
│   │   ├── report/               # Report accident form
│   │   ├── list/                 # Accidents table
│   │   └── [id]/                 # Accident details
│   ├── emergency-services/       # Emergency services
│   ├── vehicles/                 # Vehicle management
│   ├── profile/                  # User profile
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   └── layouts/                  # Layout components
│       ├── root-layout.tsx       # Root layout wrapper
│       └── dashboard-layout.tsx  # Dashboard layout
├── lib/                          # Utilities and configurations
│   ├── api/                      # API client and services
│   │   ├── config.ts             # API endpoints config
│   │   ├── client.ts             # Axios client
│   │   ├── types.ts              # TypeScript types
│   │   ├── services.ts           # API service functions
│   │   └── index.ts              # Exports
│   ├── stores/                   # Zustand stores
│   │   └── auth.store.ts         # Authentication store
│   └── router/                   # TanStack Router config
│       ├── index.ts              # Router setup
│       └── route-tree.tsx        # Route definitions
└── public/                       # Static assets
```

## 🎨 Features Implementation

### Authentication

- **Sign Up**: User registration with email/password or Google OAuth
- **Sign In**: Email/password or Google OAuth authentication
- **Session Management**: Automatic token refresh and session persistence
- **Protected Routes**: Redirect unauthenticated users to login

### Accident Reporting

- **Rich Form**: TanStack Forms with validation
- **Image Upload**: Multiple image upload with preview
- **Location Detection**: Automatic GPS location capture
- **AI Analysis**: Submit for AI-powered severity assessment

### Accident Management

- **Data Table**: TanStack Table with sorting and filtering
- **Pagination**: Client-side pagination
- **Search**: Global search across all fields
- **Status Tracking**: Real-time accident status updates

### Dashboard

- **Statistics**: Key metrics and KPIs
- **Recent Activity**: Latest accidents and updates
- **Quick Actions**: Fast access to common tasks

## 🔧 API Configuration

### Centralized Endpoint Configuration

All API endpoints are defined in `lib/api/config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    AUTH: { ... },
    ACCIDENTS: { ... },
    EMERGENCY_SERVICES: { ... },
    // ... more endpoints
  },
};
```

### API Services

Service functions in `lib/api/services.ts`:

```typescript
// Example: Report accident
await accidentService.reportAccident({
  description: "Accident description",
  latitude: 40.7128,
  longitude: -74.006,
  address: "123 Main St",
  images: [file1, file2],
});
```

## 🎯 TanStack Integration

### TanStack Forms

```typescript
const form = useForm({
  defaultValues: { email: '', password: '' },
  onSubmit: async ({ value }) => {
    await authService.signIn(value);
  },
});

<form.Field
  name="email"
  validators={{
    onChange: ({ value }) =>
      !value ? 'Email is required' : undefined
  }}
>
  {(field) => (
    <input
      value={field.state.value}
      onChange={(e) => field.handleChange(e.target.value)}
    />
  )}
</form.Field>
```

### TanStack Table

```typescript
const table = useReactTable({
  data: accidents,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
```

### TanStack Router

```typescript
// Route definition
export const accidentReportRoute = createRoute({
  getParentRoute: () => accidentsRoute,
  path: "report",
});

// Navigation
const router = useRouter();
router.push("/accidents/report");
```

## 🎨 Styling

The project uses Tailwind CSS for styling:

- Responsive design with mobile-first approach
- Custom color scheme (red primary for emergency theme)
- Consistent spacing and typography
- Dark mode support (future enhancement)

## 🔒 Security

- JWT token management with automatic refresh
- Secure storage with localStorage
- Protected API routes with interceptors
- CORS handling
- XSS prevention

## 📱 Pages Overview

### Public Pages

- `/` - Landing page with features showcase
- `/auth/signin` - User login
- `/auth/signup` - User registration

### Protected Pages

- `/dashboard` - Main dashboard with statistics
- `/accidents/report` - Report new accident
- `/accidents/list` - View all accidents
- `/accidents/[id]` - Accident details
- `/emergency-services` - Emergency services directory
- `/vehicles` - Manage vehicles
- `/profile` - User profile

## 🧪 Development

### Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Environment Variables

| Variable              | Description     | Default                 |
| --------------------- | --------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3000` |

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

### Deploy to Vercel

```bash
vercel deploy
```

### Environment Setup

1. Set `NEXT_PUBLIC_API_URL` to your production API URL
2. Configure domain and SSL
3. Enable automatic deployments from Git

## 📝 Best Practices

- **Type Safety**: Full TypeScript coverage
- **Code Organization**: Feature-based folder structure
- **Component Reusability**: Shared components in `components/`
- **API Abstraction**: Centralized API client and services
- **State Management**: Global state with Zustand
- **Error Handling**: Comprehensive error handling with toast notifications

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED license.

## 🆘 Support

For questions or issues, please refer to the main project repository.

---

Built with ❤️ using [Next.js](https://nextjs.org/), [TanStack](https://tanstack.com/), and [Tailwind CSS](https://tailwindcss.com/)
