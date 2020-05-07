const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
});

router.get('/:id', validatePostId, async(req, res) => {
  try{
    const proc = await Posts.getById(req.params.id);
    res.status(200).json({proc})
  }catch(err){
    res.status(200).json({message: "No id was found...", err})
  }
});

router.delete('/:id', validatePostId, async(req, res) => {
  try{
    const proc = await Posts.remove(req.params.id);
    res.status(200).json({proc})
  }catch{
    res.status(200).json({message: "No id was found...", err})
  }
});

router.put('/:id', validatePostId, async(req, res) => { 
  const id = req.params.id
  const changes = req.body
  try{
    const proc = await Posts.update(id, changes);
    res.status(200).json({proc})
  }catch(err){
    res.status(200).json({message: `This post ${req.params.id} was not updated...`, err})
  }
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  Posts.getById(req.params.id)
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

module.exports = router;
