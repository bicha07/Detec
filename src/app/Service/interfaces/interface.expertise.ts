export class Expertise {
  id: BigInteger;
  photo: string;
  title: string;
  recap: string;
  

  constructor(
    id: BigInteger,
    photo: string,
    title: string,
    recap: string,
    
  ) {
    this.id = id;
    this.photo = photo;
    this.title = title;
    this.recap = recap;
   
  }
}


