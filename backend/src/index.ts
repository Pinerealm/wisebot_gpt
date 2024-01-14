import app from './app.js';
import { connectToDB } from './db/connection.js';

/**
 * The port number on which the server will listen.
 * It is determined by the value of the EXPRESS_PORT environment variable, or defaults to 5000.
 */
const PORT = process.env.EXPRESS_PORT || 5000;

// Connect to MongoDB
connectToDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Express Server is running on port ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
