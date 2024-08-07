import { Component } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import { WelcomComponent } from "../welcom/welcom.component";
import { ServiceComponent } from "../service/service.component";
import { SpecialityComponent } from "../speciality/speciality.component";
import { PricingComponent } from "../pricing/pricing.component";
import { TeamComponent } from "../team/team.component";
import { FooterComponent } from "../footer/footer.component";
import { LocationComponent } from "../location/location.component";
import { QuoteComponent } from "../../Portfolio/quote/quote.component";

@Component({
    selector: 'app-link-home',
    standalone: true,
    templateUrl: './link-home.component.html',
    styleUrl: './link-home.component.css',
    imports: [LocationComponent, BannerComponent, WelcomComponent, ServiceComponent, SpecialityComponent, PricingComponent, TeamComponent, FooterComponent, QuoteComponent]
})
export class LinkHomeComponent {

}
