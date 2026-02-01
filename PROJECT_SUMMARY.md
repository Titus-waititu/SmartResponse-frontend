# 🚨 SmartResponse Frontend - Project Summary

## Overview

The SmartResponse frontend is a modern Next.js application that provides a comprehensive user interface for the Smart Accident Report System. Built with TypeScript and leveraging the TanStack ecosystem (Router, Forms, and Table), it offers a type-safe, performant, and user-friendly experience for accident reporting and emergency management.

## Project Architecture

### Technology Stack

| Category         | Technology      | Purpose                                    |
| ---------------- | --------------- | ------------------------------------------ |
| Framework        | Next.js 15.1.6  | React framework with server-side rendering |
| Language         | TypeScript      | Type-safe development                      |
| Routing          | TanStack Router | Client-side routing                        |
| Forms            | TanStack Forms  | Form state management                      |
| Tables           | TanStack Table  | Advanced data tables                       |
| State Management | Zustand         | Global state with persistence              |
| HTTP Client      | Axios           | API communication                          |
| Styling          | Tailwind CSS    | Utility-first CSS                          |
| Icons            | Lucide React    | Icon library                               |
| Notifications    | React Hot Toast | Toast notifications                        |
| Date Formatting  | date-fns        | Date utilities                             |

### Folder Structure

```
frontend/
├── app/                     # Next.js App Router pages
│   ├── auth/               # Authentication flows
│   ├── dashboard/          # Main dashboard
│   ├── accidents/          # Accident management
│   ├── emergency-services/ # Emergency services
│   ├── vehicles/           # Vehicle management
│   └── profile/            # User profile
├── components/             # Reusable components
│   └── layouts/           # Layout components
├── lib/                    # Core utilities
│   ├── api/               # API client & services
│   ├── stores/            # Zustand stores
│   └── router/            # Router configuration
└── public/                # Static assets
```

## Core Features

### 1. Authentication System

**Location**: `app/auth/`

- **Sign In** (`signin/page.tsx`)
  - Email/password authentication
  - Google OAuth integration
  - Form validation with TanStack Forms
  - Automatic redirect on success

- **Sign Up** (`signup/page.tsx`)
  - User registration form
  - Multiple validation rules
  - Password confirmation
  - Optional phone number

**Key Components**:

- Form validation using TanStack Forms
- Zustand store for auth state (`lib/stores/auth.store.ts`)
- JWT token management with refresh logic
- Persistent sessions with localStorage

### 2. API Integration

**Location**: `lib/api/`

The API layer is fully abstracted for easy configuration and maintenance:

**Configuration** (`config.ts`):

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL,
  ENDPOINTS: {
    AUTH: { SIGNUP, SIGNIN, REFRESH, GOOGLE },
    ACCIDENTS: { BASE, REPORT, BY_ID },
    EMERGENCY_SERVICES: { BASE, BY_ID },
    // ... more endpoints
  },
};
```

**HTTP Client** (`client.ts`):

- Axios instance with interceptors
- Automatic token injection
- Token refresh on 401 errors
- Global error handling
- Toast notifications

**Services** (`services.ts`):

- `authService` - Authentication operations
- `accidentService` - Accident CRUD operations
- `emergencyServiceService` - Emergency service management
- `userService` - User management
- `vehicleService` - Vehicle operations
- `notificationService` - Notification handling

**TypeScript Types** (`types.ts`):

- Comprehensive type definitions
- Enums for severity, status, roles
- Request/response interfaces
- Pagination types

### 3. Accident Reporting

**Location**: `app/accidents/report/page.tsx`

**Features**:

- Rich form with TanStack Forms
- Multi-image upload with preview
- GPS location detection
- Reverse geocoding for address
- Vehicle selection from user's registered vehicles
- Real-time validation

**Form Fields**:

- Description (required, textarea)
- Location (address, latitude, longitude)
- Vehicle selection (optional dropdown)
- Images (required, max 5, with preview)

**Workflow**:

1. User fills out accident details
2. Uploads images (PNG/JPG up to 10MB each)
3. Gets current location or enters manually
4. Submits to backend for AI analysis
5. Redirects to accident detail page

### 4. Accidents List with TanStack Table

**Location**: `app/accidents/list/page.tsx`

**Features**:

- Advanced data table with TanStack Table
- Global search filter
- Column sorting
- Pagination controls
- Severity and status badges
- Click-through to details

**Table Columns**:

1. ID (truncated)
2. Date & Time (formatted)
3. Location (address)
4. Severity (badge with score)
5. Status (badge)
6. Actions (view button)

**Interactions**:

- Sort by clicking column headers
- Filter with search bar
- Navigate pages with pagination controls
- Click row to view details

### 5. Dashboard

**Location**: `app/dashboard/page.tsx`

**Components**:

- **Statistics Grid**: 4 KPI cards
  - Total Accidents
  - Active Dispatches
  - Average Response Time
  - This Month's Count

- **Quick Actions**: 3 action cards
  - Report Accident
  - View Accidents
  - My Vehicles

- **Recent Accidents**: List of 5 most recent
  - Severity indicators
  - Location information
  - Quick navigation to details

### 6. Dashboard Layout

**Location**: `components/layouts/dashboard-layout.tsx`

**Features**:

- Collapsible sidebar navigation
- User profile section
- Notification bell
- Logout functionality

**Navigation Links**:

- Dashboard
- Report Accident
- Accidents List
- Emergency Services
- My Vehicles
- Profile

### 7. Landing Page

**Location**: `app/page.tsx`

**Sections**:

- Hero section with CTA
- Feature showcase (4 features)
- Navigation to auth pages
- Footer

**Auto-redirect**: Logged-in users are redirected to dashboard

## State Management

### Zustand Store

**Location**: `lib/stores/auth.store.ts`

**State**:

```typescript
{
  user: User | null,
  accessToken: string | null,
  refreshToken: string | null,
  isAuthenticated: boolean,
}
```

**Actions**:

- `setAuth()` - Store user and tokens
- `clearAuth()` - Clear session
- `updateUser()` - Update user info

**Persistence**:

- Uses Zustand persist middleware
- Syncs with localStorage
- Survives page refreshes

## TanStack Integration

### 1. TanStack Forms

**Usage Pattern**:

```typescript
const form = useForm({
  defaultValues: { ... },
  onSubmit: async ({ value }) => { ... },
});

<form.Field
  name="fieldName"
  validators={{
    onChange: ({ value }) => validation(value)
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

**Benefits**:

- Built-in validation
- Type-safe field access
- Automatic error handling
- Easy async submission

### 2. TanStack Table

**Usage Pattern**:

```typescript
const table = useReactTable({
  data,
  columns,
  state: { sorting, columnFilters, globalFilter },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
```

**Features Used**:

- Column sorting
- Global filtering
- Pagination
- Custom cell rendering
- Row actions

### 3. TanStack Router

**Configuration**: `lib/router/`

**Route Tree**:

- Root route with layout
- Public routes (auth)
- Protected routes (dashboard, accidents, etc.)
- Dynamic routes (accident/:id)

**Benefits**:

- Type-safe navigation
- Nested routes
- Layout composition

## Styling

### Tailwind CSS Configuration

**Theme**:

- Red primary color (emergency theme)
- Gray neutrals
- Responsive breakpoints
- Custom animations

**Patterns**:

- Mobile-first responsive design
- Consistent spacing scale
- Shadow system for depth
- Hover states for interactivity

## Security Features

### Authentication Flow

1. User signs in → Receives JWT tokens
2. Tokens stored in localStorage and Zustand
3. Axios interceptor adds token to requests
4. On 401 error → Attempts token refresh
5. If refresh fails → Redirects to login

### Protected Routes

- Check `isAuthenticated` in Zustand
- Redirect to `/auth/signin` if not logged in
- Automatic handling in layout components

### Token Management

- Access token expires in 15 minutes
- Refresh token expires in 7 days
- Automatic refresh on API calls
- Secure storage in localStorage

## Error Handling

### Global Error Handler

**Location**: `lib/api/client.ts`

**Features**:

- Axios response interceptor
- Toast notifications for errors
- Automatic retry logic
- User-friendly error messages

### Form Validation

**Approach**: Real-time validation with TanStack Forms

- onChange validation for immediate feedback
- Required field validation
- Format validation (email, phone)
- Custom validation rules

## Performance Optimizations

### Image Handling

- Client-side preview generation
- File size validation (max 10MB)
- Multiple upload support (max 5)
- Optimized for upload

### Data Fetching

- Axios with automatic retry
- Loading states for UX
- Error boundaries
- Pagination for large datasets

### Code Splitting

- Next.js automatic code splitting
- Dynamic imports where appropriate
- Lazy loading for heavy components

## Future Enhancements

### Planned Features

1. **Real-time Updates**
   - WebSocket integration
   - Live accident status updates
   - Push notifications

2. **Advanced Analytics**
   - Charts and graphs
   - Statistical analysis
   - Export reports

3. **Map Integration**
   - Interactive accident map
   - Real-time emergency service tracking
   - Route visualization

4. **Mobile App**
   - React Native version
   - Native camera integration
   - Offline support

5. **Admin Dashboard**
   - User management
   - Emergency service administration
   - System configuration

## Development Workflow

### Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.local.example .env.local

# Start development server
pnpm dev
```

### Building

```bash
# Production build
pnpm build

# Start production server
pnpm start
```

### Code Quality

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Type check
pnpm type-check
```

## Environment Configuration

### Required Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Optional Variables

```env
NEXT_PUBLIC_APP_NAME=SmartResponse
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

## Deployment Checklist

- [ ] Set production API URL
- [ ] Configure environment variables
- [ ] Test authentication flow
- [ ] Verify API integration
- [ ] Check responsive design
- [ ] Test all forms
- [ ] Verify table functionality
- [ ] Test image uploads
- [ ] Check error handling
- [ ] Performance audit
- [ ] Security audit

## Key Files Reference

| File                                      | Purpose                        |
| ----------------------------------------- | ------------------------------ |
| `lib/api/config.ts`                       | API endpoint configuration     |
| `lib/api/client.ts`                       | Axios client with interceptors |
| `lib/api/services.ts`                     | API service functions          |
| `lib/api/types.ts`                        | TypeScript type definitions    |
| `lib/stores/auth.store.ts`                | Authentication state           |
| `lib/router/route-tree.tsx`               | Route definitions              |
| `components/layouts/dashboard-layout.tsx` | Main app layout                |
| `app/page.tsx`                            | Landing page                   |
| `app/auth/signin/page.tsx`                | Sign in page                   |
| `app/auth/signup/page.tsx`                | Sign up page                   |
| `app/dashboard/page.tsx`                  | Dashboard                      |
| `app/accidents/report/page.tsx`           | Report accident form           |
| `app/accidents/list/page.tsx`             | Accidents table                |

## Conclusion

The SmartResponse frontend provides a modern, type-safe, and user-friendly interface for accident reporting and emergency management. Built with industry-leading technologies and best practices, it offers excellent developer experience and end-user satisfaction.

The integration of TanStack Router, Forms, and Table provides powerful tools for building complex UIs while maintaining code quality and type safety. The centralized API configuration makes it easy to adapt to backend changes and maintain the codebase over time.

---

**Built with** ❤️ **by the SmartResponse team**
