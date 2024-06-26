import { Nature } from "./interface.natures";
import { Chantier } from "./interface.chantiers";

export class Technique {
  id: number;
  name: string;
  email: string;
  message: string;
  natures: Nature[];
  chantiers: Chantier[];

  constructor(
    id: number,
    name: string,
    email: string,
    message: string,
    natures: Nature[],
    chantiers: Chantier[],
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.message = message;
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

