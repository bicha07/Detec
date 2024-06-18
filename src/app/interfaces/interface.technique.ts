import { Advantage } from "./interface.advantages";
export class Technique {
  id: BigInteger;
  photo: string;
  title: string;
  recap: string;
  description1: string;
  description2: string;
  desc_photo: string;
  conclusion: string;
  advantages: Advantage[];

  constructor(
    id: BigInteger,
    photo: string,
    title: string,
    recap: string,
    description1: string,
    description2: string,
    desc_photo: string,
    conclusion: string,
    advantages: Advantage[]
  ) {
    this.id = id;
    this.photo = photo;
    this.title = title;
    this.recap = recap;
    this.description1 = description1;
    this.description2 = description2;
    this.desc_photo = desc_photo;
    this.conclusion = conclusion;
    this.advantages = advantages;
  }
}

export class Advantages {
  advantages: Advantage[];

  constructor(advantages: Advantage[]) {
    this.advantages = advantages;
  }
}
