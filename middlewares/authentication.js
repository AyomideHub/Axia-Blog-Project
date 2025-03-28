const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
	const token = req.signedCookies.token
	if(!token){
		return res.status(StatusCodes.UNAUTHORIZED).json({success: false, msg: "Unauthorized"})
	}
	
	const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
	if(!verifyToken){
		return res.status(StatusCodes.UNAUTHORIZED).json({success: false, msg: "Unauthorized"})
	}
	req.user = verifyToken
	next()
}


module.exports = {authenticateUser}