PROJECT OBJECTIVE
Build a complete, minimal, professional portfolio website with a private admin dashboard that allows the owner to upload and manage projects securely.

The system must be simple, secure, and easy to maintain.
The owner must be the only person with permission to add, edit, or delete projects.


REQUIRED STACK
Use exactly the following technologies:

Next.js (App Router)
TypeScript
Tailwind CSS
Prisma ORM
SQLite (local database)
NextAuth (Credentials Provider only)
bcrypt (password hashing)

Do not replace or add alternatives.


PROJECT STRUCTURE OVERVIEW
The system must contain two main parts:

Public website
Private admin dashboard

The admin dashboard is for content management only and must be protected by authentication.


PUBLIC WEBSITE PAGES
Home Page /
Must include:

Hero section:
Name
Role
Short tagline
Featured projects section:
Show latest 3 featured projects
Navigation bar
Footer


Portfolio Page /portfolio
Display all projects in a responsive grid:

Desktop: 3 columns
Tablet: 2 columns
Mobile: 1 column

Each project card must show:

Cover image
Title
Short description
Tags or tools

Each card must link to its detail page.


Project Detail Page /projects/[slug]
Must include:

Large cover image
Full project description/content
Image gallery (multiple images)
Tools used
Optional external link

Slug must be unique and used in the URL.


ADMIN PANEL
Route

/admin

This route must be protected and require login.

Unauthorized users must not access it.


Admin Capabilities
Admin must be able to:

Add new project
Edit existing project
Delete project
Upload cover image
Upload multiple gallery images
Mark project as featured

After saving:

The project must automatically appear on the public website.


AUTHENTICATION REQUIREMENTS
Credentials-based login only
One admin account only
No user registration
No roles system
Password must be hashed using bcrypt
Sessions required to access admin routes

Admin credentials must be stored securely in the database.


DATABASE DESIGN
Create Prisma models:
Project
Fields:

id (cuid string)
title (string)
slug (string, unique)
shortDescription (string)
content (text)
coverImage (string)
gallery (string array)
tools (string array)
featured (boolean)
createdAt (datetime)
updatedAt (datetime)


Admin
Fields:

id
username
passwordHash

Seed the database with one default admin user.


IMAGE UPLOAD SYSTEM
Requirements:

Upload images through admin panel
Store files in:

/public/uploads

Accept images only
Generate unique filenames
Save file paths in the database
Support:
1 cover image
Multiple gallery images


UI DESIGN GUIDELINES
Style must be:

Minimal
Clean
Professional
Neutral color palette
Strong typography hierarchy
Consistent spacing
Fully responsive
Mobile-first

Use Tailwind CSS utilities only.

Create reusable components:

Navbar
Footer
ProjectCard
ProjectForm
AdminLayout


ROUTING REQUIREMENTS
Use App Router structure:

/app/page.tsx
/app/portfolio/page.tsx
/app/projects/[slug]/page.tsx
/app/admin/page.tsx
/app/admin/projects/new/page.tsx
/app/admin/projects/edit/[id]/page.tsx


ENVIRONMENT VARIABLES
Use .env for sensitive data:

Required variables:

DATABASE_URL= NEXTAUTH_SECRET=

Also include:

.env.example


DEPLOYMENT READINESS
The project must:

Run locally without errors
Work after database migration
Be ready for deployment to Vercel or Node hosting
Not rely on external services


DATA FLOW EXPECTATION
Admin workflow:

Login
Go to admin dashboard
Click "Add Project"
Fill form:
Title
Description
Tools
Upload images
Save

Result:

Project stored in database
Images stored in /public/uploads
Project visible on public pages


ERROR HANDLING
Prevent duplicate slugs
Validate required fields
Reject non-image uploads
Prevent unauthorized admin access


FINAL GOAL
Deliver a fully working portfolio system where:

Owner has full control
No one else has upload authority
New projects can be added easily
Public site updates automatically
Codebase is clean, simple, and maintainable



