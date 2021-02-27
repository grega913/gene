const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes');

//CORS requirements
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

//  Connect all our routes to our application
app.use('/', routes);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})