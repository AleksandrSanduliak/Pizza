type fade = {
  isClicked: boolean;
};

// FORMS
export type FormLogin = {
  email: string;
  password: string;
};

export type FormRegister = {
  name: string;
  email: string | null;
  phone: number;
  dateBrith: Date;
  password: string;
  confirmPassword: string;
};
