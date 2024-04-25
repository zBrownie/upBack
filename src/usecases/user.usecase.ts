import { UserRepositoryPrisma } from "../repositories/user.repository";
import {
  UserCreate,
  User,
  UserRepository,
} from "./../interface/users.interface";
export class UserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({ email, name }: UserCreate): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new Error("User already exists.");
    }

    return await this.userRepository.create({ email, name });
  }

  async findById(id: string): Promise<User> {
    const result = await this.userRepository.findById(id);

    if (!result) throw new Error("User not found.");

    return result;
  }
}
