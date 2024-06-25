export class Personne {
  id: number;
  photo: string;
  name: string;
  post: string;
  description: string;


  constructor(
    id: number,
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


