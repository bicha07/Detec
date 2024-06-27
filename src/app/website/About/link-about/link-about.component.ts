import { Component } from '@angular/core';
import { Part1Component } from "../part1/part1.component";
import { SignatureComponent } from "../signature/signature.component";
import { ProcessComponent } from "../process/process.component";
import { NumbersComponent } from "../numbers/numbers.component";
import { FooterComponent } from "../../Home/footer/footer.component";
import { BannerComponent } from "../../Home/banner/banner.component";


@Component({
    selector: 'app-link-about',
    standalone: true,
    templateUrl: './link-about.component.html',
    styleUrl: './link-about.component.css',
    imports: [BannerComponent,  Part1Component, SignatureComponent, ProcessComponent, NumbersComponent, FooterComponent]
})
export class LinkAboutComponent {

}
