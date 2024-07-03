import { User } from "./interface.user";
import { Project } from "./interface.project";
export class EmployeeDailyPrice {
  id: number;
  project_id :number;
  user_id: number;
  date: string;
  daily_price: string;


  constructor(
    id: number,
    project_id: number,
    user_id :number,
    date: string,
    daily_price: string


  ) {
    this.id = id;
    this.project_id = project_id;
    this.user_id =user_id;
    this.date = date;
    this.daily_price = daily_price;

  }
}
