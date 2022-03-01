const mongoose = require("mongoose");
require("dotenv").config();
const app  = require("./app");


mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
   })

mongoose.connection.once("open", () => {
    console.log("MongoDB Connected!");
   });

//Bring in the models
require("./models/User");
require("./models/Chatroom");
require("./models/Message");
app.listen(8000, () => {
    console.log("sever is running on port 8000")
})