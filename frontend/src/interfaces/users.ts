export interface IUserOption {
  id: string;
  name: string;
  email: string;
}

export interface IGetAvailableUsersResponse {
  availableUsers: IUserOption[];
}

export interface IUserSelectOption {
  label: string;
  value: string;
}
