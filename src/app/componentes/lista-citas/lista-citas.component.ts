import { Component, OnInit, Input } from '@angular/core';
import { IonList, IonItem, IonButton, IonLabel, IonIcon, IonButtons } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { CitaService } from 'src/app/servicios/cita.service';
import { Cita } from 'src/app/modelo/cita';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonButton, IonLabel, IonIcon, IonButtons]
})
export class ListaCitasComponent implements OnInit {
  @Input() citas: Cita[] = [];  // Se reciben las citas del componente padre

  constructor(private citaService: CitaService) {
    addIcons({ trashOutline });
  }

  ngOnInit() {}

  // Método asíncrono para eliminar una cita
  async eliminar(id: number) {
    try {
      await this.citaService.eliminarCita(id); // Eliminar cita desde el servicio
      this.citas = await this.citaService.obtenerCitas(); // Actualizar la lista de citas
    } catch (error) {
      console.error('Error al eliminar la cita:', error);
    }
  }
}