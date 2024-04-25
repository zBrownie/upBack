import { prisma } from "../database/prisma-client";
import {
  ImageCreate,
  ImageRepository,
  Images,
} from "../interface/images.interface";

export class ImageRepositoryPrisma implements ImageRepository {
  async findById(id: string): Promise<Images | null> {
    return await prisma.image.findFirst({
      where: {
        id,
      },
    });
  }

  async upload(data: ImageCreate): Promise<Images> {
    return await prisma.image.create({ data });
  }

  async delete(id: string): Promise<{ success: boolean; message: string }> {
    const result = await prisma.image.delete({
      where: {
        id,
      },
    });

    return {
      message: "Image deleted",
      success: Boolean(result),
    };
  }
}
