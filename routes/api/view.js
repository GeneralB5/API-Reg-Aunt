import { Router } from "express";
import viewController from "../../controller/viewController.js";

const viewRoute = Router()
const viewControl = new viewController()
viewRoute.get("/login",viewControl.login)
viewRoute.get("/register",viewControl.register)

export default viewRoute