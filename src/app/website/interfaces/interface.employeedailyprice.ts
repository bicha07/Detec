import { User } from "./interface.user";
import { Project } from "./interface.project";
export class EmployeeDailyPrice {
  id: number;
  project_id :number;
  personne_id: number;
  personne_name: string;
  heure:string;
  date: string;
  daily_price: string;


  constructor(
    id: number,
    project_id: number,
    personne_id :number,
    heure:string,

    personne_name:string,
    date: string,
    daily_price: string


  ) {
    this.id = id;
    this.project_id = project_id;
    this.heure=heure;
    this.personne_id =personne_id;
    this.personne_name =personne_name;
    this.date = date;
    this.daily_price = daily_price;

  }
}
