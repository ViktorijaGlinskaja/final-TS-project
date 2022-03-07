type UserRegistration = {
  email: string,
  name: string,
  password: string,
  repeatPassword: string,
  role: string,
  emailChecked: boolean,
  emailAvailable: boolean,
};

export default UserRegistration;
