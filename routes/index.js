import { Router } from "express";
import router from "./api/users.js";
import viewRoute from "./api/view.js";
const Routes = Router()

Routes.use("/user",router)
Routes.use("/",viewRoute)

export default Routes
