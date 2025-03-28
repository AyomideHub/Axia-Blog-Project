const router = require('express').Router()
const  {authenticateUser} = require('../middlewares/authentication')
const {createPost, getAllPosts, getSinglePost, updatePost, deletePost} = require('../controllers/posts.controller')


router.route('/').post(authenticateUser, createPost).get(authenticateUser, getAllPosts)
router.route('/:id').patch(authenticateUser, updatePost).delete(authenticateUser, deletePost).get(authenticateUser, getSinglePost)



module.exports = router