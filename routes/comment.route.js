const router = require('express').Router()
const  {authenticateUser} = require('../middlewares/authentication')
const {createComment, getAllComments, getSingleComment, deleteComment} = require('../controllers/comments.controller')


router.route('/').comment(authenticateUser, createComment).get(authenticateUser, getAllComments)
router.route('/:id').delete(authenticateUser, deleteComment).get(authenticateUser, getSingleComment)



module.exports = router