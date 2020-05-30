import { Nullable } from 'src/utils/types';

export default class User {
  // eslint-disable-next-line no-empty-function,no-useless-constructor
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public surname: string,
    public avatar: Nullable<string>,
    public about: Nullable<string>
  ) {}

  // @ts-ignore
  get fullname() {
    return `${this.name} ${this.surname}`;
  }
}
