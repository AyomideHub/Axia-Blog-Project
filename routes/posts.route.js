const router = require('express').Router()
const  {authenticateUser, authenticateRole} = require('../middlewares/authentication')
const {createPost, getAllPosts, getSinglePost, updatePost, deletePost} = require('../controllers/posts.controller')


router.route('/').post(authenticateUser, authenticateRole, createPost).get(authenticateUser, getAllPosts)
router.route('/:id').patch(authenticateUser,authenticateRole, updatePost).delete(authenticateUser,authenticateRole, deletePost).get(authenticateUser, getSinglePost)



module.exports = router