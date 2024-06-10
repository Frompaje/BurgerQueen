import { compare, hash } from "bcryptjs";

export interface Hash {
  hash(payload: string): Promise<string>;
  compare(data: string, payload: string): Promise<boolean>;
}

export class Hasher implements Hash {
  private SALT = 6;
  async hash(payload: string): Promise<string> {
    return await hash(payload, this.SALT);
  }

  async compare(data: string, payload: string): Promise<boolean> {
    return await compare(data, payload);
  }
}
