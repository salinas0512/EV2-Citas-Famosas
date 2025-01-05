import { Injectable } from '@angular/core';  
import { Cita } from '../modelo/cita'; 
import { Capacitor } from '@capacitor/core'; 
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite'; 

@Injectable({ providedIn: 'root' })
export class CitaService {
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  db!: SQLiteDBConnection;

  plataforma: string = "";

  DB_NAME: string = "bd_citas";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  TABLE_NAME: string = "citas";

  col_cita: string = 'cita';
  col_autor: string = 'autor';

  DB_SQL_TABLAS: string = `CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ${this.col_cita} TEXT NOT NULL,
      ${this.col_autor} TEXT NOT NULL
    );`;

  constructor() { 
    this.iniciarPlugin(); // Llamamos a iniciarPlugin en el constructor para abrir la base de datos solo una vez
  }

  // Método para inicializar el plugin y abrir la conexión
  private async _iniciarPluginWeb(): Promise<void> {
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector("jeep-sqlite");
    if (jeepSqliteEl != null) {
      await this.sqlite.initWebStore();
    }
  }

  // Método para inicializar y abrir la conexión a la base de datos
  async iniciarPlugin() {
    this.plataforma = Capacitor.getPlatform();
    if (this.plataforma == "web") {
      await this._iniciarPluginWeb();
    }
    await this.abrirConexion();  // Abre la base de datos solo una vez
    await this.db.execute(this.DB_SQL_TABLAS);  // Ejecuta la creación de la tabla si no existe
  }

  // Abre la conexión a la base de datos
  private async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency();
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      );
    }
    await this.db.open()
  }

  // Método para agregar una cita nueva
  async agregarCita(frase: string, autor: string) {
    const query = `INSERT INTO ${this.TABLE_NAME} (${this.col_cita}, ${this.col_autor}) VALUES ('${frase}', '${autor}')`;
    await this.db.execute(query);  // Ejecuta la consulta de inserción
  }

  // Método para obtener todas las citas
  async obtenerCitas(): Promise<Cita[]> {
    const result = await this.db.query(`SELECT * FROM ${this.TABLE_NAME}`);  // Ejecuta la consulta de selección
    if (result.values) {
      const citas = result.values.map((row: any) => new Cita(row.id, row[this.col_cita], row[this.col_autor]));
      return citas;
    } else {
      return [];
    }
  }

  // Método para eliminar una cita por id
  async eliminarCita(id: number) {
    const query = `DELETE FROM ${this.TABLE_NAME} WHERE id = ${id}`;
    await this.db.execute(query);  // Ejecuta la consulta de eliminación
  }
}