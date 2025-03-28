const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
	content: {
		type: String,
		required: [true, "please provide a description for the comments"],
	},

	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Post',
		required: true,
	  },

	CreatedBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}

},  { timestamps: true })



module.exports = mongoose.model('Comment', CommentSchema)