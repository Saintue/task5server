import Router from "express";
import UserController from "../user-controller.js";
const router = new Router();
const userController = UserController;

router.post("/getData", userController.updateData);

export default router;
