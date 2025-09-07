# Tula's Pet Adoption
A light weight React + Vite app with AWS DynamoDB backend, styled with **Material UI (MUI)** and a small **Sass** file.
## Screen Shot
![Table + App](src/assets/images/tableAndApp.png)
## Overview
This project is a simple pet adoption app building in small bit size steps.
- Planning
- Creating a React app with Vite
- Preparing AWS files, env and clients stub
- Creating the DynamoDB Pet Table
- Implement CRUD (list/add/adopt/rename/delete)
- Split UI into components + add a sticky footer
## Tech Stack
- React (Vite)
- AWS DynamoDB
- Material UI
- Sass (SCSS)
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
Vite only exposes env vars that start w/ VITE_.
Safe Template .env.example included with no secrets
## DynamoDB Setup
Create a Pet table in the same region as VITE_AWS_REGION (us-east-2):
- Table name: Pet
- Partition key: id (String)
- Billing mode: On-demand (default is fine)
## Git ignore safety
```
Env Files:
.env
.env.local
.env.*.local
.env.*
!.env.example
```
## Scripts
- `npm run dev` - start the dev server
- `npm run build` - build for production
- `npm run preview` - preview a production build locally
- `npm run lint` - run ESLint 

## Project Structure
```
tulas-pet-adoption/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ Footer.jsx
│  │  ├─ ErrorAlert.jsx
│  │  ├─ AddPetForm.jsx
│  │  └─ PetItem.jsx
│  ├─ styles/
│  │  └─ main.scss          
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ theme.js              
│  ├─ aws.js                
│  └─ petsApi.js            
├─ .env.local               
├─ .env.example             
├─ index.html               
├─ package.json
├─ vite.config.js
└─ README.md

```
**(just figured out that ``` would make my structure stay in a tree)**

## links to follow
## screen shots to follow
