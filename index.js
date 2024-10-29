const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'docs' folder
app.use(express.static('docs'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/docs/index.html');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});