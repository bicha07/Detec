import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../../../website/interfaces/interface.portfolio';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';
import { AlertComponent } from '../../../alert/alert.component'; // Import the AlertModule

@Component({
  selector: 'app-portfolio-img-post',
  standalone: true,
  templateUrl: './portfolio-img-post.component.html',
  styleUrls: ['./portfolio-img-post.component.css'],
  providers: [ServiceService],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent,AlertComponent]
})
export class PortfolioImgPostComponent implements OnInit {
  portfolios: Portfolio[] = [];
  showForm = false;
  isEditing = false;
  currentPortfolio: Portfolio = new Portfolio(0, '', '');
  selectedFile: File | null = null;
  baseUrl: String;

  alertType: string = '';
  alertMessage: string = '';

  constructor(private partnerService: ServiceService) {
    this.baseUrl = this.partnerService.apiUrlbase;
  }

  ngOnInit(): void {
    this.loadPortfolios();
  }

  loadPortfolios(): void {
    this.partnerService.getPortfolios().subscribe(data => {
      this.portfolios = data;
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentPortfolio = new Portfolio(0, '', '');
    this.selectedFile = null;
  }

  onEdit(portfolio: Portfolio): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentPortfolio = Object.assign({}, portfolio);
    this.selectedFile = null;
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.isEditing) {
      if (this.selectedFile) {
        this.partnerService.uploadFile(this.selectedFile).subscribe(response => {
          this.currentPortfolio.photo = response.path;
          this.savePortfolio();
        });
      } else {
        this.savePortfolio();
      }
    } else {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }
      formData.append('title', this.currentPortfolio.title);
      this.partnerService.createPortfolio(formData).subscribe(
        () => {
          this.loadPortfolios();
          this.setAlert('success', 'Portfolio ajouté avec succès.');
        },
        error => {
          this.setAlert('danger', 'Erreur lors de l\'ajout du portfolio.');
        }
      );
    }
    this.closeForm();
  }

  savePortfolio(): void {
    const updatedPortfolio: Partial<Portfolio> = {
      title: this.currentPortfolio.title,
      photo: this.selectedFile ? this.currentPortfolio.photo : "empty"
    };

    if (this.isEditing) {
      this.partnerService.updatePortfolio(this.currentPortfolio.id, updatedPortfolio).subscribe(
        () => {
          this.loadPortfolios();
          this.setAlert('primary', 'Portfolio mis à jour avec succès.');
        },
        error => {
          this.setAlert('danger', 'Erreur lors de la mise à jour du portfolio.');
        }
      );
    }
  }

  onDelete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce portfolio?')) {
      this.partnerService.deletePortfolio(id).subscribe(
        () => {
          this.loadPortfolios();
          this.setAlert('danger', 'Portfolio supprimé avec succès.');
        },
        error => {
          this.setAlert('danger', 'Erreur lors de la suppression du portfolio.');
        }
      );
    }
  }

  closeForm(): void {
    this.showForm = false;
  }

  setAlert(type: string, message: string): void {
    this.alertType = type;
    this.alertMessage = message;

    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }
}
