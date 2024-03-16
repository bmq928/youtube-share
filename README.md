# Introduction
## Key feature:
  - User registration and login
  - Sharing YouTube videos
  - Viewing a list of shared videos (no need to display up/down votes)
  - Real-time notifications for new video shares: When a user shares a new video, other logged-in users should receive a real-time notification about the newly shared video. This notification can be displayed as a pop-up or a banner in the application, and it should contain the video title and the name of the user who shared it. 
# Prerequisites
## For developer
  - Nodejs (v18.14.0)
  - Pnpm (v8.15.3)
  - Postgres (v15)
  - Docker
  - Docker compose
## For one who just want to test out app
  - Docker
  - Docker compose
# Installation
## For developer
  - git clone
  - pnpm install
# Configuration
## For developer
  - config is in apps/backend/.env and apps/frontend/.env (no need to change)
## For one who just want to test out app
  - change env in docker-compose.yml (no need to change)
# Database Setup
  - For simplicity, migrations in db is run automatically, no need further action.
# Running the application
## For developer
  - docker compose up -d postgres
  - pnpm dev:frontend
  - pnpm dev:backend
  - go to http://localhost:3001 in browser
## For one who just want to test out app  
  - docker compose up -d
  - go to http://localhost:3000 in browser
# Running the test
## For developer
  - docker compose up -d postgres
  - pnpm test:backend
  - pnpm test:frontend
# Docker Deployment
## Publish docker image
  - docker build . -t \<image-name\>
  - docker push \<image-name\>
# Troubleshooting
## Missing env
  - View the logs in backend app, it will show u the missing env
## Cannot connect db
  - Check env TYPEORM_* 