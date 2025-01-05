import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonFabButton, IonFab, IonCard, IonItem, IonLabel, IonCardContent } from '@ionic/angular/standalone';
import { settingsOutline, addOutline, trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CitaService } from '../servicios/cita.service';
import { RouterModule } from '@angular/router';
import { ConfiguracionService } from '../servicios/configuraciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonFab, IonFabButton, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent, RouterModule, CommonModule]
})
export class HomePage implements OnInit {
  fraseAleatoria: string = "";
  autor: string = "";
  permitirBorrado: Boolean = false; // Botón deshabilitado por defecto
  citaId: number | null = null; // Almacena el id de la cita seleccionada

  constructor(
    private citaService: CitaService,
    private configuracionService: ConfiguracionService
  ) {
    addIcons({ settingsOutline, addOutline, trashOutline });
  }
  async ngOnInit(){

   
  }

  // Método para actualizar la frase cada vez que se ingresa o redirige al home
  async ionViewWillEnter() {
    await this.citaService.iniciarPlugin()
    try {
      const citas = await this.citaService.obtenerCitas(); 

      if (citas.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * citas.length);
        this.fraseAleatoria = citas[indiceAleatorio].frase;
        this.autor = citas[indiceAleatorio].autor;
        this.citaId = citas[indiceAleatorio].id; // Asigna el id de la cita seleccionada
      } else {
        this.fraseAleatoria = `"Cada cita es el reflejo de un alma que se atrevió a pensar diferente."
        ¿Qué cita deseas crear hoy?`;
        this.autor = "";
        this.citaId = null; // No hay citas, por lo que no se asigna id
      }

      // Obtener la configuración actual
      this.permitirBorrado = await this.configuracionService.obtenerConfiguracion();
    } catch (error) {
      console.error('Error al obtener las citas:', error);
    }
  }

  async eliminarCita() {
    if (this.permitirBorrado && this.citaId !== null) {
      await this.citaService.eliminarCita(this.citaId); // Espera la eliminación de la cita
      this.actualizarFrase(); // Actualiza la frase aleatoria después de la eliminación
    }
  }

  async actualizarFrase() {
    try {
      const citas = await this.citaService.obtenerCitas(); 

      if (citas.length > 0) {
        const indiceAleatorio = Math.floor(Math.random() * citas.length);
        this.fraseAleatoria = citas[indiceAleatorio].frase;
        this.autor = citas[indiceAleatorio].autor;
        this.citaId = citas[indiceAleatorio].id; // Actualiza el id de la cita seleccionada
      } else {
        this.fraseAleatoria = `"Cada cita es el reflejo de un alma que se atrevió a pensar diferente."
        ¿Qué cita deseas crear hoy?`;
        this.autor = '';
        this.citaId = null; // No hay citas, no se asigna id
      }
    } catch (error) {
      console.error('Error al actualizar la frase:', error);
    }
  }
}