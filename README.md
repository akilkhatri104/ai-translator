# AI Translator

This is an AI-powered translator built using Langchain.js. The application consists of a React.js frontend and a Node.js backend. It leverages Google Cloud's Vertex AI for translation and language detection.

## Features

- Translate text between multiple languages.
- Detect the language of the input text.
- Simple and user-friendly interface.

## Installation Instructions

### Prerequisites

- Node.js installed on your system.
- A Google Cloud account with Vertex AI enabled.

### Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd AI Translator
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables:**
   - For the backend:
     - Copy `.env-sample` to `.env` in the `server` directory.
     - Fill in the required values such as `GOOGLE_WEB_CREDENTIALS`, `GOOGLE_PROJECT_ID`, and `GEMINI_MODEL`.
   - For the frontend:
     - Copy `.env-sample` to `.env` in the `client` directory.
     - Set `VITE_BACKEND_URL` to the backend URL (e.g., `http://localhost:3000`).

5. **Start the backend server:**
   ```bash
   cd ../server
   npm run dev
   ```

6. **Start the frontend development server:**
   ```bash
   cd ../client
   npm run dev
   ```

7. **Access the application:**
   Open your browser and navigate to `http://localhost:5173` (default Vite port).

## Folder Structure

- `client/`: Contains the React.js frontend.
- `server/`: Contains the Node.js backend.
- `client/src/components/`: Reusable React components.
- `server/model.js`: Handles translation and language detection using Google Cloud's Vertex AI.

## Notes

- Ensure that your Google Cloud credentials are correctly configured in the backend `.env` file.
- The application uses Tailwind CSS for styling and Axios for making API requests.

