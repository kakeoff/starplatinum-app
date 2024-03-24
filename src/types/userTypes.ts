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

export type UpdateUserRoleDto = {
  id: number,
  role: number,
}

export type UpdateMeDto = {
  login?: string,
  avatarUrl?: string
  fullName?: string
  email?: string
  phone?: string
  companyName?: string
  address?: string
}
