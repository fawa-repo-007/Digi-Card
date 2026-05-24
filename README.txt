# Luxury Wedding Website

## Run Locally

1. Create a free MongoDB Atlas cluster (see Deploy section for steps)
2. Add a .env file in the project root:

   MONGODB_URI=mongodb+srv://...your connection string...

3. Install dependencies:

   npm install

4. Start server:

   npm start

5. Open: http://localhost:3000

---

## Deploy To Render

### Step 1 — MongoDB Atlas (free database)

1. Go to https://mongodb.com/atlas and create a free account
2. Click "Build a Database" → choose FREE (M0 Shared)
3. Pick any cloud provider / region → click Create
4. Under "Security > Database Access" → Add Database User
   - Username: weddingadmin (or anything)
   - Password: choose a strong password
   - Role: Read and Write to Any Database
5. Under "Security > Network Access" → Add IP Address
   - Click "Allow Access From Anywhere" (0.0.0.0/0)
   - This lets Render connect
6. Under "Deployment > Database" → click Connect on your cluster
   - Choose "Drivers" → Node.js
   - Copy the connection string — looks like:
     mongodb+srv://weddingadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   - Replace <password> with your actual password

### Step 2 — Push code to GitHub

1. Create a new GitHub repository
2. Push this project:

   git add .
   git commit -m "Add MongoDB database"
   git push origin main

### Step 3 — Deploy on Render

1. Go to https://render.com and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - Build Command:  npm install
   - Start Command:  npm start
5. Click "Advanced" → Add Environment Variable:
   - Key:   MONGODB_URI
   - Value: (paste your Atlas connection string)
6. Click "Create Web Service"

Done — comments are now stored permanently in MongoDB Atlas.
They will NEVER disappear on redeploy or restart.
