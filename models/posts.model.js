const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
	title: {
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


// for creating a new field of each comment childcomment in memoroy without persisting it into the database
PostSchema.virtual('comments', {
	ref: 'Comment',
	localField: '_id',
	foreignField: 'postID',
	justOne: false,
  });


  // if the admin delete a post all the comment attached to the post will be deleted 
  PostSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
	try {
	  await this.model('Comment').deleteMany({ postID: this._id });
	  next();
	} catch (error) {
	  next(error);
	}
  });
  

module.exports = mongoose.model('Post', PostSchema)