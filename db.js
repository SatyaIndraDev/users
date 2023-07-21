const mongoose=require("mongoose");

const connection = mongoose.connect("mongodb+srv://satyaindrad:321@cluster0.i9igcos.mongodb.net/users?retryWrites=true&w=majority")

module.exports={
    connection
}