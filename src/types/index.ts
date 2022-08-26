export interface LoginResponse {
    code: number;
    message: string;
    module: string;
    status: string;
    results: ResultsData
}

export interface ResultsData {
  by_default: string;
  company_id: string;
  icon: string;
  is_first: number;
  status: string;
  token: string;
  user_id: string;
  want_login: string
}