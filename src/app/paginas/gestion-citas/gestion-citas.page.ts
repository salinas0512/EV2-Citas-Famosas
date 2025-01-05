import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';  
import { ItemCitasComponent } from '../../componentes/item-citas/item-citas.component';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, ItemCitasComponent, IonHeader, IonToolbar, IonTitle, IonContent]
})
export class GestionCitasPage implements OnInit {

  constructor(private router: Router) { }

  routerBack() {
    this.router.navigate(['/home']);
  }
  
  ngOnInit() {
  }

}
