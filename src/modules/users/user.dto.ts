export type UserCreateDTO = {
  name: string;
  email: string;
  password: string;
  username: string;
};

export type UpdateUserAddRoleDTO = {
  _id: string;
  roles: string[];
};
