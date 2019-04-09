const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const bgg = require('./api/controllers/bggController');

app.listen(port);

console.log(`RESTful API server started on: ${port}...`);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/v1/users/:userName', (req, res) => {
  const user = bgg.getUser(req.params.userName);
  user.then((data) => { 
    res.send(data);
   })
});