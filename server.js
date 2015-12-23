// modules (note: we are using middleware modules directly without requiring them here first)
const express = require('express');

// create express app
const port = process.env.PORT || 3000;
const app = express();

// set up application level middleware
app.use(require('body-parser').urlencoded({extended:true}));	// TODO to be frank: no clue why extended set to true

// set up view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// routing
app.use('/', require('./routers/index'));
app.use('/login', require('./routers/login'));
app.use('/auth', require('./routers/auth'));


// serve 
console.log(`serving at http://localhost:${port}`);
app.listen(port);

