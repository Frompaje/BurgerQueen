export class OrderDoesntExist extends Error {
  constructor() {
    super("Order doesn't exist");
  }
}
