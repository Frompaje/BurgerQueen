import { compare, hash } from "bcryptjs";

export interface Hash {
  hash(payload: string): Promise<string>;
  compare(data: string, payload: string): Promise<boolean>;
}

export class Hasher implements Hash {
  private SALT = 6;

  async hash(payload: string): Promise<string> {
    const hashed = await hash(payload, this.SALT);

    return hashed;
  }
  async compare(data: string, payload: string): Promise<boolean> {
    const result = await compare(data, payload);
    return result;
  }
}
