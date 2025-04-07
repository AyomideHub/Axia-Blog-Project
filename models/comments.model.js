const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
	content: {
		type: String,
		required: [true, "please provide a description for the comments"],
	},

	postID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
	  },

	CreatedBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	parentCommentId:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment',
		default: null
	}

},  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

CommentSchema.virtual('childComments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'parentCommentId',
	justOne: false,
  });
  

module.exports = mongoose.model('Comment', CommentSchema)