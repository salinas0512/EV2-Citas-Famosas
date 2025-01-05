import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';


@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  private readonly key_permitirBorrado = "permitirBorrado";
  constructor() {}

  async obtenerConfiguracion(): Promise<boolean> {
    const resultado = await Preferences.get({key: this.key_permitirBorrado})
    return resultado.value === "true"
  }
  async guardarConfiguracion(permitirBorrado: boolean): Promise<void> {
    await Preferences.set({
      key: this.key_permitirBorrado,
      value: permitirBorrado ? "true" : "false"
    });
  }
}