import { Component } from '@angular/core';
import { PortfolioComponent } from "../portfolio/portfolio.component";
import { BannerComponent } from "../../Home/banner/banner.component";
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from "../../Home/footer/footer.component";
import { QuoteComponent } from "../quote/quote.component";

@Component({
    selector: 'app-link-portfolio',
    standalone: true,
    templateUrl: './link-portfolio.component.html',
    styleUrl: './link-portfolio.component.css',
    imports: [PortfolioComponent, BannerComponent, NavbarComponent, FooterComponent, QuoteComponent]
})
export class LinkPortfolioComponent {

}