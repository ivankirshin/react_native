/* eslint-disable no-empty-function */
export default class Post {
  // TODO delete eslint comments
  // eslint-disable-next-line no-useless-constructor
  constructor(
    public id: string,
    public categoryId: number,
    public title: string,
    public content: string,
    public image: string,
    public date: Date,
    public views: number,
    public favorites: number
  ) {}
}
