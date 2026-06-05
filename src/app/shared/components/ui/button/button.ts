import { Component, input } from '@angular/core';
import { Spinner } from '../spinner/spinner';

@Component({
  selector: 'app-button',
  imports: [Spinner],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly type = input<'button' | 'submit'>('button');
}
