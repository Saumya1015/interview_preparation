// server instance create and middleware and api use

const express = require("express")
const cookieParser = require("cookie-parser")
// const app = require("./src/app")
const cors = require("cors")


const app = express()

app.use(express.json()) // req.body ma data read
app.use(cookieParser())
app.use(cors({
    origin: "https://interview-preparation-frontendd.onrender.com",
    credentials: true
}))

// REQUIRING ALL ROUTES
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


// USING all the routes
app.use("/api/auth",authRouter)  // prefix  -- auth related api ko acess krne ke lia ye age lagan padega
app.use("/api/interview", interviewRouter)










module.exports = app