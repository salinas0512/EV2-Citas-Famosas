import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/modelo/cita'; 
import { CitaService } from 'src/app/servicios/cita.service'; 
import { FormCitasComponent } from "../form-citas/form-citas.component";
import { ListaCitasComponent } from '../lista-citas/lista-citas.component';

@Component({
  selector: 'app-item-citas',
  templateUrl: './item-citas.component.html',
  styleUrls: ['./item-citas.component.scss'],
  standalone: true,
  imports: [FormCitasComponent, ListaCitasComponent], // Importamos los componentes hijos
})
export class ItemCitasComponent implements OnInit {

  citas: Cita[] = [];  // Lista de citas que se almacenarán en memoria

  constructor(private citaService: CitaService) { }

  async ngOnInit() {
    await this.citaService.iniciarPlugin()
    // Cargamos las citas desde el servicio (esto puede estar en memoria por ahora)
    this.citas =  await this.citaService.obtenerCitas();
  }

  // Este método será llamado cuando se emita el evento citaAgregada desde app-form-citas
  async procesarCita(nuevaCita: Cita) {
    // Llamar al servicio para agregar la cita 
    await this.citaService.agregarCita(nuevaCita.frase, nuevaCita.autor);
     // Luego de agregar la cita, actualiza la lista de citas
     this.citas = await this.citaService.obtenerCitas();
  }
}
