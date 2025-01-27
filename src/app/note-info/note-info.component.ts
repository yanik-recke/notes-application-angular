import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NotesService } from '../services/notes.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { KeycloakService } from '../services/keycloak.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-note-info',
  standalone: true,
  imports: [MatDividerModule, MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './note-info.component.html',
  styleUrl: './note-info.component.css'
})
export class NoteInfoComponent {
  notesService = inject(NotesService);

  constructor(readonly keycloak: KeycloakService) {

  }

  handleTitleChange(event: Event) {
    if (this.notesService.selectedNote) {
      this.notesService.selectedNote.title = (event.target as HTMLInputElement).value;
    }
  }

  handleDescChange(event: Event) {
    if (this.notesService.selectedNote) {
      this.notesService.selectedNote.description = (event.target as HTMLInputElement).value;
    }
  }

  handleCreatedAtChange(event: Event) {
    if (this.notesService.selectedNote) {
      this.notesService.selectedNote.createdAt = (event.target as HTMLInputElement).value;
    }
  }

}
