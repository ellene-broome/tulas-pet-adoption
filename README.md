# Tula's Pet Adoption
A light weight React + Vite app with AWS DynamoDB backend
## Overview
This project is a simple pet adoption app building in small bit size steps.
- Planning
- Creating a React app with Vite
- Preparing AWS files, env and clients stubs
- Creating the DynamoDB Pet Table
- First commit and push
## Tech Stack
- React (Vite)
- AWS DynamoDB
- JavaScript
## Requirements
- Node.js 18+
- AWS account with an IAM user that has DynamoDB permissions
- Git and GitHub
## Qick Start
```
- Clone your GitHub repo
- git clone https://github.com/ellene-broome/tulas-pet-adoption.git
- cd tulas-pet-adoption
- Install dependencies
    npm install
- Run in dev mode
    npm run dev
```
Open the printed URL
## Environment Variables
Create an .env.local at the project root. **( Do Not Commit )**
```
VITE_AWS_REGION=us-east-2
VITE_AWS_ACCESS_KEY_ID=YOUR_KEY_ID
VITE_AWS_SECRET_ACCESS_KEY=YOUR_SECRET
VITE_DDB_TABLE=Pet
```
**Important** Vite only exposes env vars that start w/ VITE_.
Safe Template .env.example included with no secrets:

## Git ignore safety includes:
```
Env Files:
.env
.env.local
.env.*.local
.env.*
!.env.example
```
## DynamoDB Setup
Ceate a **pet** table in same Region as `VITE_AWS_REGION`.
**Console path:** AWS Console → Tables → Create table
- **Table name:** `Pet`
- **Partition key: `id` (String)
- Billing: (default)
## Project Structure
```
tulas-pet-adoption/
├─ public/
├─ src/
│ ├─ App.jsx
│ ├─ main.jsx
│ ├─ aws.js # DynamoDB client (DocumentClient)
│ ├─ petsApi.js # API functions (list/add/markAdopted)
│ └─ assets/ # images/icons (optional)
├─ .env.local # local only (ignored)
├─ .env.example # safe template (committed)
├─ index.html # set <title>Tula’s Pet Adoption</title>
├─ package.json
├─ vite.config.js
└─ README.md
```
**(just figured out that ``` would make my structure saty in a tree)**
## NPM Scripts
- `npm run dev` - start the dev server
- `npm run build` - build for production
- `npm run preview` - preview a production build locally
- `npm run lint` - run ESLint 

## links to follow
## screen shots to follow