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


# Get the storage account key and name and add to env secrets in github