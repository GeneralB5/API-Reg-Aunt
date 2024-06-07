import dotenv from "dotenv"
import mongoSingleton from "../utils/mongoSingletone.js"
dotenv.config({
    path:"./.env.development"
})
const configObject = {
    MongoDbUrl:process.env.URL
}

const connectDb=async()=>{
    if(!configObject.MongoDbUrl){
        console.log("There is not URL")
    }
    mongoSingleton.getInstance(configObject.MongoDbUrl)   
}

export {
    configObject,
    connectDb
}