import { Component } from '@angular/core';
import { FooterComponent } from "../../Home/footer/footer.component";
import { NavbarComponent } from '../navbar/navbar.component';
import { BannerComponent } from "../../Home/banner/banner.component";

@Component({
    selector: 'app-single-s',
    standalone: true,
    templateUrl: './single-s.component.html',
    styleUrl: './single-s.component.css',
    imports: [FooterComponent, NavbarComponent, BannerComponent]
})
export class SingleSComponent {

}
