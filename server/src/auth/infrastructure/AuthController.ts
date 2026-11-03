import { Request, Response } from "express";
import { LoginUser } from "../application/login/LoginUser";

export class AuthController {
  constructor(private loginUser: LoginUser) {}

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const result = await this.loginUser.execute(username, password);

      res.status(200).json(result);

    } catch (error: any) {
      console.error("Login error:", error);

      if (error.message === "Usuario inactivo") {
        res.status(403).json({
          message: "Usuario inactivo"
        });
        return;
      }

      res.status(401).json({
        message: "Invalid credentials"
      });
    }
  }
}