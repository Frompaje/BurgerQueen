import { UserDoesntExist } from "../../err/user/user-doesnt-exist";
import { UserRepository } from "../../interface/user-repository";

interface UpdatedUseCaseRequest {
  id: string;
  email: string;
  name?: string;
  address?: string;
}

export class UpdateUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ id, email, name, address }: UpdatedUseCaseRequest) {
    const isUserExist = await this.userRepository.findUserByIdAndEmail(
      id,
      email
    );

    if (!isUserExist) {
      throw new UserDoesntExist();
    }

    const user = await this.userRepository.update(id, name, address);

    return user;
  }
}
