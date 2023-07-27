const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app;

const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

app.use(bodyParser.json());

const apiRouter = require('./server/api');
app.use('/api', apiRouter);

// This conditional is here for testing purposes:
if (!module.parent) { 
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
}
