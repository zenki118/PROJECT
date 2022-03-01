const mongoose = require("mongoose");
require("dotenv").config();
const app  = require("./app");
const jwt = require("jwt-then")

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
const server = app.listen(8000, () => {
    console.log("sever is running on port 8000")
})

const io = require('socket.io')(server);

io.use(async (socket, next) => {
    try {
      const token = socket.handshake.query.token;
      const payload = await jwt.verify(token, process.env.SECRET);
      socket.userId = payload.id;
      next();
    } catch (err) {}
  });

  io.on('connection', (socket) =>{
    console.log("Connected: " + socket.userId);

    socket.on('disconnect', () => {
        console.log("Disconnected: " + socket.userId);
    })
  })