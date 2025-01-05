import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { IonCard, IonInput, IonItem, IonButton, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonText } from "@ionic/angular/standalone";
import { CitaService } from 'src/app/servicios/cita.service';
import { Cita } from 'src/app/modelo/cita'; // Importa la clase Cita
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-citas',
  templateUrl: './form-citas.component.html',
  styleUrls: ['./form-citas.component.scss'],
  standalone: true,
  imports: [
    FormsModule, CommonModule, IonButton, IonItem, IonInput, IonCard, 
    IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonText
  ]
})
export class FormCitasComponent implements OnInit {
  cita: Cita = new Cita(0, '', ''); // Inicializar el objeto de tipo Cita

  // Decorador @Output para emitir el evento cuando se agregue una cita
  @Output() citaAgregada: EventEmitter<Cita> = new EventEmitter<Cita>();

  constructor(private citaService: CitaService) {}

  ngOnInit() {}

  agregarCita() {
    // Verificamos que tanto la frase como el autor no estén vacíos
    if (this.cita.frase.trim() && this.cita.autor.trim()) {
      // Emitir el evento con la nueva cita
      this.citaAgregada.emit(new Cita(0, this.cita.frase.trim(), this.cita.autor.trim()));

      // Limpiamos el formulario
      this.cita = new Cita(0, '', ''); // Reiniciamos la cita a su valor inicial
    }
  }
}
