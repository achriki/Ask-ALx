const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
// import messages from './utils/auth';
dotenv.config();

const port = process.env.PORT || 8080;
import routerController from './routes';

// set up express server middlewares
const app = express();
const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true
}

app.use(bodyParser.urlencoded({extended: true, limit:'50mb'}));
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    // Set CORS headers to allow requests from any origin
    res.header('Access-Control-Allow-Origin', '*');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
});
//set router controller
routerController(app);


//start the http server
const server = http.createServer(app);
server.listen(port, 'localhost', (err)=>{
    if(err){
        console.log('Server err: ', err.message);
    }
    console.log(`Server running on port ${port}`);
})