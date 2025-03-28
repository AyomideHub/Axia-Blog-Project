const router = require('express').Router()
const  {authenticateUser} = require('../middlewares/authentication')
const {createComment, getSingleComment, deleteComment} = require('../controllers/comments.controller')


router.route('/').post(authenticateUser, createComment)
router.route('/:id').delete(authenticateUser, deleteComment).get(authenticateUser, getSingleComment)



module.exports = router