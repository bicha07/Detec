export class Stat {
  id: number;
  photo: string;
  title: string;
  percent:string;



  constructor(
    id: number,
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


