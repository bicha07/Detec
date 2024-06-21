import { Ligne_Pack } from "./interface.ligne_pack";
export class Pack {
  id: BigInteger;
  title: string;
  subtitle: string;
  ligne_packs: Ligne_Pack[];

  constructor(
    id: BigInteger,
    title: string,
    subtitle:string,
    ligne_packs: Ligne_Pack[]
  ) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.ligne_packs = ligne_packs;
  }
}

export class Ligne_Packs {
  ligne_packs: Ligne_Pack[];

  constructor(ligne_packs: Ligne_Pack[]) {
    this.ligne_packs = ligne_packs;
  }
}
