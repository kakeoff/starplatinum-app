
export type RegisterDto = {
  login: string;
  email: string;
  fullName: string;
  phone: string | null;
  address: string | null;
  companyName: string | null;
  password: string;
};

export type SetApplicationRepsonsibleResponse = {
  id: number;
  responsibleId: number;
}
