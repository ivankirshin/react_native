export enum Colors {
  darkviolet = '#9400d3',
  deepskyblue = '#00bfff',
  khaki = '#f0e68c',
}

export default class Category {
  // eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor(public id: number, public title: string, public color: Colors) {}
}
