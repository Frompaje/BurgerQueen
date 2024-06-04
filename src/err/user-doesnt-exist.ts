export class UserDoesntExist extends Error {
  constructor() {
    super("User doesn't exist");
  }
}
