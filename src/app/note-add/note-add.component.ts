import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NotesService } from '../services/notes.service';
import { FormControl } from '@angular/forms';
import { KeycloakService } from '../services/keycloak.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-note-add',
  standalone: true,
  imports: [MatDividerModule, MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatTooltipModule, MatIconModule],
  templateUrl: './note-add.component.html',
  styleUrl: './note-add.component.css'
})
export class NoteAddComponent {
  notesService = inject(NotesService);

  constructor(readonly keycloak: KeycloakService) {

  }

  selectedNote = this.notesService.getSelectedNote();

  titleControl = new FormControl("");
  descriptionControl = new FormControl("");
  createdAtControl = new FormControl("");

  handleSaveClick() {
    if (this.titleControl.value && this.descriptionControl.value && this.createdAtControl.value) {
      this.notesService.addNewNote({
        title: this.titleControl.value,
        description: this.descriptionControl.value,
        createdAt: this.createdAtControl.value
      });

      this.handleResetClick();
    }
  }

  handleResetClick() {
    this.titleControl.setValue("");
    this.descriptionControl.setValue("");
    this.createdAtControl.setValue("");
  }
}
