const express = require('express');
const app = express();

app.get('/', function(request, response) {
  response.send({message: 'Hello world!'});
})

app.listen(5050, function() {
  console.log('app is listening on port 5050');
})