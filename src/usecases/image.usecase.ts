import {
  ImageCreate,
  ImageRepository,
  Images,
} from "../interface/images.interface";
import { ImageRepositoryPrisma } from "../repositories/image.repository";
import { UserRepository } from "./../interface/users.interface";
import { UserRepositoryPrisma } from "./../repositories/user.repository";

export class ImageUseCase {
  private imageRepository: ImageRepository;
  private userRepository: UserRepository;

  constructor() {
    this.imageRepository = new ImageRepositoryPrisma();
    this.userRepository = new UserRepositoryPrisma();
  }

  async upload(image: ImageCreate): Promise<Images> {
    const user = await this.userRepository.findById(image.userId);
    if (!user) throw new Error("User not found.");

    return await this.imageRepository.upload({ ...image });
  }

  async findById(id: string): Promise<Images | null> {
    return await this.imageRepository.findById(id);
  }

  async deleteImage(data: {
    id: string;
    userId: string;
  }): Promise<{ success: boolean; message: string }> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) throw new Error("User not found.");

    const image = await this.imageRepository.findById(data.id);

    if (!image) throw new Error("Image not found.");

    if (image?.id === data.userId)
      throw new Error("You don't have permission.");

    return await this.imageRepository.delete(data.id);
  }
}
