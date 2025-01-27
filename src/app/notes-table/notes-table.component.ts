import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Note } from '../interfaces/note';
import { MatPaginatorIntl, MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { NotesService } from '../services/notes.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import CustomPaginatorIntl from '../classes/CustomPaginatorIntl';


const initialSelection: Note[] = [];
const allowMultiSelect = false;

@Component({
  selector: 'app-notes-table',
  standalone: true,
  imports: [MatDividerModule, MatTableModule, MatPaginatorModule, MatCheckboxModule, MatProgressSpinnerModule, MatIconModule],
  templateUrl: './notes-table.component.html',
  styleUrl: './notes-table.component.css',
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }]
})
export class NotesTableComponent {
  notesService = inject(NotesService);

  notes: MatTableDataSource<Note> = new MatTableDataSource<Note>();
  displayedColumns: string[] = ['title', 'description', 'createdAt',];

  constructor() {
    this.notesService.fetchNotesPaginated().then(() => {
      if (this.notesService.getNotes()) {
        this.paginator.length = this.notesService.notesLength;
        this.notes.data = this.notesService.notes;
        this.notesService.setDataSource(this.notes);
      }
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  handleClick(row: Note) {
    if (row.id) {
      if (this.notesService.selectedNote === null || this.notesService.selectedNote.id !== row.id) {
        this.notesService.changeSelected(row.id);
      } else {
        this.notesService.unselect();
      }
    }
  }

  handlePageEvent(e: PageEvent) {
    console.log(e);
    if (e.pageIndex !== this.notesService.getCurrPage()) {
      this.notesService.setCurrPage(e.pageIndex);
    }

    if (e.pageSize !== this.notesService.getCurrSize()) {
      this.notesService.setCurrSize(e.pageSize);
    }

    this.notesService.fetchNotesPaginated();
  }

}
