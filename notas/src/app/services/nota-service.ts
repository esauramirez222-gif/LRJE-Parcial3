import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateNotaResponse, Nota } from '../interfaces/nota.interface';

@Injectable({
  providedIn: 'root',
})
export class NotaService {

  // HttpClient de forma moderna con inject()
  private http = inject(HttpClient);
  // API propia (proyecto notas-api). Debe estar corriendo con: npm run dev
  private apiUrl = 'http://localhost:8080/api/notas';

  // Señal donde se guarda el arreglo de notas
  private _notas: WritableSignal<Nota[]> = signal([]);

  public notas = this._notas.asReadonly();

  // GET /api/notas -> guarda la respuesta en la señal
  cargarNotas(): void {
    this.http.get<Nota[]>(this.apiUrl).subscribe({
      next: (response: Nota[]) => {
        this._notas.set(response);
      },
      error: (error) => {
        console.error('Error al cargar las notas:', error);
      }
    });
  }

  // POST /api/notas
  // Actualización pesimista: se espera la respuesta del servidor (que trae el _id de MongoDB)
  // y entonces se agrega la nota a la señal, así aparece sin recargar la página.
  agregarNota(nuevaNota: Nota): void {
    this.http.post<CreateNotaResponse>(this.apiUrl, nuevaNota).subscribe({
      next: (response: CreateNotaResponse) => {
        this._notas.update(notas => [...notas, response.data]);
      },
      error: (error) => {
        console.error('Error al crear la nota:', error);
      }
    });
  }
}
