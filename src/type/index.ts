export class User {
  apply_id: number;
  permission: number;
  name?: string;
  surname?: string;
  prename?: string;
  gpax?: number;
  gpax_match?: number;
  gpax_eng?: number;
  gpax_com?: number;
  step?: number;

  constructor() {
    this.apply_id = 631001130;
    this.name = "?????";
    this.surname = "???????";
    this.prename = "นาย";
    this.permission = 1;
  }
}

export type IUser = User;

export interface UserState {
  user: IUser;
}
