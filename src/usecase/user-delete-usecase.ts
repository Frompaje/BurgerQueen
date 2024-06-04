import { User } from "@prisma/client";
import { UserDoesntExist } from "../err/user-doesnt-exist";
import { UserRepository } from "../interface/user-repository";

interface RegisterUseCaseRequest {
  id: string;
}

interface RegisterUsaCaseResponse {
  user: User;
}

export class DeleteUseCase {
  constructor(private readonly userRepository: UserRepository) { }
  async execute({
    id,
  }: RegisterUseCaseRequest): Promise<RegisterUsaCaseResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserDoesntExist();
    }

    await this.userRepository.delete(id);

    return { user };
  }
}


// delete user 
