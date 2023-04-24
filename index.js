const app = require("./app");
const socket = require("socket.io");

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    }
})


io.on("connection", (socket)=>{

    // console.log("A user has connected!");

    // listen for incoming message from the client side
    socket.on("message", msg=>{
        io.emit("message", msg);
    });


    // disconnect socket when the user disconnect
    socket.on("disconnect", ()=>{
        // console.log("A user has disconnected!")
    })
})
