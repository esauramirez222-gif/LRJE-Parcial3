import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotaCard } from '../../components/nota-card/nota-card';
import { NotaService } from '../../services/nota-service';
import { Nota } from '../../interfaces/nota.interface';

@Component({
  selector: 'app-notas-page',
  imports: [ReactiveFormsModule, NotaCard],
  templateUrl: './notas-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './notas-page.css',
})
export class NotasPage implements OnInit {
  private notaService = inject(NotaService);
  public notas = this.notaService.notas;

  notaForm = new FormGroup({
    titulo: new FormControl('', Validators.required),
    contenido: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.notaService.cargarNotas();
  }

  onSubmit(): void {
    if (this.notaForm.valid) {
      const nuevaNota: Nota = {
        titulo: this.notaForm.value.titulo!,
        contenido: this.notaForm.value.contenido!,
      };

      // Creación de la nueva nota
      this.notaService.agregarNota(nuevaNota);

      this.notaForm.reset();
    } else {
      this.notaForm.markAllAsTouched(); // Marca los campos como tocados para mostrar los errores
    }
  }
}
