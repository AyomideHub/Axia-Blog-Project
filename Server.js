require('dotenv').config()
require('express-async-errors');
const express = require('express')
const cookieParser = require('cookie-parser')
const {connectdb} = require('./db/db')
const AuthRoute = require('./routes/auth.route')
const PostRoute = require('./routes/posts.route')
const CommentRoute = require('./routes/comment.route')
const {wrongRoute} = require('./middlewares/wrongRoute')
const {errorhandlersMiddleware} = require('./middlewares/errorHandler')

const app = express()

// middleware
app.use(cookieParser(process.env.COOKIES_SECRET))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// routes
app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/posts', PostRoute)
app.use('/api/v1/comments',CommentRoute)


// errors
app.use(wrongRoute)
app.use(errorhandlersMiddleware)


const port = process.env.PORT || 5000
const start = async () => {
	try {
		await connectdb(process.env.MONGO_URI)
		app.listen(port, () => {
			console.log('server is running');
		})
	} catch (error) {
		console.log(error);
	}
}

start()
