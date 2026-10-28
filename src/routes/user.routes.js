import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/users", createUser);
