import { Router } from "express";
import { AuthController } from "./AuthController";

export function authRoutes(controller: AuthController) {
  const router = Router();

  router.post("/api/auth/login", controller.login.bind(controller));

  return router;
}