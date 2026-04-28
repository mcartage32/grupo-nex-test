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

export interface IUser extends IUserOption {
  isBanned: boolean;
}

export interface IFindAllUsersResponse {
  findAllUsers: {
    data: IUser[];
    total: number;
    page: number;
    totalPages: number;
  };
}

export interface IFindAllUsersVariables {
  page?: number;
  limit?: number;
}

export interface ICreateUserResponse {
  createUser: {
    id: string;
  };
}

export interface ICreateUserVariables {
  data: {
    name: string;
    email: string;
  };
}
