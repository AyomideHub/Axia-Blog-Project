const { BadRequest, NotFoundError, ServerError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const Post = require("../models/posts.model");

const createPost = async (req, res) => {
  const post = await Post.create({
    ...req.body,
    CreatedBy: req.user.id,
  });
  res.status(StatusCodes.CREATED).json(post);
};

const getAllPosts = async (req, res) => {
  const { sort, order, page, limit, title, category } = req.query;
  const queryObject = {};
  if (title) {
    queryObject.Title = { $regex: name, $options: 'i' };
  }
  if (category) {
    queryObject.Category = { $regex: category, $options: 'i' }; 
  }

 
  const SortBy = sort || "createdAt";
  const OrderBy = order === "asc" ? 1 : -1;
  const sorting = {};
  sorting[SortBy] = OrderBy;
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 5;
  const Skip = (pageNumber - 1) * limitNumber;
  
  const TotalPosts = await Post.countDocuments(queryObject);
  const NumOfPages = Math.ceil(TotalPosts / limitNumber);

  const post = await Post.find(queryObject).sort(sorting).skip(Skip).limit(limitNumber);
  if (!post) throw new NotFoundError("No Post found");
  res.status(StatusCodes.OK).json({ post, TotalPosts, NumOfPages, PostsPerPage: post.length});
};

const getSinglePost = async (req, res) => {
  const post = await Post.findById({
    _id: req.params.id,
  }).populate('comments');
  if (!post) throw new NotFoundError("No Post found");
  res.status(StatusCodes.OK).json({ post });
};

const updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { CreatedBy: req.user.id, _id: req.params.id },
    { ...req.body },
    { runValidators: true, new: true }
  );
  if (!post) throw new NotFoundError("No Post found");
  res.status(StatusCodes.OK).json(post);
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      CreatedBy: req.user.id,
      _id: req.params.id,
    });
    if (!post) {
      throw new NotFoundError("No Post found");
    }
    await post.deleteOne(); 
    res.status(StatusCodes.OK).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error); 
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};
