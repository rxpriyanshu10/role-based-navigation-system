# Role-Based Navigation System

A permission-driven internal operations workspace application built with React, Vite, Tailwind CSS, and React Router. This project demonstrates dynamic navigation filtering, route-level authorization, and permission-aware UI action controls driven purely by user permissions rather than hard-coded role conditionals.

## Project Overview

The **Role-Based Navigation System** provides a client-side authorization framework designed for internal operations workspaces. Rather than coupling access rules directly to role strings (e.g., `user.role === 'Admin'`), access to navigation items, protected routes, and UI actions is evaluated against fine-grained permission definitions.

Key highlights:
- **Permission-Driven Authorization**: Navigation filtering, route protection, and action controls consume a unified permission utility layer.
- **Deterministic Mock Authentication**: Switch seamlessly between predefined user profiles to test authorization behavior across permission tiers.
- **Persistent Authenticated State**: Session state is persisted via `localStorage` with safe fallback handling for missing or malformed state.
- **Responsive Layout**: Designed as a modern internal operations tool with a 240px sidebar, top header, and responsive drawer navigation.

---

## Key Features

- **Mock Authentication & State Persistence**: Switch between mock profiles (Alex Morgan, Jordan Lee, Sam Taylor); authenticated session persists across page reloads.
- **Dynamic Permission-Based Navigation**: Sidebar navigation automatically excludes modules for which the authenticated user lacks `VIEW` permission.
- **Protected Routes & Direct URL Guards**: Prevents unauthorized access to module routes (`/billing`, `/orders`, `/settings`). Unauthorized access attempts automatically redirect to appropriate fallback routes (`/login` for unauthenticated, `/` for permission denied).
- **Permission-Controlled Action Controls**: Demonstrates granular action control on the Orders page—the `Create Order` button renders only if the authenticated user possesses `Orders CREATE` permission.
- **Responsive Navigation**: Adaptive sidebar drawer for mobile and tablet viewports with identical permission filtering behavior.
- **Safe Fallback Handling**: Corrupted or invalid `localStorage` state clears cleanly and defaults to unauthenticated status without application failure.

---

## Permission Model

The authorization model defines explicit module and permission constants as the single source of truth:

- **Modules**: `Orders`, `Billing`
- **Permissions**: `VIEW`, `CREATE`

### Module Access Rules
- **Orders Module**: Requires `Orders VIEW` permission to access page and navigation item.
- **Billing Module**: Requires `Billing VIEW` permission to access page and navigation item.
- **Overview & Settings**: Available to all authenticated users without module-specific permission requirements.

---

## Role & Permission Matrix

The application includes three mock user profiles to demonstrate authorization behavior across permission combinations:

| User Profile | Role Label | Orders VIEW | Orders CREATE | Billing VIEW | Accessible Navigation | `Create Order` Action |
| :--- | :--- | :---: | :---: | :---: | :--- | :---: |
| **Alex Morgan** | Admin | Yes | Yes | Yes | Overview, Orders, Billing, Settings | Visible |
| **Jordan Lee** | Operations | Yes | Yes | No | Overview, Orders, Settings | Visible |
| **Sam Taylor** | Viewer | Yes | No | No | Overview, Orders, Settings | Hidden |

> **Note**: Role names serve as descriptive profile labels for demonstration. All access decisions in code consume user permissions (`user.permissions`).

---

## Authorization Architecture

The authorization system is organized into modular layers:

- **Authentication Layer** (`src/auth/`):
  - `AuthContext.jsx`: React Context provider and `useAuth()` hook managing authenticated user state.
  - `authService.js`: Service layer handling login, logout, user lookup, and `localStorage` persistence.
  - `mockUsers.js`: Mock user dataset defining profile identities and permission arrays.
- **Permission Layer** (`src/permissions/`):
  - `permissions.js` & `modules.js`: Declarative constants for `PERMISSIONS` and `MODULES`.
  - `permissionUtils.js`: Pure authorization functions (`hasPermission`, `canAccessModule`, `hasAnyPermission`, `hasAllPermissions`).
  - `usePermissions.js`: React hook exposing permission evaluation functions (`can`, `canAccess`, `hasPermission`) to UI components.
- **Navigation Layer** (`src/navigation/` & `src/config/`):
  - `navigationConfig.js`: Central navigation definitions with module and permission requirements.
  - `navigationFilter.js`: Pure function filtering navigation items based on user permissions.
- **Route Guard Layer** (`src/auth/`):
  - `routeAuthorization.js`: Pure decision function (`evaluateRouteAccess`) returning access status and redirect paths.
  - `ProtectedRoute.jsx`: React Router guard wrapper enforcing authentication and module permissions.
- **Action Control Layer** (`src/pages/Orders.jsx`):
  - Consumes `usePermissions()` to conditionally render the `+ Create Order` button when `can(MODULES.ORDERS, PERMISSIONS.CREATE)` evaluates to `true`.

---

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **State Management**: React Context (`AuthProvider`)
- **Testing**: Node.js Native Test Runner (`node --test`)

---

## Project Structure

```text
src/
├── auth/
│   ├── AuthContext.jsx         # Auth context provider & useAuth hook
│   ├── ProtectedRoute.jsx      # Route authorization guard
│   ├── authService.js          # Storage & authentication service
│   ├── routeAuthorization.js   # Pure route access decision logic
│   └── routeAuthorization.test.js
├── components/
│   └── layout/
│       ├── AppLayout.jsx       # Main application layout wrapper
│       ├── Header.jsx          # Top navigation header
│       └── Sidebar.jsx         # Dynamic permission-based sidebar
├── config/
│   ├── navigation.jsx          # Re-export compatibility wrapper
│   ├── navigationFilter.js     # Pure navigation item filter
│   └── navigationFilter.test.js
├── data/
│   └── mockUsers.js            # Mock users dataset & permissions
├── navigation/
│   └── navigationConfig.js     # Central navigation definitions
├── pages/
│   ├── Login.jsx               # Profile selection login page
│   ├── NotFound.jsx            # 404 Not Found handler
│   ├── Orders.jsx              # Orders module & action control
│   ├── Overview.jsx            # Workspace Overview & Access Matrix
│   └── Placeholders.jsx        # Billing & Settings module views
├── permissions/
│   ├── modules.js              # Module vocabulary & definitions
│   ├── permissions.js          # Permission vocabulary definitions
│   ├── permissionUtils.js      # Pure permission utility functions
│   ├── permissionUtils.test.js # Unit test suite (48 tests)
│   └── usePermissions.js       # React hook for permission checks
├── App.jsx                     # Router & ProtectedRoute configuration
├── index.css                   # Tailwind CSS styling tokens
└── main.jsx                    # Application entry point
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (v9 or higher recommended)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/rxpriyanshu10/role-based-navigation-system.git
cd role-based-navigation-system
npm install
```

### Running Locally

Start the Vite development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Running Tests

Execute the unit test suite via Node.js native test runner:

```bash
npm test
```

The test suite consists of **48 unit tests** covering:
- Permission resolution (`hasPermission`, `canAccessModule`, `hasAnyPermission`, `hasAllPermissions`)
- Dynamic navigation filtering for Admin, Operations, Viewer, and unauthenticated states
- Route protection decision matrix and redirect paths
- Orders `CREATE` action control matrix

---

## Production Build

To build the production bundle:

```bash
npm run build
```

The compiled output is emitted to the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## Assumptions & Scope

- **Mock Authentication**: Authentication is simulated on the client side using predefined mock user profiles for demonstration purposes.
- **Client-Side Authorization**: Permission checks govern UI visibility, navigation rendering, and client routing. In a production system, these checks would be mirrored by server-side authorization middleware on API endpoints.
- **Local Persistence**: User sessions persist in `localStorage` (`rbn_authenticated_user`).
- **No External Backend**: All module data (orders, invoices, workspace preferences) is handled locally.
