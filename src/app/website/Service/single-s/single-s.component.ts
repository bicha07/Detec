import { FooterComponent } from "../../Home/footer/footer.component";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ServiceService } from "../../service.service";// Assurez-vous que le chemin est correct
import { Technique } from '../../interfaces/interface.technique'; // Assurez-vous que le chemin est correct
import { CommonModule } from "@angular/common";
import { Certif } from "../../interfaces/interface.certif";

declare var windowLoadInit: any; // Global declaration for existing init function
declare var initializeToggleMenu: any; // Global declaration for toggle menu function

@Component({
    selector: 'app-single-s',
    standalone: true,
    templateUrl: './single-s.component.html',
    styleUrls: ['./single-s.component.css'],
    imports: [FooterComponent,CommonModule]
})
export class SingleSComponent implements OnInit, AfterViewInit, OnDestroy {
    private routerSubscription: Subscription;
    technique: Technique | null = null;
    certif: Certif | null = null;


    constructor(private router: Router, private route: ActivatedRoute, private serviceService: ServiceService) {
        this.routerSubscription = this.route.params.subscribe(params => {
            const techniqueId: BigInteger = params['id']; // Assurez-vous que l'ID est récupéré correctement
            this.serviceService.getTechniqueById(techniqueId).subscribe(data => {
                this.technique = data;
            });
        });

    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        // Initialize any animations after the view is initially loaded
        this.initAnimations();
        // Ensure that jQuery functionalities are initialized after the initial view is loaded
        this.reinitializeJQueryFunctions();
    }

    ngOnDestroy(): void {
        // Unsubscribe to prevent memory leak
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }

    private initAnimations(): void {
        // Call the global animation initialization function if it exists
        if (typeof windowLoadInit === 'function') {
            windowLoadInit();
        }
    }

    private reinitializeJQueryFunctions(): void {
        // Call the global function to initialize jQuery toggle menu if it exists
        if (typeof initializeToggleMenu === 'function') {
            initializeToggleMenu();
        }
    }
}
