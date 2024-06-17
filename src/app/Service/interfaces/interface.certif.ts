import { CertAdvantage } from "./interface.certadvantages";
export class Certif {
  id: BigInteger;
  photo: string;
  title: string;
  recap: string;
  description1: string;
  description2: string;
  desc_photo: string;
  conclusion: string;
  certadvantages: CertAdvantage[];

  constructor(
    id: BigInteger,
    photo: string,
    title: string,
    recap: string,
    description1: string,
    description2: string,
    desc_photo: string,
    conclusion: string,
    certadvantages: CertAdvantage[]
  ) {
    this.id = id;
    this.photo = photo;
    this.title = title;
    this.recap = recap;
    this.description1 = description1;
    this.description2 = description2;
    this.desc_photo = desc_photo;
    this.conclusion = conclusion;
    this.certadvantages = certadvantages;
  }
}

export class CertAdvantages {
  certadvantages: CertAdvantage[];

  constructor(certadvantages: CertAdvantage[]) {
    this.certadvantages = certadvantages;
  }
}
