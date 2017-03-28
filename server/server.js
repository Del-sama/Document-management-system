const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send({ message: 'Hello world!' });
});

app.listen(5050, () => {
  console.log('app is listening on port 5050');
});
