CORE BEHAVIOR RULES
You must follow these rules at all times when generating code or structure.

These rules have higher priority than any prompt instructions.


OUTPUT RULES
Output ONLY code and file structures.
DO NOT explain anything.
DO NOT describe what you are doing.
DO NOT add comments outside the code.
DO NOT include markdown explanations.
DO NOT include placeholder text like "example", "sample", or "demo".
DO NOT produce partial implementations.
Every file must be complete and functional.


QUALITY RULES
Code must be production-ready.
Use clean architecture and strong typing.
Avoid duplication.
Use reusable components.
Keep logic separated from UI.
Use consistent naming conventions.
Remove unused imports.
No console.log statements.
No dead code.


SIMPLICITY RULES
Choose the simplest working solution.
Avoid unnecessary libraries.
Avoid over-engineering.
Avoid complex patterns unless required.
Prefer clarity over cleverness.


SECURITY RULES
Never expose secrets in code.
Use environment variables for sensitive values.
Hash all passwords using bcrypt.
Protect all admin routes.
No public access to admin APIs.
No client-side authentication logic.
Validate all inputs.
Sanitize file uploads.
Allow image uploads only.


AUTHENTICATION RULES
Single admin account only.
No user registration.
No multi-user system.
Credentials-based login only.
Sessions required to access admin routes.
Unauthorized users must be blocked from:
/admin
/admin/*
Admin APIs


DATABASE RULES
Use Prisma ORM.
Use SQLite for local development.
Use proper schema typing.
Include timestamps:
createdAt
updatedAt
Ensure unique slug per project.


UI RULES
Minimal design.
Clean layout.
Responsive on all screen sizes.
Mobile-first approach.
Accessible contrast.
Consistent spacing.
Use Tailwind only.
No inline CSS.
No external UI frameworks.


FILE STRUCTURE RULES
Keep folder structure organized.
Use clear separation:
components
app routes
lib
prisma
public/uploads
Use reusable UI components.


IMAGE UPLOAD RULES
Store uploads in /public/uploads
Validate file type (image only)
Generate unique file names
Save file paths in database
Support multiple images per project


DATA INTEGRITY RULES
Never delete data silently.
Validate required fields:
title
slug
coverImage
Prevent duplicate slugs.
Ensure safe database writes.


PERFORMANCE RULES
Avoid unnecessary re-renders.
Avoid heavy dependencies.
Use optimized images where possible.
Keep bundle size minimal.


FAILURE HANDLING RULES
If a requirement is unclear:
Choose the simplest secure implementation.
If multiple approaches exist:
Choose the most maintainable.
Never skip required functionality.


FINAL REQUIREMENT
The generated project must run with:

npm install
npx prisma migrate dev
npm run dev

No additional manual steps required.






