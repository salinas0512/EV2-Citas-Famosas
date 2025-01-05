import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonToggle, IonBackButton, IonButtons, IonLabel } from '@ionic/angular/standalone';
import { ConfiguracionService } from 'src/app/servicios/configuraciones.service';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [IonLabel, IonButtons, IonBackButton, IonToggle, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfiguracionPage implements OnInit {
  permitirBorrado!: boolean ;

  constructor(private configuracionService: ConfiguracionService) {}

  async ngOnInit() {
    // Al iniciar la página, obtenemos el valor de 'permitirBorrado' desde las preferencias
    this.permitirBorrado = await this.configuracionService.obtenerConfiguracion();
  }

  // Este método se llama cada vez que cambia el valor del toggle
  async guardarConfiguracion() {
    await this.configuracionService.guardarConfiguracion(this.permitirBorrado);
  }
}