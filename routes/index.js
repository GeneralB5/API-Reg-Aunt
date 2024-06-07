import { Router } from "express";
import router from "./api/users.js";

const Routes = Router()
Routes.use("/user",router)

export default Routes
