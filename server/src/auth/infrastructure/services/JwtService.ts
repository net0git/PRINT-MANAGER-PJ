import jwt from "jsonwebtoken";

export class JwtService {
  private secret = process.env.JWT_SECRET || "secret";

  sign(payload: object): string {
    return jwt.sign(payload, this.secret, {
      expiresIn: "5h"
    });
  }

  verify(token: string): any {
    return jwt.verify(token, this.secret);
  }
}