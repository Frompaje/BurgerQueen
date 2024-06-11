export class ProductAlreadyExistsError extends Error {
  constructor() {
    super("Product name is already in use.");
  }
}
