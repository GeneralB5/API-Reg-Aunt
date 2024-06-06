import { Router } from "express";

const userRouter = Router()

userRouter.get('/', function(req, res, next) {
  res.send('respond with sa resource');
});

export default userRouter
