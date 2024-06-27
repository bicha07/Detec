import { Component } from '@angular/core';
import { BannerComponent } from "../../Home/banner/banner.component";
import { FormComponent } from "../form/form.component";
import { FooterComponent } from "../../Home/footer/footer.component";
import { MapComponent } from '../map/map.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-link-contact',
    standalone: true,
    templateUrl: './link-contact.component.html',
    styleUrl: './link-contact.component.css',
    imports: [BannerComponent, FormComponent, FooterComponent, MapComponent,CommonModule]
})
export class LinkContactComponent {

}
