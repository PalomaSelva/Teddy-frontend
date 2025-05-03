export interface CustomerResponse {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerRequest {
  name: string;
  salary: number;
  companyValuation: number;
}
