export class User {
    id: number;
    username: string;
    email: string;
    role: string;
    photo: string;
    description:string;
    password: string;
  
    constructor(
      id: number,
      username: string,
      email: string,
      role: string,
      photo: string,
      description:string,
      password: string
    ) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.role = role;
      this.photo = photo;
      this.description = description;
      this.password = password;
    }
  }
  