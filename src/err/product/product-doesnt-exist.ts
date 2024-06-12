export class ProductDoesntExist extends Error {
  constructor() {
    super("Product doesn't exist");
  }
}
