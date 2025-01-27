import { Component } from '@angular/core';
import { NotesTableComponent } from '../notes-table/notes-table.component';
import { NoteInfoComponent } from '../note-info/note-info.component';
import { NoteAddComponent } from '../note-add/note-add.component';
import { NoteFurtherComponent } from '../note-further/note-further.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NotesTableComponent, NoteInfoComponent, NoteAddComponent, NoteFurtherComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
