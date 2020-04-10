const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();

router.post('/', validateUser,(req, res) => {
  const userInfo = req.body;
  Users.insert(userInfo)
    .then(x => {
      res.status(201).json({x}) 
    }) 
    .catch(err =>{
      console.log(err)
      res.status(500).json({message: "Server error", err})
    })
});

router.post('/:id/posts', validateUser, validatePost,(req, res) => {
  Users.insert(req.params.body)
});

router.get('/', (req, res) => {
  Users.get()
    .then( user =>{
      if (user) {
        res.status(200).json({message: "Users sent", user})
      } else {
        res.status(404).json({message: "Users not found"})
      }
    })
});

router.get('/:id', validateUserId,(req, res) => {
  Users.getById(req.params.id)
    .then( user => {
        res.status(200).json({message: "Users sent", user})
    })
});

router.get('/:id/posts', validateUserId,(req, res) => {
  Users.getUserPosts(req.params.id)
    .then( x => {
      res.status(200).json({x})
    })
    .catch(err =>{
      res.status(500).json({message: "No body found", err})
    })
});

router.delete('/:id', validateUserId,(req, res) => {
  Users.remove(req.params.id)
  .then( count =>{
    res.status(200).json({message: "Users removed", count})
  })
  .catch(err =>{
    res.status(500).json({message: "No User found", err})
  })
});

router.put('/:id', validatePost, (req, res) => {
  Users.update(req.params.id, req.body.text)
  .then(post => {
    res.status(200).json({message: "Post added", post})
  })
  .catch(err =>{
    res.status(500).json({message: "Post wasnt added", err})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  Users.getById(id)
  .then( x =>{
    if (x) {
      next()
    } else {
      res.status(404).json({message: 'invalid user id'})
    }
  })
  .catch(err =>{
    res.status(500).json({message: "Server error", error})
  })
}

function validateUser(req, res, next) {
  const data = req.body;
  if (Object.keys(data).length === 0){
    res.status(400).json({message: "No data to be found"})
  }else if ( !data.name ){
    res.status(400).json({message: "missing required 'name' field"})
  }else{
    next()
  }
    
}

function validatePost(req, res, next) {
  if(Object.keys(req.body).length === 0){
    res.status(400).json({message: "No data to be found"})
  }else if ( !req.body.text ){
    res.status(400).json({message: "missing required text field"})
  }else{
    next()
  }
}

module.exports = router;
