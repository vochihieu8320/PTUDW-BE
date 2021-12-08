
const express = require('express');
import db from './db/db'
import route from './routes/index'
import { createServer } from "http";
import { Server, Socket } from "socket.io";


const cors = require("cors");
const app = express();
app.use(
    cors(
        {
            origin: process.env.Domain_Fe
        }
    )
)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT  || 3000;

const httpServer = createServer(app);
//create socker server
const io = new Server(httpServer, { 
    cors: {
        origin: process.env.Domain_Fe,
      }
});

//conect to DB
db();

//create a namspace in order to authentication socket client


const adminNamespace = io.of("/admin");
adminNamespace.on("connection", (socket)=>{
    console.log(socket.id);
})  
adminNamespace.use((socket, next) => {
    // ensure the user has sufficient rights
    if(socket.handshake.auth.token)
    {
        console.log("token", socket.handshake.auth.token);

    }
    next();
  });

//clinent comunicate with socker server
io.on("connection",  async(socket) => {

   socket.on("send-messages", async(messages)=>{
   })

});


httpServer.listen(port, ()=>{console.log(`Server listen at ${port}`)})


route(app)