const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {
  const userInfo = req.body;
  console.log(userInfo + '<--------')
  res.status(200).json(userInfo)
    
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id

  // if (){

  // }
  return res.status(400).json({message: 'invalid user id'})
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
