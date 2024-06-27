import { Component, OnInit } from '@angular/core';
import { Stat } from '../../../website/interfaces/interface.stat';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ServiceService } from '../../../website/service.service';

@Component({
    selector: 'app-stat-post',
    standalone: true,
    templateUrl: './stat-post.component.html',
    styleUrls: ['./stat-post.component.css'],
    providers: [ServiceService],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent]
})
export class StatPostComponent implements OnInit {
  stats: Stat[] = [];
  showForm = false;
  isEditing = false;
  currentStat: Stat = new Stat(0, '', '', '');
  selectedFile: File | null = null;

  constructor(private StatService: ServiceService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.StatService.getStats().subscribe(data => {
      this.stats = data;
    });
  }

  onAdd(): void {
    this.showForm = true;
    this.isEditing = false;
    this.currentStat = new Stat(0, '', '', '');
    this.selectedFile = null;
  }

  onEdit(stat: Stat): void {
    this.showForm = true;
    this.isEditing = true;
    this.currentStat = Object.assign({}, stat);
    this.selectedFile = null;
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.isEditing) {
      if (this.selectedFile) {
        this.StatService.uploadFile(this.selectedFile).subscribe(response => {
          this.currentStat.photo = response.path;
          this.saveStat();
        });
      } else {
        this.saveStat();
      }
    } else {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }
      formData.append('title', this.currentStat.title);
      formData.append('percent', this.currentStat.percent);

      this.StatService.createStat(formData).subscribe(() => {
        this.loadStats();
      });
    }
    this.closeForm();
  }

  saveStat(): void {
    const updatedStat: Partial<Stat> = {
      title: this.currentStat.title,
      percent: this.currentStat.percent,
      photo: this.selectedFile ? this.currentStat.photo : "empty"
    };

    if (this.isEditing) {
      this.StatService.updateStat(this.currentStat.id, updatedStat).subscribe(() => {
        this.loadStats();
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this partner?')) {
      this.StatService.deleteStat(id).subscribe(() => {
        this.loadStats();
      });
    }
  }

  closeForm(): void {
    this.showForm = false;
  }
}
