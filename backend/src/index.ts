import express from 'express';

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());

// Listener
app.listen(port, () => console.log(`Server is running on port ${port}`));