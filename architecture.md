SYSTEM ARCHITECTURE OVERVIEW
The system is divided into five clear layers:

Presentation Layer (UI)
Application Layer (Server Actions / Route Handlers)
Authentication Layer
Data Access Layer
Persistence Layer

Each layer must have a single responsibility.


1. PRESENTATION LAYER
Location: /app /components

Responsibilities:

Render UI
Handle form input
Display validation errors
Call server actions
No direct database access
No business logic
No authentication logic


Public Routes
/app/page.tsx
/app/portfolio/page.tsx
/app/projects/[slug]/page.tsx

These pages:

Fetch data using server functions
Render statically where possible
Never expose admin logic


Admin Routes
/app/admin/* /app/admin/page.tsx /app/admin/projects/new/page.tsx /app/admin/projects/edit/[id]/page.tsx

Admin routes must:

Require active session
Be protected at server level
Never rely on client-side auth checks


2. APPLICATION LAYER
Location: /app/actions /app/api /lib

Responsibilities:

Handle form submissions
Validate input
Process uploads
Call database functions
Return structured responses

Must NOT:

Render UI
Contain layout logic
Contain styling


Server Actions
Used for:

Create project
Update project
Delete project
Login

Rules:

Validate required fields
Prevent duplicate slug
Handle file storage
Return success/error state


3. AUTHENTICATION LAYER
Location: /lib/auth.ts /middleware.ts

Responsibilities:

Configure NextAuth
Manage session validation
Protect admin routes

Authentication Flow:

User submits credentials
Server validates against hashed password
Session created
Middleware blocks unauthorized access

Rules:

Credentials provider only
Single admin account
No registration endpoint
Password hashed with bcrypt
Session required for:
/admin
/admin/*
Admin APIs


4. DATA ACCESS LAYER
Location: /lib/prisma.ts

Responsibilities:

Initialize Prisma client
Provide database access abstraction
No UI logic
No request handling logic

All database calls must go through this layer.


5. PERSISTENCE LAYER
Location: /prisma/schema.prisma /public/uploads

Includes:

SQLite database
Prisma models
Uploaded image storage


DATA FLOW
Public Page Load
Page requests project data
Server fetches from database
Data returned
UI renders

No client-side database access.


Admin Create Project Flow
Admin logs in
Session validated
Admin submits form
Server action validates:
Required fields
Slug uniqueness
Image type
Images saved to /public/uploads
Database record created
Redirect to dashboard


Admin Update Project Flow
Admin edits project
Server validates session
Validate input
Update database
Replace images if uploaded


Admin Delete Project Flow
Admin clicks delete
Confirm action
Server validates session
Delete database record
Optionally remove images


COMPONENT ARCHITECTURE
Reusable components only.

Location: /components

Required components:

Navbar
Footer
ProjectCard
ProjectForm
AdminLayout
ProtectedRoute (server-level logic)

Rules:

Components must be stateless where possible
Business logic stays in server actions
Components receive typed props
No database queries inside components


ROUTING STRUCTURE
App Router must follow this structure:

/app layout.tsx page.tsx /portfolio page.tsx /projects /[slug] page.tsx /admin layout.tsx page.tsx /projects /new page.tsx /edit /[id] page.tsx


STATE MANAGEMENT
Do NOT use global state libraries.

Allowed:

React local state
Server actions
Database as source of truth

Database is the single source of truth.


ERROR HANDLING STRATEGY
Validation errors:

Return structured error object
Display near form fields

Authentication errors:

Redirect to login page

Database errors:

Fail safely
Do not expose internal details


PERFORMANCE STRATEGY
Use server-side data fetching
Avoid unnecessary client components
Keep dependencies minimal
Avoid heavy libraries


SCALABILITY PRINCIPLES
Even though system is simple, structure must allow:

Future multi-user support
Database change from SQLite to PostgreSQL
Easy UI expansion
Additional project fields

Design must be modular and extendable without refactor.


FINAL ARCHITECTURE GOAL
The system must ensure:

Clear separation of concerns
Secure admin access
Clean code boundaries
Maintainable structure
Simple content update workflow
Owner has exclusive control


