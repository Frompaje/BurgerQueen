import { compare, hash } from "bcryptjs";

export interface Hash {
  hash(payload: string): Promise<string>;
  compare(data: string, payload: string): Promise<boolean>;
}

export class hasher implements Hash {
  private SALT = 6;
  hash(payload: string): Promise<string> {
    return hash(payload, this.SALT);
  }
  compare(data: string, payload: string): Promise<boolean> {
    return compare(data, payload);
  }
}
