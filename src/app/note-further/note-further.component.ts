import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-note-further',
  standalone: true,
  imports: [MatDividerModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './note-further.component.html',
  styleUrl: './note-further.component.css'
})
export class NoteFurtherComponent {

}
