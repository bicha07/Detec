import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterOutlet,RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories = [
    {
      photo: './assets/images/icon-01.png',
      title: 'Tests Radiographiques',
      link: '/sg',
      recap: 'Compétence avérée dans les tests radiographiques et ultrasoniques pour assurer la conformité et la qualité des soudures.'
    },
    {
      photo: './assets/images/icon-02.png',
      title: 'Soudage Haute Pression',
      link: '#',
      recap: 'Qualifications diverses pour le soudage dans toutes positions: à plat (1G/1F), horizontale (2G/2F), verticale montante (3G/3F), verticale descendante (4G/4F), répondant a vos besoins.'
    },
    {
      photo: './assets/images/icon-03.png',
      title: 'Certifications CWB',
      link: '#',
      recap: 'Nos soudeurs détiennent des certifications CWB, affirmant leur expertise et conformité avec les standards élevés.'
    },
    {
      photo: './assets/images/icon-04.png',
      title: 'Qualifications WPQR',
      link: '#',
      recap: 'Fourniture de WPQR pour garantir la conformité des techniques de soudage avec les normes industrielles.'
    },
    {
      photo: './assets/images/icon-06.png',
      title: 'Positions de Soudage',
      link: '#',
      recap: 'Qualifications diverses pour le soudage dans toutes positions: à plat (1G/1F), horizontale (2G/2F), verticale montante (3G/3F), verticale descendante (4G/4F),  répondant a vos besoins.'
    },
    {
      photo: './assets/images/icon-05.png',
      title: 'Soudure pour Tuyauteries',
      link: '#',
      recap: 'Expertise en soudage de tuyauteries à haute pression, assurant intégrité structurelle et sécurité dans les applications critiques.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // You can load the data from your backend here if needed
  }

  // Method to update the content dynamically
  updateCategoryContent(updatedData: any): void {
    this.categories = updatedData.categories;
  }
}
