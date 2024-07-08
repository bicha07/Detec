import { Charge } from "./interface.charges";
import { EmployeeDailyPrice } from "./interface.employeedailyprice";
export class Facture {
  id: number;
  num_facture: number;
  project_id: number;
  total_main_oeuvre: number;
  total_heure_ouvrable:number;
  charges: Charge[];

  constructor(
    id: number,
    num_facture: number,
    project_id:number,
    charges: Charge[],
    total_main_oeuvre: number,
    total_heure_ouvrable:number,
  ) {
    this.id = id;
    this.num_facture = num_facture;
    this.project_id = project_id;
    this.total_main_oeuvre = total_main_oeuvre;
    this.total_heure_ouvrable = total_heure_ouvrable;

    this.charges = charges;
    
  }
}

