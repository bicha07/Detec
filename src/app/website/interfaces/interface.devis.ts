import { Nature } from "./interface.natures";
import { Chantier } from "./interface.chantiers";

export class Devis {
  id: number;
  name: string;
  email: string;
  company:string;
  message: string;
  natures: Nature[];
  chantiers: Chantier[];

  constructor(
    id: number,
    name: string,
    email: string,
    company:string,
    message: string,
    natures: Nature[],
    chantiers: Chantier[],
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.message = message;
    this.company = company;
    this.natures = natures;
    this.chantiers = chantiers;
  }
}
export class chantiers {
    chantiers: Chantier[];

  constructor(chantiers: Chantier[]) {
    this.chantiers = chantiers;
  }
}



export class natures {
    natures: Nature[];

  constructor(natures: Nature[]) {
    this.natures = natures;
  }
}

