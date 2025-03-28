const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
	Name: {
		type: String,
		required: [true, "please provide the name of the post"],
		unique: true,
		immutable: [true, "Can't change the name of the post"]
	},
	content: {
		type: String,
		required: [true, "please provide a description for the posts"],
	},
	Category: {
		type: String,
		required: true,
	},

	CreatedBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}

},  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })

PostSchema.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'post',
	justOne: false,
  });
  
  PostSchema.pre('remove', async function (next) {
	await this.model('Comment').deleteMany({ post: this._id });
  });


module.exports = mongoose.model('Post', PostSchema)