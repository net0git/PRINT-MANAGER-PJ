export interface HashService {
  compare(plain: string, hash: string): Promise<boolean>;
}