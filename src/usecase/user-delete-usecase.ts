import { UserDoesntExist } from "../err/user-doesnt-exist";
import { UserRepository } from "../interface/user-repository";

interface DeleteUseCaseRequest {
  id: string;
}

export class DeleteUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  async execute({ id }: DeleteUseCaseRequest) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserDoesntExist();
    }

    await this.userRepository.delete(id);

    return { user };
  }
}
