export class Personne {
  id: BigInteger;
  photo: string;
  name: string;
  post: string;
  description: string;


  constructor(
    id: BigInteger,
    photo: string,
    name: string,
    post: string,
    description: string,
    
  ) {
    this.id = id;
    this.photo = photo;
    this.name = name;
    this.post = post;
    this.description = description;
   
  }
}


