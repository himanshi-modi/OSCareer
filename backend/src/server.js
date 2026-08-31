require("dotenv").config();
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);


const connectDB=require("./config/db");
const app=require("./app");




const startServer= async () =>{
    await connectDB();
    app.listen(process.env.PORT,()=>{
        console.log(`App is listening on port ${process.env.PORT}`);
    })
};

startServer();


