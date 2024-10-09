const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const { ConvexHttpClient } = require('convex/browser');
const { log } = require('console');
const dotenv = require('dotenv');
dotenv.config();

// set up express server middlewares
const app = express();
const corsOption = {
    origin: ['http://localhost:3000'],
    credentials: true
}

app.use(bodyParser.urlencoded({extended: true, limit:'50mb'}));
app.use(cors(corsOption));

//console authentication query
console.log("env variable: ", process.env.CONVEX_URL)
const client = new ConvexHttpClient(process.env.CONVEX_URL);
const getAuthToken = async ()=>{
    try{
        const result = await client.query("authentication");
        console.log(result);
    }catch(err){
        console.log(err)
    }
}
getAuthToken()


//start the http server
const server = http.createServer(app);
server.listen(port, 'localhost', (err)=>{
    if(err){
        console.log('Server err: ', err.message);
    }
    console.log(`Server running on port ${port}`);
})