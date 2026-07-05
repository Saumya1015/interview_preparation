const { Router } = require('express') // destructure krkr router require expree.Router ki jagh
const authController = require("../controllers/auth.controller") // object require
const authMiddleware = require("../middlewares/auth.middleware")

const authRouter = Router()

// here only api create noo logic


// js comment string
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController)



/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)


/**
 * @route GET /api/auth/logout
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
authRouter.get("/logout", authController.logoutUserController)



//api knsi user request a  rhi or toekn blacklist hai ya ni ye bhi btya
/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
authRouter.get("/get-me", authMiddleware.authUser, authController.getMeController)
// here middlware tell request kis user ne ki hai

module.exports = authRouter