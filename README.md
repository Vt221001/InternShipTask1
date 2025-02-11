Task Management Application

Overview

This is a simple Task Management application built using Next.js with Server Actions. Users can create, view, edit, and delete tasks while also marking them as complete or incomplete. The application persists data using MongoDB and is deployed on Vercel.

Live Demo

Vercel Deployment: https://internshiptask1.vedanshtiwari.tech/task

GitHub Repository: (https://github.com/Vt221001/InternShipTask1)

Features

✅ Task Operations: Create, Read, Update, and Delete tasks.

✅ Mark Tasks as Complete/Incomplete: Toggle task completion status.

✅ Task Details: Each task has a title, description, and due date.

✅ Data Persistence: MongoDB is used to store tasks permanently.

✅ Error Handling: Proper error messages and validations are implemented.

✅ Loading States: UI displays loading indicators for smooth user experience.

Tech Stack

Frontend: Next.js (Latest Version)

Backend: Next.js Server Actions

Database: MongoDB (via Mongoose)

Deployment: Vercel

UI Library: Tailwind CSS (for styling)

Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/Vt221001/InternShipTask1.git
cd InternShipTask1

2️⃣ Install Dependencies

npm install
3️⃣ Set Up Environment Variables

Create a .env.local file in the root directory and add the following
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000


4️⃣ Run the Application Locally

npm run dev

Visit http://localhost:3000 in your browser.