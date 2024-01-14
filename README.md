# WiseBOT - AI Chatbot

This is an AI Chatbot application, inspired by ChatGPT, built using the MERN Stack and OpenAI.

It's a customized chatbot where each message of the user is stored in a DB and can be retrieved and deleted.

It's a completely secure application using JWT Tokens, HTTP-Only Cookies, Signed Cookies, Password Encryption, and Middleware Chains.

## Project Structure

The project is divided into two main parts: the backend and the frontend.

- `backend/`: This is where the server-side code resides. It's a Node.js application written in TypeScript. It includes the main server file (`app.ts`), configuration files (like `openai-config.ts`), controller files (like `chat-controllers.ts` and `user-controllers.ts`), and utility functions.

- `frontend/`: This is where the client-side code resides. It's a React application also written in TypeScript. It includes the main application file (`App.tsx`), component files, context files, helper functions, and static assets.

Each part has its own `package.json` file for managing dependencies and scripts, and a `tsconfig.json` file for TypeScript configuration.

## Usage

### Backend

1. Navigate to the `backend/` directory.
2. Install the dependencies by running `npm install`.
3. Start the server by running `npm start`.

### Frontend

1. Navigate to the `frontend/` directory.
2. Install the dependencies by running `npm install`.
3. Start the application by running `npm build`.

Now, you can open your browser and navigate to `http://localhost:5173` to use the application.

Please note that you need to have Node.js and npm installed on your machine to run this application.

Enjoy!
