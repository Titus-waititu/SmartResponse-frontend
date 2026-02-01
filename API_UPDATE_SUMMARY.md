# API Update Summary

## Overview
Updated frontend to match actual backend API endpoints and schema. This document summarizes all changes made to align the frontend with the backend specification.

## Date
December 2024

## Major Changes

### 1. API Configuration (`lib/api/config.ts`)
- ✅ Updated `BASE_URL` from `http://localhost:8080/api/v1` to `http://localhost:3000`
- ✅ Added comprehensive endpoint configuration for all backend modules:
  - AUTH endpoints (signin, refresh, profile, change-password, etc.)
  - USERS endpoints (base, register, by_id, by_role, etc.)
  - ACCIDENTS endpoints (base, by_id, by_report, assign_officer, etc.)
  - VEHICLES endpoints (base, by_accident, by_plate)
  - MEDIA endpoints
  - LOCATIONS endpoints
  - NOTIFICATIONS endpoints
  - EMERGENCY_SERVICES endpoints
  - REPORTS endpoints
  - AI endpoints (analyze_accident, generate_report, etc.)
  - DISPATCH endpoints (emergency, status, active, etc.)
  - UPLOAD endpoints (file, files, document, video)

### 2. Type Definitions (`lib/api/types.ts`)
- ✅ Updated `User` interface:
  - Changed `firstName` + `lastName` to `fullName`
  - Added `username` field
  - Updated `UserRole` enum values to lowercase

- ✅ Updated `Accident` interface:
  - Changed severity values from 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL' to 'minor', 'moderate', 'severe', 'critical'
  - Changed status values from 'REPORTED', 'DISPATCHED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED' to 'pending', 'in_progress', 'under_review', 'completed', 'closed'
  - Updated field names: `reportedAt` → `createdAt`, `location` object → `locationAddress` string
  - Added required fields for backend schema: `accidentDate`, `numberOfVehicles`, `numberOfInjuries`, `numberOfFatalities`
  - Made `AccidentSeverity` and `AccidentStatus` type aliases instead of enums

- ✅ Updated `Vehicle` interface to match backend schema
- ✅ Updated `Media`, `Notification`, and other interfaces

### 3. API Services (`lib/api/services.ts`)
- ✅ Updated `authService.signUp()` to use `API_CONFIG.ENDPOINTS.USERS.REGISTER` instead of `AUTH.SIGNUP`
- ✅ Updated `accidentService.reportAccident()` to `createAccident()` using `API_CONFIG.ENDPOINTS.ACCIDENTS.BASE`
- ✅ Added new service methods for all backend endpoints
- ✅ Added `aiService` for AI-powered features
- ✅ Added `dispatchService` for emergency dispatch
- ✅ Added `uploadService` for file uploads

### 4. Authentication Pages

#### Sign Up Page (`app/auth/signup/page.tsx`)
- ✅ Changed form fields from `firstName` + `lastName` to `fullName` + `username`
- ✅ Updated field validation and labels
- ✅ Updated form submission to send new schema

### 5. Dashboard & Layouts

#### Dashboard Layout (`components/layouts/dashboard-layout.tsx`)
- ✅ Updated user display to show `fullName` instead of `firstName + lastName`
- ✅ Updated avatar initials to use first letter of `fullName`
- ✅ Updated welcome message to use first name from `fullName`

#### Dashboard Page (`app/dashboard/page.tsx`)
- ✅ Updated severity switch statements to use string literals ('critical', 'severe', 'moderate', 'minor')
- ✅ Changed `accident.location?.address` to `accident.locationAddress`
- ✅ Changed `accident.reportedAt` to `accident.createdAt`

### 6. Accident Management

#### Accident Report Form (`app/accidents/report/page.tsx`)
- ✅ Updated form fields to include all required backend fields:
  - `locationAddress` (instead of `address`)
  - `accidentDate`
  - `numberOfVehicles`
  - `numberOfInjuries`
  - `numberOfFatalities`
  - `weatherConditions`
  - `roadConditions`
- ✅ Removed `vehicleId` field (vehicles are created separately)
- ✅ Updated method call from `reportAccident()` to `createAccident()`
- ✅ Updated location detection to set `locationAddress`

#### Accidents List (`app/accidents/list/page.tsx`)
- ✅ Updated severity and status switch statements to use string literals
- ✅ Changed column accessor from `location.address` to `locationAddress`
- ✅ Removed `severityScore` reference (not in backend schema)

## Backend Endpoint Mapping

### Authentication
- POST `/auth/signin` - Sign in with email/password
- POST `/auth/refresh` - Refresh access token
- GET `/auth/profile` - Get user profile
- PATCH `/auth/profile` - Update profile
- PATCH `/auth/change-password` - Change password
- POST `/auth/forgot-password` - Request password reset
- POST `/auth/reset-password` - Reset password with token
- POST `/auth/logout` - Logout user

### Users
- POST `/users` - Register new user
- GET `/users` - List all users
- GET `/users/:id` - Get user by ID
- PATCH `/users/:id` - Update user
- DELETE `/users/:id` - Delete user
- GET `/users/role/:role` - Get users by role
- GET `/users/active` - Get active users
- PATCH `/users/:id/deactivate` - Deactivate user
- PATCH `/users/:id/activate` - Activate user
- GET `/users/stats` - Get user statistics

### Accidents
- POST `/accidents` - Create accident report
- GET `/accidents` - List all accidents
- GET `/accidents/:id` - Get accident by ID
- PATCH `/accidents/:id` - Update accident
- DELETE `/accidents/:id` - Delete accident
- GET `/accidents/report/:reportNumber` - Get by report number
- GET `/accidents/status/:status` - Filter by status
- GET `/accidents/officer/:userId` - Get by assigned officer
- PATCH `/accidents/:id/assign-officer` - Assign officer
- PATCH `/accidents/:id/status` - Update status
- GET `/accidents/statistics` - Get statistics

### Vehicles
- POST `/vehicles` - Create vehicle
- GET `/vehicles` - List vehicles
- GET `/vehicles/:id` - Get vehicle by ID
- PATCH `/vehicles/:id` - Update vehicle
- DELETE `/vehicles/:id` - Delete vehicle
- GET `/vehicles/accident/:accidentId` - Get by accident
- GET `/vehicles/plate/:licensePlate` - Search by plate

### AI Services
- POST `/ai/analyze-accident` - Analyze accident with AI
- POST `/ai/generate-report` - Generate AI report
- POST `/ai/extract-text` - Extract text from images
- POST `/ai/classify-severity` - Classify severity
- GET `/ai/insights/:accidentId` - Get AI insights

### Dispatch
- POST `/dispatch/emergency` - Dispatch emergency services
- GET `/dispatch/status/:accidentId` - Get dispatch status
- PATCH `/dispatch/:accidentId/status` - Update status
- POST `/dispatch/:accidentId/cancel` - Cancel dispatch
- GET `/dispatch/active` - Get active dispatches
- GET `/dispatch/history` - Get dispatch history
- PATCH `/dispatch/:accidentId/assign` - Assign responder

### File Upload
- POST `/upload/file` - Upload single file
- POST `/upload/files` - Upload multiple files
- POST `/upload/document` - Upload document
- POST `/upload/video` - Upload video
- GET `/upload/status/:uploadId` - Get upload status
- DELETE `/upload/:fileId` - Delete file

## Schema Changes Summary

### User Schema
```typescript
// Before
{
  firstName: string;
  lastName: string;
  email: string;
}

// After
{
  fullName: string;
  username: string;
  email: string;
}
```

### Accident Schema
```typescript
// Before
{
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'REPORTED' | 'DISPATCHED' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  location: { address: string };
  reportedAt: string;
}

// After
{
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  status: 'pending' | 'in_progress' | 'under_review' | 'completed' | 'closed';
  locationAddress: string;
  createdAt: string;
  accidentDate: string;
  numberOfVehicles: number;
  numberOfInjuries: number;
  numberOfFatalities: number;
}
```

## Testing Checklist

- [ ] Test user registration with new schema (fullName, username)
- [ ] Test user sign in
- [ ] Test accident creation with all required fields
- [ ] Test accident list display
- [ ] Test dashboard statistics
- [ ] Test image upload functionality
- [ ] Test location detection
- [ ] Test profile update
- [ ] Verify all API calls use correct endpoints
- [ ] Verify 404 errors are resolved

## Next Steps

1. **Backend Integration Testing**: Test all API endpoints with actual backend
2. **Image Upload**: Implement image upload using `uploadService.uploadFiles()`
3. **Vehicle Management**: Create vehicle CRUD pages
4. **Emergency Services**: Create emergency services pages
5. **Profile Page**: Create user profile management page
6. **AI Features**: Implement AI analysis integration
7. **Dispatch System**: Implement dispatch management interface
8. **Error Handling**: Add comprehensive error handling and user feedback
9. **Loading States**: Add loading indicators for all async operations
10. **Data Validation**: Add client-side validation matching backend requirements

## Notes

- All TypeScript compilation errors have been fixed
- API configuration is centralized in `lib/api/config.ts` for easy updates
- Service layer provides clean abstraction over API calls
- Type safety is maintained throughout the application
- Form validations match backend requirements

## Breaking Changes

⚠️ **User Registration**: Frontend now sends `fullName` and `username` instead of `firstName` and `lastName`
⚠️ **Accident Creation**: Now requires additional fields (`numberOfVehicles`, `numberOfInjuries`, `numberOfFatalities`)
⚠️ **Severity Values**: Changed from uppercase to lowercase
⚠️ **Status Values**: Changed to different set of values matching backend

## Migration Path

If you have existing data:
1. Backend must handle both old and new user schemas during transition
2. Accident data needs migration to add new required fields
3. Consider adding default values for new required fields

---

**Last Updated**: December 2024
**Status**: ✅ Complete - Ready for integration testing
