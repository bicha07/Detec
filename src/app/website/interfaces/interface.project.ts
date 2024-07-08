import { User } from "./interface.user";
import { Charge } from "./interface.charges";
export class Project {
  id: number;
  name_chef: string;
  photo_chef : string;
  chef_id :number;
  name: string;
  description:string;
  progress: string;
  status: string;
  start_date: string;
  end_date: string;
  employees: User[];
  charges: Charge[];

  constructor(
    id: number,
    name: string,
    chef_id :number,

    name_chef: string,
    photo_chef: string,
    progress: string,    
    status: string,
    description:string,
    start_date: string,
    end_date: string,
    employees: User[],
    charges: Charge[]

  ) {
    this.id = id;
    this.name = name;
    this.chef_id =chef_id;
    this.name_chef = name_chef;
    this.photo_chef = photo_chef;
    this.progress = progress;
    this.status = status;
    this.start_date = start_date;
    this.end_date = end_date;
    this.employees = employees;
    this.charges = charges;
    this.description = description;
  }
}

export class Employees {
    employees: User[];

  constructor(employees: User[]) {
    this.employees = employees;
  }
}
