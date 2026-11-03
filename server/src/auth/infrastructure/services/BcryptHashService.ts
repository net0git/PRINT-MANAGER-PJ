import { HashService } from "../../application/services/HashService";
import bcrypt from "bcryptjs";

export class BcryptHashService implements HashService {
 
   
    async compare(plain: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(plain, hash);
    }       
}