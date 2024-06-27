# This is a repo to contaierize a next.js app
# Take the flask repo url and make button that gets the list of alubms.

# Do this to run the app
1) npm install

2) npm run dev

3) npm install axios 


# Build dockerized app
1) docker build -t nextjs-app .

2) docker run -p 3000:3000 nextjs-app


# Make service principle for the repo
az login

az ad sp create-for-rbac --name "nextjsserviceprinciple" --role Contributor --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group-name} --sdk-auth


# Make github actions in .github/workflow/deploy.yml


# Adding aad auth. 
npm install next-auth axios




# Configure next-auth in your Next.js app:

Create a file named [...nextauth].ts in the pages/api/auth directory:

ts
---------------------------------------------
#update your .env.local file with your Azure AD credentials:
------------------------------
makefile
.env.local
---------------
AZURE_AD_CLIENT_ID=your-azure-ad-client-id
AZURE_AD_CLIENT_SECRET=your-azure-ad-client-secret
AZURE_AD_TENANT_ID=your-azure-ad-tenant-id
NEXTAUTH_URL=http://localhost:3000

---------------------------------------------
add a file in /types/nex-auth.d.ts 
---------------
Create a file to extend the session type: Create a new file, for example, next-auth.d.ts in your project's root or inside a types folder.
typescript
Copy code
// next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

---------------------------------------------
Add a file in pages/api/auth directory // pages/api/auth/[...nextauth].ts
----------------

-------------------------------------------------------
# Remove in appp auth
pages/api/auth/[...nextauth].ts: This file is no longer needed because you're relying on the Static Web Apps authentication mechanism rather than next-auth.

types/next-auth.d.ts: If you were using next-auth specific types, you can remove this file.

ClientSessionProvider component import and usage: This component, which might be handling session context, can be removed from app/layout.tsx and deleted if it was custom-made.

next-auth dependency: You can remove next-auth from your package.json dependencies since you are no longer using it.