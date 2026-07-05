const jwt = require("jsonwebtoken") // to verify token
const tokenBlacklistModel = require("../models/blacklist.model")



async function authUser(req, res, next) {

    const token = req.cookies.token
 // if no user user not identified 
    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        })
    }




   // to chcek token clacklist toh ni hai

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({
        token
    })

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "token is invalid"
        })
    }


     // if token mila then check shi ya token ya fake hai token  midddlewware
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) // if data shi hai toh decoded ke ander data save

        req.user = decoded   // konse user ki req hai 
        // new property set krke contoller ko dedeta through next()

        next()

    } catch (err) {
    // if token fake then err throw
        return res.status(401).json({
            message: "Invalid token."
        })
    }

}


module.exports = { authUser }

//token valid hai ya ni ye chcek blacklist toh ni ye chcekkk