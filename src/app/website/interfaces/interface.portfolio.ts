export class Portfolio {
  id: BigInteger;
  photo: string;
  title: string;


  constructor(
    id: BigInteger,
    photo: string,
    title: string,

  ) {
    this.id = id;
    this.photo = photo;
    this.title = title;

  }
}

