require('dotenv').config({ path: './src/config/.env' });
const loaders = require('./src//loaders')
const express = require('express');

async function startServer() {

  const app = express();

  await loaders({ expressApp: app });

  app.listen(process.env.PORT, err => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Your server is ready !`);
  });
}

startServer();

