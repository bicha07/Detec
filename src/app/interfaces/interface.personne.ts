export class Personne {
  id: BigInteger;
  photo: string;
  name: string;
  post: string;
  discription: string;


  constructor(
    id: BigInteger,
    photo: string,
    name: string,
    post: string,
    discription: string,
    
  ) {
    this.id = id;
    this.photo = photo;
    this.name = name;
    this.post = post;
    this.discription = discription;
   
  }
}


