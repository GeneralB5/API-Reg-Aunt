import dotenv from "dotenv"
import mongoSingleton from "../utils/mongoSingletone.js"
import { program } from "commander.js"
const {mode} = program.opts()
dotenv.config({
    path: mode === "development"? "./.env.development":"./.env.production"
})
const configObject = {
    MongoDbUrl:process.env.URL,
    apiKey:process.env.APIKEY
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