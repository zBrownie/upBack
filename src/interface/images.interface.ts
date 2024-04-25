export interface Images {
  id: string;
  name: string;
  image: string;
  size: string;
  type: string;
  userId: string;
}

export interface ImageCreate {
  name: string;
  image: string;
  size: string;
  type: string;
  userId: string;
}

export interface ImageRepository {
  upload: (image: ImageCreate) => Promise<Images>;
  findById(id: string): Promise<Images | null>;
  delete(id: string): Promise<{ success: boolean; message: string }>;
}
