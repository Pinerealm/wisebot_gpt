import app from "./app.js";
import { connectToDB } from "./db/connection.js";

const PORT = process.env.EXPRESS_PORT || 5000;

// Connect to MongoDB
connectToDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Express Server is running on port ${PORT}`)
    );
  })
  .catch((error) => console.log(error));
