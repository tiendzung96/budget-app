export class Income {
  constructor(
      public _id: string,
      public id: string,
      public date: Date,
      public name: string,
      public amount: number,
      public description: string,
      public type: string = 'income'
  ){}
}

