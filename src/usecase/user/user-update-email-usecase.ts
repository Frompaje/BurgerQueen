import { UserDoesntExist } from "../err/user-doesnt-exist";
import { UserRepository } from "../interface/user-repository";

interface UpdatedEmailUseCaseRequest {
  id: string;
  email: string;
  emailUpdate: string;
}

export class UpdateEmailUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ id, email, emailUpdate }: UpdatedEmailUseCaseRequest) {
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
