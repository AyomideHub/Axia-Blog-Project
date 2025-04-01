const { BadRequest, NotFoundError, ServerError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Comment = require("../models/comments.model");
const Post = require("../models/posts.model");
const { post } = require("../routes/auth.route");

const createComment = async (req, res) => {
  const { content, postId, parentCommentId } = req.body;
  const post = await Post.findById(postId);
  if (!post) throw new NotFoundError("Post doesnot exist");

  if (parentCommentId) {
    const comment = await Comment.findById(parentCommentId);
    if (!comment) throw new NotFoundError("Parent comment doesnot exist");
  }

  const comment = await Comment.create({
    content, 
	post: postId,
	parentComment: parentCommentId || null,
	CreatedBy: req.user.id,
  });
  res.status(StatusCodes.CREATED).json(comment);
};


const getSingleComment = async (req, res) => {
  const comment = await Comment.findById({
    _id: req.params.id,
  }).populate('childComments');
  if (!comment) throw new NotFoundError("No Comment found");
  res.status(StatusCodes.OK).json({ comment });
};


const deleteComment = async (req, res) => {
  const comment = await Comment.findOneAndDelete({
    CreatedBy: req.user.id,
    _id: req.params.id,
  });
  if (!comment) throw new NotFoundError("No Comment found");
  res.status(StatusCodes.OK).json({ message: "Comment deleted successfully" });
};


// NO updateComment endpoint because once a user made a comment it can be edit but can only be deleted
// No getAllComment endpint because when a user get a single post all the post will be automatically populated with all it comment and when a user get a single comment it will be automatically populated by all its childComments


module.exports = {
  createComment,
  getSingleComment,
  deleteComment,
};
