import { UserDoesntExist } from "../err/user-doesnt-exist";
import { UserRepository } from "../interface/user-repository";

interface UpdatedUseCaseRequest {
  id: string;
  email: string;
  emailUpdate: string;
}

export class UpdateEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ id, email, emailUpdate }: UpdatedUseCaseRequest) {
    const isUserExist = await this.userRepository.findUserByIdAndEmail(
      id,
      email
    );

    if (!isUserExist) {
      throw new UserDoesntExist();
    }

    const user = await this.userRepository.updateEmail(id, emailUpdate);

    return user;
  }
}
