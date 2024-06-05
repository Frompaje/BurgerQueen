import { User } from "@prisma/client";
import { UserDoesntExist } from "../err/user-doesnt-exist";
import { UserRepository } from "../interface/user-repository";

interface UpdatedUseCaseRequest {
  id: string;
}

interface UpdatedUsaCaseResponse {
  user: User;
}

export class UpdateUseCase {
  constructor(private readonly userRepository: UserRepository) { }
  async execute({
    id,
  }: UpdatedUseCaseRequest): Promise<UpdatedUsaCaseResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserDoesntExist();
    }

    await this.userRepository.delete(id);

    return { user };
  }
}


