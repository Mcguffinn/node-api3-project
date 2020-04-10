const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

//middleware
server.use(logger);
server.use(morgan("dev"));
server.use(express.json());
server.use(helmet());


server.use(`/api/users`, userRouter)
server.use(`/api/posts`, postRouter)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalURl}`);

  next();
}




module.exports = server;
