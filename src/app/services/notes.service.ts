import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note';
import axios from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { KeycloakService } from './keycloak.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  loading: boolean = true;
  success: boolean = false;
  notes: Note[] = [];
  notesLength: number = 50;
  currPage: number = 0;
  currSize: number = 5;
  selectedNote: Note | null = null;
  dataSource: MatTableDataSource<Note> | null = null;
  withDelay: boolean = false;
  keycloakService = inject(KeycloakService);

  constructor() { }

  setDataSource(dataSource: MatTableDataSource<Note>) {
    this.dataSource = dataSource;
  }

  getSuccess(): boolean {
    return this.success;
  }

  getLoading(): boolean {
    return this.loading;
  }

  getNotes(): Note[] {
    return this.notes;
  }

  getSelectedNote(): Note | null {
    return this.selectedNote;
  }

  getCurrPage() {
    return this.currPage;
  }

  getCurrSize() {
    return this.currSize;
  }

  setCurrPage(page: number) {
    this.currPage = page;
  }

  setCurrSize(size: number) {
    this.currSize = size;
  }

  async fetchLength() {
    const response = await axios.get(
      environment.apiUrl + "/getNotesLength",
    );

    if (response.status === 200) {
      this.notesLength = response.data;
    }
  }


  async fetchNotesPaginated() {

    this.loading = true;

    let response;
    if (this.withDelay) {
      response = await axios.get(
        environment.apiUrl + "/getNotesPaginated", { params: { page: this.currPage, size: this.currSize } },
      );
    } else {
      response = await axios.get(
        environment.apiUrl + "/getNotesPaginatedNoDelay", { params: { page: this.currPage, size: this.currSize } },
      );
    }

    if (response.status === 200) {
      await this.fetchLength();
      this.notes = response.data;
      this.success = true;
      if (this.dataSource) {
        this.dataSource.data = [...this.notes];
      }
    } else {
      this.notes = [];
      this.success = false;
    }

    this.loading = false;
  }

  async addNewNote(note: Note) {
    this.loading = true;
    await axios.post(
      environment.apiUrl + "/addNote", note, { headers: { "Authorization": "Bearer " + this.keycloakService.getToken() } }
    ).then(() => { }).catch((exception) => console.log(exception));
    await this.fetchNotesPaginated();
    this.loading = false;
  }

  async addNote() {
    this.loading = true;
    await axios.post(
      environment.apiUrl + "/addNote", this.selectedNote, { headers: { "Authorization": "Bearer " + this.keycloakService.getToken() } }
    ).then(() => { }).catch((exception) => console.log(exception));
    await this.fetchNotesPaginated();
    this.loading = false;
  }

  async deleteNote() {
    this.loading = true;
    const idToDelete = this.selectedNote?.id;
    this.unselect();
    if (idToDelete) {
      await axios.delete(
        environment.apiUrl + "/deleteNote", { params: { id: idToDelete }, headers: { "Authorization": "Bearer " + this.keycloakService.getToken() } },
      ).catch((exception) => console.log(exception));
    }

    await this.fetchNotesPaginated();
    this.loading = false;
  }

  changeSelected(id: number) {
    const found = this.notes.find((note) => note.id === id);

    if (found) {
      this.selectedNote = { ...found };
    }

  }

  unselect() {
    this.selectedNote = null;
  }

  resetChanges() {
    if (this.selectedNote !== null && this.selectedNote.id) {
      this.changeSelected(this.selectedNote.id);
    }
  }
}
