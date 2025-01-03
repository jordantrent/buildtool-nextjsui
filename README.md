# BuildTool Frontend

This repository contains the backend for the Buildtool project, a simple tool designed to consume and display data from a Jenkins Pipeline, via the Jenkins API.

The front end is build using Next.JS with ShadCN components.
---

## Features

- **Modern UI**: Minimalist and responsive design using ShadCN components.
- **Job Details**: Input your Jenkins Credentials and see all of your Jobs.
- **Build Details**: Check on builds, see status, duration, raw console output.
- 
---

## Tech Stack

- **Framework**: Next.js (React-based)
- **UI Library**: ShadCN
- **Table Management**: TanStack Table
- **Backend Integration**: API calls to the Spring Boot backend

---

## Installation & Setup

### Prerequisites

- Node.js 18+
- Access to the Build Tool backend API (See [BuildTool Backend](https://github.com/jordantrent/buildtool-api))

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/jordantrent/buildtool-nextjsui.git
   cd buildtool-nextjsui

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev

4. Open the app in your browser: http://locahost:3000

