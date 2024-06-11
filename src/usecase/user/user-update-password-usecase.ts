import { UserDoesntExist } from "../err/user-doesnt-exist";
import { UserRepository } from "../interface/user-repository";
import { Hash } from "../repository/adapter/password-hash";

interface UpdatedUseCaseRequest {
  id: string;
  password: string;
}

export class UpdatePasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hash
  ) {}
  async execute({ id, password }: UpdatedUseCaseRequest) {
    const isUserExist = await this.userRepository.findById(id);

    if (!isUserExist) {
      throw new UserDoesntExist();
    }
    const passwordHashed = await this.hasher.hash(password);

    const user = await this.userRepository.updatePassword(id, passwordHashed);

    return user;
  }
}
