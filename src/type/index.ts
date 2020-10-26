export class User {
  apply_id: number | null;
  permission: number;
  name?: string;
  surname?: string;
  prename?: string;
  gpax?: number;
  gpax_match?: number;
  gpax_eng?: number;
  gpax_com?: number;
  step?: number;
  document?: Record<string, any>;

  constructor() {
    this.apply_id = process.env.NODE_ENV == 'development' ? 631001130 : null;
    this.name = process.env.NODE_ENV == 'development' ? '?????' : '';
    this.surname = process.env.NODE_ENV == 'development' ? '???????' : '';
    this.prename = process.env.NODE_ENV == 'development' ? '' : '';
    this.permission = 1;
  }
}

export type IUser = User;

export interface UserState {
  user: IUser;
}
