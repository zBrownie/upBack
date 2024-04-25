export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updateAt: Date;
}

export interface UserCreate {
  name: string;
  email: string;
}

export interface UserRepository {
  create: (user: UserCreate) => Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
