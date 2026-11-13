import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Nota } from '../../interfaces/nota.interface';

@Component({
  selector: 'app-nota-card',
  imports: [],
  templateUrl: './nota-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './nota-card.css',
})
export class NotaCard {
  nota = input.required<Nota>();
}
