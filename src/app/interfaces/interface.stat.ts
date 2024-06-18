export class Stat {
  id: BigInteger;
  photo: string;
  title: string;
  percent:string;



  constructor(
    id: BigInteger,
    photo: string,
    title: string,
    percent:string,

  ) {
    this.id = id;
    this.photo = photo;
    this.title = title;
   this.percent=percent;
  }
}


