import { Component } from '@angular/core';
import { BannerComponent } from "../../Home/banner/banner.component";
import { FooterComponent } from "../../Home/footer/footer.component";
import { CategoryComponent } from "../category/category.component";
import { ServiceComponent } from '../service/service.component';
import { SpecialityComponent } from "../../Home/speciality/speciality.component";
import { ProgressComponent } from "../progress/progress.component";
import { SingleSComponent } from '../single-s/single-s.component';
@Component({
    selector: 'app-link-service',
    standalone: true,
    templateUrl: './link-service.component.html',
    styleUrl: './link-service.component.css',
    imports: [SingleSComponent, BannerComponent, FooterComponent, CategoryComponent, ServiceComponent, SpecialityComponent, ProgressComponent]
})
export class LinkServiceComponent {
 
    title: string = 'Title';
}
