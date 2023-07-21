const express=require("express")
const { connection } = require("./db")
const { UserRouter } = require("./Routes/user.route")


const app=express()

const cors=require('cors')
app.use(cors())

app.use(express.json())
app.use("/users",UserRouter)

app.listen(8080,async()=>{
    try {
        await connection
        console.log("Connected to db");
        console.log("running at port 8080");
    } catch (error) {
        console.log("something went wromg");
    }
})