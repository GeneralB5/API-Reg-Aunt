import { Router } from "express";
const weatherRoute = Router()
weatherRoute.get("/weather",async(req,res,next)=>
    {
        try {
            const city_name = "buenos"
            const dataFromAPi = await fetch(URL)
            if(!dataFromAPi) res.status(500).send({status:"Bad",payload:"Not getting any information ;( "})
            const dataJson = await dataFromAPi.json()
            
            res.status(200).send({status:"Ok",payload:dataJson})
        } catch (error) {
            console.log(error)
            next(error)
        }
    })
weatherRoute.get("/weather/:city",viewControl.register)

export default viewRoute