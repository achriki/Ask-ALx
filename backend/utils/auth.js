import { ConvexHttpClient, ConvexClient } from "convex/browser";
import dotenv from "dotenv";
import { api } from "./convex/_generated/api.js";
dotenv.config({ path: ".env" });


//console authentication query
console.log("env variable: ", process.env.CONVEX_URL)



// //create 
// const messages = await httpClient.query(api.messages.list);


// export default messages