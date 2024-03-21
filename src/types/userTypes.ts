export type User = {
  id: number;
  login: string;
  email: string;
  fullName: string;
  phone: string | null;
  address: string | null;
  companyName: string | null;
  lastVisitDate: Date | null;
  role: number;
  avatarUrl: string;
  createdAt: Date;
};

export type UpdateUserDto = {
  id?: number,
  role?: number,
  login?: string
}

export type UpdateMeDto = {
  login?: string,
  avatarUrl?: string
}
